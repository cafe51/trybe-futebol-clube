import { IUser } from '../interfaces';
import Users from '../database/models/UserModel';

export default class UserService {
  protected model = Users;

  findAll = async (): Promise<IUser[]> => {
    const payload = await this.model.findAll();
    return payload;
  };
}
