import React, { useEffect } from 'react';
import { useStateValue, ALL_RECORDINGS } from '../state';
import { getRecordings } from '../api';
import RecordingsList from '../components/RecordingsList';
import ColorButtonWithLogging from '../components/ColorButtonWithLogging';

const Home = () => {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue();

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
    <>
      <RecordingsList />
      <ColorButtonWithLogging />
    </>
  );
};

export default Home;
