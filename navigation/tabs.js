import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import { Icon } from "react-native-vector-icons"

import {Home, Category, Maps, Date, DateRecord} from '../screens';
import {COLORS, icons} from '../constants';

import {TabIcon} from '../components';
// import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.black,
          borderTopColor: 'transparent',
          height: 100,
        },
      }}>
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name="Play"
        component={Category}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
          //<Icon name="rocket" size={30} color="#900" />
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Date"
        component={DateRecord}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.calendar} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Map"
        component={Maps}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.location} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
