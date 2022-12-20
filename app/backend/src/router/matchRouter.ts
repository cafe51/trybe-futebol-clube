import * as express from 'express';
import MatchController from '../controller/MatchController';

const matchRouter = express.Router();

const matchController: MatchController = new MatchController();

matchRouter.get('/', matchController.findAll);
matchRouter.post('/', matchController.createMatch);
matchRouter.patch('/:id/finish', matchController.finishMatch);

export default matchRouter;
