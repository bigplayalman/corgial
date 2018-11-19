exports.run = async (queue) => {
  console.log("start update match", queue);

  const matchQuery = new Parse.Query("match");
  match.containedIn("size", player.get("size"));
  match.notContainedIn("position", player.get("position"));
  match.containedIn("language", player.get("language"));
  match.containedIn("region", player.get("region"));
  match.containedIn("type", player.get("type"));
  match.equalTo("skill", player.get("skill"));
  matchQuery.equalTo("status", "pending");
  matchQuery.limit(1);

  const match = await matchQuery.find();
  const position = match[0].get('position');
  position.push(player.get("position")[0]);
  match[0].set('position', position);
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
};