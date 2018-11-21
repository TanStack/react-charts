import { scaleLinear, scaleLog, scaleTime, scaleUtc, scaleBand } from 'd3-scale'
//
import {
  positionTop,
  positionRight,
  positionBottom,
  positionLeft,
  axisTypeOrdinal,
  axisTypeTime,
  axisTypeUtc,
  axisTypeLinear,
  axisTypeLog
} from '../utils/Constants.js'
import Utils from '../utils/Utils'

import Bar from '../seriesTypes/Bar'

const scales = {
  [axisTypeLinear]: scaleLinear,
  [axisTypeLog]: scaleLog,
  [axisTypeTime]: scaleTime,
  [axisTypeUtc]: scaleUtc,
  [axisTypeOrdinal]: scaleBand
}

const detectVertical = d => [positionLeft, positionRight].indexOf(d) > -1
const detectRTL = d => [positionTop, positionRight].indexOf(d) > -1

export default function buildAxisLinear({
  axis: {
    primary,
    type,
    invert,
    position,
    primaryAxisID,
    min: userMin = undefined,
    max: userMax = undefined,
    hardMin = undefined,
    hardMax = undefined,
    base = undefined,
    tickArguments = [],
    tickValues = null,
    tickFormat = null,
    tickSizeInner = 6,
    tickSizeOuter = 6,
    tickPadding = 3,
    maxLabelRotation = 50,
    innerPadding = 0.2,
    outerPadding = 0.1,
    showGrid = null,
    showTicks = true,
    show = true,
    stacked = false,
    id: userID
  },
  primaryAxes,
  materializedData,
  gridHeight,
  gridWidth
}) {
  if (!position) {
    throw new Error(`Chart axes must have a valid 'position' property`)
  }
  // Detect some settings
  const valueKey = primary ? 'primary' : 'secondary'
  const groupKey = !primary && 'primary'
  const AxisIDKey = `${valueKey}AxisID`
  const vertical = detectVertical(position)
  const RTL = detectRTL(position) // Right to left OR top to bottom

  const id = userID || `${position}_${type}`

  // TODO: Any sorting needs to happen here, else the min/max's might not line up correctly

  // First we need to find unique values, min/max values and negative/positive totals
  const uniqueVals = []
  let min
  let max
  let negativeTotalByKey = {}
  let positiveTotalByKey = {}
  let domain

  // Loop through each series
  for (
    let seriesIndex = 0;
    seriesIndex < materializedData.length;
    seriesIndex++
  ) {
    if (
      materializedData[seriesIndex][AxisIDKey] &&
      materializedData[seriesIndex][AxisIDKey] !== id
    ) {
      continue
    }
    // Loop through each datum
    for (
      let datumIndex = 0;
      datumIndex < materializedData[seriesIndex].datums.length;
      datumIndex++
    ) {
      const datum = materializedData[seriesIndex].datums[datumIndex]
      let value
      const key = groupKey ? datum[groupKey] : datumIndex
      // For ordinal scales, unique the values
      if (type === axisTypeOrdinal) {
        if (uniqueVals.indexOf() === -1) {
          uniqueVals.push(
            materializedData[seriesIndex].datums[datumIndex][valueKey]
          )
        }
      } else if (type === axisTypeTime || type === axisTypeUtc) {
        value = +datum[valueKey]
      } else {
        value = datum[valueKey]
      }

      // Add to stack total
      if (stacked) {
        if (value > 0) {
          positiveTotalByKey[key] =
            typeof positiveTotalByKey[key] !== 'undefined'
              ? positiveTotalByKey[key] + value
              : value
        } else {
          negativeTotalByKey[key] =
            typeof negativeTotalByKey[key] !== 'undefined'
              ? negativeTotalByKey[key] + value
              : value
        }
      } else {
        // Find min/max
        min = typeof min !== 'undefined' ? Math.min(min, value) : value
        max = typeof max !== 'undefined' ? Math.max(max, value) : value
      }
    }
  }

  if (type === axisTypeOrdinal) {
    domain = uniqueVals
  } else if (stacked) {
    domain = [
      Math.min(0, ...Object.values(negativeTotalByKey)),
      Math.max(0, ...Object.values(positiveTotalByKey))
    ]
  } else {
    domain = [min, max]
  }

  // Now we need to figure out the range
  let range = vertical
    ? [gridHeight, 0] // If the axis is inverted, swap the range, too
    : [0, gridWidth]

  if (!primary) {
    const primaryAxis =
      primaryAxes.find(d => d.id === primaryAxisID) || primaryAxes[0]
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
  let barSize = 0
  let cursorSize = 0
  let stepSize = 0

  let seriesBandScale = d => d
  let seriesBarSize = 1

  if (type === axisTypeOrdinal || primary) {
    // Calculate a band axis that is similar and pass down the bandwidth
    // just in case.
    bandScale = scaleBand()
      .domain(
        materializedData
          .reduce(
            (prev, current) =>
              current.datums.length > prev.length ? current.datums : prev,
            []
          )
          .map(d => d.primary)
      )
      .rangeRound(range, 0.1)
      .padding(0)

    bandScale.paddingOuter(outerPadding).paddingInner(innerPadding)
    barSize = bandScale.bandwidth()

    if (type === axisTypeOrdinal) {
      cursorSize = barSize
    }

    // barSize = bandScale.bandwidth()
    stepSize = bandScale.step()

    // Create a seriesBandScale in case this axis isn't stacked
    seriesBandScale = scaleBand()
      .paddingInner(innerPadding / 2)
      .domain(
        materializedData.filter(d => d.Component === Bar).map((d, i) => i)
      )
      .rangeRound([0, barSize])

    seriesBarSize = seriesBandScale.bandwidth()
  }

  if (type === axisTypeOrdinal) {
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
    domain[0] = Math.min(domain[0], userMin)
  }
  if (typeof defaultMax === 'number') {
    domain[1] = Math.max(domain[1], userMax)
  }

  // Set the domain
  scale.domain(domain)

  // If we're not using an ordinal scale, round the ticks to "nice" values
  if (type !== axisTypeOrdinal) {
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
    primary,
    type,
    invert,
    position,
    primaryAxisID,
    hardMin,
    hardMax,
    base,
    tickArguments,
    tickValues,
    tickFormat,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    maxLabelRotation,
    innerPadding,
    outerPadding,
    showGrid,
    showTicks,
    show,
    stacked,
    scale,
    uniqueVals,
    vertical,
    RTL,
    barSize,
    cursorSize,
    stepSize,
    seriesBandScale,
    seriesBarSize,
    domain,
    range,
    max:
      position === positionBottom
        ? -gridHeight
        : position === positionLeft
          ? gridWidth
          : position === positionTop
            ? gridHeight
            : -gridWidth,
    directionMultiplier:
      position === positionTop || position === positionLeft ? -1 : 1,
    transform: !vertical ? Utils.translateX : Utils.translateY,
    ticks: !tickValues
      ? scale.ticks
        ? scale.ticks(...tickArguments)
        : scale.domain()
      : tickValues,
    format: !tickFormat
      ? scale.tickFormat
        ? scale.tickFormat(...tickArguments)
        : Utils.identity
      : tickFormat,
    spacing: Math.max(tickSizeInner, 0) + tickPadding
  }

  if (type === axisTypeOrdinal) {
    axis.gridOffset = -(axis.stepSize * innerPadding) / 2
    axis.tickOffset = axis.barSize / 2
    axis.barOffset = 0
  } else {
    axis.tickOffset = 0
    axis.barOffset = -axis.barSize / 2
  }

  return axis
}
