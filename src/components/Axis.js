import React, { PureComponent } from 'react'
import { Animate, Transition } from 'react-move'
import { scaleBand } from 'd3-scale'
//
import Path from '../primitives/Path'
import Line from '../primitives/Line'
import Text from '../primitives/Text'

import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'

const positionTop = 'top'
const positionRight = 'right'
const positionBottom = 'bottom'
const positionLeft = 'left'

const detectVertical = position => [positionLeft, positionRight].indexOf(position) > -1
const detectRTL = (position) => [positionTop, positionRight].indexOf(position) > -1

const textEl = 'text'

// const getPixel = d => parseFloat(d)
const getPixel = d => d

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
    this.updateAxis = this.updateAxis.bind(this)
  }
  componentWillReceiveProps (newProps) {
    const oldProps = this.props
    if (oldProps.axis !== newProps.axis) {
      this.prevAxis = oldProps.axis
    }
  }
  componentDidMount () {
    this.updateAxis(this.props)
    this.measure()
  }
  componentWillUpdate (newProps) {
    const oldProps = this.props
    const {
      position,
      scale
    } = newProps

    // If the position or any of the scales change,
    // we need to update the axis
    if (
      position !== oldProps.position ||
      scale !== oldProps.scale
    ) {
      this.updateAxis(newProps)
    }
  }
  componentDidUpdate () {
    window.requestAnimationFrame(this.measure)
  }
  // Helpers
  updateAxis (props) {
    const {
      id,
      position,
      scale,
      width,
      height,
      invert,
      primaryAxis,
      centerTicks,
      data,
      getSeries,
      getX,
      barPaddingInner,
      barPaddingOuter,
      stacked
    } = props

    if (!scale) {
      return
    }

    // Detect if the axis is vertical
    const isVertical = detectVertical(position)
    // Detect if the primary scale is in an RTL psotion (either right to left or top to bottom)
    let isRTL = scale.isPrimary && detectRTL(position)
    // Detect if axis is being inverted
    let isInverted = !!invert
    // If the scale was already inverted, swap it back. Let's not triple stamp a double stamp ;)
    isInverted = scale.inverted ? !isInverted : isInverted

    let range

    range = isVertical // If the primaryAxis is vertical, we will use the gridWidth, else we use the height
    ? isInverted ? [0, height] : [height, 0] // If the axis is being inverted, swap the range
    : isInverted ? [width, 0] : [0, width]

    if (!scale.isPrimary) {
      // Secondary scales are dependent on primary scales for orientation
      if (!primaryAxis) {
        // But if we don't have the primary scale yet, we need to wait for it before we can proceed
        return
      }
      // If the primaryAxis is in an RTL mode, we need to toggle the inversion on this secondary scale
      if (primaryAxis.isRTL) {
        isInverted = !isInverted
        range = range.reverse()
      }
    }

    const axis = scale.copy()

    // Pass down some information with the axis
    axis.range(range)
    axis.isPrimary = scale.isPrimary
    Object.assign(axis, {
      isVertical,
      isRTL,
      isInverted,
      position,
      centerTicks,
      barPaddingInner,
      barPaddingOuter,
      barWidth: 1,
      isStacked: stacked
    })

    if (axis.isPrimary) {
      // If this is the primary axis, it could possibly be used to display bars.
      // Calculate a band scale that is similar and pass down the bandwidth
      // just in case.
      const bandScale = scaleBand()
        .domain((getSeries(data[0]) || []).map(getX))
        .rangeRound(axis.range(), 0.1)
        .paddingInner(barPaddingInner)
        .paddingOuter(barPaddingOuter)
      axis.barWidth = bandScale.bandwidth()
      // axis.stepSize = bandScale.step()
      // axis.barPaddingOuterSize = (axis.stepSize * barPaddingOuter) / 2
    } else {
      // If this secondaryAxis is stacked, we should extend the axis and scale's domain
      // to the accumulative min and max (we precalculated it in the scale, so no biggie)
    }

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
      primaryAxis,
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
    if (!axis || !primaryAxis) {
      return null
    }

    const isVertical = detectVertical(position)
    const max =
      position === positionBottom ? -height
      : position === positionLeft ? width
      : position === positionTop ? height
      : -width
    const isRTL = (position === positionTop || position === positionLeft) ? -1 : 1
    const transform = !isVertical ? translateX : translateY
    const ticks = this.ticks = tickValues == null ? (axis.ticks ? axis.ticks.apply(axis, tickArguments) : axis.domain()) : tickValues
    const format = tickFormat == null ? (axis.tickFormat ? axis.tickFormat.apply(axis, tickArguments) : identity) : tickFormat
    const spacing = Math.max(tickSizeInner, 0) + tickPadding
    const range = axis.range()
    const range0 = range[0] + 0.5
    const range1 = range[1] + 0.5
    const itemWidth = centerTicks ? axis.barWidth : 1
    // const seriesPadding = centerTicks ? axis.barPaddingOuter * axis.stepSize : 0
    const seriesPadding = 0
    const tickPosition = seriesPadding + (itemWidth / 2)

    this.prevAxis = axis

    return (
      <Animate
        data={{
          width,
          height,
          max,
          range0,
          range1,
          isRTL,
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
          isRTL,
          tickSizeOuter,
          tickPosition
        }) => {
          let axisPath
          if (isVertical) {
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
                  tick: axis(d),
                  visible: 1,
                  measureable: 1
                })}
                enter={d => ({
                  tick: this.prevAxis(d),
                  visible: 0,
                  measureable: 1
                })}
                leave={d => ({
                  tick: axis(d),
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
                              x1={isVertical ? '0.5' : tickPosition}
                              x2={isVertical ? isRTL * tickSizeInner : tickPosition}
                              y1={isVertical ? tickPosition : '0.5'}
                              y2={isVertical ? tickPosition : isRTL * tickSizeInner}
                              visible={inter.state.visible}
                              style={{
                                strokeWidth: 1,
                                opacity: 0.2
                              }}
                            />
                            {showGrid && (
                              <Line
                                x1={isVertical ? '0.5' : '0.5'}
                                x2={isVertical ? max : '0.5'}
                                y1={isVertical ? '0.5' : '0.5'}
                                y2={isVertical ? '0.5' : max}
                                visible={inter.state.visible}
                                style={{
                                  strokeWidth: 1,
                                  opacity: 0.2
                                }}
                              />
                            )}
                            <Text
                              x={isVertical ? isRTL * spacing : tickPosition}
                              y={isVertical ? tickPosition : isRTL * spacing}
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
    scaleID,
    position
  } = props

  const id = `${scaleID}_${position}`

  return {
    id,
    data: state.data,
    width: Selectors.gridWidth(state),
    height: Selectors.gridHeight(state),
    getSeries: state.getSeries,
    getX: state.getX,
    getY: state.getY,
    primaryAxis: Selectors.primaryAxis(state),
    scale: state.scales && state.scales[scaleID],
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
