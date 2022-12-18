import { IMatch } from '../interfaces';
import Match from '../database/models/MatchModel';

class MatchService {
  protected _model = Match;

  async findAll(): Promise<IMatch[] | null> {
    const result = await this._model.findAll();
    return result;
  }
}

export default MatchService;
