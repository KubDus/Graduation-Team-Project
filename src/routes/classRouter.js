import { Router } from 'express';
import { classController } from '../controllers/classController';
import { verifyToken } from '../middlewares/auth';
import { readToken } from '../middlewares/readToken';


const ClassRouter = Router()

ClassRouter.use(verifyToken);
ClassRouter.use(readToken);


ClassRouter.get('/classes', classController.getAllActiveClasses);

ClassRouter.get('/classes/:id', classController.getClassInfo);

ClassRouter.post('/classes', classController.createClass);

ClassRouter.put('/classes/:id', classController.updateClass);

ClassRouter.delete('/classes/:id', classController.deleteClass);


export default ClassRouter;