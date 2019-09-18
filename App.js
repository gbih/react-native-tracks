import React from 'react';
import {
    createAppContainer,
    createBottomNavigator,
    createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { FontAwesome } from '@expo/vector-icons';

const trackListFlow = createStackNavigator({
    TrackList: TrackListScreen,
    TrackDetail: TrackDetailScreen
});

trackListFlow.navigationOptions = {
    title: 'Tracks',
    tabBarIcon: <FontAwesome name="gear" size={20} />
};

const switchNavigator = createSwitchNavigator({
    // add ResolveAuth to top to make sure we show it
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
        Signup: SignupScreen,
        Signin: SigninScreen
    }),
    mainFlow: createBottomTabNavigator({
        trackListFlow: trackListFlow,
        TrackCreate: TrackCreateScreen,
        Account: AccountScreen
    })
});

// navigation defined here
const App = createAppContainer(switchNavigator);

// The <AuthProvider /> makes the Context State available to any nested components
// that have been wrapped here
export default () => {
    return (
        <TrackProvider>
            <LocationProvider>
                <AuthProvider>
                    {/* navigation instantiated here */}
                    {/* ref is a function that gets called with the navigator object, enabling us to navigate around, like a hook into our component */}
                    <App
                        ref={navigator => {
                            setNavigator(navigator);
                        }}
                    />
                </AuthProvider>
            </LocationProvider>
        </TrackProvider>
    );
};
