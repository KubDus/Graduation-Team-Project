import { Router } from 'express';
import { userController } from '../controllers/userController';
import { verifyToken } from '../middlewares/auth';
import { readToken } from '../middlewares/readToken';


const UserRouter = Router()

UserRouter.post('/login', userController.login);

// forgotten password - in request body is username or email
UserRouter.post('/registration/forgotten', userController.forgottenPassword);

// forgotten password confirm - in req body: password
UserRouter.post('/registration/forgotten/:authentication', userController.forgottenPasswordConfirm);

// each Router uses readToken middleware to be able to get info from token
UserRouter.use(readToken);

UserRouter.post('/registration', userController.register);

UserRouter.get('/registration/confirmation/:authenticationLink', userController.confirm);

// verified token needed for all routes bellow
UserRouter.use(verifyToken);

UserRouter.put('/users/auth', userController.updateUserPassword);

UserRouter.get('/users/self-register',userController.getAdminPage);

UserRouter.get('/users', userController.getUserPageBasedOnRole);

UserRouter.get('/users/active', userController.getAllActiveUsers);

// :id is pathVariable equivalent, processed in Controller
UserRouter.get('/users/:id', userController.getInfoById);

UserRouter.put('/users/:id', userController.updateUser);

UserRouter.delete('/users/:id', userController.deleteUser);

UserRouter.put('/users/:id/enable', userController.enableUser);

export default UserRouter;