require('./createPlayers');
require('./resetPlayers');
require('./checkQueue');
require('./startQueue');
require('./setMatch');
require('./updateMatch');
require('./createMatch');

Parse.Cloud.job("Matchmaking", () => {
  
  await Parse.Cloud.run("checkQueue");
  await Parse.Cloud.run("startQueue");
  await Parse.Cloud.run("setMatch");
  await Parse.Cloud.run("updateMatch");
  await Parse.Cloud.run("createMatch"); 

  return 'matchmaking complete';
});