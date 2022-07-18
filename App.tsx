import 'react-native-gesture-handler';

import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { ActivityStackNavigator } from './src/navigators/ActivityStack';
import { NotificationsScreen } from './src/screens/NotificationsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { TrackingScreen } from './src/screens/TrackingScreen';
import { LocationContextProvider } from './src/store/LocationContext';

type RootTabParamList = {
  Settings: undefined
  Tracking: undefined
  Notifications: undefined
  Overview: undefined
}

export type TTabProps = BottomTabScreenProps<RootTabParamList>

const Tab = createBottomTabNavigator<RootTabParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
      <LocationContextProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Settings" component={SettingsScreen} />
            <Tab.Screen name="Tracking" component={TrackingScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Overview" component={ActivityStackNavigator} />
          </Tab.Navigator>
        </NavigationContainer>
      </LocationContextProvider>
    </SafeAreaProvider>
  )
}
