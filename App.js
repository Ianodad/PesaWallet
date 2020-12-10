import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import AppNavigator from './src/navigation/AppNavigator';
import SideMenuNavigation from './src/navigation/SideMenuNavigation';
import AuthNavigator from './src/navigation/AuthNavigator';
import RNBootSplash from 'react-native-bootsplash';
import {Auth, analytics} from './src/firebase/config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {auth: false, initializing: true, user: ''};
  }

  onAuthStateChanged = (user) => {
    this.setState({user});
    if (this.state.initializing) {
      this.setState({initializing: false});
    }
  };

  anonymousSignIn = () => {
    Auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  signOut = () => {
    Auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  subscriberAuth = () => {
    const subscriber = Auth().onAuthStateChanged(this.onAuthStateChanged);
    return subscriber;
  };
  componentDidMount = () => {
    RNBootSplash.hide({duration: 250});
    // const subscriber = Auth().onAuthStateChanged(this.onAuthStateChanged);
    // return subscriber;
    // this.anonymousSignIn();
    this.subscriberAuth();
    // this.signOut();
  };

  onAuthStateChanged = (user) => {
    this.setState({user});
    if (this.state.initializing) {
      this.setState({initializing: false});
    }
  };

  render() {
    return (
      <>
        <NavigationContainer>
          {this.state.user ? <SideMenuNavigation /> : <AuthNavigator />}
        </NavigationContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
