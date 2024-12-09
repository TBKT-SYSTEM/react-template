import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

interface UserPayload {
    su_username: string;
    su_id: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const SECRET_KEY = process.env.SECRET_KEY || "secret";

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
        
      if (err) {
        return res.status(401).json({ message: 'Token expired' });
      }

      req.user = user as UserPayload;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};