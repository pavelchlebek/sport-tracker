import React from 'react';

import * as Location from 'expo-location';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

type TErrorMessage = string | undefined

type TLocation = Location.LocationObject | undefined

export default function App() {
  const [location, setLocation] = React.useState<TLocation>()
  const [errorMsg, setErrorMsg] = React.useState<TErrorMessage>()

  React.useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    }
    getLocation()
  }, [])

  let text = "Waiting.."
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
})
