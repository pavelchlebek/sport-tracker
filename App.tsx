import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { ActivityOverviewScreen } from './src/screens/ActivityOverviewScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { TrackingScreen } from './src/screens/TrackingScreen';
import { LocationContextProvider } from './src/store/LocationContext';

type RootTabParamList = {
  Settings: undefined
  Tracking: undefined
  Overview: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
      <LocationContextProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Settings" component={SettingsScreen} />
            <Tab.Screen name="Tracking" component={TrackingScreen} />
            <Tab.Screen name="Overview" component={ActivityOverviewScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </LocationContextProvider>
    </SafeAreaProvider>
  )
}
