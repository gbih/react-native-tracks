import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const SigninScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ fontSize: 48 }}>SigninScreen</Text>
            <Text>[StackNavigator]</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

SigninScreen.navigationOptions = () => {};

export default SigninScreen;
