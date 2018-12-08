exports.run = async () => {
  const query = new Parse.Query("dota");
  query.equalTo("status", "pending");
  query.ascending('createdAt')
  query.limit(1);
  const player = await query.find();
  return player[0];
};