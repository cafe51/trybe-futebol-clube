import * as express from 'express';
import MatchController from '../controller/MatchController';
import LoginValidator from '../middlewares/LoginValidator';

const matchRouter = express.Router();

const matchController: MatchController = new MatchController();
const loginValidator: LoginValidator = new LoginValidator();

matchRouter.get('/', matchController.findAll);
// matchRouter.get('/:id/', matchController.findById);
matchRouter.post('/', loginValidator.validate, matchController.createMatch);
matchRouter.patch('/:id/finish', matchController.finishMatch);
matchRouter.patch('/:id/', matchController.updateMatch);

export default matchRouter;
