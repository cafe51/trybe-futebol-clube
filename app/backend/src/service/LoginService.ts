import bcrypt = require('bcryptjs');
import { IUser } from '../interfaces';
import Users from '../database/models/UserModel';
import UserValidator from '../validators';

// // const palavraPasse = 'bacon';
// // const encriptado = bcrypt.hashSync('bacon', 8);
// // const teste = bcrypt.compareSync(palavraPasse, encriptado);
// // console.log('a palavra passe é', palavraPasse);
// // console.log('a palavra passe encriptada', encriptado);
// // console.log('verifica o hash', teste);


interface signInResponse {
  code: number;
  response: Users | string;
}

class LoginService {
  private validator: UserValidator;
  constructor() {
    this.validator = new UserValidator();
  }

  response = (code: number, response: Users | string): signInResponse => {
    const objectResponse = { code, response };
    return objectResponse;
  };

  signIn = async (email: string, password: string): Promise<Users | null> => {
    const user = await Users.findOne({ where: { email } });

    if (!user) return null;

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  };

  signUp = async (data: IUser): Promise<signInResponse> => {
    const errorMail = 'email already exist in db';
    const errorUser = 'user already exist in db';

    if (await this.validator.isEmailExist(data.email)) return this.response(404, errorMail);

    if (await this.validator.isUserNameExist(data.username)) this.response(404, errorUser);

    const user = await Users.create({
      username: data.username,
      role: data.role,
      email: data.email,
      password: bcrypt.hashSync(data.password, 8),
    });

    return this.response(201, user);
  };
}

export default LoginService;
