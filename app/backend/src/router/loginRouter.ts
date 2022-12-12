import * as express from 'express';
import LoginValidator from '../middlewares/LoginValidator';
import LoginController from '../controller/LoginController';

const loginRouter = express.Router();

const loginController: LoginController = new LoginController();
const loginValidator: LoginValidator = new LoginValidator();

loginRouter.post('/', loginController.signIn);
loginRouter.post('/signUp', loginController.signUp);
loginRouter.get('/validate', loginValidator.validate, loginController.validate);

export default loginRouter;
