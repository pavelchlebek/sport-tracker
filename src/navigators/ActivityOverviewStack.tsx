import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import {
  marginXS,
  textLarge,
} from '../themes/theme';

const list = Array(10).fill(0)

type RootStackParamList = {
  ActivityList: undefined
  ActivityDetail: {
    activityId: number
  }
}

const Stack = createStackNavigator<RootStackParamList>()

type Props = StackScreenProps<RootStackParamList>

const ActivityList = ({ navigation }: Props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        {list.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate("ActivityDetail", {
                  activityId: index,
                })
              }
            >
              <Text style={styles.items}>{index}</Text>
            </Pressable>
          )
        })}
      </View>
      <Text>Home Screen</Text>
      {/* <Button
        title="Go to Detail"
        onPress={() => navigation.navigate("ActivityDetail", { activityId: 15 })}
      /> */}
    </View>
  )
}

const ActivityDetail = ({ route, navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Notifications</Text>
      <Text>{route.params?.activityId}</Text>
      <Button title="Go to List" onPress={() => navigation.navigate("ActivityList")} />
    </View>
  )
}

export function ActivityOverviewStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ActivityList" component={ActivityList} />
      <Stack.Screen name="ActivityDetail" component={ActivityDetail} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  list: {},
  items: {
    fontSize: textLarge,
    marginVertical: marginXS,
  },
})
