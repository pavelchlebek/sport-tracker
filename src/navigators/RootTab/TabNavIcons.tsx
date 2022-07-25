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
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import {
  colorPrimary,
  colorPrimaryGray,
  colorWhite,
  spacingBadge,
  spacingBadgeLarge,
  spacingBadgeOverflow,
  textSmall,
  textXS,
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
  return (
    <TabNavIcon
      active={focused}
      icon={
        <Fontisto name="area-chart" size={24} color={focused ? colorPrimary : colorPrimaryGray} />
      }
      label="Overview"
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

export const RouteTabIcon: TIconRenderer = ({ focused }) => {
  return (
    <TabNavIcon
      active={focused}
      icon={
        <MaterialCommunityIcons
          name="go-kart-track"
          size={24}
          color={focused ? colorPrimary : colorPrimaryGray}
        />
      }
      label="Route"
    />
  )
}

export const overviewIconCreator = (itemsInStorage: number): TIconRenderer => {
  let badgeStyle: ViewStyle = overviewStyles.badge
  if (itemsInStorage > 99) badgeStyle = { ...overviewStyles.badge, ...overviewStyles.badgeLarge }
  return ({ focused }) => {
    return (
      <View style={overviewStyles.container}>
        <TabNavIcon
          active={focused}
          icon={
            <Fontisto
              name="area-chart"
              size={24}
              color={focused ? colorPrimary : colorPrimaryGray}
            />
          }
          label="Overview"
        />
        <View style={badgeStyle}>
          <Text style={overviewStyles.badgeText}>{`${
            itemsInStorage > 99 ? "99+" : itemsInStorage
          }`}</Text>
        </View>
      </View>
    )
  }
}

const overviewStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
  badge: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: -3,
    borderWidth: 1,
    borderColor: colorPrimary,
    borderRadius: 100,
    // aspectRatio: 1,
    width: spacingBadge,
    height: spacingBadge,
    backgroundColor: colorPrimary,
  },
  badgeLarge: {
    width: spacingBadgeLarge,
    height: spacingBadgeLarge,
    right: -7,
  },
  badgeOverflow: {
    width: spacingBadgeOverflow,
    height: spacingBadgeOverflow,
  },
  badgeText: {
    color: colorWhite,
    fontSize: textXS,
    fontWeight: "700",
  },
})
