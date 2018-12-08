exports.run = async () => {
  const config = await Parse.Config.get();
  const partyObject = Parse.Object.extend("party");
  const party = new partyObject();
  const positions = config.get("position");
  party.set("status", "pending");
  party.set("need", positions);
  party.set("set", []);
  party.set('size', 0);
  
  const savedParty = await party.save();

  return savedParty;
};