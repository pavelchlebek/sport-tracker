import React from 'react';

import { LocationAccuracy } from 'expo-location';

type TLocationContextObject = {
  timeInterval: number
  accuracy: LocationAccuracy
  tracking: boolean
  setTimeInterval: (interval: number) => void
  setAccuracy: (accuracy: LocationAccuracy) => void
  setTracking: (tracking: boolean) => void
}

const LocationContext = React.createContext<TLocationContextObject>({
  timeInterval: 15,
  accuracy: 3,
  tracking: false,
  setTimeInterval: () => {},
  setAccuracy: () => {},
  setTracking: () => {},
})

export const useLocationContext = () => {
  return React.useContext(LocationContext)
}

export const LocationContextProvider: React.FC = ({ children }) => {
  const [timeInterval, setTimeInterval] = React.useState(15)
  const [accuracy, setAccuracy] = React.useState(3)
  const [tracking, setTracking] = React.useState(false)

  const contextValue: TLocationContextObject = {
    timeInterval: timeInterval,
    accuracy: accuracy,
    tracking: tracking,
    setTimeInterval: (interval) => setTimeInterval(interval),
    setAccuracy: (accuracy) => setAccuracy(accuracy),
    setTracking: (tracking) => setTracking(tracking),
  }

  return <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>
}
