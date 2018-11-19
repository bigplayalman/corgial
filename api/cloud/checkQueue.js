const startQueue = require('./startQueue');

exports.run = async () => {
  const query = new Parse.Query("dota");
  query.equalTo("status", "pending");
  const count = await query.count();
  console.log("currently in queue", count);
  if (count !== 0) {
    await startQueue.run();
    Parse.Cloud.run("doMatchmaking", count);
  } else {
    console.log("no players");
    return "no players in queue";
  }
};
