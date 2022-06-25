import { LocationObject } from 'expo-location';

export type TSubscriber = (location: LocationObject) => void

const LocationService = () => {
  let subscribers: TSubscriber[] = []

  return {
    subscribe: (sub: TSubscriber) => subscribers.push(sub),
    setLocation: (coords: LocationObject) => {
      subscribers.forEach((sub: TSubscriber) => sub(coords))
    },
    unsubscribe: (sub: TSubscriber) => {
      subscribers = subscribers.filter((_sub: TSubscriber) => _sub !== sub)
    },
  }
}

export const locationService = LocationService()

const LocationService2 = () => {
  let subscriber: any
  return {
    subscribe: (sub: any) => (subscriber = sub),
    setLocation: (coords: any) => {
      subscriber(coords)
    },
    unsubscribe: () => {
      subscriber = null
    },
  }
}

export const locationService2 = LocationService2()
