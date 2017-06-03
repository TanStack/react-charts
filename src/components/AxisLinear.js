import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { Animate, Transition } from 'react-move'
import RAF from 'raf'
//
import measure from './AxisLinear.measure'
import updateScale from './AxisLinear.updateScale'

import Path from '../primitives/Path'
import Line from '../primitives/Line'
import Text from '../primitives/Text'

import Selectors from '../utils/Selectors'

const fontSize = 10

export const positionTop = 'top'
export const positionRight = 'right'
export const positionBottom = 'bottom'
export const positionLeft = 'left'

class Axis extends PureComponent {
  static defaultProps = {
    tickArguments: [],
    tickValues: null,
    tickFormat: null,
    tickSizeInner: 6,
    tickSizeOuter: 6,
    tickPadding: 3,
    maxLabelRotation: 50,
    innerPadding: 0.2,
    outerPadding: 0.1,
    showGrid: 1,
    display: true,
  }
  // Lifecycle
  constructor () {
    super()
    this.rotation = 0
    this.measure = measure.bind(this)
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
      newProps.position !== oldProps.position
    ) {
      this.updateScale(newProps)
    }
  }
  componentDidMount () {
    this.updateScale(this.props)
    this.measure()
  }
  shouldComponentUpdate (newProps) {
    if (newProps.axis !== this.props.axis) {
      return true
    }
    return false
  }
  componentDidUpdate () {
    RAF(() => {
      if (!this.measure()) {
        window.setTimeout(() => this.componentDidUpdate(), 1)
      }
    })
  }
  render () {
    const {
      type,
      axis,
      position,
      width,
      height,
      showGrid,
      tickSizeInner,
      tickSizeOuter,
      display,
    } = this.props

    const { rotation } = this

    // Render Dependencies
    if (!axis || !display) {
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

    return (
      <Animate
        data={{
          width,
          height,
          max,
          range0,
          range1,
          directionMultiplier,
          tickSizeOuter,
          tickOffset,
          gridOffset,
          spacing,
        }}
      >
        {({
          width,
          height,
          max,
          range0,
          range1,
          directionMultiplier,
          tickSizeOuter,
          tickOffset,
          gridOffset,
          spacing,
        }) => {
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
          } else {
            if (position === positionBottom) {
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
          }

          return (
            <g
              className='Axis'
              fill='black'
              fontSize='10'
              fontFamily='sans-serif'
              transform={
                position === positionRight
                  ? translateX(width)
                  : position === positionBottom ? translateY(height) : undefined
              }
            >
              <Path
                className='domain'
                d={axisPath}
                style={{
                  stroke: '#acacac',
                  strokeWidth: '1',
                  fill: 'transparent',
                }}
              />
              <Transition
                data={ticks}
                getKey={(d, i) => String(d)}
                update={d => ({
                  tick: scale(d),
                  visibility: 1,
                  measureable: 1,
                  rotation,
                })}
                enter={d => ({
                  tick: this.prevAxis.scale(d),
                  visibility: 0,
                  measureable: 1,
                  rotation: 0,
                })}
                leave={d => ({
                  tick: scale(d),
                  visibility: 0,
                  measureable: 0,
                  rotation,
                })}
                ignore={['measureable']}
                duration={500}
              >
                {inters => {
                  let showGridLine = showGrid

                  // If ordinal and showGrid isn't explicit, hide it
                  if (type === 'ordinal' && showGrid === 1) {
                    showGridLine = false
                  }

                  return (
                    <g
                      className='ticks'
                      ref={el => {
                        this.el = el
                      }}
                    >
                      {inters.map((inter, index) => {
                        return (
                          <g
                            key={inter.key}
                            className={
                              'tick' +
                                (inter.state.measureable ? ' -measureable' : '')
                            }
                            transform={transform(inter.state.tick)}
                          >
                            <Line
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
                                strokeWidth: 1,
                              }}
                              opacity={inter.state.visibility * 0.2}
                            />
                            {showGridLine &&
                              <Line
                                x1={vertical ? 0 : gridOffset}
                                x2={vertical ? max : gridOffset}
                                y1={vertical ? gridOffset : 0}
                                y2={vertical ? gridOffset : max}
                                style={{
                                  strokeWidth: 1,
                                }}
                                opacity={
                                  inter.state.visibility *
                                    (index !== 0 &&
                                      index !== inters.length - 1 &&
                                      inter.data === 0
                                      ? 0.5
                                      : 0.2)
                                }
                              />}
                            <Text
                              opacity={inter.state.visibility}
                              fontSize={fontSize}
                              transform={`
                                translate(${vertical ? directionMultiplier * spacing : tickOffset}, ${vertical ? tickOffset : directionMultiplier * spacing})
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
                              {format(inter.data)}
                            </Text>
                          </g>
                        )
                      })}
                    </g>
                  )
                }}
              </Transition>
            </g>
          )
        }}
      </Animate>
    )
  }
}

export default Connect(
  () => {
    const selectors = {
      gridWidth: Selectors.gridWidth(),
      gridHeight: Selectors.gridHeight(),
      primaryAxis: Selectors.primaryAxis(),
    }
    return (state, props) => {
      const { type, position } = props

      const id = `${type}_${position}`

      return {
        id,
        materializedData: state.materializedData,
        width: selectors.gridWidth(state),
        height: selectors.gridHeight(state),
        primaryAxis: selectors.primaryAxis(state),
        axis: state.axes && state.axes[id],
      }
    }
  },
  {
    filter: (oldState, newState, meta) => {
      return meta.type !== 'cursor'
    },
  }
)(Axis)

function translateX (x) {
  return 'translate(' + x + ', 0)'
}

function translateY (y) {
  return 'translate(0, ' + y + ')'
}
