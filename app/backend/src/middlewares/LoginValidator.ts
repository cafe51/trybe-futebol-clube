import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/jwt';

class LoginValidator {
  private jwt: JWT;

  constructor() {
    this.jwt = new JWT();
  }

  validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }
      const decoded = this.jwt.verifyToken(token);

      req.body.userDecoded = decoded;

      // (req.app.user as CustomApp).user = decoded;

      next();
    } catch (e) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  };
}

export default LoginValidator;
