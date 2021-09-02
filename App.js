/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import {PermissionsAndroid, StyleSheet, Text} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Auth} from './src/firebase/config';
import AuthNavigator from './src/navigation/AuthNavigator';

// import AppNavigator from './src/navigation/AppNavigator';
import SideMenuNavigation from './src/navigation/SideMenuNavigation';

// actions for redux implementation
import {authActions} from './src/_actions/authActions';
const {setInitialState} = authActions;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {auth: false, initializing: true, user: ''};
  }

  setInitialState = async () => {
    try {
      const data = await AsyncStorage.getItem('localUserDetails');
      if (data !== null) {
        console.log(JSON.parse(data));
        await this.props.setInitialState(JSON.parse(data));
        this.setState({initializing: false});
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };
  onAuthStateChanged = async user => {
    this.setState({user});
    // console.log(user);
    this.storeUserData(user);
    if (this.state.initializing) {
      this.setState({initializing: false});
    }
  };

  storeUserData = async user => {
    try {
      // console.log(user);
      await AsyncStorage.setItem('USER', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  anonymousSignIn = () => {
    Auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
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

  componentDidMount = async () => {
    RNBootSplash.hide({duration: 250});

    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    );

    if (granted) {
      console.log('You can use the ACCESS_FINE_LOCATION');
    } else {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS);
      console.log('ACCESS_FINE_LOCATION permission denied');
    }
    this.setInitialState();
    // const unsubscribe = NetInfo.addEventListener((netInfo) => {
    // console.log(netInfo);

    // this.anonymousSignIn();
    this.subscriberAuth();
    // this.signOut();
  };

  // componentWillUnmount = async () => {
  //   await this.storeUserData();

  //   // this.signOut();
  //   // unsubscribe()
  // };

  componentDidUpdate = async () => {
    this.storeUserData(this.state.user);
  };

  onAuthStateChanged = user => {
    this.setState({user});
    if (this.state.initializing) {
      this.setState({initializing: false});
    }
  };

  render() {
    // {console.log(this.state.user)}
    if (this.state.initializing) {
      return <Text>Checking state...</Text>;
    }

    return (
      <>
        {/* <ReadMessages/> */}
        <NavigationContainer>
          {this.state.initializing ? (
            <Text>Checking state...</Text>
          ) : this.props.auth ? (
            <SideMenuNavigation />
          ) : (
            <AuthNavigator />
          )}
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
// export default App;
const mapStateToProps = state => {
  console.log(state.authState.userVerified);

  return {
    auth: state.authState.userVerified,
  };
};

export default connect(mapStateToProps, {
  setInitialState,
})(App);
