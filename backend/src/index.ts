import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import permissionRoutes from './routes/permission.route';
import roleRoutes from './routes/role.route';
import workflowRoutes from './routes/workflow.route';
import { config } from 'dotenv';
import cors from 'cors';
const path = require('path');

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/uploads' , express.static(path.join(__dirname,'uploads/')));

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', permissionRoutes);
app.use('/api', roleRoutes);
app.use('/api', workflowRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
