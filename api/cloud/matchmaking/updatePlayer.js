exports.run = async (party, player) => {
  const roles = player.get('positions');
  const role = party.get('need').filter(position => {
    return roles.filter(pos => pos === position)[0];
  })[0];
  player.set('party', party);
  player.set('role', role)
  player.set('status', 'found');
  const savedplayer = await player.save();
  return savedplayer;
};