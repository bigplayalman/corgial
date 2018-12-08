exports.run = async (player) => {
  const party = new Parse.Query("party");
  const positions = player.get('positions');
  const skill = player.get('skill');
  party.equalTo("status", "pending");
  party.containedIn('need', positions);
  party.equalTo('skill', skill);
  party.descending("size");
  party.limit(1);
  const partyFound = await party.find();
  if (partyFound && partyFound.length) {
    return partyFound[0];
  }
  return undefined;
};