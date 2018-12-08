exports.run = () => {
  const query = new Parse.Query("dota");
  query.equalTo("status", "pending");
  return query.count();
};
