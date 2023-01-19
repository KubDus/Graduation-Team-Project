import { Router } from 'express';
import { cohortController } from '../controllers/cohortController.js';
import { verifyToken } from '../middlewares/auth';
import { readToken } from '../middlewares/readToken';


const CohortRouter = Router()

CohortRouter.use(verifyToken);
CohortRouter.use(readToken);


CohortRouter.get('/cohorts', cohortController.getAllActiveCohorts);

CohortRouter.get('/cohorts/:id', cohortController.getCohortInfo);

CohortRouter.post('/cohorts', cohortController.createCohort);

CohortRouter.put('/cohorts/:id', cohortController.updateCohort);

CohortRouter.delete('/cohorts/:id', cohortController.deleteCohort);


export default CohortRouter;