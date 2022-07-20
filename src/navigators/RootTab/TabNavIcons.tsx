import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { textSmall } from '../../themes/theme';

type TProps = {
  label: string
  icon: React.ReactNode
  active: boolean
}

type TIconRenderer = BottomTabNavigationOptions["tabBarIcon"]

export const TabNavIcon: React.FC<TProps> = ({ active, label, icon }) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: "#ccc",
    fontSize: textSmall,
  },
  active: {
    fontWeight: "bold",
  },
})

export const SettingsTabIcon: TIconRenderer = ({ focused }) => {
  return (
    <TabNavIcon
      active={focused}
      icon={<Ionicons name="settings-outline" size={24} color="black" />}
      label="Settings"
    />
  )
}
