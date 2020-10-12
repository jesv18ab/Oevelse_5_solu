import * as React from 'react';
import firebase from "firebase";
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
});

export default class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };

    //Nedenstående kode  kan anvendes til en realtime database konfigutrationen i Firebase.
    //Koden er dog ikke relevant for denne øvelse, men dog anvedelig, hvis der skal bruges adgang til realtime database
    /*insertUser = async (user) => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            // Here the data is passed to the service and we wait for the result
            await firebase.database().ref('users/002').set({
                email:email ,
                password: password
            });
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            this.setError(error.essage);
            this.endLoading();
        }

    };*/

    startLoading = () => this.setState({ isLoading: true });
    endLoading = () => this.setState({ isLoading: false });
    setError = errorMessage => this.setState({ errorMessage });
    clearError = () => this.setState({ errorMessage: null });
    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = password => this.setState({ password });

    loginUser = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            // Here the data is passed to the service and we wait for the result
            const output =  await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(output);
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            this.setError(error.essage);
            this.endLoading();
        }
    };


    render = () => {
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            return <Text>You are now logged in. Good job</Text>;
        }
        return (
            <View>
                <Text>
                    To login, please fill in the inputfields
                </Text>
                <TextInput
                    placeholder="email"
                    value={email}
                    onChangeText={this.handleChangeEmail}
                    style={styles.inputField}
                />
                <TextInput
                    placeholder="password"
                    value={password}
                    onChangeText={this.handleChangePassword}
                    secureTextEntry
                    style={styles.inputField}
                />
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage}</Text>
                )}
                {this.renderButton()}
            </View>
        );
    };

    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.loginUser} title="Press to login" />;
    };
}
