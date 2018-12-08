Parse.Cloud.job("createPlayers", async () => {
  const playerCount = Math.floor((Math.random() * 100) + 100);
  const config = await Parse.Config.get();
  const positions = config.get("position");

  
  const beginIndex = (length) => {
    return Math.floor(length * Math.random());
  }

  const endIndex = (length, begin) => {
    const index = Math.ceil(length * Math.random() + begin);
    return index;
  }
  const sliceArray = (array) => {

    let begin = beginIndex(array.length);
    let end = endIndex(array.length, begin);
    if (begin === 0 && end > 4) {
      begin = 1;
      end = 3;
    }
    const newarray = array.slice(begin, end);
    return newarray;
  }

  for (let i = 0; i < playerCount; i++) {
    const playerObject = Parse.Object.extend("dota");
    const player = new playerObject();
    const position = sliceArray(positions);
    player.set('positions', position);
    player.set('status', 'pending');
    await player.save();
  }

  return "player created";
});