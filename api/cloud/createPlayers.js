Parse.Cloud.job("createPlayers", async () => {
  const playerCount = 100;
  const config = await Parse.Config.get();
  const positions = config.get("position");
  const skills = config.get("skill");

  const beginIndex = (length) => {
    return Math.floor(length * Math.random());
  }

  const endIndex = (length, begin) => {
    const index = Math.ceil(length * Math.random() + begin);
    return index;
  }
  const sliceArray = (array, max) => {
    let begin = beginIndex(array.length);
    let end = endIndex(array.length, begin);
    if (begin === 0 && end > max) {
      begin = 1;
      end = max - 1;
    }
    const newarray = array.slice(begin, end);
    return newarray;
  }
  for (let i = 0; i < playerCount; i++) {
    const playerObject = Parse.Object.extend("dota");
    const player = new playerObject();
    const position = sliceArray(positions, 4);
    const skill = skills[Math.floor(Math.random() * skills.length)];
    console.log(skill);
    player.set('positions', position);
    player.set('skill', skill);
    player.set('status', 'pending');
    await player.save();
  }

  return "player created";
});