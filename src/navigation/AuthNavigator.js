import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import Home from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import CreateAccountScreen from '../screens/Auth/CreateAccountScreen';
import OTPLoginScreen from '../screens/Auth/OTPLoginScreen';

import SideMenuNavigation from '../navigation/SideMenuNavigation';
const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      screenOptions={{headerShown: false}}
      component={WelcomeScreen}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Create" component={CreateAccountScreen} />
    <Stack.Screen name="OTP" component={OTPLoginScreen} />
    {true && (
      <Stack.Screen name="SideNavigation" component={SideMenuNavigation} />
    )}
  </Stack.Navigator>
);

export default AuthNavigator;
