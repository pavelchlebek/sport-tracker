import React from 'react';

import * as Notifications from 'expo-notifications';
import {
  Alert,
  Button,
  Platform,
  Text,
  View,
} from 'react-native';

import { TTabProps } from '../navigators/RootTab/RootTabNavigator';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    }
  },
})

export const NotificationsScreen = ({ navigation }: TTabProps) => {
  const [expoPushToken, setExpoPushToken] = React.useState("")

  React.useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync()
      let finaleStatus = status

      if (finaleStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finaleStatus = status
      }

      if (finaleStatus !== "granted") {
        Alert.alert("Permissions required", "Push notifications need appropriate permissions.")
        return
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync()
      console.log("Push token: ", pushTokenData)
      setExpoPushToken(pushTokenData.data)

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        })
      }
    }

    configurePushNotifications()
  }, [])

  React.useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log("notification received")
      console.log(notification)
    })

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("notification response received")
      console.log(response)
      navigation.navigate("Settings")
    })

    return () => {
      subscription1.remove()
      subscription2.remove()
    }
  }, [])

  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local Notification",
        body: "This is the body of the notification.",
        data: {
          userName: "Palko",
        },
      },
      trigger: {
        seconds: 5,
      },
    })
  }

  // sending push notification via expo push service
  const sendPushNotificationHandler = () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: expoPushToken,
        title: "Test - sent from a device",
        body: "Just a test",
      }),
    })
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
      <Button title="Schedule Notification" onPress={scheduleNotificationHandler} />
      <Button title="Send Push Notification" onPress={sendPushNotificationHandler} />
      <Text>Notifications</Text>
    </View>
  )
}
