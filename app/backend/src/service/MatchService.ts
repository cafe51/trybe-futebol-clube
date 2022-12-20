import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamModel';
import NewMatchValidator from '../validators/newMatchValidator';

type TokenResponse = { token: string };

type ErrorResponse = { message: string };

interface SignResponse {
  code: number;
  message: TokenResponse | ErrorResponse | Matches;
}

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
  private newMatchValidator: NewMatchValidator;

  constructor() {
    this.newMatchValidator = new NewMatchValidator();
  }

  response = (code: number, message: TokenResponse | ErrorResponse | Matches): SignResponse => {
    const objectResponse = { code, message };
    return objectResponse;
  };

  findAll = async (inProgress?: string | undefined): Promise<Matches[] | null> => {
    const queryOptions: queryType = {
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    };

    if (inProgress !== undefined) {
      queryOptions.where = { inProgress: (inProgress === 'true') };
    }

    const response = await Matches.findAll(queryOptions);
    return response;
  };

  createMatch = async (data: Matches): Promise<SignResponse> => {
    const missTeam = { message: 'There is no team with such id!' };
    const sameTeam = { message: 'It is not possible to create a match with two equal teams' };

    if (await this.newMatchValidator.verifyExistingTeam(data)) return this.response(404, missTeam);
    if (await this.newMatchValidator.verifySameTeam(data)) return this.response(422, sameTeam);

    const match: Matches = await Matches.create({
      homeTeam: data.homeTeam,
      homeTeamGoals: data.homeTeamGoals,
      awayTeam: data.awayTeam,
      awayTeamGoals: data.awayTeamGoals,
      inProgress: true,
    });

    return this.response(201, match);
  };

  finishMatch = async (id: number): Promise<void> => {
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
  };
}

export default MatchService;
