import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SourceDetails from '../screens/SourceDetailsScreen';
import FilteredDetailsScreen from '../screens/FilteredDetailsScreen';

const Stack = createStackNavigator();

const ViewNavigator = () => (
  <Stack.Navigator mode="card" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="SourceDetails" component={SourceDetails} />
    <Stack.Screen
      name="FilteredDetailsScreen"
      component={FilteredDetailsScreen}
    />
  </Stack.Navigator>
);

export default ViewNavigator;
