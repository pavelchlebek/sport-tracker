import React from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  marginMedium,
  marginXL,
  textMedium,
} from '../../themes/theme';
import { TStackProps } from '../ActivityStack';

export const ActivityList = ({ navigation }: TStackProps) => {
  const [activityNames, setActivityNames] = React.useState<readonly string[]>([])

  React.useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      setActivityNames(keys)
    })
  })

  const handleActivityDetail = (activity: string) => {
    console.log("Activity: ", activity)
    navigation.navigate("ActivityDetail", {
      activityId: activity,
    })
  }

  return (
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
})
