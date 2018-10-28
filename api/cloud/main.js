
Parse.Cloud.job("createPlayers", async () => {
  const playerCount = Math.floor((Math.random() * 100) + 1);
  for (let i = 0; i < playerCount; i++) {
    const games = ['dota', 'lol', 'overwatch', 'fortnite', 'csgo'];
    const sizes = [2, 3, 4, 5];
    const PlayerObject = Parse.Object.extend("queue");
    const newplayer = new PlayerObject();
    const game = games[Math.floor(Math.random() * games.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    newplayer.set('game', game);
    newplayer.set('size', size);
    newplayer.set('status', 'pending');
    await newplayer.save();
  }

  return 'player created';
});

Parse.Cloud.job("reset", async () => {
  const matchQuery = new Parse.Query("match");
  const matches = await matchQuery.find();
  matches.forEach(match => {
    return match.destroy();
  });

  const playerQuery = new Parse.Query('queue');
  const players = await playerQuery.find();

  players.forEach(player => {
    return player.destroy();
  });
});

Parse.Cloud.job("Matchmaking", () => {

  const checkQueue = async () => {
    const query = new Parse.Query("queue");
    query.equalTo('status', 'pending');

    const count = await query.count();
    console.log('currently in queue', count);

    if (count) {
      const queue = await startQueue();
      console.log('completed match', queue);
      await checkQueue();
    } else {
      console.log('no players');
      return 'no players in queue';
    }
  }

  const startQueue = async () => {
    console.log('start queue');
    const query = new Parse.Query("queue");
    query.equalTo('status', 'pending');
    query.limit(1);
    const player = await query.find();
    const match = await setMatch(player[0]);
    return match;
  }

  const setMatch = async (queue) => {
    console.log('start set match')
    const match = new Parse.Query("match");
    match.equalTo('size', queue.get('size'));
    match.equalTo('game', queue.get('game'));
    match.equalTo('status', 'pending');
    const matchCount = await match.count();
    let matchFound = null;
    if (matchCount) {
      matchFound = await updateMatch(queue);
    } else {
      matchFound = await createMatch(queue);
    }
    return matchFound;
  }

  const updateMatch = async (queue) => {
    console.log('start update match', queue);

    const matchQuery = new Parse.Query("match");
    matchQuery.equalTo('size', queue.get('size'));
    matchQuery.equalTo('game', queue.get('game'));
    matchQuery.equalTo('status', 'pending');
    matchQuery.limit(1);

    const match = await matchQuery.find();
    console.log('match found', match);

    match[0].relation('players').add(queue);

    const savedMatch = await match[0].save();
    console.log('saved match', savedMatch);

    const playerQuery = new Parse.Query('queue');
    playerQuery.equalTo('match', savedMatch);
    const playerCount = await playerQuery.count();
    console.log('player count', playerCount);

    if (playerCount === savedMatch.get('size') - 1) {
      savedMatch.set('status', 'found');
    }

    const updatedMatch = await savedMatch.save();
    queue.set('match', updatedMatch);
    queue.set('status', 'found');
    const updatedQueue = await queue.save();

    return updatedQueue;
  }

  const createMatch = async (queue) => {
    console.log('start create match');
    const MatchObject = Parse.Object.extend("match");
    const newMatch = new MatchObject();
    newMatch.set('status', 'pending');
    newMatch.set('size', queue.get('size'));
    newMatch.set('game', queue.get('game'));
    const savedMatch = await newMatch.save();
    savedMatch.relation('players').add(queue);
    const updatedMatch = await savedMatch.save();
    queue.set('match', updatedMatch);
    queue.set('status', 'found');
    const updatedQueue = await queue.save();
    return updatedQueue;
  }

  return checkQueue();
});