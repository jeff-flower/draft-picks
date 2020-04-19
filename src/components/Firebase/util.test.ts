import { scorePick, UserPick, ActualPick } from './util';

test('Picks 1 - 10 get 7 points if the pick number is not exact', () => {
  const userPick: UserPick = {
    pick: 'Jeff Flower, P, Fredonia State',
    pickNumber: 11,
    team: 'CIN',
  };

  const actualPick: ActualPick = {
    pickNumber: 1,
    player: 'Jeff Flower, P, Fredonia State',
  };

  const places = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  places.forEach((placeNumber) => {
    actualPick.pickNumber = placeNumber;
    const score = scorePick(userPick, actualPick);

    expect(score).toBe(7);
  });
});

test('Picks 11 - 20 get 12 points if the pick is not exact', () => {
  const userPick: UserPick = {
    pick: 'Jeff Flower, P, Fredonia State',
    pickNumber: 1,
    team: 'CIN',
  };

  const actualPick: ActualPick = {
    pickNumber: 7,
    player: 'Jeff Flower, P, Fredonia State',
  };

  const places = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  places.forEach((placeNumber) => {
    actualPick.pickNumber = placeNumber;
    const score = scorePick(userPick, actualPick);

    expect(score).toBe(12);
  });
});

test('Picks 21 - 32 get 17 points if the pick is not exact', () => {
  const userPick: UserPick = {
    pick: 'Jeff Flower, P, Fredonia State',
    pickNumber: 1,
    team: 'CIN',
  };

  const actualPick: ActualPick = {
    pickNumber: 7,
    player: 'Jeff Flower, P, Fredonia State',
  };

  const places = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

  places.forEach((placeNumber) => {
    actualPick.pickNumber = placeNumber;
    const score = scorePick(userPick, actualPick);

    expect(score).toBe(17);
  });
});

test('Picks 1 - 10 get 7 points plus the pick value if the pick is exact', () => {
  const userPick: UserPick = {
    pick: 'Jeff Flower, P, Fredonia State',
    pickNumber: 11,
    team: 'CIN',
  };

  const actualPick: ActualPick = {
    pickNumber: 1,
    player: 'Jeff Flower, P, Fredonia State',
  };

  const places = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  places.forEach((placeNumber) => {
    userPick.pickNumber = placeNumber;
    actualPick.pickNumber = placeNumber;
    const score = scorePick(userPick, actualPick);

    expect(score).toBe(7 + placeNumber);
  });
});

test('Picks 11 - 20 get 12 points plus the pick value if the pick is exact', () => {
  const userPick: UserPick = {
    pick: 'Jeff Flower, P, Fredonia State',
    pickNumber: 11,
    team: 'CIN',
  };

  const actualPick: ActualPick = {
    pickNumber: 1,
    player: 'Jeff Flower, P, Fredonia State',
  };

  const places = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  places.forEach((placeNumber) => {
    userPick.pickNumber = placeNumber;
    actualPick.pickNumber = placeNumber;
    const score = scorePick(userPick, actualPick);

    expect(score).toBe(12 + placeNumber);
  });
});

test('Picks 21 - 32 get 17 points plus the pick value if the pick is exact', () => {
  const userPick: UserPick = {
    pick: 'Jeff Flower, P, Fredonia State',
    pickNumber: 11,
    team: 'CIN',
  };

  const actualPick: ActualPick = {
    pickNumber: 1,
    player: 'Jeff Flower, P, Fredonia State',
  };

  const places = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

  places.forEach((placeNumber) => {
    userPick.pickNumber = placeNumber;
    actualPick.pickNumber = placeNumber;
    const score = scorePick(userPick, actualPick);

    expect(score).toBe(17 + placeNumber);
  });
});
