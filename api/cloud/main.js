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
  if (count) {
    let player = await fetchPlayer.run();
    let party = await findParty.run(player);
    if (party) {
      player = await updatePlayer.run(party, player);
      party = await updateParty.run(party, player);
    } else {
      const skill = player.get('skill');
      party = await createParty.run(skill);
      player = await updatePlayer.run(party, player);
      party = await updateParty.run(party, player);
    }

    await Parse.Cloud.run("doMatchmaking");
  }
  return 'matchmaking complete';
});