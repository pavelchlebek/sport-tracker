import React from 'react';

import moment from 'moment';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  colorPrimary,
  marginXL,
  marginXS,
  textMedium,
} from '../../themes/theme';
import { TStackProps } from '../ActivityStack';

export const ActivityList = ({ navigation }: TStackProps) => {
  const [activityNames, setActivityNames] = React.useState<Date[]>([])

  React.useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      const datesTitles: Date[] = []
      keys.forEach((item) => {
        const date = new Date(item)
        datesTitles.push(date)
      })
      setActivityNames(datesTitles)
    })
  })

  const handleActivityDetail = (activity: string) => {
    navigation.navigate("ActivityDetail", {
      activityId: activity,
    })
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollBox}>
        {activityNames.length > 0 &&
          activityNames.map((activity, index) => {
            return (
              <Pressable
                style={styles.button}
                key={index}
                onPress={() => handleActivityDetail(activity.toISOString())}
              >
                <Text style={styles.listItem}>
                  {moment(activity).format("MMMM Do YYYY, h:mm:ss a")}
                </Text>
                <Text style={styles.listItemBefore}>{moment(activity, "YYYYMMDD").fromNow()}</Text>
              </Pressable>
            )
          })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "space-between",
    marginTop: marginXL,
  },
  scrollBox: {
    // backgroundColor: "red",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colorPrimary,
    alignItems: "center",
    padding: marginXS,
    marginBottom: marginXS,
  },
  listItem: {
    fontSize: textMedium,
  },
  listItemBefore: {},
})
