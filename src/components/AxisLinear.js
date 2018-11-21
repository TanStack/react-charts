import React from 'react'
import withHooks, {
  useContext,
  useLayoutEffect,
  useState,
  useRef
} from '../utils/hooks'
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

const fontSize = 10

const identity = d => d
const radiansToDegrees = r => r * (180 / Math.PI)

function AxisLinear({
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
  tickPadding
}) {
  const [rotation, setRotation] = useState(0)
  const [
    { primaryAxes, secondaryAxes, gridWidth, gridHeight, dark },
    setChartState
  ] = useContext(ChartContext)

  const axis = [...primaryAxes, ...secondaryAxes].find(d => d.id === id)

  const elRef = useRef()
  const visibleLabelStepRef = useRef()

  // Measure after if needed
  useLayoutEffect(
    () => {
      if (!elRef.current) {
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
        return
      }

      const isHorizontal =
        position === positionTop || position === positionBottom
      const labelDims = Array(
        ...elRef.current.querySelectorAll('.tick text')
      ).map(el => {
        const rect = el.getBoundingClientRect()
        return {
          width: rect.width,
          height: rect.height
        }
      })

      let smallestTickGap = 100000
      // This is just a ridiculously large tick spacing that would never happen (hopefully)
      // If the axis is horizontal, we need to determine any necessary rotation and tick skipping
      if (isHorizontal) {
        const tickDims = Array(...elRef.current.querySelectorAll('.tick')).map(
          el => el.getBoundingClientRect()
        )
        // Determine the smallest gap in ticks on the axis
        tickDims.reduce((prev, current) => {
          if (prev) {
            const gap = current.left - prev.left
            smallestTickGap = gap < smallestTickGap ? gap : smallestTickGap
          }
          return current
        }, false)

        // Determine the largest label on the axis
        const largestLabel = labelDims.reduce(
          (prev, current) => {
            current._overflow = current.width - smallestTickGap
            if (current._overflow > 0 && current._overflow > prev._overflow) {
              return current
            }
            return prev
          },
          { ...labelDims[0], _overflow: 0 }
        )

        // Determine axis rotation before we measure
        let newRotation = Math.min(
          Math.max(
            Math.abs(
              radiansToDegrees(
                Math.acos(smallestTickGap / (largestLabel.width + fontSize))
              )
            ),
            0
          ),
          maxLabelRotation
        )

        newRotation = Number.isNaN(newRotation) ? 0 : Math.round(newRotation)

        if (
          Math.abs(rotation - newRotation) > 15 ||
          (rotation !== 0 && newRotation === 0) ||
          (rotation !== maxLabelRotation && newRotation === maxLabelRotation)
        ) {
          setRotation(() =>
            axis.position === 'top' ? -newRotation : newRotation
          )
        }
      }

      const newVisibleLabelStep = Math.ceil(fontSize / smallestTickGap)

      if (visibleLabelStepRef.current !== newVisibleLabelStep) {
        visibleLabelStepRef.current = newVisibleLabelStep
      }

      if (!labelDims.length) {
        return
      }

      let width = 0
      let height = 0
      let top = 0
      let bottom = 0
      let left = 0
      let right = 0

      if (isHorizontal) {
        // Add width overflow from the first and last ticks
        const leftWidth = identity(labelDims[0].width)
        const rightWidth = identity(labelDims[labelDims.length - 1].width)
        if (rotation) {
          right = Math.ceil(fontSize / 2)
          left =
            Math.abs(Math.ceil(Math.cos(rotation) * leftWidth)) -
            axis.barSize / 2
        } else {
          left = Math.ceil(leftWidth / 2)
          right = Math.ceil(rightWidth / 2)
        }
        height =
          Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
          tickPadding + // Add tick padding
          // Add the height of the largest label
          Math.max(...labelDims.map(d => Math.ceil(identity(d.height))))
      } else {
        // Add height overflow from the first and last ticks
        top = Math.ceil(identity(labelDims[0].height) / 2)
        bottom = Math.ceil(identity(labelDims[labelDims.length - 1].height) / 2)
        width =
          Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
          tickPadding + // Add tick padding
          // Add the width of the largest label
          Math.max(...labelDims.map(d => Math.ceil(identity(d.width))))
      }

      const newDimensions = {
        width,
        height,
        top,
        bottom,
        left,
        right
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
    },
    [axis, rotation]
  )

  // Not ready? Render null
  if (!axis || !show) {
    return null
  }

  const {
    scale,
    max: scaleMax,
    transform,
    vertical,
    format,
    //
    ticks,
    range: [range0, range1],
    directionMultiplier,
    tickOffset,
    gridOffset,
    spacing
  } = axis

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
      className='Axis'
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
        className='domain'
        d={axisPath}
        style={{
          stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)',
          ...axisStyles.line
        }}
      />
      <Group className='ticks' ref={elRef} style={{}}>
        {ticks.map((tick, i) => (
          <Group
            key={[String(tick), i].join('_')}
            className='tick'
            style={{
              transform: transform(scale(tick) || 0)
            }}
          >
            {/* Render the tick line  */}
            {showTicks ? (
              <Line
                x1={vertical ? 0 : tickOffset}
                x2={vertical ? directionMultiplier * tickSizeInner : tickOffset}
                y1={vertical ? tickOffset : 0}
                y2={vertical ? tickOffset : directionMultiplier * tickSizeInner}
                style={{
                  stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)',
                  strokeWidth: 1,
                  ...axisStyles.line
                }}
              />
            ) : null}
            {/* Render the grid line */}
            {showGridLine && (
              <Line
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
            {showTicks ? (
              <Text
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
            ) : null}
          </Group>
        ))}
      </Group>
    </Group>
  )
}

export default withHooks(AxisLinear)
