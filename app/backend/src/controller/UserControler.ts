import { Request, Response } from 'express';
import { UserService } from '../service';

class UserController {
  private _service: UserService;

  constructor() {
    this._service = new UserService();
  }

  findAll = async (req: Request, res: Response) => {
    try {
      const result = await this._service.findAll();
      return res.status(200).json({ token: result });
    } catch (err) {
      console.log(err);
    }
  };
}

export default UserController;