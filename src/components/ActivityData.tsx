import React from 'react';

import { View } from 'react-native';

type TProps = {
  averageSpeed: number
  distance: number
  time: number
  positions: number
  altitude: number
}

export const ActivityData: React.FC<TProps> = ({
  altitude,
  averageSpeed,
  distance,
  positions,
  time,
}) => {
  return <View style={{ flex: 1, alignItems: "center" }}>Activity Data</View>
}
