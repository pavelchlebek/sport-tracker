import 'react-native-gesture-handler';

import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootTabNavigator from './src/navigators/RootTab/RootTabNavigator';
import { LocationContextProvider } from './src/store/LocationContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <LocationContextProvider>
        <RootTabNavigator />
      </LocationContextProvider>
    </SafeAreaProvider>
  )
}
