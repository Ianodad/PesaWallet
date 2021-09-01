import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import ViewNavigator from './ViewNavigator';
import Settings from '../components/Settings';
import SettingsScreen from '../screens/SettingScreen';
// import {ReadAllMessages} from '../components/ReadAllMessages'
import ReadMessages from '../components/ReadMessages';

const Drawer = createDrawerNavigator();

const SideMenuNavigation = () => {
  return (
    <>
      {/* <ReadAllMessages/> */}
      <ReadMessages />
      <Drawer.Navigator screenOptions={{headerShown: false}}>
        <Drawer.Screen
          name="HomeMain"
          screenOptions={{headerShown: false}}
          component={AppNavigator}
        />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name=" " component={AuthNavigator} />
        {/* <View>Exit</View> */}
        {/* <Text>Logout</Text> */}
        {/* <Drawer.Screen name="About" component={About} /> */}
        {/* <Drawer.Screen name="About" component={About} /> */}
      </Drawer.Navigator>
    </>
  );
};

export default SideMenuNavigation;
