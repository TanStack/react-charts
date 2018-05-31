import { scaleLinear, scaleLog, scaleTime, scaleUtc, scaleBand } from 'd3-scale'
//
import { positionTop, positionLeft, positionRight, positionBottom } from './AxisLinear'

const scales = {
  linear: scaleLinear,
  log: scaleLog,
  time: scaleTime,
  utc: scaleUtc,
  ordinal: scaleBand,
}

const detectVertical = position => [positionLeft, positionRight].indexOf(position) > -1
const detectRTL = position => [positionTop, positionRight].indexOf(position) > -1

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
    base,
    min: defaultMin,
    max: defaultMax,
    hardMin,
    hardMax,
    primaryAxisID,
    // Context
    materializedData,
    width,
    height,
    primaryAxes,
  } = props

  // We need the data to proceed
  if (!materializedData) {
    return
  }

  // If this axis is secondary, we need the primaryAxes to proceed
  if (!primary && !primaryAxes.length) {
    return
  }

  // Detect some settings
  const valueKey = primary ? 'primary' : 'secondary'
  const groupKey = !primary && 'primary'
  const AxisIDKey = `${valueKey}AxisID`
  const vertical = detectVertical(position)
  const RTL = detectRTL(position) // Right to left OR top to bottom

  // TODO: Any sorting needs to happen here, else the min/max's might not line up correctly

  // First we need to find unique values, min/max values and negative/positive totals
  const uniqueVals = []
  let min
  let max
  const datumValues = {}
  let negativeTotal = 0
  let positiveTotal = 0
  let domain

  if (type === 'ordinal') {
    materializedData.forEach(series => {
      if (series[AxisIDKey] && series[AxisIDKey] !== id) {
        return
      }
      const seriesValues = series.datums.map(d => d[valueKey])
      seriesValues.forEach(d => {
        if (uniqueVals.indexOf(d) === -1) {
          uniqueVals.push(d)
        }
      })
    })
    domain = uniqueVals
  } else if (type === 'time' || type === 'utc') {
    materializedData.forEach(series => {
      if (series[AxisIDKey] && series[AxisIDKey] !== id) {
        return
      }
      const seriesValues = series.datums.map(d => +d[valueKey])
      seriesValues.forEach((d, i) => {
        const key = groupKey ? series.datums[i][groupKey] : i
        datumValues[key] = [...(datumValues[key] || []), d]
      })
      min = Math.min(...(typeof min !== 'undefined' ? [min] : []), ...seriesValues)
      max = Math.max(...(typeof max !== 'undefined' ? [max] : []), ...seriesValues)
    })
    domain = [min, max]
  } else {
    // Linear scale
    materializedData.forEach(series => {
      if (series[AxisIDKey] && series[AxisIDKey] !== id) {
        return
      }
      let seriesValues = series.datums.map(d => d[valueKey])
      seriesValues.forEach((d, i) => {
        const key = groupKey ? series.datums[i][groupKey] : i
        datumValues[key] = [...(datumValues[key] || []), d]
      })
      seriesValues = seriesValues.filter(d => typeof d === 'number')
      min = Math.min(...(typeof min === 'number' ? [min] : []), ...seriesValues)
      max = Math.max(...(typeof max === 'number' ? [max] : []), ...seriesValues)
    })
    if (stacked) {
      // If we're stacking, calculate and use the max and min values for the largest stack
      [positiveTotal, negativeTotal] = Object.keys(datumValues)
        .map(d => datumValues[d])
        .reduce(
          (totals, vals) => {
            const positive = vals.filter(d => d >= 0).reduce((ds, d) => ds + d, 0)
            const negative = vals.filter(d => d < 0).reduce((ds, d) => ds + d, 0)
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
    const primaryAxis = primaryAxisID ? primaryAxes[primaryAxisID] : primaryAxes[0]
    if (primaryAxis.RTL) {
      range = [...range].reverse()
    }
  }

  // Give the scale a home
  let scale

  // If this is an ordinal or other primary axis, it needs to be able to display bars.
  let bandScale
  let barSize = 0
  let stepSize = 0

  let seriesBandScale = d => d
  let seriesBarSize = 1

  if (type === 'ordinal' || primary) {
    // Calculate a band axis that is similar and pass down the bandwidth
    // just in case.
    bandScale = scaleBand()
      .domain(
        materializedData
          .reduce(
            (prev, current) => (current.datums.length > prev.length ? current.datums : prev),
            []
          )
          .map(d => d.primary)
      )
      .rangeRound(range, 0.1)
      .padding(0)

    if (type === 'ordinal') {
      bandScale.paddingOuter(outerPadding).paddingInner(innerPadding)
      barSize = bandScale.bandwidth()
    }

    // barSize = bandScale.bandwidth()
    stepSize = bandScale.step()

    // Create a seriesBandScale in case this axis isn't stacked
    seriesBandScale = scaleBand()
      .paddingInner(innerPadding / 2)
      .domain(materializedData.filter(d => d.Component.isBar).map((d, i) => i))
      .rangeRound([0, barSize])

    seriesBarSize = seriesBandScale.bandwidth()
  }

  if (type === 'ordinal') {
    // If it's ordinal, just assign the bandScale we made
    scale = bandScale
  } else {
    // Otherwise, create a new scale of the appropriate type
    scale = scales[type]()
  }

  // Set base, min, and max
  if (typeof base === 'number') {
    domain[0] = Math.min(domain[0], base)
    domain[1] = Math.max(domain[1], base)
  }
  if (typeof defaultMin === 'number') {
    domain[0] = Math.min(domain[0], defaultMin)
  }
  if (typeof defaultMax === 'number') {
    domain[1] = Math.max(domain[1], defaultMax)
  }

  // Set the domain
  scale.domain(domain)

  // If we're not using an ordinal scale, round the ticks to "nice" values
  if (type !== 'ordinal') {
    scale.nice()
  }

  // If hard min and max are set, override any "nice" rounding values
  if (typeof hardMin === 'number') {
    scale.domain([hardMin, scale.domain()[1]])
  }
  if (typeof hardMax === 'number') {
    scale.domain([scale.domain()[0], hardMax])
  }

  // Invert if necessary
  if (invert) {
    scale.domain([...scale.domain()].reverse())
  }

  // Now set the range
  scale.range(range)

  // Pass down the axis config (including the scale itself) for posterity
  const axis = {
    id,
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
    seriesBandScale,
    seriesBarSize,
    domain,
    range,
    max:
      position === positionBottom
        ? -height
        : position === positionLeft
          ? width
          : position === positionTop
            ? height
            : -width,
    directionMultiplier: position === positionTop || position === positionLeft ? -1 : 1,
    transform: !vertical ? translateX : translateY,
    ticks: (this.ticks = !tickValues
      ? scale.ticks
        ? scale.ticks(...tickArguments)
        : scale.domain()
      : tickValues),
    format: !tickFormat
      ? scale.tickFormat
        ? scale.tickFormat(...tickArguments)
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
  return `translate3d(${x}px, 0, 0)`
}

function translateY (y) {
  return `translate3d(0, ${y}px, 0)`
}
