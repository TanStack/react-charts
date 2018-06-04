import React from 'react'
//
import { ChartConnect } from '../utils/Context'
import Utils from '../utils/Utils'

import measure from './AxisLinear.measure'
import updateScale from './AxisLinear.updateScale'

import Path from '../primitives/Path'
import Line from '../primitives/Line'
import Text from '../primitives/Text'
import Group from '../primitives/Group'

import Selectors from '../utils/Selectors'

export const positionTop = 'top'
export const positionRight = 'right'
export const positionBottom = 'bottom'
export const positionLeft = 'left'

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

class Axis extends React.Component {
  static defaultProps = {
    min: undefined,
    max: undefined,
    hardMin: undefined,
    hardMax: undefined,
    base: undefined,
    tickArguments: [],
    tickValues: null,
    tickFormat: null,
    tickSizeInner: 6,
    tickSizeOuter: 6,
    tickPadding: 3,
    maxLabelRotation: 50,
    innerPadding: 0.2,
    outerPadding: 0.1,
    showGrid: null,
    showTicks: true,
    show: true,
  }
  constructor () {
    super()
    this.state = {
      rotation: 0,
    }
    this.measure = Utils.throttle(measure.bind(this))
    this.measureRotation = Utils.throttle(measure.bind(this))
    this.updateScale = updateScale.bind(this)
  }
  componentDidMount () {
    this.updateScale(this.props)
  }
  componentDidUpdate (oldProps, oldState) {
    if (oldProps.axis !== this.props.axis && oldProps.axis) {
      this.prevAxis = oldProps.axis
    }

    // If any of the following changed,
    // we need to update the axis
    if (
      (!this.props.axis && this.props.primaryAxes !== oldProps.primaryAxes) ||
      this.props.primary !== oldProps.primary ||
      this.props.type !== oldProps.type ||
      this.props.invert !== oldProps.invert ||
      this.props.materializedData !== oldProps.materializedData ||
      this.props.height !== oldProps.height ||
      this.props.width !== oldProps.width ||
      this.props.position !== oldProps.position ||
      this.props.min !== oldProps.min ||
      this.props.max !== oldProps.max ||
      this.props.hardMin !== oldProps.hardMin ||
      this.props.hardMax !== oldProps.hardMax
    ) {
      this.updateScale(this.props)
    } else if (this.props.axis !== oldProps.axis || oldState.rotation !== this.state.rotation) {
      this.measure()
    }
  }
  render () {
    const {
      type,
      axis,
      position,
      width,
      height,
      tickSizeInner,
      tickSizeOuter,
      show,
      showGrid,
      showTicks,
      styles,
      dark,
    } = this.props

    const { rotation } = this.state

    // Combine default styles with style props
    const axisStyles = {
      ...defaultStyles,
      ...styles,
    }

    // Render Dependencies
    if (!axis || !show) {
      return null
    }

    const {
      scale,
      max,
      transform,
      vertical,
      format,
      //
      ticks,
      range: [range0, range1],
      directionMultiplier,
      tickOffset,
      gridOffset,
      spacing,
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

    let showGridLine = showGrid
    // If ordinal and showGrid isn't explicit, hide it
    if (type === 'ordinal' && typeof showGrid !== 'boolean') {
      showGridLine = false
    } else {
      showGridLine = true
    }
    return (
      <Group
        className="Axis"
        style={{
          pointerEvents: 'none',
          transition: 'none',
          transform:
            position === positionRight
              ? translateX(width)
              : position === positionBottom
                ? translateY(height)
                : undefined,
        }}
      >
        <Path
          className="domain"
          d={axisPath}
          style={{
            stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)',
            ...axisStyles.line,
            transition: 'none',
          }}
        />
        <Group
          className="ticks"
          innerRef={el => {
            this.el = el
          }}
          style={{
            transition: 'none',
          }}
        >
          {ticks.map((tick, i) => (
            <Group
              key={tick}
              className="tick"
              style={{
                transition: 'none',
                transform: transform(scale(tick) || 0),
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
                    ...axisStyles.line,
                    transition: 'none',
                  }}
                />
              ) : null}
              {/* Render the grid line */}
              {showGridLine && (
                <Line
                  x1={vertical ? 0 : gridOffset}
                  x2={vertical ? max : gridOffset}
                  y1={vertical ? gridOffset : 0}
                  y2={vertical ? gridOffset : max}
                  style={{
                    stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)',
                    strokeWidth: 1,
                    ...axisStyles.line,
                    transition: 'none',
                  }}
                />
              )}
              {showTicks ? (
                <Text
                  style={{
                    fill: dark ? 'white' : 'black',
                    ...axisStyles.tick,
                    transition: 'none',
                    transform: `translate3d(${
                      vertical ? directionMultiplier * spacing : tickOffset
                    }px, ${
                      vertical ? tickOffset : directionMultiplier * spacing
                    }px, 0) rotate(${-rotation}deg)`,
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
}

export default ChartConnect(() => {
  const selectors = {
    gridWidth: Selectors.gridWidth(),
    gridHeight: Selectors.gridHeight(),
    primaryAxes: Selectors.primaryAxes(),
  }
  return (state, props) => {
    const { type, position, id: userID } = props
    const id = userID || `${type}_${position}`

    return {
      id,
      primaryAxes: selectors.primaryAxes(state), // This is needed in AxisLinear.updateScale.js
      width: selectors.gridWidth(state),
      height: selectors.gridHeight(state),
      materializedData: state.materializedData,
      axis: state.axes && state.axes[id],
      dark: state.dark,
    }
  }
})(Axis)

function translateX (x) {
  return `translate3d(${x}px, 0, 0)`
}

function translateY (y) {
  return `translate3d(0, ${y}px, 0)`
}
