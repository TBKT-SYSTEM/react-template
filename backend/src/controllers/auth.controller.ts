import { Request, Response } from 'express';
import { db, getOracleConnection } from '../database/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as CryptoJS from 'crypto-js';
import mysql2 from 'mysql2/promise';


const saltRounds = 10;

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const encodePassword = encodeMD5(password);

  const expUser = await getExplannerUser(username);
  
  if (!expUser) {
    res.status(401).json({
        status: false,
        message: 'User not found'
    });
    return;
  }

  const systemUser = await getSystemUser(username);
  const responseUser = setResponseUser(systemUser)

  if (systemUser) {
    if (systemUser.su_status === 'inactive') {
      res.status(401).json({
          status: false,
          message: 'Account has been suspended.'
      });
      return;
    }

    if (expUser?.[0] != "" && expUser?.[1] != systemUser.su_password) {

      if (await updateSystemPassword(systemUser.su_id, expUser?.[1])) {
        res.status(200).json({
            status: false,
            message: 'Success',
            data: responseUser,
        });
        return;
      }
    } else if (expUser?.[1] == encodePassword) {
      res.status(200).json({
          status: true,
          message: 'Success',
          data: responseUser
      });
      return;
    }
  }

  if (expUser?.[0] != "") {

    if (expUser?.[1] == encodePassword) {
      await createSystemUser(expUser)
      const newUser = await getSystemUser(username);
      const responseUser = setResponseUser(newUser);
      res.status(200).json({
          status: true,
          message: 'Success',
          data: responseUser
      });
      return;
    }
  }

  res.status(401).json({
      status: false,
      message: 'Invalid password'
  });
}

const encodeMD5 = (input: string): string => {
  return CryptoJS.MD5(input).toString();
}

const getExplannerUser = async (username: string) => {
  const oraDb = await getOracleConnection();
  const result = await oraDb.execute<any[]>('SELECT USER_CD, PASSWORD, USER_NAME, ADDRESS FROM USER_MST WHERE USER_CD = :username', [username]);
  return result.rows?.[0];
}

const getSystemUser = async (username: string) => {
  const sql = `SELECT su_username, su_password, CONCAT(su_firstname, ' ', su_lastname) AS su_fullname, su_email, su_status, su_id, spg.spg_id, spg.spg_name
			  FROM sys_user su 
			  LEFT JOIN sys_permission_group spg ON su.spg_id = spg.spg_id 
			  WHERE su_username = ?`;
        
  const [rows] = await db.query<any[]>(sql, [username]);
  return rows?.[0];
}

const updateSystemPassword = async (id: number, password: string) => {
  const sql = `UPDATE sys_user SET su_password = ? WHERE su_id = ?`;
  const [rows, fields] = await db.execute(sql, [password, id]);

  return (rows as mysql2.ResultSetHeader).affectedRows > 0;
}

const setResponseUser = (user: any) => {
  if (user) {
    const { su_username, su_fullname,su_id, spg_id, spg_name } = user;

    const payload = {
      id: su_id,
      username: su_username,
    }
    
    const token = jwt.sign(payload, process.env.SECRET_KEY || 'secret', { expiresIn: '24h' });

    return {
      user: {
        id: su_id,
        username: su_username,
        fullname: su_fullname,
        groupId: spg_id,
        groupName: spg_name
      },
      token
    }
  } else {
    return null;
  }
}

const createSystemUser = async (user: any) => {
  const firstname = user[2].split(' ')[0] || null;
  const lastname = user[2].split(' ')[1] || null;

  const sql = `INSERT INTO sys_user (su_username, su_password, su_firstname, su_lastname, su_email, su_status, spg_id, su_created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  await db.execute<any[]>(sql, [
    user[0] || null, 
    user[1] || null, 
    firstname || null, 
    lastname || null,
    user[3] || null,
    'active',
    2,
    new Date()
  ]);
}

export const loginJwt = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const [rows] = await db.query<any[]>('SELECT su_id, su_username, su_password, su_firstname, su_lastname, su.spg_id, spg_name FROM sys_user su LEFT JOIN sys_permission_group spg ON su.spg_id = spg.spg_id WHERE su_username = ?', [username]);

      if (rows.length === 0) {
        res.status(401).json({
            status: false,
            message: 'User not found'
        });
        return;
      }
  
      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.su_password);
      
      if (!passwordMatch) {
        res.status(401).json({
            message: 'Invalid password'
        });
        return;
      }

      const payload = {
        id: user.su_id,
        username: user.su_username,
      }
      
      const token = jwt.sign(payload, process.env.SECRET_KEY || 'secret', { expiresIn: '1h' });
  
      res.status(200).json({
        status: true,
        data: {
            user: {
                id: user.su_id,
                username: user.su_username,
                fullname: `${user.su_firstname} ${user.su_lastname}`,
                groupId: user.spg_id,
                groupName: user.spg_name
            },
            token: token
        }
      })
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({
        message: 'Server Error'
      });
    }
  };

