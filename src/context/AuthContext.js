import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import tracker from '../api/tracker';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

/*
Think of the different state properties this thing will manage
and how we might want to change them.
    AUTHENTICATION STATE CHANGES:
        SignupScreen: {email, password}
        SigninScreen: {email, password}
        AccountScreen: {email, password}
We need to implement Action Functions that enable these messages, 
and then update the Auth State
*/

/*
To better understand the reducer, our state here has 2 variables, errorMessage and token, as in
state Object {
    "errorMessage": "",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDgwY2NlMjlkZjNlYjc0MzNlYzY0MTEiLCJpYXQiOjE1Njg3MzA5ODZ9.uL075CqIzdE7bDoCCWbTrM2HQLksuN3hjCm6rIhn318",
}
*/
const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            // reset new state object
            return { errorMessage: '', token: action.payload };

        case 'signout':
            console.log('---- signout state', state);
            // currently out state only contains token and errorMessage,
            // so if we update both, we really don't need to return a
            // new copy of state. If there any +/- for this?
            // Conceptually, it's easiest to understand as
            // `state updated with x`
            return { token: null, errorMessage: '' };

        case 'add_error':
            return { ...state, errorMessage: action.payload };

        case 'clear_error_message':
            return { ...state, errorMessage: '' };

        default:
            return state;
    }
};

// Action Functions to modify the state
/*
Whenever we create an Action Function, it will be a function called with 
dispatch that returns a function. It is the inner function that is actually
called inside of our component. 
The reason for this setup is to enable a Factory-Pattern in createDataContext,
where we need to get access to the dispatch that is only given to us here.
*/
const signup = dispatch => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signup', {
            email,
            password
        });
        console.log('===================', response.data);
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });

        navigate('TrackList'); // or mainFlow
    } catch (err) {
        console.log(err.response.data);
        // call dispatch anytime we want to update our state
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with Sign Up'
        });
    }
    // if we sign up, modify auth state and say we are authenticated
    // if signing up fails, need to show error message
};

const signin = dispatch => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signin', {
            email,
            password
        });
        console.log('===================', response.data);
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('TrackList');
    } catch (err) {
        console.log('--------------- ', err);
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with Sign In'
        });
    }
    // 2. handle success by updating auth state
    // 3. handle failure by showing error message
};

/*
Need an Action Function that will modify state and set the ErrorMessage
back to ''
*/
const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList');
    } else {
        navigate('loginFlow');
    }
};

const signout = dispatch => async () => {
    // somehow signout
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
};

// Export

export const { Provider, Context } = createDataContext(
    authReducer,
    // wire up our Action Functions and make available to all wrapped screens
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);
