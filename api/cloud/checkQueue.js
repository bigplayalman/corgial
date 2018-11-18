Parse.Cloud.define("checkQueue", async () => {
  const query = new Parse.Query("dota");
  query.equalTo("status", "pending");
  const count = await query.count();
  console.log("currently in queue", count);

  if (count) {
    await startQueue();
    await checkQueue();
  } else {
    console.log("no players");
    return "no players in queue";
  }
});