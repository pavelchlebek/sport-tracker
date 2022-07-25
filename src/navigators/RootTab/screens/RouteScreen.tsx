import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  TPoint,
  TrackGraph,
} from '../../../components/TrackGraph';
import { useLocationContext } from '../../../store/LocationContext';
import { colorWhite } from '../../../themes/theme';

type TProps = {
  children?: never
}

const points: TPoint[] = [
  { x: 49.001, y: 18.001 },
  { x: 49.005, y: 18.005 },
  { x: 49.005, y: 18.001 },
  { x: 49.003, y: 18.002 },

  // { x: 175, y: 175 },
  // { x: 50, y: 50 },
  // { x: 50, y: 13 },
]

export const RouteScreen: React.FC<TProps> = () => {
  const insets = useSafeAreaInsets()
  const {} = useLocationContext()
  const { positions } = useLocationContext()

  // React.useEffect(() => {
  //   const polyPoints: TPoint[] = []
  //   positions.forEach(position => {
  //     polyPoints.push({x: position.coords.latitude, y: position.coords.longitude})
  //   })
  // }, [positions])

  // console.log("positions: ", positions)

  return (
    <View style={{ ...styles.screen, marginTop: insets.top }}>
      <TrackGraph
        points={positions.map((position) => {
          return { x: position.coords.latitude, y: position.coords.longitude }
        })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colorWhite,
    alignItems: "center",
    justifyContent: "center",
  },
})
