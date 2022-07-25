import React from 'react';

import {
  LocationAccuracy,
  LocationObject,
} from 'expo-location';

import AsyncStorage from '@react-native-async-storage/async-storage';

type TLocationContextObject = {
  timeInterval: number
  deviation: number
  accuracy: LocationAccuracy
  tracking: boolean
  itemsInStorage: number
  positions: LocationObject[]
  setTimeInterval: (interval: number) => void
  setAccuracy: (accuracy: LocationAccuracy) => void
  setTracking: (tracking: boolean) => void
  setDeviation: (deviation: number) => void
  setItemsInStorage: (itemsCount: number) => void
  setPositions: (position: LocationObject) => void
  deletePositions: () => void
}

const LocationContext = React.createContext<TLocationContextObject>({
  timeInterval: 5,
  accuracy: 4,
  tracking: false,
  deviation: 2,
  itemsInStorage: 0,
  positions: [],
  setTimeInterval: () => {},
  setAccuracy: () => {},
  setTracking: () => {},
  setDeviation: () => {},
  setItemsInStorage: () => {},
  setPositions: () => {},
  deletePositions: () => {},
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
  const [positions, setPositions] = React.useState<LocationObject[]>([])

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
    positions: positions,
    setTimeInterval: (interval) => setTimeInterval(interval),
    setAccuracy: (accuracy) => setAccuracy(accuracy),
    setTracking: (tracking) => setTracking(tracking),
    setDeviation: (deviation) => setDeviation(deviation),
    setItemsInStorage: (itemsCount) => setItemsInStorage(itemsCount),
    setPositions: (position) => setPositions((prev) => [...prev, position]),
    deletePositions: () => setPositions([]),
  }

  return <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>
}
