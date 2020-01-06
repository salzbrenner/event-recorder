import React from 'react';
import {emitTestResults, getPlayback} from '../api';
import ColorButton from '../components/ColorButton';
import {StateContext} from '../state';
import {Link} from 'react-router-dom';

class Playback extends React.Component {
  static contextType = StateContext;

  state = {
    events: null,
    isPlaying: false,
  };

  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    getPlayback(this.props.match.params.id).then(
        async res => {
          if (!res[0]) {
            return;
          }
          const eventsFormat = await res[0].events.map(
              ({event, ...otherData}) => ({
                eventData: JSON.parse(event),
                otherData: otherData,
              }),
          );

          this.setState({
            events: eventsFormat,
            isPlaying: true,
          });

          this.play(eventsFormat);
        },
    );
  }

  play = async rows => {
    const sorted = await rows.sort(
        (a, b) =>
            a.eventData.timeStamp - b.eventData.timeStamp,
    );
    const firstTimeStamp = sorted[0].eventData.timeStamp;
    const recordingId = sorted[0].otherData.recordingId;

    const dispatchedEvents = sorted.map(
        ({eventData, otherData}) => {
          const delay = eventData.timeStamp - firstTimeStamp;

          let newEvent;
          if (eventData.type === 'click') {
          }
          if (eventData.animationName) {
            newEvent = new AnimationEvent(
                eventData.type,
                eventData,
            );
          }
          else if (eventData.type.indexOf('touch') !== -1) {
            const touchObj = new Touch({
              identifier: eventData.timeStamp,
              target: document,
              clientX: eventData.clientX,
              clientY: eventData.clientY,
              radiusX: 2.5,
              radiusY: 2.5,
              // rotationAngle: 10,
              // force: 0.5,
            });

            const config = {
              ...eventData,
              touches: [touchObj],
              changedTouches: [touchObj],
              targetTouches: [touchObj],
            };
            if (eventData.type === 'touchend') {
              config.changedTouches = [];
              config.targetTouches = [];
            }

            newEvent = new TouchEvent(eventData.type, {
              ...config,
            });

          }
          else {
            newEvent = new MouseEvent(
                eventData.type,
                eventData,
            );
          }

          return new Promise((resolve, reject) =>
              setTimeout(() => {
                resolve(
                    this.dispatchDomEvent(
                        newEvent,
                        eventData.refId,
                        otherData,
                    ),
                );
              }, delay),
          );
        },
    );

    Promise.all(dispatchedEvents)
        .then(res => res.filter(message => message))
        .then(errors => {
          if (errors.length > 0) {
            emitTestResults({
              recordingId: recordingId,
              results: errors,
            });
          }
          else {
            emitTestResults({
              recordingId: recordingId,
              results: ['Test passed'],
            });
          }

          this.setState({
            isPlaying: false,
          });

        });
  };

  dispatchDomEvent = (ogEvent, refId, storedData) => {
    let scope = window;
    let error = null;

    if (refId) {
      scope = this.buttonRef.current;
      const actualColor = scope.style.background;

      if (storedData.buttonColor !== actualColor) {
        error = `Test failed ${
            ogEvent.type
            } event with id ${storedData.id} created at: ${
            storedData.createdAt
            }\n Stored button color was ${
            storedData.buttonColor
            }, but replay got ${actualColor}`;
      }
    }
    const clonedEvent = new ogEvent.constructor(
        ogEvent.type,
        ogEvent,
    );

    scope.dispatchEvent(clonedEvent);

    return error;
  };

  replay = () => {
    const current = this.props.location.pathname;
    this.props.history.replace(`/reload`);
    setTimeout(() => {
      this.props.history.replace(current);
    });
  };

  render() {
    return <>
      <div style={{position: 'absolute', bottom: 0, right: 0}}>
        <button disabled={this.state.isPlaying}
                onClick={() => this.replay()}>Replay
        </button>
        <div>
          <Link to={'/'}>Back to home</Link>
        </div>
      </div>

      <ColorButton bugs={!!this.props.withErrors} ref={this.buttonRef}/>
    </>;
  }
}

export default Playback;
