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

      const payload = await this.loginService.signIn(email, password);

      if (!payload) return res.status(401).json('email ou usuário errados');

      return res.status(200).json(payload);
    } catch (err) {
      console.log(err);
    }
  };

  signUp = async (req: Request, res: Response) => {
    try {
      const { code, response } = await this.loginService.signUp(req.body);

      // if (!payload) return res.status(401).json('email ou usuário errados');

      return res.status(code).json(response);
    } catch (err) {
      console.log(err);
    }
  };
}

export default LoginController;