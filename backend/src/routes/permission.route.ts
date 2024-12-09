import { Router } from 'express';
import * as permissionController from '../controllers/permission.controller';
import { checkAuthentication } from '../middlewares/auth.middleware';

const router: Router = Router();

router.post("/menus", permissionController.saveMainMenu);
router.post("/submenus", permissionController.saveSubMenu);
router.get("/menus", permissionController.getMainMenus);
router.get("/permissions", permissionController.getPermissions);
router.get("/permission/:id/:type", permissionController.getPermissionDetail);
router.put("/menus/:id", permissionController.updateMainMenu);
router.put("/submenus/:id", permissionController.updateSubMenu);
router.delete("/menu/:id", permissionController.deleteMainMenu);
router.delete("/submenu/:id", permissionController.deleteSubMenu);
router.get("/sidebars/:id", checkAuthentication, permissionController.getSidebars);


export default router;