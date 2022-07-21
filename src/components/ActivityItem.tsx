import React from 'react';

import moment from 'moment';
import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  colorBlack,
  colorPrimary,
  spacingSmall,
  spacingXS,
  textSmall,
} from '../themes/theme';

type TProps = {
  onPress: () => void
  onDelete: () => void
  label: Date
}

export const ActivityItem: React.FC<TProps> = ({ label, onPress, onDelete }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.listItem}>{moment(label).format("MMMM Do YYYY, h:mm:ss a")}</Text>
      <Text style={styles.listItemBefore}>{moment(label, "YYYYMMDD").fromNow()}</Text>
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Ionicons name="trash-outline" size={24} color={colorBlack} />
      </Pressable>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  screen: {},
  button: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colorPrimary,
    alignItems: "center",
    padding: spacingXS,
    marginBottom: spacingSmall,
    // borderRadius: radiusSmall,
  },
  listItem: {
    fontSize: textSmall,
  },
  listItemBefore: {
    fontSize: textSmall,
  },
  deleteButton: {
    paddingVertical: spacingXS,
    paddingLeft: spacingSmall,
  },
})
