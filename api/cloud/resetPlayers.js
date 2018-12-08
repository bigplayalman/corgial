Parse.Cloud.job("reset", async () => {
  const matchQuery = new Parse.Query("party");
  const matches = await matchQuery.find();
  matches.forEach(match => {
    match.destroy();
    return;
  });

  const playerQuery = new Parse.Query("dota");
  const players = await playerQuery.find();

  players.forEach(player => {
    player.destroy();
    return;
  });
});