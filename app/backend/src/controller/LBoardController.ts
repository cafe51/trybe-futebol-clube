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

  // findMyTeamMatches = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const response = await this.lBoardService.findMyTeamMatches(Number(id));
  //   if (!response) return res.status(400).json('ERRO');
  //   return res.status(200).json(response);
  // };

  findAllTeamDataHome = async (_req: Request, res: Response) => {
    const teamsData = await this.lBoardService.findAllTeamData();
    if (teamsData === null) return res.status(400).json('ERROR');

    res.status(200).json(teamsData);
  };
}

export default LBoardController;
