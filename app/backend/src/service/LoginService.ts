import bcrypt = require('bcryptjs');
import { IUser } from '../interfaces';
import Users from '../database/models/UserModel';
import UserValidator from '../validators';
import JWT from '../utils/jwt';

type TokenResponse = { token: string };

type ErrorResponse = { message: string };

interface SignResponse {
  code: number;
  message: TokenResponse | ErrorResponse | Users;
}

class LoginService {
  private jwt: JWT;
  private validator: UserValidator;

  constructor() {
    this.jwt = new JWT();
    this.validator = new UserValidator();
  }

  response = (code: number, message: TokenResponse | ErrorResponse | Users): SignResponse => {
    const objectResponse = { code, message };
    return objectResponse;
  };

  signIn = async (email: string, password: string): Promise<SignResponse> => {
    const missingMailOrPassword = { message: 'All fields must be filled' };
    const missingUser = { message: 'Incorrect email or password' };

    if (!password || !email) return this.response(400, missingMailOrPassword);

    const user = await this.validator.getUserByEmail(email);

    if (!user) return this.response(401, missingUser);

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) return this.response(401, missingUser);

    const token = this.jwt.jwtGenerator(user);

    return this.response(200, { token });
  };

  signUp = async (data: IUser): Promise<SignResponse> => {
    const errorMail = { message: 'email already exist in db' };
    const errorUser = { message: 'user already exist in db' };

    if (await this.validator.getUserByEmail(data.email)) return this.response(404, errorMail);

    if (await this.validator.getUserByusername(data.username)) this.response(404, errorUser);

    const user: Users = await Users.create({
      username: data.username,
      role: data.role,
      email: data.email,
      password: bcrypt.hashSync(data.password, 8),
    });

    return this.response(201, user);
  };
}

export default LoginService;

// // const palavraPasse = 'bacon';
// // const encriptado = bcrypt.hashSync('bacon', 8);
// // const teste = bcrypt.compareSync(palavraPasse, encriptado);
// // console.log('a palavra passe é', palavraPasse);
// // console.log('a palavra passe encriptada', encriptado);
// // console.log('verifica o hash', teste);
