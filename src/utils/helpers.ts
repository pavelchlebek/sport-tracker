import { LocationObject } from 'expo-location';
import { Alert } from 'react-native';

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
