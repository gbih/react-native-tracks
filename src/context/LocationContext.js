//
//
// GB: Todo - write up the different mechanisms with a sort of
// mechanism function signature, as a sort of short-hand for myself
//
//

import createDataContext from './createDataContext';

// state here is:
// currentLocation: Object {},
// locations: Array[],
// recording: false
const locationReducer = (state, action) => {
    //console.log(state.locations.length);
    //console.log(state);

    switch (action.type) {
        case 'add_current_location':
            // return copy of state, with updated currentLocation property
            return { ...state, currentLocation: action.payload };

        case 'start_recording':
            return { ...state, recording: true };

        case 'stop_recording':
            return { ...state, recording: false };

        case 'add_location':
            return {
                ...state,
                locations: [...state.locations, action.payload]
            };

        case 'change_name':
            return { ...state, name: action.payload };

        case 'reset':
            return { ...state, name: '', locations: [] };

        default:
            return state;
    }
};

const changeName = dispatch => name => {
    dispatch({ type: 'change_name', payload: name });
};

const startRecording = dispatch => () => {
    dispatch({ type: 'start_recording' });
};

const stopRecording = dispatch => () => {
    dispatch({ type: 'stop_recording' });
};

// called in TrackCreateScreen as callback
const addLocation = dispatch => (location, recording) => {
    // first action will update our current location
    dispatch({ type: 'add_current_location', payload: location });
    //console.log('*** addLocation: ', recording);
    if (recording) {
        // second action will add current location to locations[] array
        dispatch({ type: 'add_location', payload: location });
    }
};

const reset = dispatch => () => {
    dispatch({ type: 'reset' });
};

export const { Context, Provider } = createDataContext(
    locationReducer,
    { startRecording, stopRecording, addLocation, changeName, reset },
    { name: '', recording: false, locations: [], currentLocation: null }
);
