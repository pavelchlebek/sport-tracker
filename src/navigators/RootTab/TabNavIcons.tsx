import React from 'react';

import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {
  AntDesign,
  Fontisto,
  Ionicons,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import {
  colorPrimary,
  colorPrimaryGray,
  colorWhite,
  textSmall,
} from '../../themes/theme';

type TProps = {
  label: string
  icon: React.ReactNode
  active: boolean
}

type TIconRenderer = BottomTabNavigationOptions["tabBarIcon"]

export const TabNavIcon: React.FC<TProps> = ({ active, label, icon }) => {
  let tabStyle: ViewStyle = styles.tab
  if (active) tabStyle = { ...styles.tab, ...styles.tabActive }
  let labelStyle: TextStyle = styles.label
  if (active) labelStyle = { ...styles.label, ...styles.labelActive }
  return (
    <View style={tabStyle}>
      {icon}
      <Text style={labelStyle}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    backgroundColor: colorWhite,
  },
  label: {
    color: colorPrimaryGray,
    fontSize: textSmall,
  },
  labelActive: {
    color: colorPrimary,
  },
})

export const SettingsTabIcon: TIconRenderer = ({ focused }) => {
  return (
    <TabNavIcon
      active={focused}
      icon={
        <Ionicons
          name="settings-outline"
          size={24}
          color={focused ? colorPrimary : colorPrimaryGray}
        />
      }
      label="Settings"
    />
  )
}

export const TrackingTabIcon: TIconRenderer = ({ focused }) => {
  return (
    <TabNavIcon
      active={focused}
      icon={<AntDesign name="find" size={24} color={focused ? colorPrimary : colorPrimaryGray} />}
      label="Tracking"
    />
  )
}

export const OverviewTabIcon: TIconRenderer = ({ focused }) => {
  const [itemsInStorage, setItemsInStorage] = React.useState(0)

  React.useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      setItemsInStorage(keys.length)
    })
  })

  return (
    <TabNavIcon
      active={focused}
      icon={
        <Fontisto name="area-chart" size={24} color={focused ? colorPrimary : colorPrimaryGray} />
      }
      label={itemsInStorage.toString()}
    />
  )
}

export const NotificationsTabIcon: TIconRenderer = ({ focused }) => {
  return (
    <TabNavIcon
      active={focused}
      icon={
        <Ionicons
          name="md-notifications"
          size={24}
          color={focused ? colorPrimary : colorPrimaryGray}
        />
      }
      label="Notifications"
    />
  )
}

export const overviewIconCreator = (label: string): TIconRenderer => {
  return ({ focused }) => {
    return (
      <TabNavIcon
        active={focused}
        icon={
          <Fontisto name="area-chart" size={24} color={focused ? colorPrimary : colorPrimaryGray} />
        }
        label={label}
      />
    )
  }
}
