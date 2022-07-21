import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ActivityItem } from '../../../components/ActivityItem';
import { useLocationContext } from '../../../store/LocationContext';
import {
  colorPrimary,
  spacingXL,
  spacingXS,
  textMedium,
} from '../../../themes/theme';
import { confirmAction } from '../../../utils/helpers';
import { TStackProps } from '../ActivityStackNavigator';

export const ActivityList = ({ navigation }: TStackProps) => {
  const [activityNames, setActivityNames] = React.useState<Date[]>([])

  const { setItemsInStorage } = useLocationContext()

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

  const deleteActivity = async (id: string) => {
    await AsyncStorage.removeItem(id)
    AsyncStorage.getAllKeys().then((keys) => {
      setItemsInStorage(keys.length)
    })
  }

  const handleDelete = (id: string) => {
    confirmAction({
      title: "Deleting Activity",
      confirmText: "DELETE",
      onConfirm: () => deleteActivity(id),
      message: "Do you really want to DELETE this activity?",
    })
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollBox}>
        {activityNames.length > 0 ? (
          activityNames.map((activity, index) => {
            return (
              <ActivityItem
                key={index}
                onPress={() => handleActivityDetail(activity.toISOString())}
                label={activity}
                onDelete={() => handleDelete(activity.toISOString())}
              />
            )
          })
        ) : (
          <Text>No activity yet.</Text>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacingXL,
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
    padding: spacingXS,
    marginBottom: spacingXS,
  },
  listItem: {
    fontSize: textMedium,
  },
  listItemBefore: {},
})
