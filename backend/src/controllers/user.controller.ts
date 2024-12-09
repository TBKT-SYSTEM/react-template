import { Request, Response } from 'express';
import { db } from '../database/db';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT su_id, spg.spg_id, spg_name, su_username, su_firstname, su_lastname, su_email, su_status FROM sys_user su LEFT JOIN sys_permission_group spg ON su.spg_id = spg.spg_id');

        res.status(200).json({
            status: true,
            data: rows
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            status: false,
            message: 'Server Error'
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { role, status } = req.body;

        const [result]: any = await db.execute(
            'UPDATE sys_user SET spg_id = ?, su_status = ? WHERE su_id = ?', 
            [role, status, id]
        );

        res.status(200).json({
            status: true,
            message: 'Update successfully.',
            data: result.insertId
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}