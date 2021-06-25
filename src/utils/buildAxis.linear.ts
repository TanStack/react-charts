import {
  scaleLinear,
  scaleLog,
  scaleTime,
  scaleUtc,
  scaleBand,
  ScaleLinear,
  ScaleTime,
} from 'd3-scale'

import {
  AxisLinear,
  AxisLinearOptions,
  GridDimensions,
  ResolvedAxisLinearOptions,
  SeriesWithComponentIndex,
} from '../types'
//
import { translateX, translateY } from './Utils'

function defaultAxisOptions(
  options: AxisLinearOptions
): ResolvedAxisLinearOptions {
  return {
    ...options,
    tickCount: options.tickCount ?? 10,
    minTickCount: options.minTickCount ?? 1,
    maxTickCount: options.maxTickCount ?? 99999999,
    tickSizeInner: options.tickSizeInner ?? 6,
    tickSizeOuter: options.tickSizeOuter ?? 6,
    tickPadding: options.tickPadding ?? 10,
    labelRotation: options.labelRotation ?? 60,
    innerPadding: options.innerPadding ?? 0.2,
    outerPadding: options.outerPadding ?? 0.1,
    showTicks: options.showTicks ?? true,
    filterTicks: options.filterTicks ?? (d => d),
    show: options.show ?? true,
    stacked: options.stacked ?? false,
  }
}

export default function buildAxisLinear(
  userOptions: AxisLinearOptions,
  materializedData: SeriesWithComponentIndex[],
  gridDimensions: GridDimensions
): AxisLinear {
  const options = defaultAxisOptions(userOptions)

  if (!options.position) {
    throw new Error(`Chart axes must have a valid 'position' property`)
  }

  // Detect some settings
  const valueKey = options.primary ? 'primary' : 'secondary'
  const groupKey = !options.primary && 'primary'
  const AxisIdKey = `${valueKey}AxisId` as const
  const isVertical = ['left', 'right'].indexOf(options.position) > -1

  const id = options.id || `${options.position}_${options.type}`
  const isTimeType = ['time', 'utc'].includes(options.type)

  // First we need to find unique values, min/max values and negative/positive totals
  const uniquePrimariesSet = new Set<any>()
  let min
  let max
  const negativeTotalByKey: Record<any, number> = {}
  const positiveTotalByKey: Record<any, number> = {}
  let domain: [any, any] | any[]

  // Loop through each series
  for (
    let seriesIndex = 0;
    seriesIndex < materializedData.length;
    seriesIndex++
  ) {
    if (
      materializedData[seriesIndex][AxisIdKey] &&
      materializedData[seriesIndex][AxisIdKey] !== id
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
      let value = 0
      const key: any = groupKey ? datum[groupKey] : datumIndex
      // For ordinal scales, unique the values
      if (options.type === 'ordinal') {
        uniquePrimariesSet.add(
          materializedData[seriesIndex].datums[datumIndex][valueKey]
        )
      } else if (isTimeType) {
        value = +(datum[valueKey] as number)
      } else {
        value = datum[valueKey] as number
      }

      // Add to stack total
      if (options.stacked) {
        if (value > 0) {
          positiveTotalByKey[key] = (positiveTotalByKey[key] ?? 0) + value
        } else {
          negativeTotalByKey[key] = (negativeTotalByKey[key] ?? 0) + value
        }
      } else {
        // Find min/max
        min = typeof min !== 'undefined' ? Math.min(min, value) : value
        max = typeof max !== 'undefined' ? Math.max(max, value) : value
      }
    }
  }

  if (options.type === 'ordinal') {
    domain = Array.from(uniquePrimariesSet.values())
  } else if (options.stacked) {
    domain = [
      Math.min(0, ...Object.values(negativeTotalByKey)),
      Math.max(0, ...Object.values(positiveTotalByKey)),
    ]
  } else {
    domain = [min, max]
  }

  // Now we need to figure out the range
  const range: [number, number] = [
    0,
    isVertical ? gridDimensions.gridHeight : gridDimensions.gridWidth,
  ] // axes by default read from top to bottom and left to right: ;
  if (isVertical && !options.primary) {
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

  let seriesBandScale
  let seriesBarSize = 1

  if (options.type === 'ordinal' || options.primary) {
    // Calculate a band axis that is similar and pass down the bandwidth
    // just in case.

    bandScale = scaleBand()
      .domain(Array.from(uniquePrimariesSet.values()))
      .rangeRound(range)
      .padding(0)

    bandScale
      .paddingOuter(options.outerPadding)
      .paddingInner(options.innerPadding)
    barSize = bandScale.bandwidth()

    if (options.type === 'ordinal') {
      cursorSize = barSize
    }

    // barSize = bandScale.bandwidth()
    stepSize = bandScale.step()

    // Create a seriesBandScale in case this axis isn't stacked
    seriesBandScale = scaleBand()
      .paddingInner(options.innerPadding / 2)
      .domain(
        materializedData
          .filter(d => (d.Component as any).isBar)
          .map((_, i) => `${i}`)
      )
      .rangeRound([0, barSize])

    seriesBarSize = seriesBandScale.bandwidth()
  }

  if (options.type === 'ordinal') {
    // If it's ordinal, just assign the bandScale we made
    scale = bandScale
  } else {
    // Otherwise, create a new scale of the appropriate type
    if (options.type === 'linear') {
      scale = scaleLinear()
    } else if (options.type === 'log') {
      scale = scaleLog()
    } else if (options.type === 'time') {
      scale = scaleTime()
    } else if (options.type === 'utc') {
      scale = scaleUtc()
    } else if (options.type === 'ordinal') {
      scale = scaleBand()
    }
  }

  if (!scale) {
    console.info(userOptions)
    throw new Error('invalid axis type for axis above ☝️')
  }

  // Set base, min, and max
  if (typeof options.base === 'number') {
    domain[0] = Math.min(domain[0], options.base)
    domain[1] = Math.max(domain[1], options.base)
  }
  if (typeof options.min === 'number') {
    domain[0] = Math.min(domain[0], options.min)
  }
  if (typeof options.max === 'number') {
    domain[1] = Math.max(domain[1], options.max)
  }

  // Set the domain
  scale.domain(domain)

  // If we're not using an ordinal scale, round the ticks to "nice" values
  if (options.type !== 'ordinal') {
    ;(scale as
      | ScaleLinear<number, number, never>
      | ScaleTime<number, number, never>).nice()
  }

  // If hard min and max are set, override any "nice" rounding values
  if (typeof options.hardMin === 'number') {
    scale.domain([options.hardMin, Number(scale.domain()[1])])
  }
  if (typeof options.hardMax === 'number') {
    scale.domain([Number(scale.domain()[0]), options.hardMax])
  }

  // Invert if necessary
  if (options.invert) {
    // @ts-ignore
    scale.domain(Array.from(scale.domain()).reverse())
  }

  // Now set the range
  scale.range(range)

  // @ts-ignore
  const scaleFormat = scale.tickFormat ? scale.tickFormat() : d => d

  const userFormat = options?.format

  const format = userFormat
    ? (value: unknown, index: number) =>
        userFormat(value, index, scaleFormat(value))
    : scaleFormat

  const resolvedTickCount = options.tickCount

  const ticks = options.filterTicks(
    options.tickValues ||
      // @ts-ignore
      (scale.ticks ? scale.ticks(resolvedTickCount) : scale.domain())
  )

  const scaleMax =
    options.position === 'bottom'
      ? -gridDimensions.gridHeight
      : options.position === 'left'
      ? gridDimensions.gridWidth
      : options.position === 'top'
      ? gridDimensions.gridHeight
      : -gridDimensions.gridWidth

  const directionMultiplier =
    options.position === 'top' || options.position === 'left' ? -1 : 1

  const transform = !isVertical ? translateX : translateY

  const tickSpacing = Math.max(options.tickSizeInner, 0) + options.tickPadding

  // Pass down the axis config (including the scale itself) for posterity
  const axis: AxisLinear = {
    ...options,
    id,
    isTimeType,
    scale,
    uniquePrimariesSet,
    isVertical,
    barSize,
    cursorSize,
    stepSize,
    seriesBandScale,
    seriesBarSize,
    domain,
    range,
    max: scaleMax,
    directionMultiplier,
    transform,
    ticks,
    format,
    tickSpacing,
    gridOffset: 0,
    tickOffset: 0,
    barOffset: -barSize / 2,
  }

  if (options.type === 'ordinal') {
    axis.gridOffset = -(axis.stepSize * options.innerPadding) / 2
    axis.tickOffset = axis.barSize / 2
    axis.barOffset = 0
  }

  return axis
}
