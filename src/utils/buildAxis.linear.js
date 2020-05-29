import { scaleLinear, scaleLog, scaleTime, scaleUtc, scaleBand } from '../d3'
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
  axisTypeLog,
} from '../utils/Constants.js'
import Utils from '../utils/Utils'

import Bar from '../seriesTypes/Bar'

const scales = {
  [axisTypeLinear]: scaleLinear,
  [axisTypeLog]: scaleLog,
  [axisTypeTime]: scaleTime,
  [axisTypeUtc]: scaleUtc,
  [axisTypeOrdinal]: scaleBand,
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
    tickCount = 'auto',
    minTickCount = 0,
    maxTickCount = Infinity,
    tickValues = null,
    format: userFormat = null,
    tickSizeInner = 6,
    tickSizeOuter = 6,
    tickPadding = 14,
    maxLabelRotation = 50,
    labelRotationStep = 5,
    innerPadding = 0.2,
    outerPadding = 0.1,
    showGrid = null,
    showTicks = true,
    show = true,
    stacked = false,
    id: userID,
  },
  materializedData,
  gridHeight,
  gridWidth,
  axisDimensions,
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

  // const axisDimension =
  //   axisDimensions && axisDimensions[position] && axisDimensions[position][id]

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
      Math.max(0, ...Object.values(positiveTotalByKey)),
    ]
  } else {
    domain = [min, max]
  }

  // Now we need to figure out the range
  let range = [0, vertical ? gridHeight : gridWidth] // axes by default read from top to bottom and left to right
  if (vertical && !primary) {
    // Vertical secondary ranges get inverted by default
    range.reverse()
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

  const scaleFormat = scale.tickFormat ? scale.tickFormat() : Utils.identity

  const format = userFormat
    ? (value, index) => userFormat(value, index, scaleFormat(value))
    : scaleFormat

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
    tickCount,
    minTickCount,
    maxTickCount,
    tickValues,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    maxLabelRotation,
    labelRotationStep,
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
    ticks:
      tickValues || scale.ticks
        ? scale
            .ticks
            // tickCount === 'auto'
            //   ? axisDimension
            //     ? axisDimension.tickCount
            //     : 10
            //   : tickCount
            ()
        : scale.domain(),
    format,
    spacing: Math.max(tickSizeInner, 0) + tickPadding,
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
