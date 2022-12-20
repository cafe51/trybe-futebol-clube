import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamModel';

class NewMatchValidator {
  verifyExistingTeam = async (data: Matches): Promise<boolean> => {
    const homeTeam = await Teams.findOne({ where: { id: data.homeTeam } });
    const awayTeam = await Teams.findOne({ where: { id: data.awayTeam } });

    return (!homeTeam || !awayTeam);
  };

  verifySameTeam = async (data: Matches): Promise<boolean> => (data.homeTeam === data.awayTeam);
}

export default NewMatchValidator;
