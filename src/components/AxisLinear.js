import React from 'react'
import RAF from 'raf'
//
import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'

import Path from '../primitives/Path'
import Line from '../primitives/Line'
import Text from '../primitives/Text'
import Group from '../primitives/Group'

import {
  positionTop,
  positionRight,
  positionBottom,
  positionLeft,
  axisTypeOrdinal
} from '../utils/Constants.js'

const defaultStyles = {
  line: {
    strokeWidth: '1',
    fill: 'transparent'
  },
  tick: {
    fontSize: 10,
    fontFamily: 'sans-serif'
  }
}

const radiansToDegrees = r => r * (180 / Math.PI)

export default function AxisLinear({
  id,
  type,
  position,
  tickSizeInner,
  tickSizeOuter,
  show,
  showGrid,
  showTicks,
  styles,
  maxLabelRotation,
  tickPadding,
  ticks,
  tickCount,
  minTickCount,
  maxTickCount,
  barSize,
  scale,
  max: scaleMax,
  transform,
  vertical,
  format,
  range: [range0, range1],
  directionMultiplier,
  tickOffset,
  gridOffset,
  spacing
}) {
  const [rotation, setRotation] = React.useState(0)
  const [
    { gridWidth, gridHeight, dark, axisDimensions },
    setChartState
  ] = React.useContext(ChartContext)

  const elRef = React.useRef()
  const rendersRef = React.useRef(0)
  const visibleLabelStepRef = React.useRef()

  rendersRef.current++

  React.useEffect(() => {
    RAF(() => {
      rendersRef.current = 0
    })
  }, [])

  // Measure after if needed
  React.useLayoutEffect(() => {
    if (rendersRef.current > 10) {
      rendersRef.current = 0
      return
    }
    if (!elRef.current) {
      if (axisDimensions[position] && axisDimensions[position][id]) {
        // If the entire axis is hidden, then we need to remove the axis dimensions
        setChartState(state => {
          const newAxes = state.axisDimensions[position] || {}
          delete newAxes[id]
          return {
            ...state,
            axisDimensions: {
              ...state.axisDimensions,
              [position]: newAxes
            }
          }
        })
      }
      return
    }

    const labelDims = Array(
      ...elRef.current.querySelectorAll('.tickLabel')
    ).map(el => {
      const rect = el.getBoundingClientRect()
      return {
        width: rect.width,
        height: rect.height
      }
    })

    let tickSpace = !vertical ? gridWidth : gridHeight
    let calculatedTickCount = tickCount
    let width = 0
    let height = 0
    let top = 0
    let bottom = 0
    let left = 0
    let right = 0

    let smallestTickGap = 100000 // This is just a ridiculously large tick spacing that would never happen (hopefully)

    // First find the dimensions of each tick
    const tickDims = Array(...elRef.current.querySelectorAll('.tick')).map(el =>
      el.getBoundingClientRect()
    )

    // Then, determine the smallest gap in ticks on the axis
    tickDims.reduce((prev, current) => {
      if (prev) {
        const gap = vertical ? current.top - prev.top : current.left - prev.left
        smallestTickGap = gap < smallestTickGap ? gap : smallestTickGap
      }
      return current
    }, false)

    const firstLabelDim = labelDims[0] || { width: 0, height: 0 }
    const lastLabelDim = labelDims[labelDims.length - 1] || {
      width: 0,
      height: 0
    }

    // Then determine the largest label
    let largestLabel = { ...firstLabelDim, _overflow: 0 }

    // Determine the largest label on the axis
    labelDims.forEach(labelDim => {
      labelDim._overflow = !vertical
        ? labelDim.width
        : labelDim.height - smallestTickGap
      if (
        labelDim._overflow > 0 &&
        labelDim._overflow > largestLabel._overflow
      ) {
        largestLabel = labelDim
      }
    })

    const largestLabelSize = !vertical
      ? largestLabel.width
      : largestLabel.height

    // We need to detect auto tick mode
    if ((vertical || type !== 'ordinal') && tickCount === 'auto') {
      // if it's on, determine how many ticks we could display if they were all flat
      // How many ticks can we fit in the available axis space?
      calculatedTickCount = Math.max(
        minTickCount,
        Math.min(
          Math.floor(
            (tickSpace + largestLabelSize - tickPadding) /
              (largestLabelSize + tickPadding * 2)
          ),
          maxTickCount
        )
      )
    } else if (!vertical) {
      // Otherwise, if it's horizontal, then we need to determine axis rotation
      let newRotation = Math.min(
        Math.max(
          Math.abs(
            radiansToDegrees(
              Math.acos(smallestTickGap / (largestLabel.width + tickPadding))
            )
          ),
          0
        ),
        maxLabelRotation
      )

      console.log(smallestTickGap, largestLabel.width, tickPadding)

      newRotation = Number.isNaN(newRotation) ? 0 : Math.round(newRotation)

      if (
        Math.abs(rotation - newRotation) > 15 ||
        (rotation !== 0 && newRotation === 0) ||
        (rotation !== maxLabelRotation && newRotation === maxLabelRotation)
      ) {
        setRotation(() => (position === 'top' ? -newRotation : newRotation))
      }
    }

    const newVisibleLabelStep = Math.ceil(tickPadding / smallestTickGap)

    if (visibleLabelStepRef.current !== newVisibleLabelStep) {
      visibleLabelStepRef.current = newVisibleLabelStep
    }

    if (!vertical) {
      // Add width overflow from the first and last ticks
      const leftWidth = firstLabelDim.width
      const rightWidth = lastLabelDim.width
      if (rotation) {
        right = Math.ceil(tickPadding / 2)
        left = Math.abs(Math.ceil(Math.cos(rotation) * leftWidth)) - barSize / 2
      } else {
        left = Math.ceil(leftWidth / 2)
        right = Math.ceil(rightWidth / 2)
      }
      height =
        Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
        tickPadding + // Add tick padding
        // Add the height of the largest label
        Math.max(...labelDims.map(d => Math.ceil(d.height)))
    } else {
      // Add height overflow from the first and last ticks
      top = Math.ceil(firstLabelDim.height / 2)
      bottom = Math.ceil(lastLabelDim.height / 2)
      width =
        Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
        tickPadding + // Add tick padding
        // Add the width of the largest label
        Math.max(...labelDims.map(d => Math.ceil(d.width)))
    }

    const newDimensions = {
      width,
      height,
      top,
      bottom,
      left,
      right,
      tickCount: calculatedTickCount
    }

    setChartState(state => ({
      ...state,
      axisDimensions: {
        ...state.axisDimensions,
        [position]: {
          ...(state.axisDimensions[position] || {}),
          [id]: newDimensions
        }
      }
    }))
  }, [
    axisDimensions,
    barSize,
    gridHeight,
    gridWidth,
    id,
    maxLabelRotation,
    maxTickCount,
    minTickCount,
    position,
    rotation,
    setChartState,
    tickCount,
    tickPadding,
    tickSizeInner,
    tickSizeOuter,
    ticks.length,
    type,
    vertical
  ])

  return React.useMemo(() => {
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
      ...styles
    }

    return (
      <Group
        ref={elRef}
        className="Axis"
        style={{
          pointerEvents: 'none',
          transform:
            position === positionRight
              ? Utils.translateX(gridWidth)
              : position === positionBottom
              ? Utils.translateY(gridHeight)
              : undefined
        }}
      >
        <Path
          className="domain"
          d={axisPath}
          style={{
            stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)',
            ...axisStyles.line
          }}
        />
        <Group className="ticks" style={{}}>
          {ticks.map((tick, i) => (
            <Group
              key={[String(tick), i].join('_')}
              className="tick"
              style={{
                transform: transform(scale(tick) || 0)
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
                    ...axisStyles.line
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
                      vertical
                        ? directionMultiplier * tickSizeInner
                        : tickOffset
                    }
                    y1={vertical ? tickOffset : 0}
                    y2={
                      vertical
                        ? tickOffset
                        : directionMultiplier * tickSizeInner
                    }
                    style={{
                      stroke: dark
                        ? 'rgba(255,255,255, .1)'
                        : 'rgba(0,0,0, .1)',
                      strokeWidth: 1,
                      ...axisStyles.line
                    }}
                  />
                  <Text
                    className="tickLabel"
                    style={{
                      fill: dark ? 'white' : 'black',
                      ...axisStyles.tick,
                      transform: `${Utils.translate(
                        vertical ? directionMultiplier * spacing : tickOffset,
                        vertical ? tickOffset : directionMultiplier * spacing
                      )} rotate(${-rotation}deg)`
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
                    {String(format(tick, i))}
                  </Text>
                </g>
              ) : null}
            </Group>
          ))}
        </Group>
      </Group>
    )
  }, [
    dark,
    directionMultiplier,
    format,
    gridHeight,
    gridOffset,
    gridWidth,
    position,
    range0,
    range1,
    rotation,
    scale,
    scaleMax,
    show,
    showGrid,
    showTicks,
    spacing,
    styles,
    tickOffset,
    tickSizeInner,
    tickSizeOuter,
    ticks,
    transform,
    type,
    vertical
  ])
}
