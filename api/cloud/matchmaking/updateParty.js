exports.run = async (party, player) => {

  const role = player.get('role');
  let need = party.get('need');
  let set = party.get('set');
  need = need.filter(pos => pos != role);
  set.push(role);
  set = set.sort();
  party.set('set', set);
  party.set('need', need);
  party.relation("players").add(player);
  
  if(party.get('need').length === 0) {
    party.set('status', 'ready')
  }
  const updatedParty = await party.save();
  return updatedParty;
};