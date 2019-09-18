import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'add_current_location':
            // return copy of state, with updated currentLocation property
            return { ...state, currentLocation: action.payload };
        default:
            return state;
    }
};

const startRecording = dispatch => () => {};

const stopRecording = dispatch => () => {};

// called in TrackCreateScreen as callback
const addLocation = dispatch => location => {
    dispatch({ type: 'add_current_location', payload: location });
};

export const { Context, Provider } = createDataContext(
    locationReducer, // Reducer
    { startRecording, stopRecording, addLocation }, // Action Functions within an object
    { recording: false, locations: [], currentLocation: null } // initial state object
);
