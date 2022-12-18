// import Matches from '../database/models/MatchModel';

// interface IMatch{
//   id?: number;
//   homeTeam: number;
//   homeTeamGoals: number;
//   awayTeam: number;
//   awayTeamGoals: number;
//   inProgress: boolean;
// }

interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: {
    teamName: string;
  };
  teamAway: {
    teamName: string;
  };
}

export default IMatch;
