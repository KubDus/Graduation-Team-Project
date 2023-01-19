import { Router } from 'express';
import { apprenticeshipController } from '../controllers/apprenticeshipController';
import { verifyToken } from '../middlewares/auth';
import { readToken } from '../middlewares/readToken';


const ApprenticeshipRouter = Router()

// ApprenticeshipRouter.use(verifyToken);
ApprenticeshipRouter.use(readToken);

ApprenticeshipRouter.get('/apprenticeship', apprenticeshipController.getAllActiveApprenticeships);

ApprenticeshipRouter.get('/apprenticeship/:id', apprenticeshipController.getApprenticeshipsById);

ApprenticeshipRouter.post('/apprenticeship', apprenticeshipController.createApprenticeship);

ApprenticeshipRouter.put('/apprenticeship/:id', apprenticeshipController.updateApprenticeship);

ApprenticeshipRouter.delete('/apprenticeship/:id', apprenticeshipController.deleteApprenticeship);

export default ApprenticeshipRouter;