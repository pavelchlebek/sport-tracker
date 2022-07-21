import React from 'react';

import { LocationObject } from 'expo-location';
import moment from 'moment';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ActivityData } from '../../../components/ActivityData';
import {
  spacingLarge,
  spacingMedium,
  textLarge,
  textMedium,
} from '../../../themes/theme';
import {
  DEG_DELTA_TO_METERS_DELTA,
  getActivityTotalTime,
  getAverageSpeed,
} from '../../../utils/helpers';
import { TStackProps } from '../ActivityStackNavigator';

type TActivity =
  | {
      date: string
      distance: number
      positions: LocationObject[]
    }
  | undefined

export const ActivityDetail = ({ navigation, route }: TStackProps) => {
  const [currentActivity, setCurrentActivity] = React.useState<TActivity>(undefined)

  React.useEffect(() => {
    const getActivityDetail = async (activity: string) => {
      try {
        const result = await AsyncStorage.getItem(activity)
        if (result) {
          setCurrentActivity(JSON.parse(result))
        }
      } catch (error) {
        console.log("Getting item from storage error")
      }
    }
    getActivityDetail(route.params!.activityId)
  }, [])

  return (
    <View style={styles.screen}>
      {currentActivity && (
        <View style={styles.header}>
          <Text style={styles.date}>
            {moment(currentActivity?.date).format("MMMM Do YYYY, h:mm:ss a")}
          </Text>
          <Text style={styles.dateBefore}>
            {moment(new Date(currentActivity.date), "YYYYMMDD").fromNow()}
          </Text>
        </View>
      )}
      {currentActivity && (
        <View style={styles.activityData}>
          <ActivityData
            averageSpeed={getAverageSpeed(
              currentActivity.positions,
              currentActivity.distance * DEG_DELTA_TO_METERS_DELTA
            )}
            distance={currentActivity.distance * DEG_DELTA_TO_METERS_DELTA}
            positions={currentActivity.positions.length}
            time={getActivityTotalTime(currentActivity.positions)}
          />
        </View>
      )}
      <Button title="Back to list" onPress={() => navigation.navigate("ActivityList")} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "space-around" },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    fontSize: textMedium,
  },
  activityData: {
    marginBottom: spacingLarge,
    width: "100%",
    alignItems: "center",
  },
  date: {
    fontSize: textLarge,
    marginVertical: spacingMedium,
  },
  dateBefore: {
    fontSize: textMedium,
  },
})
