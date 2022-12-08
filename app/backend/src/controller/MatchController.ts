import { Request, Response } from 'express';
import { MatchService } from '../service';

export default class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
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
