require('./createPlayers');
require('./resetPlayers');

const checkQueue = require('./matchmaking/checkQueue');
const fetchPlayer = require('./matchmaking/fetchPlayer');
const findParty = require('./matchmaking/findParty');
const createParty = require('./matchmaking/createParty');
const updateParty = require('./matchmaking/updateParty');
const updatePlayer = require('./matchmaking/updatePlayer');

Parse.Cloud.job("Matchmaking", () => {
  Parse.Cloud.run("doMatchmaking");
});

Parse.Cloud.define("doMatchmaking", async () => {
  const count = await checkQueue.run();
  console.log('count', count);
  if (count) {
    let player = await fetchPlayer.run();
    console.log('player found');
    let party = await findParty.run(player);
    if (party) {
      console.log('party found');
      player = await updatePlayer.run(party, player);
      party = await updateParty.run(party, player);
    } else {
      console.log('party not found');
      party = await createParty.run();
      player = await updatePlayer.run(party, player);
      party = await updateParty.run(party, player);
    }

    await Parse.Cloud.run("doMatchmaking");
  }
  return 'matchmaking complete';
});