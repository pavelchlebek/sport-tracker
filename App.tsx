import 'react-native-gesture-handler';

import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { ActivityOverviewStack } from './src/navigators/ActivityOverviewStack';
import { ActivityStackNavigator } from './src/navigators/ActivityStack';
import { ActivityOverviewScreen } from './src/screens/ActivityOverviewScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { TrackingScreen } from './src/screens/TrackingScreen';
import { LocationContextProvider } from './src/store/LocationContext';

type RootTabParamList = {
  Settings: undefined
  Tracking: undefined
  Overview: undefined
  Test: undefined
  Test2: undefined
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
            <Tab.Screen name="Test" component={ActivityOverviewStack} />
            <Tab.Screen name="Test2" component={ActivityStackNavigator} />
          </Tab.Navigator>
        </NavigationContainer>
      </LocationContextProvider>
    </SafeAreaProvider>
  )
}
