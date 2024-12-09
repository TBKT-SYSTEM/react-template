import { Router } from 'express';
import * as roleController from '../controllers/role.controller';

const router: Router = Router();

router.get("/roles", roleController.getRoles);
router.post("/roles", roleController.saveRole);
router.put("/roles/:id", roleController.updateRole);

export default router;