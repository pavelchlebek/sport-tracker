import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Feather,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import {
  colorBlack,
  spacingXS,
  textMedium,
} from '../themes/theme';

type TProps = {
  name: string
  renderIcon: (size: number, color: string) => React.ReactNode
}

const PARAMETER_LABEL_ICON_SIZE = 18

export const ActivityParameterLabel: React.FC<TProps> = ({ renderIcon, name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{renderIcon(PARAMETER_LABEL_ICON_SIZE, colorBlack)}</View>
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: textMedium,
    fontWeight: "600",
  },
  icon: {
    marginRight: spacingXS,
  },
})

export const DistanceLabel = (
  <ActivityParameterLabel
    renderIcon={(size, color) => (
      <MaterialCommunityIcons name="highway" size={size} color={color} />
    )}
    name="Distance"
  />
)

export const TimeLabel = (
  <ActivityParameterLabel
    renderIcon={(size, color) => <MaterialIcons name="av-timer" size={size} color={color} />}
    name="Time"
  />
)

export const SpeedLabel = (
  <ActivityParameterLabel
    renderIcon={(size, color) => <Ionicons name="speedometer-outline" size={size} color={color} />}
    name="Average Speed"
  />
)

export const AscentLabel = (
  <ActivityParameterLabel
    renderIcon={(size, color) => <Feather name="arrow-up-right" size={size} color={color} />}
    name="Ascent"
  />
)

export const DescentLabel = (
  <ActivityParameterLabel
    renderIcon={(size, color) => <Feather name="arrow-down-right" size={size} color={color} />}
    name="Descent"
  />
)

export const PositionsCountLabel = (
  <ActivityParameterLabel
    renderIcon={(size, color) => (
      <MaterialCommunityIcons name="dots-horizontal" size={size} color={color} />
    )}
    name="Positions Count"
  />
)

export const AltitudeLabel = (
  <ActivityParameterLabel
    renderIcon={(size, color) => <Foundation name="mountains" size={size} color={color} />}
    name="Altitude"
  />
)
