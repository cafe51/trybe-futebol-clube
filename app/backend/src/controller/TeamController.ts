import { Request, Response } from 'express';
import { TeamService } from '../service';

export default class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  findAll = async (_req: Request, res: Response) => {
    try {
      const payload = await this.service.findAll();
      return res.status(200).json(payload);
    } catch (err) {
      console.log(err);
    }
  };
}
