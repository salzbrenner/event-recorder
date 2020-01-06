import React, { Component } from 'react';
import { StateContext, LOG_EVENT } from './state';

export default (
  ChildComponent,
  shouldListenOn = [],
  refId = null
) => {
  class EventLogging extends Component {
    static contextType = StateContext;

    constructor(props) {
      super(props);
      this.logEvent = this.logEvent.bind(this);
      this.logRef = React.createRef();
    }

    componentDidMount() {
      const scope = refId ? this.logRef.current : window;
      shouldListenOn.forEach(event =>
        scope.addEventListener(event, this.logEvent)
      );
    }

    componentWillUnmount() {
      const scope = refId ? this.logRef.current : window;
      shouldListenOn.forEach(event =>
        scope.removeEventListener(event, this.logEvent)
      );
    }

    logEvent(e) {
      const [{ recording }, dispatch] = this.context;

      if (recording) {
        dispatch({
          type: LOG_EVENT,
          payload: {
            event: e,
            refId,
            buttonColor: refId
              ? this.logRef.current.style.background
              : null,
          },
        });
      }
    }

    render() {
      if (refId) {
        return (
          <ChildComponent
            {...this.props}
            ref={this.logRef}
          />
        );
      }
      return <ChildComponent {...this.props} />;
    }
  }

  return EventLogging;
};
