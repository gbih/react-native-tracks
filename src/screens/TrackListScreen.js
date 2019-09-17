import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const TrackListScreen = ({ navigation }) => {
    return (
        <>
            <Text style={{ fontSize: 48 }}>TrackListScreen</Text>
            <Text>[BottomTabNavigator]</Text>

            <Button
                title="Go to Track Detail"
                onPress={() => navigation.navigate('TrackDetail')}
            />
        </>
    );
};

const styles = StyleSheet.create({});

TrackListScreen.navigationOptions = () => {};

export default TrackListScreen;
