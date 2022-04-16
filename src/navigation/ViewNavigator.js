import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import FilteredDetailsScreen from '../screens/FilteredDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import SourceDetails from '../screens/SourceDetailsScreen';
import MessageDetailScreen from '../screens/MessageDetailScreen';
// import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

const ViewNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false, presentation: 'card'}}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="SourceDetails" component={SourceDetails} />
    <Stack.Screen
      name="FilteredDetailsScreen"
      component={FilteredDetailsScreen}
    />
    <Stack.Screen name="MessageDetailScreen" component={MessageDetailScreen} />
  </Stack.Navigator>
);

export default ViewNavigator;
