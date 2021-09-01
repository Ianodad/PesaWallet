import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/HomeScreen';
import BillingScreen from '../screens/BillsScreen';
import ReportsScreen from '../screens/ReportsScreen';
import HomeScreen from '../screens/HomeScreen';
import SourceDetailsScreen from '../screens/SourceDetailsScreen';
import ViewNavigator from './ViewNavigator';
import Icon from 'react-native-vector-icons/AntDesign';

// import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeBottom"
        component={ViewNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarVisible: false,
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Billing"
        component={BillingScreen}
        options={{
          tabBarLabel: 'Billing',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="copy1" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          tabBarLabel: 'Reports',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="linechart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
