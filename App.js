/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import { NavigationContainer } from "@react-navigation/native";

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

// import ReadAllMessages from './src/components/ReadAllMessages';
// import Home from './src/screens/HomeScreen'
// import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';


class App extends Component {
  render() {
    return (
      <>
      <NavigationContainer>
        <AppNavigator/>
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
