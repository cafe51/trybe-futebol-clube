import * as express from 'express';
import TeamController from '../controller/TeamController';

const teamRouter = express.Router();

const teamController: TeamController = new TeamController();

teamRouter.get('/', teamController.findAll);

export default teamRouter;
