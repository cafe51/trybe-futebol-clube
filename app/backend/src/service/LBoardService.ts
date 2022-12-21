import { MatchService, TeamService } from '.';
import { IMatch } from '../interfaces';
import teamData from '../interfaces/teamData';

interface goals {
  goalsFavor: number,
  allGoals: number,
  goalsOwn: number,
  goalsBalance: number,
}

class LBoardService {
  private matchService: MatchService;
  private teamsService: TeamService;

  constructor() {
    this.matchService = new MatchService();
    this.teamsService = new TeamService();
  }

  // findMyTeamMatches = async (id: number): Promise <IMatch[] | null> => {
  //   const team = await this.teamsService.findById(id);
  //   if (!team) return null;

  //   const matches = await this.matchService.findAll('false') as IMatch[];
  //   if (!matches || matches.length === 0) return null;

  //   const myTeamMatches = matches.filter((mt) => {
  //     const result = mt.teamHome.teamName === team.teamName
  //     || mt.teamAway.teamName === team.teamName;
  //     return result;
  //   });

  //   return myTeamMatches;
  // };

  findMyTeamMatchesHome = async (id: number): Promise <IMatch[] | null> => {
    const team = await this.teamsService.findById(id);
    if (!team) return null;

    const matches = await this.matchService.findAll('false') as IMatch[];
    if (!matches || matches.length === 0) return null;

    const myTeamMatches = matches.filter((mt) => {
      const result = mt.teamHome.teamName === team.teamName;
      return result;
    });

    return myTeamMatches;
  };

  getResult = (match: IMatch, name?: string) => {
    if (match.homeTeamGoals === match.awayTeamGoals) return 'draw';

    if (match.teamHome.teamName === name) {
      return (match.homeTeamGoals > match.awayTeamGoals) ? 'win' : 'loss';
    }
    if (match.teamAway.teamName === name) {
      return (match.homeTeamGoals < match.awayTeamGoals) ? 'win' : 'loss';
    }
  };

  wld = async (matches: IMatch[], type: string, name?: string): Promise <IMatch[]> => {
    const result = matches.filter((match) => this.getResult(match, name) === type);
    return result;
  };

  goals = async (matches: IMatch[], name: string): Promise <goals> => {
    let goalsFavor = 0;
    let allGoals = 0;
    matches.forEach((w) => {
      if (w.teamHome.teamName === name) goalsFavor += w.homeTeamGoals; allGoals += w.awayTeamGoals;
      if (w.teamAway.teamName === name) goalsFavor += w.awayTeamGoals; allGoals += w.homeTeamGoals;
    });

    const goalsOwn = allGoals - goalsFavor;

    return {
      goalsFavor,
      allGoals,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
    };
  };

  findMyTeamData = async (matches: IMatch[], name: string): Promise <teamData> => {
    const totalVictories: number = (await this.wld(matches, 'win', name)).length;
    const totalDraws: number = (await this.wld(matches, 'draw')).length;
    const totalLosses: number = (await this.wld(matches, 'loss', name)).length;
    const totalPoints: number = (totalVictories * 3) + totalDraws;
    const { goalsFavor, goalsOwn, goalsBalance } = await this.goals(matches, name);

    const myTeamData = {
      name,
      totalPoints,
      totalGames: matches.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: Number(((totalPoints / (matches.length * 3)) * 100).toFixed(2)),
    };

    return myTeamData;
  };

  sortByTotalVictories = (a: teamData, b: teamData) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn > b.goalsOwn) return 1;
    if (a.goalsOwn < b.goalsOwn) return -1;
    return 0;
  };

  findAllTeamData = async (): Promise <IMatch[] | null> => {
    const teams = await this.teamsService.findAll();
    if (!teams) return null;

    const allTeamsData = await Promise.allSettled(teams.map(async (t) => {
      const machesById = await this.findMyTeamMatchesHome(Number(t.id)) as IMatch[];
      // if (!IMatch) return null;

      const mapped = await this.findMyTeamData(machesById, t.teamName);

      return mapped;
    })) as any;

    const finalResult = allTeamsData.map((m: { value: teamData; }) => m.value);

    // return finalResult;
    return finalResult.sort(this.sortByTotalVictories);
  };

  // findAllTeamHomeData
}

export default LBoardService;

// [P / (J * 3)] * 100
// P: Total de Pontos;
// J: Total de Jogos.
