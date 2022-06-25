import React from 'react';

import { LocationAccuracy } from 'expo-location';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Slider } from '@rneui/base';

import { AppCheckbox } from '../components/AppCheckbox';
import { useLocationContext } from '../store/LocationContext';
import {
  colorPrimary,
  colorPrimaryGray,
  marginLarge,
  marginMedium,
  marginSmall,
  sliderTrackHeight,
  textLarge,
  textMedium,
} from '../themes/theme';
import { showWarning } from '../utils/helpers';

type TProps = {
  children?: never
}

const MINIMUM_TIME_INTERVAL = 2
const MAXIMUM_TIME_INTERVAL = 60
const TIME_INTERVAL_STEP = 1

export const SettingsScreen: React.FC<TProps> = () => {
  // ----------- LocationContext stuff -------------------------------------

  const { accuracy, setAccuracy, setTimeInterval, timeInterval, tracking } = useLocationContext()

  // -----------------------------------------------------------------------

  const handleAccuracy = (accuracy: LocationAccuracy) => {
    if (tracking) {
      showWarning("Warning", "You cannot change settings while location service is running")
      return
    }
    setAccuracy(accuracy)
  }

  const handleTimeInterval = (timeInterval: number) => {
    if (tracking) {
      showWarning("Warning", "You cannot change settings while location service is running")
      return
    }
    setTimeInterval(timeInterval)
  }

  const checkBoxes: React.ComponentProps<typeof AppCheckbox>[] = [
    {
      checked: accuracy === LocationAccuracy["Lowest"] ? true : false,
      onPress: () => handleAccuracy(LocationAccuracy["Lowest"]),
      title: "Lowest",
    },
    {
      checked: accuracy === LocationAccuracy["Low"] ? true : false,
      onPress: () => handleAccuracy(LocationAccuracy["Low"]),
      title: "Low",
    },
    {
      checked: accuracy === LocationAccuracy["Balanced"] ? true : false,
      onPress: () => handleAccuracy(LocationAccuracy["Balanced"]),
      title: "Balanced",
    },
    {
      checked: accuracy === LocationAccuracy["High"] ? true : false,
      onPress: () => handleAccuracy(LocationAccuracy["High"]),
      title: "High",
    },
    {
      checked: accuracy === LocationAccuracy["Highest"] ? true : false,
      onPress: () => handleAccuracy(LocationAccuracy["Highest"]),
      title: "Highest",
    },
    {
      checked: accuracy === LocationAccuracy["BestForNavigation"] ? true : false,
      onPress: () => handleAccuracy(LocationAccuracy["BestForNavigation"]),
      title: "BestForNavigation",
    },
  ]

  return (
    <View style={styles.screen}>
      <View style={styles.timeInterval}>
        <Text style={styles.label}>Time Interval</Text>
        <View style={styles.timeIntervalControls}>
          <View style={styles.slider}>
            <Slider
              value={timeInterval}
              onValueChange={handleTimeInterval}
              minimumValue={MINIMUM_TIME_INTERVAL}
              maximumValue={MAXIMUM_TIME_INTERVAL}
              step={TIME_INTERVAL_STEP}
              allowTouchTrack
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
            />
          </View>
          <Text style={styles.timeIntervalValue}>{`${timeInterval} seconds`}</Text>
        </View>
      </View>
      <View style={styles.accuracy}>
        <Text style={styles.label}>Accuracy</Text>
        <View style={styles.options}>
          {checkBoxes.map((item, index) => {
            return (
              <AppCheckbox
                key={index}
                title={item.title}
                checked={item.checked}
                onPress={item.onPress}
              />
            )
          })}
        </View>
        <Text style={styles.temporaryData}>{accuracy}</Text>
        <Text style={styles.temporaryData}>{`${tracking ? "Tracking" : "Stopped"}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  timeInterval: {
    alignItems: "center",
    // backgroundColor: colorPrimaryGray,
    marginBottom: marginMedium,
  },
  label: {
    fontSize: textLarge,
    marginBottom: marginSmall,
  },
  timeIntervalControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slider: {
    marginHorizontal: marginLarge,
    flex: 1,
  },
  track: {
    height: sliderTrackHeight,
    backgroundColor: colorPrimaryGray,
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: colorPrimary,
  },
  timeIntervalValue: {
    // flex: 1,
    // backgroundColor: colorPrimary,
    marginRight: marginLarge,
    fontSize: textMedium,
    // textAlign: "center",
  },
  accuracy: {
    marginBottom: marginMedium,
    // backgroundColor: colorPrimary,
    alignItems: "center",
  },
  accuracyLabel: {},
  options: {},
  temporaryData: {
    marginBottom: marginSmall,
    fontSize: textMedium,
  },
})
