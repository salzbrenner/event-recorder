module.exports = (db, type) => {
  const Event = db.define('event', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    buttonColor: {
      type: type.TEXT,
    },
    event: {
      type: type.STRING,
    },
  }, {});

  return Event;
};