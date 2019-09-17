import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TrackCreateScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ fontSize: 48 }}>TrackCreateScreen</Text>
            <Text>[BottomTabNavigator]</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

TrackCreateScreen.navigationOptions = () => {};

export default TrackCreateScreen;
