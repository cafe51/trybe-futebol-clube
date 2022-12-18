import { Request, Response } from 'express';
import { LoginService } from '../service';

class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const { message, code } = await this.loginService.signIn(email, password);

      // console.log(this.secret);
      return res.status(code).json(message);
    } catch (err) {
      console.log(err);
    }
  };

  validate = (req: Request, res: Response) => {
    // console.log(req.body.userDecoded.user.role);
    res.status(200).json({ role: req.body.userDecoded.user.role });
  };

  signUp = async (req: Request, res: Response) => {
    try {
      const { code, message } = await this.loginService.signUp(req.body);

      return res.status(code).json(message);
    } catch (err) {
      console.log(err);
    }
  };
}

export default LoginController;
