import React, { PureComponent } from 'react'
import { Animate, Transition } from 'react-move'
import {
  scaleLinear,
  scaleLog,
  scaleTime,
  scaleBand
 } from 'd3-scale'
//
import Path from '../primitives/Path'
import Line from '../primitives/Line'
import Text from '../primitives/Text'

import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'
//
const scales = {
  linear: scaleLinear,
  log: scaleLog,
  time: scaleTime,
  ordinal: scaleBand
}

const positionTop = 'top'
const positionRight = 'right'
const positionBottom = 'bottom'
const positionLeft = 'left'

const detectVertical = position => [positionLeft, positionRight].indexOf(position) > -1
const detectRTL = (position) => [positionTop, positionRight].indexOf(position) > -1
const getPixel = d => d

const textEl = 'text'

class Axis extends PureComponent {
  static defaultProps = {
    tickArguments: [],
    tickValues: null,
    tickFormat: null,
    tickSizeInner: 6,
    tickSizeOuter: 6,
    tickPadding: 3,
    barPaddingInner: 0.1,
    barPaddingOuter: 0.1,
    showGrid: true
  }
  // Lifecycle
  constructor () {
    super()
    this.measure = this.measure.bind(this)
    this.updateScale = this.updateScale.bind(this)
  }
  componentWillReceiveProps (newProps) {
    const oldProps = this.props
    if (oldProps.axis !== newProps.axis && oldProps.axis) {
      this.prevAxis = oldProps.axis
    }
  }
  componentDidMount () {
    this.updateScale(this.props)
    this.measure()
  }
  componentWillUpdate (newProps) {
    const oldProps = this.props
    const {
      position
    } = newProps

    // If any of the following change,
    // we need to update the axis
    if (
      newProps.axes !== oldProps.axes ||
      newProps.primary !== oldProps.primary ||
      newProps.type !== oldProps.type ||
      newProps.invert !== oldProps.invert ||
      newProps.accessedData !== oldProps.accessedData ||
      newProps.height !== oldProps.height ||
      newProps.width !== oldProps.width ||
      position !== oldProps.position
    ) {
      this.updateScale(newProps)
    }
  }
  componentDidUpdate () {
    window.requestAnimationFrame(this.measure)
  }
  updateScale (props) {
    const {
      // Computed
      id,
      // Props
      type,
      position,
      invert,
      primary,
      stacked,
      barPaddingInner,
      barPaddingOuter,
      centerTicks,
      // Context
      accessedData,
      width,
      height,
      primaryAxis
    } = props

    // We need the data to proceed
    if (!accessedData) {
      return
    }

    // If this axis is secondary, we need the primaryAxis to proceed
    if (!primary && !primaryAxis) {
      return
    }

    // Detect some settings
    const datumKey = primary ? 'primary' : 'secondary'
    const vertical = detectVertical(position)
    const RTL = primary && detectRTL(position) // Right to left OR top to bottom

    // TODO: Any sorting needs to happen here, else the min/max's might not line up correctly

    // First we need to find unique values, min/max values and negative/positive totals
    let uniqueVals = []
    let min = 0
    let max = 0
    let datumValues = []
    let negativeTotal = 0
    let positiveTotal = 0
    let domain

    if (type === 'ordinal') {
      accessedData.forEach(series => {
        const seriesValues = series.map(d => d[datumKey])
        seriesValues.forEach(d => {
          if (uniqueVals.indexOf(d) === -1) {
            uniqueVals.push(d)
          }
        })
      })
      domain = invert ? [...uniqueVals].reverse() : uniqueVals
    } else if (type === 'time') {
      min = max = accessedData[0][0][datumKey]
      accessedData.forEach(series => {
        const seriesValues = series.map(d => +d[datumKey])
        seriesValues.forEach((d, i) => {
          datumValues[i] = [...(datumValues[i] || []), d]
        })
        const seriesMin = Math.min(...seriesValues)
        const seriesMax = Math.max(...seriesValues)
        min = Math.min(min, seriesMin)
        max = Math.max(max, seriesMax)
      })
      domain = invert ? [max, min] : [min, max]
    } else {
      accessedData.forEach(series => {
        const seriesValues = series.map(d => d[datumKey])
        seriesValues.forEach((d, i) => {
          datumValues[i] = [...(datumValues[i] || []), d]
        })
        const seriesMin = Math.min(...seriesValues)
        const seriesMax = Math.max(...seriesValues)
        min = Math.min(min, seriesMin)
        max = Math.max(max, seriesMax)
      })
      if (stacked) {
        // If we're stacking, calculate and use the max and min values for the largest stack
        [positiveTotal, negativeTotal] = datumValues.reduce((totals, vals) => {
          const positive = vals.filter(d => d > 0).reduce((ds, d) => ds + d, 0)
          const negative = vals.filter(d => d < 0).reduce((ds, d) => ds + d, 0)
          return [
            positive > totals[0] ? positive : totals[0],
            negative > totals[1] ? negative : totals[1]
          ]
        }, [0, 0])
        domain = invert ? [positiveTotal, negativeTotal] : [negativeTotal, positiveTotal]
      } else {
        // If we're not stacking, use the min and max values
        domain = invert ? [max, min] : [min, max]
      }
    }

    const scale = scales[type]()
      .domain(domain)

    // If we're not using an ordinal scale, round the ticks to "nice" values
    if (type !== 'ordinal') {
      scale.nice()
    }

    // Now we need to figure out the range
    let range = vertical
      ? invert ? [0, height] : [height, 0] // If the axis is inverted, swap the range, too
      : invert ? [width, 0] : [0, width]

    if (!primary) {
      // Secondary axes are usually dependent on primary axes for orientation, so if the
      // primaryAxis is in RTL mode, we need to reverse the range on this secondary axis
      // to match the origin of the primary axis
      if (primaryAxis.RTL) {
        range = range.reverse()
      }
    }
    // Set the range
    scale.range(range)

    let barWidth = 1
    // If this is the primary axis, it could possibly be used to display bars.
    if (primary) {
      // Calculate a band axis that is similar and pass down the bandwidth
      // just in case.
      const bandScale = scaleBand()
        .domain(accessedData.reduce((prev, current) => current.length > prev.length ? current : prev, []).map(d => d.primary))
        .rangeRound(scale.range(), 0.1)
        .paddingInner(barPaddingInner)
        .paddingOuter(barPaddingOuter)
      barWidth = bandScale.bandwidth()
      // TODO: scale.stepSize = bandScale.step()
      // TODO: scale.barPaddingOuterSize = (scale.stepSize * barPaddingOuter) / 2
    }

    // Set some extra values on the axis for posterity
    const axis = {
      scale,
      primary,
      invert,
      vertical,
      RTL,
      position,
      centerTicks,
      barPaddingInner,
      barPaddingOuter,
      stacked,
      barWidth
    }

    // Make sure we start with a prevAxis
    this.prevAxis = this.prevAxis || axis

    this.props.dispatch(state => ({
      axes: {
        ...state.axes,
        [id]: axis
      }
    }))
  }
  measure () {
    // Measure finds the amount of overflow this axis produces and
    // updates the margins to ensure that the axis is visible
    // Unfortunately, this currently happens after a render, but potentially
    // could happen pre-render if we could reliably predict the size of the
    // labels before they render. Considering that ticks could be anything,
    // even a react component, this could get very tough.
    const {
      tickSizeInner,
      tickSizeOuter,
      tickPadding,
      position,
      dispatch
    } = this.props

    if (!this.el) {
      return
    }

    const isHorizontal = position === positionTop || position === positionBottom
    const labelDims = Array(...this.el.querySelectorAll(textEl + '.-measureable')).map(el => el.getBoundingClientRect())

    if (!labelDims.length || labelDims.length !== this.ticks.length) {
      window.setTimeout(() => {
        window.requestAnimationFrame(this.measure)
      }, 1)
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
      left = Math.ceil(getPixel(labelDims[0].width) / 2)
      right = Math.ceil(getPixel(labelDims[labelDims.length - 1].width) / 2)
      height =
        Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
        tickPadding + // Add tick padding
        Math.max(...labelDims.map(d => Math.ceil(getPixel(d.height)))) // Add the height of the largest label
    } else {
      // Add height overflow from the first and last ticks
      top = Math.ceil(getPixel(labelDims[0].height) / 2)
      bottom = Math.ceil(getPixel(labelDims[labelDims.length - 1].height) / 2)
      width =
        Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
        tickPadding + // Add tick padding
        Math.max(...labelDims.map(d => Math.ceil(getPixel(d.width)))) // Add the width of the largest label
    }

    dispatch(state => ({
      ...state,
      axisDimensions: {
        ...state.axisDimensions,
        [position]: {
          width,
          height,
          top,
          bottom,
          left,
          right
        }
      }
    }))
  }
  render () {
    const {
      axis,
      position,
      width,
      height,
      showGrid,
      tickArguments,
      tickValues,
      tickFormat,
      tickSizeInner,
      tickSizeOuter,
      tickPadding,
      centerTicks
    } = this.props

    // Render Dependencies
    if (!axis) {
      return null
    }

    const scale = axis.scale

    const vertical = detectVertical(position)
    const max =
      position === positionBottom ? -height
      : position === positionLeft ? width
      : position === positionTop ? height
      : -width
    const RTL = (position === positionTop || position === positionLeft) ? -1 : 1
    const transform = !vertical ? translateX : translateY
    const ticks = this.ticks = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues
    const format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat
    const spacing = Math.max(tickSizeInner, 0) + tickPadding
    const range = scale.range()
    const range0 = range[0] + 0.5
    const range1 = range[1] + 0.5
    const itemWidth = centerTicks ? axis.barWidth : 1
    // const seriesPadding = centerTicks ? axis.barPaddingOuter * axis.stepSize : 0
    const seriesPadding = 0
    const tickPosition = seriesPadding + (itemWidth / 2)

    return (
      <Animate
        data={{
          width,
          height,
          max,
          range0,
          range1,
          RTL,
          tickSizeOuter,
          tickPosition
        }}
      >
        {({
          width,
          height,
          max,
          range0,
          range1,
          RTL,
          tickSizeOuter,
          tickPosition
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
              textAnchor={position === positionRight ? 'start' : position === positionLeft ? 'end' : 'middle'}
              transform={position === positionRight ? translateX(width) : position === positionBottom ? translateY(height) : undefined}
            >
              <Path
                className='domain'
                d={axisPath}
                style={{
                  stroke: '#acacac',
                  strokeWidth: '1',
                  fill: 'transparent'
                }}
              />
              <Transition
                data={ticks}
                getKey={(d, i) => d}
                update={d => ({
                  tick: scale(d),
                  visible: 1,
                  measureable: 1
                })}
                enter={d => ({
                  tick: this.prevAxis.scale(d),
                  visible: 0,
                  measureable: 1
                })}
                leave={d => ({
                  tick: scale(d),
                  visible: 0,
                  measureable: 0
                })}
                ignore={['measureable', 'visible']}
              >
                {(inters) => {
                  return (
                    <g
                      className='ticks'
                      ref={el => { this.el = el }}
                    >
                      {inters.map((inter) => {
                        return (
                          <g
                            key={inter.key}
                            className='tick'
                            transform={transform(inter.state.tick)}
                          >
                            <Line
                              x1={vertical ? '0.5' : tickPosition}
                              x2={vertical ? RTL * tickSizeInner : tickPosition}
                              y1={vertical ? tickPosition : '0.5'}
                              y2={vertical ? tickPosition : RTL * tickSizeInner}
                              visible={inter.state.visible}
                              style={{
                                strokeWidth: 1,
                                opacity: 0.2
                              }}
                            />
                            {showGrid && (
                              <Line
                                x1={vertical ? '0.5' : '0.5'}
                                x2={vertical ? max : '0.5'}
                                y1={vertical ? '0.5' : '0.5'}
                                y2={vertical ? '0.5' : max}
                                visible={inter.state.visible}
                                style={{
                                  strokeWidth: 1,
                                  opacity: 0.2
                                }}
                              />
                            )}
                            <Text
                              x={vertical ? RTL * spacing : tickPosition}
                              y={vertical ? tickPosition : RTL * spacing}
                              dy={position === positionTop ? '0em' : position === positionBottom ? '0.71em' : '0.32em'}
                              className={inter.state.measureable && '-measureable'}
                              visible={inter.state.visible}
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

export default Connect((state, props) => {
  const {
    type,
    position
  } = props

  const id = `${type}_${position}`

  return {
    id,
    accessedData: state.accessedData,
    width: Selectors.gridWidth(state),
    height: Selectors.gridHeight(state),
    primaryAxis: Selectors.primaryAxis(state),
    axis: state.axes && state.axes[id],
    showGrid: state.showGrid,
    tickArguments: state.tickArguments,
    tickValues: state.tickValues,
    tickFormat: state.tickFormat,
    tickSizeInner: state.tickSizeInner,
    tickSizeOuter: state.tickSizeOuter,
    tickPadding: state.tickPadding
  }
})(Axis)

function identity (x) {
  return x
}

function translateX (x) {
  return 'translate(' + x + ',0)'
}

function translateY (y) {
  return 'translate(0,' + y + ')'
}
