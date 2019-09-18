import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
//import { FontAwesome } from '@expo/vector-icons';

const TrackCreateScreen = ({ isFocused }) => {
    // calling a Context to get access the addLocation Action Function
    const {
        state: { recording },
        addLocation
    } = useContext(LocationContext);

    const callback = useCallback(
        location => {
            addLocation(location, recording);
        },
        [recording]
    );

    //console.log('OUTSIDE TrackCreateScreen: ', state.recording);

    // receive the error value and call useLocation, passing a callback function
    // to be run anytime we get a new location
    //const [err] = useLocation(location => addLocation(location));
    //

    const [err] = useLocation(isFocused || recording, callback);

    // This is the problematic callback function.
    // We don't want to recreate this from scratch everytime we call TrackCreateScreen.
    // To avoid doing so, we use the useCallback hook
    // addLocation(location, state.recording);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm />
        </SafeAreaView>
    );
};

TrackCreateScreen.navigationOptions = {
    title: 'Add Track'
    //tabBarIcon: <FontAwesome name="plus" size={20} />
};

export default withNavigationFocus(TrackCreateScreen);
