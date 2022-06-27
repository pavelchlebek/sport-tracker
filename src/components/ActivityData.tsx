import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import { DisplayDataRow } from './DisplayDataRow';

type TProps = {
  averageSpeed: number
  distance: number
  time: number
  positions: number
  altitude: number
}

export const MILLISECONDS_IN_SECOND = 1000
export const SECONDS_IN_MINUTE = 60
export const MINUTES_IN_HOUR = 60

export const displayTime = (timeInMilliseconds: number): string => {
  let seconds = Math.floor(timeInMilliseconds / MILLISECONDS_IN_SECOND)
  let minutes = Math.floor(seconds / SECONDS_IN_MINUTE)
  const hours = Math.floor(minutes / MINUTES_IN_HOUR)
  minutes = minutes - hours * MINUTES_IN_HOUR
  seconds = seconds - hours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE - minutes * SECONDS_IN_MINUTE

  return `${hours} h ${minutes} m ${seconds} s`
}

export const ActivityData: React.FC<TProps> = ({
  altitude,
  averageSpeed,
  distance,
  positions,
  time,
}) => {
  return (
    <View style={styles.container}>
      <DisplayDataRow label="Distance" value={distance.toFixed(2)} unit="meters" />
      <DisplayDataRow label="Time" value={displayTime(time)} />
      <DisplayDataRow label="Average Speed" value={averageSpeed} unit="km/h" />

      <DisplayDataRow label="Altitude" value={altitude} unit="MAMSL" />
      <DisplayDataRow label="Positions Count" value={positions} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "75%",
    // borderWidth: 1,
  },
})
