import { ITeam } from '../interfaces';
import Team from '../database/models/TeamModel';

class TeamService {
  findAll = async (): Promise<ITeam[] | null> => {
    const result = await Team.findAll();
    return result;
  };

  findById = async (id: number): Promise<ITeam | null> => {
    const result = await Team.findOne({ where: { id } });
    return result;
  };
}

export default TeamService;
