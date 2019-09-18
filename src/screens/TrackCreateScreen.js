import '../_mockLocation';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Map from '../components/Map';
import {
    requestPermissionsAsync,
    watchPositionAsync,
    Accuracy
} from 'expo-location';

import { Context as LocationContext } from '../context/LocationContext';

const TrackCreateScreen = ({ navigation }) => {
    // access the addLocation Action Function
    const { addLocation } = useContext(LocationContext);

    const [err, setErr] = useState(null);

    const startWatching = async () => {
        try {
            await requestPermissionsAsync();
            await watchPositionAsync(
                {
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                },
                location => {
                    addLocation(location);
                }
            );
            console.log('APPROVED TRACKING');
        } catch (e) {
            // there's a bug in IOS where rejecting permissions will not throw an error!
            console.log('REJECTED TRACKING');
            setErr(e);
        }
    };

    useEffect(() => {
        startWatching();
    }, []);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

TrackCreateScreen.navigationOptions = () => {};

export default TrackCreateScreen;
