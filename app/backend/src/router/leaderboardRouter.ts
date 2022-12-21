import * as express from 'express';
import LBoardController from '../controller/LBoardController';
// import LoginValidator from '../middlewares/LoginValidator';

const leaderboardRouter = express.Router();

const lBoardController: LBoardController = new LBoardController();

leaderboardRouter.get('/home', lBoardController.findAllTeamDataHome);

export default leaderboardRouter;
