import { Request, Response } from 'express';
import { MatchService } from '../service';

class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  findAll = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      if (inProgress && inProgress !== 'false' && inProgress !== 'true') {
        return res.status(404).json('not found');
      }
      const payload = await this.service.findAll(inProgress);
      return res.status(200).json(payload);
    } catch (err) {
      console.log(err);
    }
  };
}

export default MatchController;
