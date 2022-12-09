// import bcrypt = require('bcryptjs');
// import { IUser } from '../interfaces';
import Users from '../database/models/UserModel';

class UserValidator {
  isEmailExist = async (email: string): Promise<boolean> => {
    const emailExist = await Users.findOne({ where: { email } });
    return emailExist !== null;
  };

  isUserNameExist = async (username: string): Promise<boolean> => {
    const usernameExist = await Users.findOne({ where: { username } });
    return usernameExist !== null;
  };
}

export default UserValidator;
