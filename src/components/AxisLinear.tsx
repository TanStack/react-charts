import React from 'react'
//
import { translateX, translateY, translate } from '../utils/Utils'

import Path from '../primitives/Path'
import Line from '../primitives/Line'
import Text from '../primitives/Text'
import Group from '../primitives/Group'

import {
  positionTop,
  positionRight,
  positionBottom,
  positionLeft,
  axisTypeOrdinal,
} from '../utils/Constants.js'
import useChartContext from '../hooks/useChartContext'
import useMeasure from './AxisLinear.useMeasure'

const defaultStyles = {
  line: {
    strokeWidth: '1',
    fill: 'transparent',
  },
  tick: {
    fontSize: 10,
    fontFamily: 'sans-serif',
  },
}

export default function AxisLinear(axis) {
  const {
    type,
    position,
    tickSizeInner,
    tickSizeOuter,
    show,
    showGrid,
    showTicks,
    styles,
    ticks,
    scale,
    max: scaleMax,
    transform,
    vertical,
    format,
    range: [range0, range1],
    directionMultiplier,
    tickOffset,
    gridOffset,
    spacing,
    id,
  } = axis
  const [rotation, setRotation] = React.useState(0)
  const { gridWidth, gridHeight, dark } = useChartContext()

  const elRef = React.useRef()

  useMeasure({ ...axis, elRef, rotation, gridWidth, gridHeight, setRotation })

  // Not ready? Render null
  if (!show) {
    return null
  }

  let axisPath
  if (vertical) {
    if (position === positionLeft) {
      axisPath = `
        M ${-tickSizeOuter}, ${range0}
        H 0
        V ${range1}
        H ${-tickSizeOuter}
      `
    } else {
      axisPath = `
        M ${tickSizeOuter}, ${range0}
        H 0
        V ${range1}
        H ${tickSizeOuter}
      `
    }
  } else if (position === positionBottom) {
    axisPath = `
        M 0, ${tickSizeOuter}
        V 0
        H ${range1}
        V ${tickSizeOuter}
      `
  } else {
    axisPath = `
        M 0, ${-tickSizeOuter}
        V 0
        H ${range1}
        V ${-tickSizeOuter}
              `
  }

  let showGridLine
  if (typeof showGrid === 'boolean') {
    showGridLine = showGrid
  } else if (type === axisTypeOrdinal) {
    showGridLine = false
  } else {
    showGridLine = true
  }

  // Combine default styles with style props
  const axisStyles = {
    ...defaultStyles,
    ...styles,
  }

  return (
    <Group
      ref={elRef}
      className="Axis"
      style={{
        pointerEvents: 'none',
        transform:
          position === positionRight
            ? translateX(gridWidth)
            : position === positionBottom
            ? translateY(gridHeight)
            : undefined,
      }}
    >
      <Path
        className="domain"
        d={axisPath}
        style={{
          stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)',
          ...axisStyles.line,
        }}
      />
      <Group className="ticks">
        {ticks.map((tick, i) => (
          <Group
            key={[String(tick), i].join('_')}
            className="tick"
            style={{
              transform: transform(scale(tick) || 0),
            }}
          >
            {/* Render the grid line */}
            {showGridLine && (
              <Line
                className="gridLine"
                x1={vertical ? 0 : gridOffset}
                x2={vertical ? scaleMax : gridOffset}
                y1={vertical ? gridOffset : 0}
                y2={vertical ? gridOffset : scaleMax}
                style={{
                  stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)',
                  strokeWidth: 1,
                  ...axisStyles.line,
                }}
              />
            )}
            {/* Render the tick line  */}
            {showTicks ? (
              <g className="labelGroup">
                <Line
                  className="tickline"
                  x1={vertical ? 0 : tickOffset}
                  x2={
                    vertical ? directionMultiplier * tickSizeInner : tickOffset
                  }
                  y1={vertical ? tickOffset : 0}
                  y2={
                    vertical ? tickOffset : directionMultiplier * tickSizeInner
                  }
                  style={{
                    stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)',
                    strokeWidth: 1,
                    ...axisStyles.line,
                  }}
                />
                <Text
                  className="tickLabel"
                  style={{
                    fill: dark ? 'white' : 'black',
                    ...axisStyles.tick,
                    transform: `${translate(
                      vertical ? directionMultiplier * spacing : tickOffset,
                      vertical ? tickOffset : directionMultiplier * spacing
                    )} rotate(${-rotation}deg)`,
                  }}
                  dominantBaseline={
                    rotation
                      ? 'central'
                      : position === positionBottom
                      ? 'hanging'
                      : position === positionTop
                      ? 'alphabetic'
                      : 'central'
                  }
                  textAnchor={
                    rotation
                      ? 'end'
                      : position === positionRight
                      ? 'start'
                      : position === positionLeft
                      ? 'end'
                      : 'middle'
                  }
                >
                  {format(tick, i)}
                </Text>
                <Text
                  className="tickLabel-measurer"
                  style={{
                    ...axisStyles.tick,
                    transform: `${translate(
                      vertical ? directionMultiplier * spacing : tickOffset,
                      vertical ? tickOffset : directionMultiplier * spacing
                    )}`,
                    fill: 'red',
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                  dominantBaseline={
                    rotation
                      ? 'central'
                      : position === positionBottom
                      ? 'hanging'
                      : position === positionTop
                      ? 'alphabetic'
                      : 'central'
                  }
                  textAnchor={
                    rotation
                      ? 'end'
                      : position === positionRight
                      ? 'start'
                      : position === positionLeft
                      ? 'end'
                      : 'middle'
                  }
                >
                  {format(tick, i)}
                </Text>
              </g>
            ) : null}
          </Group>
        ))}
      </Group>
    </Group>
  )
}
