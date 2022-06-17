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

import { calculateDistance } from './src/utils/helpers';
import { locationService2 } from './src/utils/locationService';

type TErrorMessage = string | undefined

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
      locationService2.setLocation({
        lat: latitude,
        long: longitude,
      })
    }
  }
)

export default function App() {
  const [coords, setCoords] = React.useState<TLocation>()
  const [errorMsg, setErrorMsg] = React.useState<TErrorMessage>()

  const [positions, setPositions] = React.useState<TLocation[]>([])
  const [distance, setDistance] = React.useState(0)

  const [tracking, setTracking] = React.useState(false)

  // ----------------------------------------------------------------------

  const onLocationUpdate = ({ lat, long }: TLocation) => {
    setCoords({ lat, long })
    setPositions((prev) => [...prev, { lat, long }])
    if (positions.length > 1) {
      setDistance((prev) => {
        return (
          prev + calculateDistance(positions[positions.length - 2], positions[positions.length - 1])
        )
      })
    }
  }

  React.useEffect(() => {
    locationService2.subscribe(onLocationUpdate)

    return () => {
      locationService2.unsubscribe()
    }
  }, [])

  const startTracking = async () => {
    setTracking(true)
    const backgroundPermissions = await Location.requestBackgroundPermissionsAsync()

    if (backgroundPermissions.status === "granted") {
      await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 5000,
        distanceInterval: 0,
        deferredUpdatesInterval: 0,
        foregroundService: {
          notificationTitle: "Probíha geolokace na pozadí",
          notificationBody: "To turn off....",
        },
      })
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
    } else {
      startTracking()
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.coords}>
        <View style={styles.data}>
          <Text style={styles.label}>Latitude:</Text>
          <Text style={styles.value}>{coords?.lat}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.label}>Longitude:</Text>
          <Text style={styles.value}>{coords?.long}</Text>
        </View>
      </View>
      <Button onPress={handleTracking} title={tracking ? "Stop Tracking" : "Start Tracking"} />
      <View style={{ ...styles.data, ...styles.marginVerticalMd }}>
        <Text style={{ ...styles.label, fontWeight: "bold" }}>Distance:</Text>
        <Text style={styles.value}>{(distance * 111111.111).toFixed(2)} meters</Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
