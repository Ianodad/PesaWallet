import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SourceDetails from "../screens/SourceDetailsScreen";

const Stack = createStackNavigator();

const ViewNavigator = () => (
        <Stack.Navigator mode='card' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home"  component={HomeScreen}/>
            <Stack.Screen name="SourceDetails" component={SourceDetails}/>
        </Stack.Navigator>
);

export default ViewNavigator;