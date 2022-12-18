import { Request, Response } from 'express';
import { TeamService } from '../service';

class TeamController {
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

  findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const payload = await this.service.findById(Number(id));
      if (payload) return res.status(200).json(payload);
      if (!payload) return res.status(404).json('nothing to see here');
    } catch (err) {
      console.log(err);
    }
  };
}

export default TeamController;
