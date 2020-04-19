export type UserPick = { pickNumber: number; team: string; pick: string };

const teamOrder = [
  'CIN',
  'WAS',
  'DET',
  'NYG',
  'MIA',
  'LAC',
  'CAR',
  'ARI',
  'JAC',
  'CLE',
  'NYJ',
  'LV',
  'SF',
  'TB',
  'DEN',
  'ATL',
  'DAL',
  'MIA',
  'LV',
  'JAC',
  'PHI',
  'MIN',
  'NE',
  'NO',
  'MIN',
  'MIA',
  'SEA',
  'BAL',
  'TEN',
  'GB',
  'SF',
  'KC',
];

export const buildPicksTemplate = (): UserPick[] =>
  teamOrder.map((team, index) => ({
    pickNumber: index + 1,
    team,
    pick: '',
  }));

export type UserTrade = {
  from: string;
  to: string;
  pickNumber: string;
  for: string;
};

export const buildUserTrade = (): UserTrade => ({
  from: '',
  to: '',
  pickNumber: '',
  for: '',
});
