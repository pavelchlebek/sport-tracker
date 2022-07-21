import React from 'react';

import { LocationAccuracy } from 'expo-location';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Slider } from '@rneui/base';

import { AppCheckbox } from '../../../components/AppCheckbox';
import { useLocationContext } from '../../../store/LocationContext';
import {
  colorPrimary,
  colorPrimaryGray,
  sliderTrackHeight,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  textLarge,
  textMedium,
} from '../../../themes/theme';
import { showWarning } from '../../../utils/helpers';

type TProps = {
  children?: never
}

// time interval constants
const MINIMUM_TIME_INTERVAL = 2
const MAXIMUM_TIME_INTERVAL = 60
const TIME_INTERVAL_STEP = 1

// deviation constants
const MINIMUM_DEVIATION = 0
const MAXIMUM_DEVIATION = 6
const DEVIATION_INTERVAL_STEP = 0.1

export const SettingsScreen: React.FC<TProps> = () => {
  const insets = useSafeAreaInsets()
  // ----------- LocationContext stuff -------------------------------------

  const {
    accuracy,
    setAccuracy,
    setTimeInterval,
    timeInterval,
    tracking,
    deviation,
    setDeviation,
  } = useLocationContext()

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

  const handleDeviation = (deviation: number) => {
    if (tracking) {
      showWarning("Warning", "You cannot change settings while location service is running")
      return
    }
    setDeviation(deviation)
  }

  const checkBoxes: React.ComponentProps<typeof AppCheckbox>[] = [
    // {
    //   checked: accuracy === LocationAccuracy["Lowest"] ? true : false,
    //   onPress: () => handleAccuracy(LocationAccuracy["Lowest"]),
    //   title: "Lowest",
    // },
    // {
    //   checked: accuracy === LocationAccuracy["Low"] ? true : false,
    //   onPress: () => handleAccuracy(LocationAccuracy["Low"]),
    //   title: "Low",
    // },
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
    <ScrollView contentContainerStyle={{ ...styles.screen, paddingTop: insets.top + 50 }}>
      <View style={styles.timeInterval}>
        <Text style={styles.label}>Time Interval</Text>
        <View style={styles.timeIntervalControls}>
          <View style={styles.timeIntervalSlider}>
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
            <Text style={styles.timeIntervalValue}>{`${timeInterval} seconds`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.timeInterval}>
        <Text style={styles.label}>Deviation</Text>
        <View style={styles.timeIntervalControls}>
          <View style={styles.timeIntervalSlider}>
            <Slider
              value={deviation}
              onValueChange={handleDeviation}
              minimumValue={MINIMUM_DEVIATION}
              maximumValue={MAXIMUM_DEVIATION}
              step={DEVIATION_INTERVAL_STEP}
              allowTouchTrack
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
            />
            <Text style={styles.timeIntervalValue}>{`${deviation.toFixed(2)} meters`}</Text>
          </View>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    // backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    // marginTop: 100,
  },
  timeInterval: {
    alignItems: "center",
    // backgroundColor: colorPrimaryGray,
    marginBottom: spacingMedium,
  },
  label: {
    fontSize: textLarge,
    marginBottom: spacingSmall,
  },
  timeIntervalControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeIntervalSlider: {
    marginHorizontal: spacingLarge,
    flex: 1,
  },
  distanceDeviationSlider: {
    marginHorizontal: spacingLarge,
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
    marginRight: spacingLarge,
    fontSize: textMedium,
    // textAlign: "center",
  },
  accuracy: {
    marginBottom: spacingMedium,
    // backgroundColor: colorPrimary,
    alignItems: "center",
  },
  accuracyLabel: {},
  options: {},
  temporaryData: {
    marginBottom: spacingSmall,
    fontSize: textMedium,
  },
})
