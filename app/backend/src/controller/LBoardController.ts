import { Request, Response } from 'express';
import LBoardService from '../service/LBoardService';
import { TeamService } from '../service';

class LBoardController {
  private lBoardService: LBoardService;
  private teamService: TeamService;

  constructor() {
    this.lBoardService = new LBoardService();
    this.teamService = new TeamService();
  }

  findAllTeamDataHome = async (_req: Request, res: Response) => {
    const teamsData = await this.lBoardService.findAllTeamData('home');
    if (teamsData === null) return res.status(400).json('ERROR');

    res.status(200).json(teamsData);
  };

  findAllTeamDataAway = async (_req: Request, res: Response) => {
    const teamsData = await this.lBoardService.findAllTeamData('away');
    if (teamsData === null) return res.status(400).json('ERROR');

    res.status(200).json(teamsData);
  };

  findAllTeamData = async (_req: Request, res: Response) => {
    const teamsData = await this.lBoardService.findAllTeamData();
    if (teamsData === null) return res.status(400).json('ERROR');

    res.status(200).json(teamsData);
  };
}

export default LBoardController;
