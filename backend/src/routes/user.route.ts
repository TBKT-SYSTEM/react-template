import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router: Router = Router();

router.get("/users", userController.getUsers);
router.put("/users/:id", userController.updateUser);

export default router;