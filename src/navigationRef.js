import { NavigationActions } from 'react-navigation';

let navigator; // reassign this in the future, as a storage mechanism

// nav comes from React Navigation
export const setNavigator = nav => {
    navigator = nav;
};

// * Clever function to get access to navigator, even among non-React components (files without JSX)
/*
The navigator provided to us by React Navigation has an internal API or functions
similar to how Context works as well, eg dispatch, actions.
So by dispatching an action, we are telling RN we want to change its state, 
and show a different screen to our user.
So, anytime we call navigate, we pass in the route name we want to show, 
and optionally some params as well.
This will under-the-hood trigger some change in state in RN, and show some
different content to the user.
So, whenever we want to trigger navigation, in a non-React component without JSX,
such as an Action Function, we just have to import this navigate function
and call it with the route we want to navigate to.
*/
export const navigate = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName: routeName,
            params: params
        })
    );
};

// * navigate function for everyone else to use
