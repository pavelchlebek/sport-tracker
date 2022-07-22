import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  AltitudeLabel,
  AscentLabel,
  DescentLabel,
  DistanceLabel,
  PositionsCountLabel,
  SpeedLabel,
  TimeLabel,
} from './ActivityParameterLabel';
import { DisplayDataRow } from './DisplayDataRow';

type TProps = {
  averageSpeed: number
  distance: number
  time: number
  positions: number
  ascent?: number
  descent?: number
  altitude?: number | null
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

  let timeString = ""
  if (hours > 0) {
    timeString = `${hours} h ${minutes} m ${seconds} s`
  } else if (minutes > 0) {
    timeString = `${minutes} m ${seconds} s`
  } else {
    timeString = `${seconds} s`
  }
  return timeString
}

export const ActivityData: React.FC<TProps> = ({
  altitude,
  averageSpeed,
  distance,
  positions,
  time,
  ascent,
  descent,
}) => {
  return (
    <View style={styles.container}>
      <DisplayDataRow label={DistanceLabel} value={distance.toFixed(2)} unit="meters" />
      <DisplayDataRow label={TimeLabel} value={displayTime(time)} />
      <DisplayDataRow label={SpeedLabel} value={averageSpeed.toFixed(2)} unit="km/h" />
      {ascent && <DisplayDataRow label={AscentLabel} value={ascent.toFixed(2)} unit="meters" />}
      {descent && <DisplayDataRow label={DescentLabel} value={descent.toFixed(2)} unit="meters" />}
      {altitude && (
        <DisplayDataRow
          label={AltitudeLabel}
          value={altitude ? altitude.toFixed(2) : null}
          unit="MAMSL"
        />
      )}
      <DisplayDataRow label={PositionsCountLabel} value={positions} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    // borderWidth: 1,
  },
})
