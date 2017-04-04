import {
  scaleLinear,
  scaleLog,
  scaleTime,
  scaleBand
} from 'd3-scale'
//
import {
  positionTop,
  positionLeft,
  positionRight,
  positionBottom
 } from './Axis'

const scales = {
  linear: scaleLinear,
  log: scaleLog,
  time: scaleTime,
  ordinal: scaleBand
}

const detectVertical = position => [positionLeft, positionRight].indexOf(position) > -1
const detectRTL = (position) => [positionTop, positionRight].indexOf(position) > -1

export default function updateScale (props) {
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
    tickArguments,
    tickValues,
    tickFormat,
    tickPadding,
    tickSizeInner,
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
  let barStepSize = 0
  let barPaddingOuterSize = 0
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
    barStepSize = bandScale.step()
    barPaddingOuterSize = (barStepSize * barPaddingOuter) / 2
  }

  // Set some extra values on the axis for posterity
  const axis = {
    type,
    scale,
    uniqueVals,
    primary,
    invert,
    vertical,
    RTL,
    position,
    centerTicks,
    barPaddingInner,
    barPaddingOuter,
    stacked,
    barWidth,
    barStepSize,
    barPaddingOuterSize,
    max:
      position === positionBottom ? -height
      : position === positionLeft ? width
      : position === positionTop ? height
      : -width,
    directionMultiplier: (position === positionTop || position === positionLeft) ? -1 : 1,
    transform: !vertical ? translateX : translateY,
    ticks: this.ticks = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
    format: tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat,
    spacing: Math.max(tickSizeInner, 0) + tickPadding,
    range: scale.range(),
    range0: range[0] + 0.5,
    range1: range[1] + 0.5,
    itemWidth: centerTicks ? barWidth : 1,
    seriesPadding: centerTicks ? barPaddingOuter * barStepSize : 0
  }

  axis.tickPosition = axis.seriesPadding + (axis.itemWidth / 2)

  // Make sure we start with a prevAxis
  this.prevAxis = this.prevAxis || axis

  this.props.dispatch(state => ({
    ...state,
    axes: {
      ...state.axes,
      [id]: axis
    }
  }))
}

function identity (x) {
  return x
}

function translateX (x) {
  return 'translate(' + x + ', 0)'
}

function translateY (y) {
  return 'translate(0, ' + y + ')'
}
