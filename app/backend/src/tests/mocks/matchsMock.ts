export const allMatches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Internacional"
    }
  },
  {
    id: 42,
    homeTeam: 6,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "Ferroviária"
    },
    teamAway: {
      teamName: "Avaí/Kindermann"
    }
  }
]

export const newMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

export const newMatchSameTeam = {
  homeTeam: 8,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

export const newMatchMissingTeam = {
  homeTeam: 16,
  awayTeam: 999,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}
