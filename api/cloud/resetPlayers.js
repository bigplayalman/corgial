Parse.Cloud.job("reset", async () => {
  const matchQuery = new Parse.Query("match");
  const matches = await matchQuery.find();
  matches.forEach(match => {
    return match.destroy();
  });

  const playerQuery = new Parse.Query("dota");
  const players = await playerQuery.find();

  players.forEach(player => {
    return player.destroy();
  });
});