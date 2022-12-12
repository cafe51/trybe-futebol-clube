import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken';

class JWT {
  private secret: string | undefined;
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  jwtGenerator = (user: string | Buffer | object):string => {
    if (this.secret === undefined) {
      this.secret = 'jwt_secret';
    }
    const jwtConfig: object = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ user }, this.secret, jwtConfig);

    return token;
  };

  verifyToken = (token: string): JwtPayload | string => {
    if (this.secret === undefined) {
      this.secret = 'jwt_secret';
    }
    const decodedJwt = jwt.verify(token, this.secret);
    console.log(decodedJwt);
    return decodedJwt;
  };
}

export default JWT;
