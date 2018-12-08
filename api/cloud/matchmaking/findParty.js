exports.run = async (player) => {
  const party = new Parse.Query("party");
  const positions = player.get('positions');
  party.equalTo("status", "pending");
  party.containedIn('need', positions);
  party.descending("createdAt");
  party.limit(1);
  const partyFound = await party.find();
  if (partyFound && partyFound.length) {
    return partyFound[0];
  }
  return undefined;
};