import React, { useEffect } from 'react';
import { useStateValue } from '../state';
import { getRecordings } from '../api';
import { ALL_RECORDINGS } from '../state';
import { Link } from 'react-router-dom';
import Recorder from './Recorder';

const styles = {
  position: 'fixed',
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'scroll',
  background: 'lightgray',
  width: '200px',
};

const RecordingsList = () => {
  const [
    { allRecordings, recording },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    getRecordings().then(recordings => {
      dispatch({
        type: ALL_RECORDINGS,
        payload: recordings,
      });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ ...styles }}>
      <Link to={'/dashboard'}>VISIT DASHBOARD</Link>
      <h5>recordings</h5>
      <Recorder />

      <ul
        style={{
          fontSize: '12px',
          pointerEvents: recording ? 'none' : '',
        }}
      >
        {allRecordings.map(({ id, createdAt }) => {
          return (
            <li style={{ marginBottom: '5px' }} key={id}>
              <p>
                Recording {id} - created: {createdAt}
              </p>
              <ul>
                <li>
                  <Link to={`/playback/${id}`}>
                    Play Normal
                  </Link>
                </li>
                <li>
                  <Link to={`/playback-with-errors/${id}`}>
                    Play with buggy behavior
                  </Link>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecordingsList;
