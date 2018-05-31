import React, { Component } from 'react'
import { Connect } from 'react-state'
//
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
    stroke: 'rgba(0,0,0,.1)',
    strokeWidth: '1',
    fill: 'transparent',
  },
  tick: {
    fontSize: 10,
    color: '#000',
    fontFamily: 'sans-serif',
  },
}

class Axis extends Component {
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
  componentWillReceiveProps (newProps) {
    const oldProps = this.props
    if (oldProps.axis !== newProps.axis && oldProps.axis) {
      this.prevAxis = oldProps.axis
    }

    // If any of the following change,
    // we need to update the axis
    if (
      newProps.primary !== oldProps.primary ||
      newProps.type !== oldProps.type ||
      newProps.invert !== oldProps.invert ||
      newProps.materializedData !== oldProps.materializedData ||
      newProps.height !== oldProps.height ||
      newProps.width !== oldProps.width ||
      newProps.position !== oldProps.position ||
      newProps.min !== oldProps.min ||
      newProps.max !== oldProps.max ||
      newProps.hardMin !== oldProps.hardMin ||
      newProps.hardMax !== oldProps.hardMax
    ) {
      this.updateScale(newProps)
    }
  }
  componentDidMount () {
    this.updateScale(this.props)
  }
  componentDidUpdate () {
    this.measure()
  }
  shouldComponentUpdate (newProps, nextState) {
    if (newProps.axis !== this.props.axis || this.state.rotation !== nextState.rotation) {
      return true
    }
    return false
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
        transform={
          position === positionRight
            ? translateX(width)
            : position === positionBottom
              ? translateY(height)
              : undefined
        }
        style={{
          pointerEvents: 'none',
          transition: 'none',
        }}
      >
        <Path
          className="domain"
          d={axisPath}
          style={{
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
              transform={transform(scale(tick) || 0)}
              style={{
                transition: 'none',
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
                    strokeWidth: 1,
                    ...axisStyles.line,
                    transition: 'none',
                  }}
                />
              )}
              {showTicks ? (
                <Text
                  style={{ ...axisStyles.tick, transition: 'none' }}
                  transform={`
                  translate(${vertical ? directionMultiplier * spacing : tickOffset}, ${
                    vertical ? tickOffset : directionMultiplier * spacing
                  })
                  rotate(${-rotation})
                `}
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

export default Connect(
  () => {
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
        primaryAxes: selectors.primaryAxes(state),
        width: selectors.gridWidth(state),
        height: selectors.gridHeight(state),
        materializedData: state.materializedData,
        axis: state.axes && state.axes[id],
      }
    }
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'pointer',
  }
)(Axis)

function translateX (x) {
  return `translate(${x}, 0)`
}

function translateY (y) {
  return `translate(0, ${y})`
}
