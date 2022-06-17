import { TLocation } from '../../App';

export const calculateDistance = (prevPosition: TLocation, currentPosition: TLocation) => {
  return Math.sqrt(
    (prevPosition.lat - currentPosition.lat) ** 2 + (prevPosition.long - currentPosition.long) ** 2
  )
}
