import React, {
  createContext,
  useContext,
  useReducer,
} from 'react';

export const StateContext = createContext();

export const StateProvider = ({
                                reducer,
                                initialState,
                                children,
                              }) => (
    <StateContext.Provider
        value={useReducer(reducer, initialState)}
    >
      {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const ALL_RECORDINGS = 'ALL_RECORDINGS';
export const TOGGLE_RECORDING = 'TOGGLE_RECORDING';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';
export const LOG_EVENT = 'LOG_EVENT';
export const LOG_RECORDING = 'LOG_RECORDING';
export const SET_BUTTON_COLOR = 'SET_BUTTON_COLOR';

export const initialState = {
  recording: false,
  events: [],
  recordId: null,
  allRecordings: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_RECORDING:
      return {
        ...state,
        recording: !state.recording,
      };

    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
      };

    case LOG_EVENT:
      const {
        pageX: desktopX,
        pageY: desktopY,
        timeStamp,
        type,
        animationName,
        bubbles,
        touches,
      } = action.payload.event;

        // if (touches) {
        //   console.log(touches)
        //   console.log(touches[0])
        // }

      return {
        ...state,
        events: [
          ...state.events,
          {
            clientX: (touches && touches[0]) ? touches[0].pageX : desktopX,
            clientY: (touches && touches[0]) ? touches[0].pageY : desktopY,
            timeStamp,
            type,
            animationName,
            bubbles,
            refId: action.payload.refId,
            buttonColor: action.payload.buttonColor,
          },
        ],
      };

    case LOG_RECORDING:
      return {
        ...state,
        recordId: action.payload,
      };

    case ALL_RECORDINGS:
      return {
        ...state,
        allRecordings: action.payload,
      };

    default:
      return state;
  }
};
