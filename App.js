import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
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
import {ReadMessages} from './src/components/ReadMessages'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {auth: false, initializing: true, user: ''};
  }

  onAuthStateChanged = async (user) => {
    this.setState({user});
    // console.log(user);
    this.storeUserData(user);
    if (this.state.initializing) {
      this.setState({initializing: false});
    }
  };

  storeUserData = async (user) => {
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
  
  componentDidMount = async () => {
    
    RNBootSplash.hide({duration: 250});
    
    const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.READ_SMS);
    
    if (granted) {
      console.log( "You can use the ACCESS_FINE_LOCATION" )
    } 
    else {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS)    
      console.log( "ACCESS_FINE_LOCATION permission denied" )
    }
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
  }

  onAuthStateChanged = (user) => {
    this.setState({user});
    if (this.state.initializing) {
      this.setState({initializing: false});
    }
  };

  render() {
    // {console.log(this.state.user)}

    return (
      <>
        {/* <ReadMessages/> */}
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
