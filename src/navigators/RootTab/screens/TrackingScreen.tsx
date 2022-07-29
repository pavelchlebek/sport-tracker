import React from 'react';

import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import * as TaskManager from 'expo-task-manager';
import {
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ActivityData } from '../../../components/ActivityData';
import { useLocationContext } from '../../../store/LocationContext';
import {
  colorDanger,
  textMedium,
} from '../../../themes/theme';
import { saveToStorage } from '../../../utils/asyncStorage';
import {
  calculateAscent,
  calculateDescent,
  calculateDistance,
  confirmAction,
  DEG_DELTA_TO_METERS_DELTA,
  getAverageSpeed,
  MILLISECONDS_IN_SECOND,
} from '../../../utils/helpers';
import { locationService } from '../../../utils/locationService';

type TProps = {
  children?: never
}

export type TLocationData = {
  locations?: Location.LocationObject[]
}

const BACKGROUND_LOCATION_TASK = "background-location-task"

TaskManager.defineTask(
  BACKGROUND_LOCATION_TASK,
  ({ data, error }: TaskManager.TaskManagerTaskBody<TLocationData>) => {
    if (error) {
      console.log("Error message: ", error.message)
      return
    }
    if (data.locations) {
      locationService.setLocation(data.locations[0])
    }
  }
)

export const TrackingScreen: React.FC<TProps> = () => {
  const [errorMsg, setErrorMsg] = React.useState<unknown>()
  const [timeEvents, setTimeEvents] = React.useState<number[]>([])

  const [startTime, setStartTime] = React.useState(0)
  const [endTime, setEndTime] = React.useState(0)
  const [time, setTime] = React.useState(0)

  const [positions, setPositions] = React.useState<Location.LocationObject[]>([])
  const [distance, setDistance] = React.useState(0)
  const [ascent, setAscent] = React.useState(0)
  const [descent, setDescent] = React.useState(0)

  //----------- LocationContext stuff -------------------------------------

  const {
    accuracy,
    timeInterval,
    tracking,
    setTracking,
    deviation,
    setItemsInStorage,
    setPositions: setLocations,
    deletePositions,
  } = useLocationContext()

  // ----------------------------------------------------------------------

  const onLocationUpdate = (location: Location.LocationObject) => {
    setPositions((prev) => {
      const updatedPositions = [...prev]
      updatedPositions.push(location)
      return updatedPositions
    })

    // setting positions to LocationContextProvider
    // TODO delete local positions
    setLocations(location)
  }

  React.useEffect(() => {
    if (positions.length > 1) {
      setDistance((prev) => {
        return (
          prev +
          calculateDistance(positions[positions.length - 2], positions[positions.length - 1]) -
          deviation / DEG_DELTA_TO_METERS_DELTA
        )
      })
    }
  }, [positions])

  React.useEffect(() => {
    if (positions.length > 5) {
      setAscent((prev) => prev + calculateAscent(positions))
      setDescent((prev) => prev + calculateDescent(positions))
    }
  }, [positions])

  React.useEffect(() => {
    locationService.subscribe(onLocationUpdate)

    return () => {
      locationService.unsubscribe(onLocationUpdate)
    }
  }, [])

  React.useEffect(() => {
    if (tracking) {
      setTimeout(() => {
        const time = Date.now() - startTime
        setTime(time)
      }, 1000)
    } else {
      const time = endTime - startTime
      setTime(time)
    }
  }, [time, tracking])

  const startTracking = async () => {
    setTracking(true)
    setTimeEvents((prev) => [...prev, Date.now()])
    setStartTime(Date.now())

    try {
      const foregroundPermission = await Location.requestForegroundPermissionsAsync()
      const backgroundPermissions = await Location.requestBackgroundPermissionsAsync()

      if (backgroundPermissions.status === "granted" && foregroundPermission.status === "granted") {
        await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
          accuracy: accuracy,
          timeInterval: timeInterval * MILLISECONDS_IN_SECOND,
          distanceInterval: 0,
          deferredUpdatesInterval: 0,
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: "Probíha geolokace na pozadí",
            notificationBody: "To turn off....",
            killServiceOnDestroy: false,
          },
        })
      }
    } catch (err) {
      setErrorMsg(err)
    }
  }

  const stopTracking = async () => {
    setTracking(false)
    setTimeEvents((prev) => [...prev, Date.now()])
    setEndTime(Date.now())
    const value = await Location.hasStartedLocationUpdatesAsync(BACKGROUND_LOCATION_TASK)
    if (value) {
      Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK)
    }
  }

  const handleTracking = () => {
    if (tracking) {
      confirmAction({
        title: "Stopping Tracking",
        confirmText: "STOP",
        onConfirm: () => stopTracking(),
        message: "Do you really want to STOP tracking?",
      })
    } else {
      confirmAction({
        title: "Starting Tracking",
        onConfirm: () => startTracking(),
        confirmText: "START",
        message: "Do you really want to START tracking?",
      })
    }
  }

  const handleSave = async () => {
    const date = new Date().toISOString()
    const dataToSave = {
      date,
      positions,
      distance,
      ascent,
      descent,
    }
    saveToStorage(date, dataToSave)
    setAscent(0)
    setDescent(0)
    setPositions([])
    setDistance(0)
    deletePositions()
    setTimeEvents([])

    // displaying saved message info
    ToastAndroid.show("Activity saved!", ToastAndroid.SHORT)

    // getting itemsInStorage count
    AsyncStorage.getAllKeys().then((keys) => {
      setItemsInStorage(keys.length)
    })
  }

  // TODO: reset()
  const deleteActivity = () => {
    setAscent(0)
    setDescent(0)
    setDistance(0)
    setPositions([])
    deletePositions()
    setTimeEvents([])

    // displaying deleted message info
    ToastAndroid.show("Activity deleted!", ToastAndroid.SHORT)
  }

  return (
    <View style={styles.screen}>
      {errorMsg && (
        <View style={styles.errorMessages}>
          <Text style={styles.danger}>
            Some error regarding permission or location service occurred!
          </Text>
          <Text style={styles.danger}>{JSON.stringify(errorMsg)}</Text>
        </View>
      )}
      <StatusBar style="auto" />
      {positions.length > 1 && (
        <View style={styles.location}>
          <View style={styles.data}>
            <Text style={styles.label}>Latitude:</Text>
            <Text style={styles.value}>{positions[positions.length - 1].coords.latitude}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.label}>Longitude:</Text>
            <Text style={styles.value}>{positions[positions.length - 1].coords.longitude}</Text>
          </View>
        </View>
      )}
      <Button onPress={handleTracking} title={tracking ? "Stop Tracking" : "Start Tracking"} />
      {positions.length > 1 && (
        <ActivityData
          altitude={positions[positions.length - 1].coords.altitude}
          averageSpeed={getAverageSpeed(positions, distance * DEG_DELTA_TO_METERS_DELTA)}
          distance={distance * DEG_DELTA_TO_METERS_DELTA}
          positions={positions.length}
          // time={getActivityTotalTime(positions)}
          time={time}
          ascent={ascent}
          descent={descent}
        />
      )}
      {positions.length > 0 && !tracking && (
        <View style={styles.savingButtons}>
          <Button
            title="Save Activity"
            onPress={() =>
              confirmAction({
                title: "Saving to storage",
                confirmText: "Save",
                onConfirm: () => handleSave(),
                message: "Do you really want to SAVE this activity?",
              })
            }
          />
          <Button
            title="Delete Activity"
            onPress={() =>
              confirmAction({
                title: "Deleting",
                confirmText: "Delete",
                onConfirm: () => deleteActivity(),
                message: "Do you really want to DELETE this activity?",
              })
            }
          />
        </View>
      )}
      <View>
        <Text>{`Tracking: ${tracking} Accuracy: ${accuracy} TimeInterval: ${timeInterval} Deviation: ${deviation.toFixed(
          2
        )}`}</Text>
        {/* <Text>{`timeEvents: ${timeEvents}`}</Text> */}
        {/* <Text>{`time: ${Math.floor(time / 1000)} seconds`}</Text> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 50,
  },
  location: {
    marginBottom: 30,
  },
  data: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    marginRight: 30,
  },
  value: {
    fontSize: 20,
  },
  marginVerticalMd: {
    marginVertical: 30,
  },
  danger: {
    fontSize: textMedium,
    color: colorDanger,
  },
  savingButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  errorMessages: {
    justifyContent: "space-around",
    height: 130,
  },
})
