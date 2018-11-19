const createMatch = require('./createMatch');
const updateMatch = require('./updateMatch');

exports.run = async (player) => {
  console.log("start set match");
  const match = new Parse.Query("match");
  match.containedIn("size", player.get("size"));
  match.containedIn("position", player.get("position"));
  match.containedIn("language", player.get("language"));
  match.containedIn("region", player.get("region"));
  match.containedIn("type", player.get("type"));
  match.equalTo("skill", player.get('skill'));
  match.equalTo("status", "pending");
  const matchCount = await match.count();
  let matchFound = null;
  if (matchCount) {
    matchFound = await updateMatch.run(player);
  } else {
    matchFound = await createMatch.run(player); 
  }
  return matchFound;
};