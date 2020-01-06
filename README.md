- React frontend (Create React App)
- Node backend
- Sequelize and sqlite3



To start, navigate to `/client` and `yarn install`, then to `/server` and `yarn install && yarn start`.

App is running at [http://localhost:3001/#/](http://localhost:3001/#/)

The DB syncs with every server up/down, so interactions are recorded for the current session only.

- Hit "start recording"
- Interact with page
- Hit "stop recording"
- Recordings are listed as they are made. Each recording has two options. "Play normal" is normal playback. "Play with buggy behavior" won't change the button color.
- In playback, replay with the button at the bottom of page or by refreshing page.
- Faulty results can also be obtained if clicking button during playback.
- [http://localhost:3001/#/dashboard](http://localhost:3001/#/dashboard) lists test results as they come in.

