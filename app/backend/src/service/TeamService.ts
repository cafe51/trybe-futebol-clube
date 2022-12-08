import { ITeam } from '../interfaces';
import Team from '../database/models/TeamModel';

export default class TeamService {
  protected _model = Team;

  async findAll(): Promise<ITeam[] | null> {
    const result = await this._model.findAll();
    return result;
  }
}
