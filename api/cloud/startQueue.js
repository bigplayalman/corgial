const setMatch = require('./setMatch');

exports.run = async () => {
  console.log("start queue");
  const query = new Parse.Query("dota");
  query.equalTo("status", "pending");
  query.limit(1);
  const player = await query.find();
  const match = await setMatch.run(player[0]);
  return match;
};