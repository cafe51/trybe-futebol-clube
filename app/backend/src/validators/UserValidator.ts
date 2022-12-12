import Users from '../database/models/UserModel';

class UserValidator {
  getUserByEmail = async (email: string): Promise<Users | null> => {
    const user = await Users.findOne({ where: { email } });
    return user;
  };

  getUserByusername = async (username: string): Promise<Users | null> => {
    const user = await Users.findOne({ where: { username } });
    return user;
  };
}

export default UserValidator;
