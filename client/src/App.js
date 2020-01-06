import React from 'react';
import { StateProvider } from './state';
import { HashRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Playback from './pages/Playback';
import { RippleWithLogging } from './components/RippleWithLogging';

import { reducer, initialState } from './state';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <StateProvider
      initialState={initialState}
      reducer={reducer}
    >
      <HashRouter>
        <div
          style={{
            paddingLeft: '20px',
            paddingTop: '100px',
          }}
        >
          <RippleWithLogging />
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/dashboard"
            component={Dashboard}
          />
          <Route
            path="/playback/:id"
            render={props => <Playback {...props} />}
          />
          <Route
            path="/playback-with-errors/:id"
            render={props => (
              <Playback {...props} withErrors={true} />
            )}
          />
        </div>
      </HashRouter>
    </StateProvider>
  );
};

export default App;
