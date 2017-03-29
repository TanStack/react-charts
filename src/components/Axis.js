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

const fontSize = 10

const detectVertical = position => [positionLeft, positionRight].indexOf(position) > -1
const detectRTL = (position) => [positionTop, positionRight].indexOf(position) > -1
const getPixel = d => d
const radiansToDegrees = r => r * (180 / Math.PI)

class Axis extends PureComponent {
  static defaultProps = {
    tickArguments: [],
    tickValues: null,
    tickFormat: null,
    tickSizeInner: 6,
    tickSizeOuter: 6,
    tickPadding: 3,
    maxLabelRotation: 50,
    barPaddingInner: 0.1,
    barPaddingOuter: 0.1,
    showGrid: true
  }
  // Lifecycle
  constructor () {
    super()
    this.rotation = 0
    this.visibleLabelStep = 1
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
        const seriesValues = series.data.map(d => d[datumKey])
        seriesValues.forEach(d => {
          if (uniqueVals.indexOf(d) === -1) {
            uniqueVals.push(d)
          }
        })
      })
      domain = invert ? [...uniqueVals].reverse() : uniqueVals
    } else if (type === 'time') {
      min = max = accessedData[0].data[0][datumKey]
      accessedData.forEach(series => {
        const seriesValues = series.data.map(d => +d[datumKey])
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
        const seriesValues = series.data.map(d => d[datumKey])
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
        .domain(accessedData.reduce((prev, current) => current.data.length > prev.length ? current.data : prev, []).map(d => d.primary))
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
    // updates the margins to ensure that the axis is visibility
    // Unfortunately, this currently happens after a render, but potentially
    // could happen pre-render if we could reliably predict the size of the
    // labels before they render. Considering that ticks could be anything,
    // even a react component, this could get very tough.
    const {
      tickSizeInner,
      tickSizeOuter,
      tickPadding,
      maxLabelRotation,
      position,
      dispatch
    } = this.props

    const {
      rotation,
      visibleLabelStep
    } = this

    if (!this.el) {
      return
    }

    const isHorizontal = position === positionTop || position === positionBottom
    const labelDims = Array(...this.el.querySelectorAll('.tick.-measureable text')).map(el => el.getBoundingClientRect())

    let smallestTickGap = 10000 // This is just a ridiculously large tick spacing that would never happen (hopefully)
    // If the axis is horizontal, we need to determine any necessary rotation and tick skipping
    if (isHorizontal) {
      const tickDims = Array(...this.el.querySelectorAll('.tick.-measureable')).map(el => el.getBoundingClientRect())
      tickDims.reduce((prev, current) => {
        if (prev) {
          const gap = current.left - prev.left - (fontSize / 2)
          smallestTickGap = gap < smallestTickGap ? gap : smallestTickGap
        }
        return current
      })
      const largestLabel = labelDims.reduce((prev, current) => {
        current._overflow = current.width - smallestTickGap
        if (current._overflow > 0 && current._overflow > prev._overflow) {
          return current
        }
        return prev
      }, {_overflow: 0})

      let newRotation = Math.min(Math.max(Math.abs(radiansToDegrees(Math.acos(smallestTickGap / largestLabel.width))), 0), maxLabelRotation)
      newRotation = isNaN(newRotation) ? 0 : newRotation

      if (Math.floor(rotation) !== Math.floor(newRotation)) {
        console.log(rotation, newRotation)
        this.rotation = newRotation
        // this.setState(state => ({
        //   rotation: newRotation
        // }))
        // return
      }
    }

    const newVisibleLabelStep = Math.ceil(fontSize / smallestTickGap)

    if (visibleLabelStep !== newVisibleLabelStep) {
      console.log(visibleLabelStep, newVisibleLabelStep)
      this.visibleLabelStep = newVisibleLabelStep
      // this.setState(state => ({
      //   visibleLabelStep: newVisibleLabelStep
      // }))
      // return
    }

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

    // Determine axis rotation before we measure

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

    const {
      rotation,
      visibleLabelStep
    } = this

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
                data={ticks.map((d, i) => ({tick: d, index: i}))}
                getKey={(d, i) => String(d.tick)}
                update={d => ({
                  tick: scale(d.tick),
                  visibility: d.index % visibleLabelStep === 0 ? 1 : 0,
                  // visibility: 1,
                  measureable: 1,
                  rotation
                })}
                enter={d => ({
                  tick: this.prevAxis.scale(d.tick),
                  visibility: 0,
                  measureable: 1,
                  rotation: 0
                })}
                leave={d => ({
                  tick: scale(d.tick),
                  visibility: 0,
                  measureable: 0,
                  rotation
                })}
                ignore={['measureable']}
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
                            className={'tick' + (inter.state.measureable ? ' -measureable' : '')}
                            transform={transform(inter.state.tick)}
                          >
                            <Line
                              x1={vertical ? '0.5' : tickPosition}
                              x2={vertical ? RTL * tickSizeInner : tickPosition}
                              y1={vertical ? tickPosition : '0.5'}
                              y2={vertical ? tickPosition : RTL * tickSizeInner}
                              style={{
                                strokeWidth: 1
                              }}
                              opacity={inter.state.visibility * 0.2}
                            />
                            {showGrid && (
                              <Line
                                x1={vertical ? '0.5' : '0.5'}
                                x2={vertical ? max : '0.5'}
                                y1={vertical ? '0.5' : '0.5'}
                                y2={vertical ? '0.5' : max}
                                style={{
                                  strokeWidth: 1
                                }}
                                opacity={inter.state.visibility * 0.2}
                              />
                            )}
                            <Text
                              opacity={inter.state.visibility}
                              fontSize={fontSize}
                              transform={`
                                translate(${vertical ? RTL * spacing : tickPosition}, ${vertical ? tickPosition : RTL * spacing})
                                rotate(${-rotation})
                              `}
                              dominantBaseline={rotation ? 'central' : position === positionBottom ? 'hanging' : position === positionTop ? 'alphabetic' : 'central'}
                              textAnchor={rotation ? 'end' : position === positionRight ? 'start' : position === positionLeft ? 'end' : 'middle'}
                            >
                              {format(inter.data.tick)}
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
