import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { ActivityDetail } from './screens/ActivityDetailScreen';
import { ActivityList } from './screens/ActivityListScreen';

type RootStackParamList = {
  ActivityList: undefined
  ActivityDetail: {
    activityId: string
  }
}

export type TStackProps = StackScreenProps<RootStackParamList>

const ActivityStack = createStackNavigator<RootStackParamList>()

export function ActivityStackNavigator() {
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen name="ActivityList" component={ActivityList} />
      <ActivityStack.Screen name="ActivityDetail" component={ActivityDetail} />
    </ActivityStack.Navigator>
  )
}
