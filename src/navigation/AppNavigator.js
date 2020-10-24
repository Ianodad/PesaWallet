import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import Home from "../screens/HomeScreen";
import BillingScreen from "../screens/BillsScreen"
import ReportsScreen from "../screens/ReportsScreen"
import HomeScreen from '../screens/HomeScreen';
import SourceDetailsScreen from '../screens/SourceDetailsScreen';
import ViewNavigator from "./ViewNavigator"


const Tab = createBottomTabNavigator();


const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={ViewNavigator}
            />
            <Tab.Screen
                name="Billing"
                component={BillingScreen}
            />
            <Tab.Screen
                name="Reports"
                component={ReportsScreen}
            />
        </Tab.Navigator>
    )
}

export default AppNavigator


