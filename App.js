import * as React from 'react';
import {Text, View, StyleSheet, Alert, TextInput} from 'react-native';
import Constants from 'expo-constants';
import SignUpForm from "./Components/SignUpForm";
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import firebase from "firebase";
import LoginForm from "./Components/LoginForm";
import ProfileInfo from "./Components/ProfileInfo";



export default class App extends React.Component{

  componentWillMount() {
    const  firebaseConfig = {
      apiKey: "AIzaSyAhRw12K9lOP1p72bY_Pqpol5VjohVULAM",
      authDomain: "reactnativedbtrial.firebaseapp.com",
      databaseURL: "https://reactnativedbtrial.firebaseio.com",
      projectId: "reactnativedbtrial",
      storageBucket: "reactnativedbtrial.appspot.com",
      messagingSenderId: "747875825609",
      appId: "1:747875825609:web:6fb0e13809e67b47151a18",
      measurementId: "G-DBNS46ZC4T"
    };
    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    this.authStateChangeUnsubscribe = firebase
        .auth()
        .onAuthStateChanged(user => {
          console.log('onAuthStateChanged', { U: user });
          this.setState({ user });
        });


  }

  componentWillUnmount() {
    this.authStateChangeUnsubscribe && this.authStateChangeUnsubscribe();
  }

  // Unsubscribe funktionen deklareres og er tom til at starte med
  authStateChangeUnsubscribe = null;
  state = {
    user: null,
  };


  render() {
    // Vi læser user ud fra state
    const { user } = this.state;
    if (!user) {// Vi returnerer MainAppContainer hvis der er en user
      return(
          <View>
            <Card>
              <SignUpForm/>;
            </Card>
            <Card>
              <LoginForm/>;
            </Card>
          </View>
      )
    } else {
      // og UnauthenticatedAppContainer hvis der ikke er
      return <ProfileInfo user={user} />;
    }
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
