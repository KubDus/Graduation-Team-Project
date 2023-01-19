import { Router } from 'express';
import { dashboardController } from '../controllers/dashboardController';
import { verifyToken } from '../middlewares/auth';
import { readToken } from '../middlewares/readToken';

const DashboardRouter = Router();

DashboardRouter.use(verifyToken);
DashboardRouter.use(readToken);

DashboardRouter.get('/dashboard', dashboardController.getDashboardInfo);

export default DashboardRouter;