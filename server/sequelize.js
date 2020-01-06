const Sequelize = require('sequelize');
const RecordingModel = require('./models/recording');
const EventModel = require('./models/event');
const path = require('path');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, './db.sqlite'),
  logging: false
});

const Recording = RecordingModel(db, Sequelize);
const Event = EventModel(db, Sequelize);


Recording.hasMany(Event, {foreignKey: 'recordingId'});
Event.belongsTo(Recording, {foreignKey: 'recordingId'});

// db
// .authenticate()
// .then(() => {
//   console.log('Connection has been established successfully.');
// })
// .catch(err => {
//   console.error('Unable to connect to the database:', err);
// });

db.sync({force: true});

module.exports = {
  Recording,
  Event
};