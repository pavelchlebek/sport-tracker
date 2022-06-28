import React from 'react';

import { LocationAccuracy } from 'expo-location';

type TLocationContextObject = {
  timeInterval: number
  deviation: number
  accuracy: LocationAccuracy
  tracking: boolean
  setTimeInterval: (interval: number) => void
  setAccuracy: (accuracy: LocationAccuracy) => void
  setTracking: (tracking: boolean) => void
  setDeviation: (deviation: number) => void
}

const LocationContext = React.createContext<TLocationContextObject>({
  timeInterval: 5,
  accuracy: 4,
  tracking: false,
  deviation: 2,
  setTimeInterval: () => {},
  setAccuracy: () => {},
  setTracking: () => {},
  setDeviation: () => {},
})

export const useLocationContext = () => {
  return React.useContext(LocationContext)
}

export const LocationContextProvider: React.FC = ({ children }) => {
  const [timeInterval, setTimeInterval] = React.useState(5)
  const [accuracy, setAccuracy] = React.useState(4)
  const [tracking, setTracking] = React.useState(false)
  const [deviation, setDeviation] = React.useState(2)

  const contextValue: TLocationContextObject = {
    timeInterval: timeInterval,
    accuracy: accuracy,
    tracking: tracking,
    deviation: deviation,
    setTimeInterval: (interval) => setTimeInterval(interval),
    setAccuracy: (accuracy) => setAccuracy(accuracy),
    setTracking: (tracking) => setTracking(tracking),
    setDeviation: (deviation) => setDeviation(deviation),
  }

  return <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>
}
