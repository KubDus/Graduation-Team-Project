import { Router } from 'express';
import { examController } from '../controllers/examController';
import { verifyToken } from '../middlewares/auth';
import { readToken } from '../middlewares/readToken';


const ExamRouter = Router()

ExamRouter.use(verifyToken);
ExamRouter.use(readToken);

ExamRouter.post('/exams',examController.create);

ExamRouter.get('/exams', examController.readAll);

ExamRouter.get('/exams/:id', examController.readByPk);

ExamRouter.put('/exams/:id', examController.update);

ExamRouter.delete('/exams/:id', examController.delete);



export default ExamRouter;