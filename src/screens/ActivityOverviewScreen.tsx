import React from 'react';

import { LocationObject } from 'expo-location';
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  marginMedium,
  marginSmall,
  marginXL,
  textMedium,
} from '../themes/theme';
import { DEG_DELTA_TO_METERS_DELTA } from './TrackingScreen';

type TProps = {
  children?: never
}

type TActivityName = string

type TActivity =
  | {
      date: string
      distance: number
      positions: LocationObject[]
    }
  | undefined

export const ActivityOverviewScreen: React.FC<TProps> = () => {
  const [activityNames, setActivityNames] = React.useState<readonly TActivityName[]>([])
  const [currentActivity, setCurrentActivity] = React.useState<TActivity>(undefined)

  React.useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      setActivityNames(keys)
    })
  })

  const handleActivityDetail = async (activity: TActivityName) => {
    try {
      const result = await AsyncStorage.getItem(activity)
      if (result) {
        setCurrentActivity(JSON.parse(result))
      }
    } catch (error) {
      console.log("Getting item from storage error")
    }
  }

  const activityList = (
    <View style={styles.screen}>
      <ScrollView>
        {activityNames.length > 0 &&
          activityNames.map((activity, index) => {
            return (
              <Pressable key={index} onPress={() => handleActivityDetail(activity)}>
                <Text style={styles.listItem}>{activity}</Text>
              </Pressable>
            )
          })}
      </ScrollView>
    </View>
  )

  const activityDetail = (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <Text style={styles.data}>{`Distance: ${
          currentActivity?.distance! * DEG_DELTA_TO_METERS_DELTA
        }`}</Text>
        <Text style={styles.data}>{`Date: ${currentActivity?.date}`}</Text>
      </View>
      <Button title="Back to list" onPress={() => setCurrentActivity(undefined)} />
    </View>
  )

  return currentActivity ? activityDetail : activityList
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: marginXL,
  },
  listItem: {
    fontSize: textMedium,
    marginBottom: marginMedium,
  },
  data: {
    fontSize: textMedium,
    marginVertical: marginSmall,
  },
  positions: {
    marginBottom: marginMedium,
  },
})
