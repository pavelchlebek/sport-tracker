import React from 'react';

import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import * as TaskManager from 'expo-task-manager';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useLocationContext } from '../store/LocationContext';
import { calculateDistance } from '../utils/helpers';
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
      const { latitude, longitude } = data.locations[0].coords
      locationService.setLocation({
        lat: latitude,
        long: longitude,
      })
    }
  }
)

const MILLISECONDS_IN_SECOND = 1000

export const TrackingScreen: React.FC<TProps> = () => {
  const [errorMsg, setErrorMsg] = React.useState<unknown>()

  const [positions, setPositions] = React.useState<TLocation[]>([])
  const [distance, setDistance] = React.useState(0)

  // const [tracking, setTracking] = React.useState(false)

  //----------- LocationContext stuff -------------------------------------

  const { accuracy, timeInterval, tracking, setTracking } = useLocationContext()

  // ----------------------------------------------------------------------

  const onLocationUpdate = ({ lat, long }: TLocation) => {
    // console.log("onLocationUpdate")
    setPositions((prev) => {
      const updatedPositions = [...prev]
      updatedPositions.push({ lat, long })
      return updatedPositions
    })
  }

  React.useEffect(() => {
    if (positions.length > 1) {
      setDistance((prev) => {
        return (
          prev + calculateDistance(positions[positions.length - 2], positions[positions.length - 1])
        )
      })
    }
  }, [positions])

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
      stopTracking()
      setTracking(false)
    } else {
      startTracking()
      setTracking(true)
    }
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />
      <View style={styles.coords}>
        <View style={styles.data}>
          <Text style={styles.label}>Latitude:</Text>
          <Text style={styles.value}>
            {positions.length > 0 && positions[positions.length - 1].lat}
          </Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.label}>Longitude:</Text>
          <Text style={styles.value}>
            {positions.length > 0 && positions[positions.length - 1].long}
          </Text>
        </View>
      </View>
      <Button onPress={handleTracking} title={tracking ? "Stop Tracking" : "Start Tracking"} />
      <View style={{ ...styles.data, ...styles.marginVerticalMd }}>
        <Text style={{ ...styles.label, fontWeight: "bold" }}>Distance:</Text>
        <Text style={styles.value}>{(distance * 111111.111).toFixed(2)} meters</Text>
      </View>
      <View style={{ ...styles.data, ...styles.marginVerticalMd }}>
        <Text style={{ ...styles.label, fontWeight: "bold" }}>Positions Count:</Text>
        <Text style={styles.value}>{positions.length}</Text>
      </View>
      <ScrollView>
        {positions.map((position, index) => {
          return (
            <View key={index} style={styles.coords}>
              <View style={styles.data}>
                <Text style={styles.label}>Latitude:</Text>
                <Text style={styles.value}>{position.lat}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.label}>Longitude:</Text>
                <Text style={styles.value}>{position.long}</Text>
              </View>
            </View>
          )
        })}
      </ScrollView>
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
    justifyContent: "center",
    marginTop: 50,
  },
  coords: {
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
})
