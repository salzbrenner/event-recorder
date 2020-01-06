const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './../client/build')));
//build mode
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + './../client/build/index.html'));
})


const http = require('http').Server(app);
const io = require('socket.io')(http, {transports: ['websocket', 'xhr-polling']});
const { Recording, Event } = require('./sequelize');

app.post('/api/recordings', (req, res) => {
  Recording.create(req.body).then(rec => res.json(rec));
});

app.post('/api/events', (req, res) => {
  // get events as array
  const {events, recordId} = req.body;
  events.forEach(event => {
    const { buttonColor, ...eventData} = event;
    Event.create({
      event: JSON.stringify(eventData),
      buttonColor: buttonColor,
      recordingId: recordId,
    });
  });

  return res.json("Events logged")
});

app.get('/api/recordings', async (req, res) => {
  const r = await Recording.findAll();
  return res.json(r);
});

app.get('/api/recordings/:id', async (req, res) => {
  const e = await Recording.findAll({
    limit: 1,
    where: {id: req.params.id},
    include: [Event],
  });

  return res.json(e);
});

io.on('connection', (socket) =>{
  console.log('Server connected');

  socket.on('testComplete', (results) => {
    io.emit('testResult', results)
  })
});



http.listen(port, () => console.log(`Listening on port ${port}!`));


