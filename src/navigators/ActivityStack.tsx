import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { ActivityDetail } from './screens/ActivityDetail';
import { ActivityList } from './screens/ActivityList';

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
