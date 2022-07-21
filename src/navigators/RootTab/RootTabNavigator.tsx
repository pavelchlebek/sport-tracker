import 'react-native-gesture-handler';

import React from 'react';

import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { useLocationContext } from '../../store/LocationContext';
import { colorWhite } from '../../themes/theme';
import {
  ActivityStackNavigator,
} from '../ActivityStack/ActivityStackNavigator';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { TrackingScreen } from './screens/TrackingScreen';
import {
  NotificationsTabIcon,
  overviewIconCreator,
  SettingsTabIcon,
  TrackingTabIcon,
} from './TabNavIcons';

type RootTabParamList = {
  Settings: undefined
  Tracking: undefined
  Notifications: undefined
  Overview: undefined
}

export type TTabProps = BottomTabScreenProps<RootTabParamList>

const Tab = createBottomTabNavigator<RootTabParamList>()

const TAB_BAR_HEIGHT = 64

export default function RootTabNavigator() {
  const { itemsInStorage, timeInterval } = useLocationContext()

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: colorWhite,
            height: TAB_BAR_HEIGHT,
          },
        }}
      >
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ tabBarIcon: SettingsTabIcon }}
        />
        <Tab.Screen
          name="Tracking"
          component={TrackingScreen}
          options={{ tabBarIcon: TrackingTabIcon }}
        />
        <Tab.Screen
          name="Overview"
          component={ActivityStackNavigator}
          options={{ tabBarIcon: overviewIconCreator(188) }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ tabBarIcon: NotificationsTabIcon }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
