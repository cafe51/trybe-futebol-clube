import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamModel';

interface includeType {
  model: typeof Teams,
  as: string,
  attributes: string[];
}

interface queryType {
  include: includeType[],
  where?: { inProgress: boolean },
}

class MatchService {
  protected _model = Matches;

  async findAll(inProgress?: string | undefined): Promise<Matches[] | null> {
    const queryOptions: queryType = {
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    };

    if (inProgress !== undefined) {
      queryOptions.where = { inProgress: (inProgress === 'true') };
    }

    const response = await this._model.findAll(queryOptions);
    return response;
  }
}

export default MatchService;
