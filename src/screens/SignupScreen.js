import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

// get access to Action Function and Context Object
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
    // destructure the AuthContext properties
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    // useEffect(() => {
    //     tryLocalSignin();
    // }, []);

    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillFocus={() => {}}
                onDidFocus={() => {}}
                onWillBlur={() => {
                    clearErrorMessage();
                }} // navigate away
                onDidBlur={() => {}}
            />
            <AuthForm
                headerText="Sign up for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign Up"
                onSubmit={({ email, password }) => signup({ email, password })}
            />
            <NavLink
                routeName="Signin"
                text="Alread have an account? Sign in instead"
            />
        </View>
    );
};

const styles = StyleSheet.create({});

SignupScreen.navigationOptions = () => {
    return {
        header: null
    };
};

export default SignupScreen;
