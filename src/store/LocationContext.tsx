import React from 'react';

import { LocationAccuracy } from 'expo-location';

import AsyncStorage from '@react-native-async-storage/async-storage';

type TLocationContextObject = {
  timeInterval: number
  deviation: number
  accuracy: LocationAccuracy
  tracking: boolean
  itemsInStorage: number
  setTimeInterval: (interval: number) => void
  setAccuracy: (accuracy: LocationAccuracy) => void
  setTracking: (tracking: boolean) => void
  setDeviation: (deviation: number) => void
  setItemsInStorage: (itemsCount: number) => void
}

const LocationContext = React.createContext<TLocationContextObject>({
  timeInterval: 5,
  accuracy: 4,
  tracking: false,
  deviation: 2,
  itemsInStorage: 0,
  setTimeInterval: () => {},
  setAccuracy: () => {},
  setTracking: () => {},
  setDeviation: () => {},
  setItemsInStorage: () => {},
})

export const useLocationContext = () => {
  return React.useContext(LocationContext)
}

export const LocationContextProvider: React.FC = ({ children }) => {
  const [timeInterval, setTimeInterval] = React.useState(5)
  const [accuracy, setAccuracy] = React.useState(4)
  const [tracking, setTracking] = React.useState(false)
  const [deviation, setDeviation] = React.useState(2)
  const [itemsInStorage, setItemsInStorage] = React.useState(0)

  React.useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      setItemsInStorage(keys.length)
    })
  }, [])

  const contextValue: TLocationContextObject = {
    timeInterval: timeInterval,
    accuracy: accuracy,
    tracking: tracking,
    deviation: deviation,
    itemsInStorage: itemsInStorage,
    setTimeInterval: (interval) => setTimeInterval(interval),
    setAccuracy: (accuracy) => setAccuracy(accuracy),
    setTracking: (tracking) => setTracking(tracking),
    setDeviation: (deviation) => setDeviation(deviation),
    setItemsInStorage: (itemsCount) => setItemsInStorage(itemsCount),
  }

  return <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>
}
