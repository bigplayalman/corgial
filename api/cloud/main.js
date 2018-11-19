require('./createPlayers');
require('./resetPlayers');
const checkQueue = require('./checkQueue');

Parse.Cloud.job("Matchmaking", () => {
  Parse.Cloud.run("doMatchmaking", 1);
});

Parse.Cloud.define("doMatchmaking", (count) => {
  if(count) {
    checkQueue.run();
  }
});