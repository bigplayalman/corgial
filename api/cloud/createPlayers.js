Parse.Cloud.job("createPlayers", async () => {
  const playerCount = Math.floor((Math.random() * 100) + 1);
  const config = await Parse.Config.get();
  
  const beginIndex = (length) => {
    return Math.floor(length * Math.random());
  }

  const endIndex = (length, begin) => {
    const index = Math.ceil(length * Math.random() + begin);
    return index;
  }
  const sliceArray = (array) => {

    const begin = beginIndex(array.length);
    const end = endIndex(array.length, begin);
    const newarray = array.slice(begin, end);
    console.log(begin,end, newarray)
    return newarray;
  }
  for (let i = 0; i < playerCount; i++) {
    const skills = config.get("skill");
    const PlayerObject = Parse.Object.extend("dota");
    const newplayer = new PlayerObject();
    const position = sliceArray(config.get("position"));
    const size = sliceArray(config.get("size"));
    const region = sliceArray(config.get("region"));
    const language = sliceArray(config.get("language"));
    const type = sliceArray(config.get("mode"));
    const skill = skills[Math.floor(Math.random() * skills.length)];
    newplayer.set("position", position);
    newplayer.set("size", size);
    newplayer.set("region", region);
    newplayer.set("language", language);
    newplayer.set("type", type);
    newplayer.set("skill", skill);
    newplayer.set("status", "pending");
    await newplayer.save();
  }

  return "player created";
});