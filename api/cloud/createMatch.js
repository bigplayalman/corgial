Parse.Cloud.define("createMatch", async () => {
  console.log("start create match");
  const MatchObject = Parse.Object.extend("match");
  const newMatch = new MatchObject();
  newMatch.set("status", "pending");
  newMatch.set("size", queue.get("size"));
  newMatch.set("game", queue.get("game"));
  const savedMatch = await newMatch.save();
  savedMatch.relation("players").add(queue);
  const updatedMatch = await savedMatch.save();
  queue.set("match", updatedMatch);
  queue.set("status", "found");
  const updatedQueue = await queue.save();
  return updatedQueue;
});