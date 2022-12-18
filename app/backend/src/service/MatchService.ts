import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamModel';

class MatchService {
  protected _model = Matches;

  async findAll(): Promise<Matches[] | null> {
    const result = await this._model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],

    });
    return result;
  }
}

export default MatchService;

// result.filter((m) => m.inProgress === true)
