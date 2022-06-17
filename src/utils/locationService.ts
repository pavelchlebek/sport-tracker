const LocationService = () => {
  let subscribers: any = []

  return {
    subscribe: (sub: any) => subscribers.push(sub),
    setLocation: (coords: any) => {
      subscribers.forEach((sub: any) => sub(coords))
    },
    unsubscribe: (sub: any) => {
      subscribers = subscribers.filter((_sub: any) => _sub !== sub)
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
