import { Router } from 'express';
import { scheduleController } from '../controllers/scheduleController';
import { verifyToken } from '../middlewares/auth';
import { readToken } from '../middlewares/readToken';

const ScheduleRouter = Router()

ScheduleRouter.use(verifyToken);
ScheduleRouter.use(readToken);

ScheduleRouter.get('/schedules/:id', scheduleController.getScheduleById);

ScheduleRouter.get('/schedules/class/:id', scheduleController.getSchedulesByClass);

ScheduleRouter.get('/schedules/class/:classId/phase/:phaseId', scheduleController.getSchedulesByClassAndPhase);

ScheduleRouter.post('/schedules', scheduleController.createSchedule);

ScheduleRouter.put('/schedules/:id', scheduleController.updateSchedule);

ScheduleRouter.delete('/schedules/:id', scheduleController.deleteSchedule);

export default ScheduleRouter;