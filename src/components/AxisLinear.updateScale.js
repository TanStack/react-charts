import { scaleLinear, scaleLog, scaleTime, scaleBand } from 'd3-scale'
//
import {
  positionTop,
  positionLeft,
  positionRight,
  positionBottom,
} from './AxisLinear'

const scales = {
  linear: scaleLinear,
  log: scaleLog,
  time: scaleTime,
  ordinal: scaleBand,
}

const detectVertical = position =>
  [positionLeft, positionRight].indexOf(position) > -1
const detectRTL = position =>
  [positionTop, positionRight].indexOf(position) > -1

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
    innerPadding,
    outerPadding,
    tickArguments,
    tickValues,
    tickFormat,
    tickPadding,
    tickSizeInner,
    // Context
    materializedData,
    width,
    height,
    primaryAxis,
  } = props

  // We need the data to proceed
  if (!materializedData) {
    return
  }

  // If this axis is secondary, we need the primaryAxis to proceed
  if (!primary && !primaryAxis) {
    return
  }

  // Detect some settings
  const valueKey = primary ? 'primary' : 'secondary'
  const groupKey = !primary && 'primary'
  const vertical = detectVertical(position)
  const RTL = primary && detectRTL(position) // Right to left OR top to bottom

  // TODO: Any sorting needs to happen here, else the min/max's might not line up correctly

  // First we need to find unique values, min/max values and negative/positive totals
  let uniqueVals = []
  let min = 0
  let max = 0
  let datumValues = {}
  let negativeTotal = 0
  let positiveTotal = 0
  let domain

  if (type === 'ordinal') {
    materializedData.forEach(series => {
      const seriesValues = series.data.map(d => d[valueKey])
      seriesValues.forEach(d => {
        if (uniqueVals.indexOf(d) === -1) {
          uniqueVals.push(d)
        }
      })
    })
    domain = uniqueVals
  } else if (type === 'time') {
    const firstRow = materializedData[0].data[0] || {}
    min = max = firstRow[valueKey]
    materializedData.forEach(series => {
      const seriesValues = series.data.map(d => +d[valueKey])
      seriesValues.forEach((d, i) => {
        const key = groupKey ? series.data[i][groupKey] : i
        datumValues[key] = [...(datumValues[key] || []), d]
      })
      const seriesMin = Math.min(...seriesValues)
      const seriesMax = Math.max(...seriesValues)
      min = Math.min(min, seriesMin)
      max = Math.max(max, seriesMax)
    })
    domain = [min, max]
  } else {
    materializedData.forEach(series => {
      const seriesValues = series.data.map(d => d[valueKey])
      seriesValues.forEach((d, i) => {
        const key = groupKey ? series.data[i][groupKey] : i
        datumValues[key] = [...(datumValues[key] || []), d]
      })
      const seriesMin = Math.min(...seriesValues)
      const seriesMax = Math.max(...seriesValues)
      min = Math.min(min, seriesMin)
      max = Math.max(max, seriesMax)
    })
    if (stacked) {
      // If we're stacking, calculate and use the max and min values for the largest stack
      ;[positiveTotal, negativeTotal] = Object.keys(datumValues)
        .map(d => datumValues[d])
        .reduce(
          (totals, vals) => {
            const positive = vals
              .filter(d => d >= 0)
              .reduce((ds, d) => ds + d, 0)
            const negative = vals
              .filter(d => d < 0)
              .reduce((ds, d) => ds + d, 0)
            return [
              positive > totals[0] ? positive : totals[0],
              negative < totals[1] ? negative : totals[1],
            ]
          },
          [0, 0]
        )
      domain = [negativeTotal, positiveTotal]
    } else {
      // If we're not stacking, use the min and max values
      domain = [min, max]
    }
  }

  // Now we need to figure out the range
  let range = vertical
    ? [height, 0] // If the axis is inverted, swap the range, too
    : [0, width]

  if (!primary) {
    // Secondary axes are usually dependent on primary axes for orientation, so if the
    // primaryAxis is in RTL mode, we need to reverse the range on this secondary axis
    // to match the origin of the primary axis
    if (primaryAxis.RTL) {
      range = [...range].reverse()
    }
  }

  // Give the scale a home
  let scale

  // If this is an ordinal or other primary axis, it needs to be able to display bars.
  let bandScale
  let barSize = 1
  let stepSize = 0

  if (type === 'ordinal' || primary) {
    // Calculate a band axis that is similar and pass down the bandwidth
    // just in case.
    bandScale = scaleBand()
      .domain(
        materializedData
          .reduce(
            (prev, current) =>
              current.data.length > prev.length ? current.data : prev,
            []
          )
          .map(d => d.primary)
      )
      .rangeRound(range, 0.1)
      .padding(0)

    if (type === 'ordinal') {
      bandScale.paddingOuter(outerPadding).paddingInner(innerPadding)
      barSize = bandScale.bandwidth()
    } else {
      barSize = bandScale.bandwidth()
    }

    stepSize = bandScale.step()
  }

  if (type === 'ordinal') {
    // If it's ordinal, just assign the bandScale we made
    scale = bandScale
  } else {
    // Otherwise, create a new scale of the appropriate type
    scale = scales[type]()
  }

  // Set the domain
  scale.domain(invert ? [...domain].reverse() : domain)

  // Now set the range
  scale.range(range)

  // If we're not using an ordinal scale, round the ticks to "nice" values
  if (type !== 'ordinal') {
    scale.nice()
  }

  // Pass down the axis config (including the scale itself) for posterity
  const axis = {
    type,
    scale,
    uniqueVals,
    primary,
    invert,
    vertical,
    RTL,
    position,
    stacked,
    barSize,
    stepSize,
    domain,
    range,
    max: position === positionBottom
      ? -height
      : position === positionLeft
        ? width
        : position === positionTop ? height : -width,
    directionMultiplier: position === positionTop || position === positionLeft
      ? -1
      : 1,
    transform: !vertical ? translateX : translateY,
    ticks: (this.ticks = tickValues == null
      ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()
      : tickValues),
    format: tickFormat == null
      ? scale.tickFormat
        ? scale.tickFormat.apply(scale, tickArguments)
        : identity
      : tickFormat,
    spacing: Math.max(tickSizeInner, 0) + tickPadding,
  }

  if (type === 'ordinal') {
    axis.gridOffset = -(axis.stepSize * innerPadding) / 2
    axis.tickOffset = axis.barSize / 2
    axis.barOffset = 0
  } else {
    axis.tickOffset = 0
    axis.barOffset = -axis.barSize / 2
  }

  // Make sure we start with a prevAxis
  this.prevAxis = this.prevAxis || axis

  this.props.dispatch(
    state => ({
      ...state,
      axes: {
        ...state.axes,
        [id]: axis,
      },
    }),
    {
      type: 'axisUpdateScale',
    }
  )
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
