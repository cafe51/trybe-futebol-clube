import Users from '../database/models/UserModel';

class UserService {
  private _model = Users;

  findAll = async (): Promise<Users[]> => {
    const payload = await this._model.findAll();
    return payload;
  };
}

export default UserService;
