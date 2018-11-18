Parse.Cloud.define("updateMatch", async () => {
  console.log("start update match", queue);

  const matchQuery = new Parse.Query("match");
  matchQuery.equalTo("size", queue.get("size"));
  matchQuery.equalTo("game", queue.get("game"));
  matchQuery.equalTo("status", "pending");
  matchQuery.limit(1);

  const match = await matchQuery.find();
  console.log("match found", match);

  match[0].relation("players").add(queue);

  const savedMatch = await match[0].save();
  console.log("saved match", savedMatch);

  const playerQuery = new Parse.Query("dota");
  playerQuery.equalTo("match", savedMatch);
  const playerCount = await playerQuery.count();
  console.log("player count", playerCount);

  if (playerCount === savedMatch.get("size") - 1) {
    savedMatch.set("status", "found");
  }

  const updatedMatch = await savedMatch.save();
  queue.set("match", updatedMatch);
  queue.set("status", "found");
  const updatedQueue = await queue.save();

  return updatedQueue;
});