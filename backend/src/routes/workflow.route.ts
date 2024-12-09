import { Router } from 'express';
import * as workflowController from '../controllers/workflow.controller';

const router: Router = Router();

router.get("/workflows", workflowController.getWorkflows);
router.get("/workflow-type", workflowController.getWorkflowType);
router.post("/workflows", workflowController.saveWorkflows);
router.put("/workflow/:id", workflowController.updateWorkflow);

export default router;