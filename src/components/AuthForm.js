import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from '../components/Spacer';

const AuthForm = ({
    navigation,
    headerText,
    errorMessage,
    onSubmit,
    submitButtonText
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Text h3>{headerText}</Text>
            <Spacer />
            <Input
                value={email}
                onChangeText={newEmail => setEmail(newEmail)}
                autoCapitalize="none"
                autoCorrect={false}
                label="Email"
            />
            <Spacer />
            <Input
                value={password}
                onChangeText={newPassword => setPassword(newPassword)}
                autoCapitalize="none"
                autoCorrect={false}
                label="Password"
                secureTextEntry
            />
            <Spacer />
            {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <Spacer>
                <Button
                    title={submitButtonText}
                    onPress={() => onSubmit({ email, password })}
                />
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        // borderColor: 'red',
        // borderWidth: 10,
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    link: {
        color: 'blue'
    }
});

AuthForm.navigationOptions = () => {};

export default AuthForm;
