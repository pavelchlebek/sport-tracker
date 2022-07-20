import 'react-native-gesture-handler';

import React from 'react';

import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import {
  ActivityStackNavigator,
} from '../ActivityStack/ActivityStackNavigator';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { TrackingScreen } from './screens/TrackingScreen';

type RootTabParamList = {
  Settings: undefined
  Tracking: undefined
  Notifications: undefined
  Overview: undefined
}

export type TTabProps = BottomTabScreenProps<RootTabParamList>

const Tab = createBottomTabNavigator<RootTabParamList>()

export default function RootTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Tracking" component={TrackingScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Overview" component={ActivityStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
