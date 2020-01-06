module.exports = (db, type) => {
  const Recording = db.define('recording', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  });

  return Recording;
};