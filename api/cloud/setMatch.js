Parse.Cloud.define("setMatch", async () => {
  console.log("start set match");
  const match = new Parse.Query("match");
  match.equalTo("size", queue.get("size"));
  match.equalTo("position", queue.get("game"));
  match.equalTo("status", "pending");
  const matchCount = await match.count();
  let matchFound = null;
  if (matchCount) {
    matchFound = await updateMatch(queue);
  } else {
    matchFound = await createMatch(queue);
  }
  return matchFound;
});