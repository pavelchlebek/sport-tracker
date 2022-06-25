import { Alert } from 'react-native';

import { TLocation } from '../screens/TrackingScreen';

export const calculateDistance = (prevPosition: TLocation, currentPosition: TLocation) => {
  return Math.sqrt(
    (prevPosition.lat - currentPosition.lat) ** 2 + (prevPosition.long - currentPosition.long) ** 2
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
