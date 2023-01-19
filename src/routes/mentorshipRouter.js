import { Router } from 'express';
import { mentorshipController } from '../controllers/mentorshipController.js';
import { verifyToken } from '../middlewares/auth';
import { readToken } from '../middlewares/readToken';


const MentorshipRouter = Router()

MentorshipRouter.use(verifyToken);
MentorshipRouter.use(readToken);


MentorshipRouter.get('/mentorship', mentorshipController.getAllActiveMentorShips);

MentorshipRouter.get('/mentorship/:id', mentorshipController.getMentorShipById);

MentorshipRouter.post('/mentorship', mentorshipController.createMentorship);

MentorshipRouter.put('/mentorship/:id', mentorshipController.updateMentorship);

MentorshipRouter.delete('/mentorship/:id', mentorshipController.deleteMentorship);


export default MentorshipRouter;