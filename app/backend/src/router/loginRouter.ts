import * as express from 'express';
import LoginController from '../controller/LoginController';

const loginRouter = express.Router();

const loginController: LoginController = new LoginController();

loginRouter.post('/', loginController.signIn);
loginRouter.post('/signUp', loginController.signUp);

export default loginRouter;
