import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { SettingsScreen } from './src/screens/SettingsScreen';
import { TrackingScreen } from './src/screens/TrackingScreen';

type RootTabParamList = {
  Settings: undefined
  Tracking: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Tracking" component={TrackingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
