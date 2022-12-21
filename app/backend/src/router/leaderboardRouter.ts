import * as express from 'express';
import LBoardController from '../controller/LBoardController';
// import LoginValidator from '../middlewares/LoginValidator';

const leaderboardRouter = express.Router();

const lBoardController: LBoardController = new LBoardController();

leaderboardRouter.get('/', lBoardController.findAllTeamData);
leaderboardRouter.get('/home', lBoardController.findAllTeamDataHome);
leaderboardRouter.get('/away', lBoardController.findAllTeamDataAway);

export default leaderboardRouter;
