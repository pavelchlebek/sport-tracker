import React from 'react';

import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { textMedium } from '../../themes/theme';
import { TStackProps } from '../ActivityStack';

export const ActivityDetail = ({ navigation, route }: TStackProps) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.item}>{route.params?.activityId}</Text>
      <Button title="Back to List" onPress={() => navigation.navigate("ActivityList")} />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    fontSize: textMedium,
  },
})
