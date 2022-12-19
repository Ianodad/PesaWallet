import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useRef, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../config/colors';
import BillingScreen from '../screens/BillsScreen';
import Home from '../screens/HomeScreen';
import HomeScreen from '../screens/HomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import SourceDetailsScreen from '../screens/SourceDetailsScreen';
import ViewNavigator from './ViewNavigator';
import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const TabNavigationData = [
  {
    route: 'HomeBottom',
    label: 'Home',
    name: 'Home',
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: ViewNavigator,
    tabBarVisible: false,
  },
  {
    route: 'Search',
    label: 'Search',
    name: 'Search',
    activeIcon: 'search1',
    inActiveIcon: 'search1',
    component: ViewNavigator,
    tabBarVisible: false,
  },
  {
    route: 'Billing',
    label: 'Billing',
    name: 'Billing',
    activeIcon: 'copy1',
    inActiveIcon: 'copy1-outline',
    component: BillingScreen,
    tabBarVisible: true,
  },
  // {
  //   route: 'Reports',
  //   label: 'Reports',
  //   name: 'Reports',
  //   activeIcon: 'linechart',
  //   inActiveIcon: 'linechart-outline',
  //   component: ReportsScreen,
  //   tabBarVisible: true,
  // },
];
const TabButton = props => {
  const {name, onPress, activeIcon, inActiveIcon, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  // console.log('activeIcon', activeIcon, 'inActiveIcon', inActiveIcon);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 1.1}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 1}});
    }
  }, [focused]);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.tabContainer}>
      <Animatable.View
        ref={viewRef}
        style={[styles.tabContainer, styles[name]]}
        duration={1000}>
        <Icon
          name={activeIcon}
          size={24}
          color={focused ? colors.primary : colors.medium}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};
const AppNavigator = prop => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          // position: 'absolute',
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,

          borderRadius: 16,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
        },
      }}>
      {TabNavigationData.map(
        (
          {
            route,
            name,
            label,
            icon,
            component,
            activeIcon,
            inActiveIcon,
            tabBarVisible,
          },
          index,
        ) => {
          return (
            <Tab.Screen
              key={index}
              name={route}
              component={component}
              options={{
                tabBarLabel: label,
                tabBarColor: '#f8f4f4',
                tabBarVisible: tabBarVisible,
                // tabBarIcon: ({color}) => (
                //   <TabButton name={icon} color={color} />
                // ),
                tabBarButton: props => (
                  <TabButton
                    {...props}
                    name={name}
                    activeIcon={activeIcon}
                    inActiveIcon={inActiveIcon}
                    icon={icon}
                  />
                ),
              }}
            />
          );
        },
      )}
    </Tab.Navigator>
    // <Tab.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarShowLabel: false,
    //     tabBarStyle: {
    //       height: 50,
    //       // position: 'absolute',
    //       marginBottom: 10,
    //       marginLeft: 10,
    //       marginRight: 10,

    //       borderRadius: 16,
    //       backgroundColor: '#fff',
    //     },
    //   }}>
    //   <Tab.Screen
    //     name="HomeBottom"
    //     component={ViewNavigator}
    //     options={{
    //       tabBarLabel: 'Home',
    //       tabBarColor: '#009387',
    //       tabBarVisible: false,
    //       tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
    //       tabBarButton: props => <TabButton {...props} name="home" />,
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Billing"
    //     component={BillingScreen}
    //     options={{
    //       tabBarLabel: 'Billing',
    //       tabBarColor: '#009387',
    //       tabBarIcon: ({color}) => (
    //         <Icon name="copy1" color={color} size={26} />
    //       ),
    //       tabBarButton: props => <TabButton {...props} name="copy1" />,
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Reports"
    //     component={ReportsScreen}
    //     options={{
    //       tabBarLabel: 'Reports',
    //       tabBarColor: '#009387',
    //       tabBarIcon: ({color}) => (
    //         <Icon name="linechart" color={color} size={26} />
    //       ),
    //       tabBarButton: props => <TabButton {...props} name="linechart" />,
    //     }}
    //   />
    // </Tab.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
  },

  Search: {
    backgroundColor: '#f8f4f4',
    width: 50,
    height: 50,
    // borderBottomWidth: 6,
    borderWidth: 3,
    borderColor: '#6e6969',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
