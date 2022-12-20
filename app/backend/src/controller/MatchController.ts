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

  createMatch = async (req: Request, res: Response) => {
    try {
      const { code, message } = await this.service.createMatch(req.body);
      return res.status(code).json(message);
    } catch (err) {
      console.log(err);
    }
  };

  finishMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.finishMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      console.log(err);
    }
  };
}

export default MatchController;
