import React from 'react';
import {
  useStateValue,
  ALL_RECORDINGS,
  TOGGLE_RECORDING,
  LOG_RECORDING,
  CLEAR_EVENTS,
} from '../state';
import {
  getRecordings,
  postEvents,
  postRecording,
} from '../api';

const Recorder = () => {
  const [{ recording, events }, dispatch] = useStateValue();

  const record = async () => {
    if (!recording) {
      await dispatch({
        type: CLEAR_EVENTS,
      });
    } else {
      const recording = await postRecording().then(
        res => res
      );

      dispatch({
        type: LOG_RECORDING,
        payload: recording.id,
      });

      await postEvents(events, recording).then(res => res);

      const allRecordings = await getRecordings().then(
        recordings => recordings
      );
      dispatch({
        type: ALL_RECORDINGS,
        payload: allRecordings,
      });
    }

    dispatch({
      type: TOGGLE_RECORDING,
    });
  };

  return (
    <>
      <button onClick={record}>
        {recording ? 'Stop' : 'Start'} Recording
      </button>
    </>
  );
};

export default Recorder;
