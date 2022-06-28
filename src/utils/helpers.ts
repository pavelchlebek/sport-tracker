import { LocationObject } from 'expo-location';
import { Alert } from 'react-native';

import { MILLISECONDS_IN_SECOND } from '../screens/TrackingScreen';

export const METERS_PER_SECOND_TO_KILOMETERS_PER_HOUR = 3.6

export const calculateDistance = (
  prevPosition: LocationObject,
  currentPosition: LocationObject
) => {
  return Math.sqrt(
    (prevPosition.coords.latitude - currentPosition.coords.latitude) ** 2 +
      (prevPosition.coords.longitude - currentPosition.coords.longitude) ** 2
  )
}

export const showWarning = (title: string, message?: string) => {
  Alert.alert(title, message, [
    {
      text: "OK",
      style: "cancel",
    },
  ])
}
interface ISettings {
  title: string
  confirmText: string
  onConfirm: () => void
  message?: string
}

export const confirmAction = ({ title, message, onConfirm, confirmText }: ISettings) => {
  Alert.alert(title, message, [
    {
      text: confirmText,
      onPress: onConfirm,
      style: "default",
    },
    {
      text: "CANCEL",
      style: "cancel",
    },
  ])
}

export const getActivityTotalTime = (positions: LocationObject[]): number => {
  const startTime = positions[0].timestamp
  const endTime = positions[positions.length - 1].timestamp
  return endTime - startTime
}

export const getAverageSpeed = (positions: LocationObject[], distance: number): number => {
  const totalTime = getActivityTotalTime(positions) / MILLISECONDS_IN_SECOND
  return (distance / totalTime) * METERS_PER_SECOND_TO_KILOMETERS_PER_HOUR
}
