import React from 'react'
import { View, Text, } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AppNavigator from './AppNavigator';
import ViewNavigator from "./ViewNavigator";
import Settings from "../components/Settings";
import SettingsScreen from "../screens/SettingScreen"
const Drawer = createDrawerNavigator();


const SideMenuNavigation = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={AppNavigator} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        {/* <Drawer.Screen name="About" component={About} /> */}
      </Drawer.Navigator>
    )
}

export default SideMenuNavigation;
