import React from 'react';

import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import * as TaskManager from 'expo-task-manager';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useLocationContext } from '../store/LocationContext';
import {
  colorDanger,
  textMedium,
} from '../themes/theme';
import { confirmAction } from '../utils/helpers';
import { locationService } from '../utils/locationService';

type TProps = {
  children?: never
}

export type TLocation = {
  lat: number
  long: number
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
      // const { latitude, longitude } = data.locations[0].coords
      locationService.setLocation(data.locations[0])
    }
  }
)

const MILLISECONDS_IN_SECOND = 1000

export const TrackingScreen: React.FC<TProps> = () => {
  const [errorMsg, setErrorMsg] = React.useState<unknown>()

  const [positions, setPositions] = React.useState<Location.LocationObject[]>([])
  const [distance, setDistance] = React.useState(0)

  //----------- LocationContext stuff -------------------------------------

  const { accuracy, timeInterval, tracking, setTracking } = useLocationContext()

  // ----------------------------------------------------------------------

  const onLocationUpdate = (location: Location.LocationObject) => {
    // console.log("onLocationUpdate")
    setPositions((prev) => {
      const updatedPositions = [...prev]
      updatedPositions.push(location)
      return updatedPositions
    })
  }

  // React.useEffect(() => {
  //   if (positions.length > 1) {
  //     setDistance((prev) => {
  //       return (
  //         prev + calculateDistance(positions[positions.length - 2], positions[positions.length - 1])
  //       )
  //     })
  //   }
  // }, [positions])

  React.useEffect(() => {
    locationService.subscribe(onLocationUpdate)

    return () => {
      locationService.unsubscribe(onLocationUpdate)
    }
  }, [])

  const startTracking = async () => {
    setTracking(true)

    try {
      const backgroundPermissions = await Location.requestBackgroundPermissionsAsync()

      if (backgroundPermissions.status === "granted") {
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
        message: "Do ypu really want to START tracking?",
      })
    }
  }

  return (
    <View style={styles.screen}>
      {errorMsg && (
        <Text style={styles.danger}>
          Some error regarding permission or location service occurred!
        </Text>
      )}
      <StatusBar style="auto" />
      {positions.length > 0 && (
        <View style={styles.location}>
          <View style={styles.data}>
            <Text style={styles.label}>Latitude:</Text>
            <Text style={styles.value}>{positions[positions.length - 1].coords.latitude}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.label}>Longitude:</Text>
            <Text style={styles.value}>{positions[positions.length - 1].coords.longitude}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.label}>Speed:</Text>
            <Text style={styles.value}>{positions[positions.length - 1].coords.speed}</Text>
          </View>
        </View>
      )}
      <Button onPress={handleTracking} title={tracking ? "Stop Tracking" : "Start Tracking"} />
      <View style={{ ...styles.data, ...styles.marginVerticalMd }}>
        <Text style={{ ...styles.label, fontWeight: "bold" }}>Distance:</Text>
        <Text style={styles.value}>{(distance * 111111.111).toFixed(2)} meters</Text>
      </View>
      <View style={{ ...styles.data, ...styles.marginVerticalMd }}>
        <Text style={{ ...styles.label, fontWeight: "bold" }}>Positions Count:</Text>
        <Text style={styles.value}>{positions.length}</Text>
      </View>
      <View>
        <Text>{`Tracking: ${tracking} Accuracy: ${accuracy} TimeInterval: ${timeInterval}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
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
})
