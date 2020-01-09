- React frontend (Create React App)
- Node backend
- Sequelize and sqlite3

The application records user events to an sqlite database, then allows the user to play them back. During playback, events are compared to those in database, and playback passes if no aberrations exist. The user can choose to playback the events with purposeful bugs, to produce a failed playback test.


To start, navigate to `/server` and `yarn install && yarn start`. 
Then to `/client` and `yarn install && yarn start`.

App is running at [http://localhost:3000/#/](http://localhost:3000/#/)

The DB syncs with every server up/down, so interactions are recorded for the current session only.

- Hit "start recording"
- Interact with page
- Hit "stop recording"
- Recordings are listed as they are made. Each recording has two options. "Play normal" is normal playback. "Play with buggy behavior" won't change the button color.
- In playback, replay with the button at the bottom of page or by refreshing page.
- Faulty results can also be obtained if clicking button during playback.
- [http://localhost:3000/#/dashboard](http://localhost:3000/#/dashboard) lists test results as they come in.

