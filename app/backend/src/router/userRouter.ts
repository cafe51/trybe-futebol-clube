import * as express from 'express';
import UserController from '../controller/UserControler';

const userRouter = express.Router();

const userController: UserController = new UserController();

userRouter.get('/', userController.findAll);

export default userRouter;
