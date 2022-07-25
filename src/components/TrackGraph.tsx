import React from 'react';

import {
  Dimensions,
  StyleSheet,
} from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

import { colorPrimary } from '../themes/theme';

export type TPoint = {
  x: number
  y: number
}

type TProps = {
  points: TPoint[]
}

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const canvasMaxWidth = Math.floor(windowWidth * 0.825)
const canvasMaxHeight = Math.floor(windowHeight * 0.825)

const findExtremes = (points: TPoint[]) => {
  let maximumX = -Infinity
  let minimumX = Infinity

  let maximumY = -Infinity
  let minimumY = Infinity

  points.forEach((point) => {
    if (point.x > maximumX) {
      maximumX = point.x
    }
    if (point.x < minimumX) {
      minimumX = point.x
    }
    if (point.y > maximumY) {
      maximumY = point.y
    }
    if (point.y < minimumY) {
      minimumY = point.y
    }
  })

  return { minimumX, maximumX, minimumY, maximumY }
}

export const TrackGraph: React.FC<TProps> = ({ points }) => {
  const { maximumX, maximumY, minimumX, minimumY } = findExtremes(points)

  const rangeX = maximumX - minimumX
  const rangeY = maximumY - minimumY

  const adjustmentConstantX = canvasMaxWidth / rangeX
  const adjustmentConstantY = canvasMaxHeight / rangeY

  const adjustedPoints: TPoint[] = []
  points.forEach((point) => {
    const adjustedX = (point.x - minimumX) * adjustmentConstantX
    const adjustedY = (point.y - minimumY) * adjustmentConstantY
    adjustedPoints.push({ x: adjustedX, y: adjustedY })
  })

  let polylinePoints = ""
  adjustedPoints.forEach((point) => {
    polylinePoints += `${point.x},${point.y} `
  })

  console.log(polylinePoints)

  return (
    <Svg style={styles.canvas} height="90%" width="90%">
      <Polyline points={polylinePoints} fill="none" stroke={colorPrimary} strokeWidth="2" />
    </Svg>
  )
}

const styles = StyleSheet.create({
  canvas: {
    backgroundColor: "#ccc",
  },
})
