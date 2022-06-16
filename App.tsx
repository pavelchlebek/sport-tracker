import React from 'react';

import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type TErrorMessage = string | undefined

type TLocation = {
  lat: number
  long: number
}

const calculateDistance = (prevPosition: TLocation, currentPosition: TLocation) => {
  return Math.sqrt(
    (prevPosition.lat - currentPosition.lat) ** 2 + (prevPosition.long - currentPosition.long) ** 2
  )
}

export default function App() {
  const [coords, setCoords] = React.useState<TLocation>()
  const [errorMsg, setErrorMsg] = React.useState<TErrorMessage>()

  const [positions, setPositions] = React.useState<TLocation[]>([])
  const [distance, setDistance] = React.useState(0)

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied")
      return
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    })
    const currentCoords = { lat: location.coords.latitude, long: location.coords.longitude }
    setCoords(currentCoords)
    setPositions([...positions, currentCoords])
    if (positions.length > 1) {
      const currentDistanceDelta = calculateDistance(
        positions[positions.length - 2],
        positions[positions.length - 1]
      )
      setDistance((prev) => prev + currentDistanceDelta)
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
      <Button onPress={getLocation} title="Get Coords" />
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
