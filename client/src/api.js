import io from 'socket.io-client';
export const socket = io('http://localhost:3001', {
  transports: ['websocket', 'xhr-polling'],
});

export const emitTestResults = results => {
  socket.emit('testComplete', results);
};

export const listenForTestResults = cb => {
  socket.on('testResult', result => cb(result));
};

// socket.on('connect', () => {
//   console.log(socket.connected); // true
// });

export const postRecording = async () => {
  const res = await fetch('/api/recordings', {
    method: 'POST',
  });
  return await res.json();
};

export const getRecordings = async () => {
  const res = await fetch('/api/recordings', {
    method: 'GET',
  });
  return await res.json();
};

export const getPlayback = async id => {
  const res = await fetch(`/api/recordings/${id}`, {
    method: 'GET',
  });

  return await res.json();
};

export const postEvents = async (events, data) => {
  const res = await fetch('/api/events', {
    method: 'POST',
    body: JSON.stringify({
      events,
      recordId: data.id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
};
