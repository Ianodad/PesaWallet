// import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {View, Text} from 'react-native';
import ReadMessages from '../components/ReadMessages';
import Settings from '../components/Settings';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingScreen';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import ViewNavigator from './ViewNavigator';
// import {ReadAllMessages} from '../components/ReadAllMessages'

const Stack = createStackNavigator();

const SideMenuNavigation = () => {
  return (
    <>
      {/* <ReadAllMessages/> */}
      <ReadMessages />
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="HomeMain">
        <Stack.Screen
          name="HomeMain"
          screenOptions={{headerShown: false}}
          component={AppNavigator}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        {/* <View>Exit</View> */}
        {/* <Text>Logout</Text> */}
        {/* <Drawer.Screen name="About" component={About} /> */}
        {/* <Drawer.Screen name="About" component={About} /> */}
      </Stack.Navigator>
    </>
  );
};

export default SideMenuNavigation;
