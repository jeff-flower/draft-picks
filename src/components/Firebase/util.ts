import { User } from 'firebase';

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

export type ActualPick = { pickNumber: number; player: string };

export const scorePick = (
  userPick: UserPick,
  actualPick: ActualPick
): number => {
  let bonus = 0;

  if (actualPick.pickNumber === userPick.pickNumber) {
    bonus = actualPick.pickNumber;
  }

  if (actualPick.pickNumber < 11) {
    return 7 + bonus;
  }

  if (actualPick.pickNumber < 21) {
    return 12 + bonus;
  }

  return 17 + bonus;
};
