import { extent, range as d3Range } from 'd3-array'
import {
  scaleLinear,
  scaleLog,
  scaleTime,
  scaleUtc,
  scaleBand,
  ScaleTime,
  ScaleLinear,
  ScaleOrdinal,
} from 'd3-scale'

import {
  Axis,
  AxisBand,
  AxisBandOptions,
  AxisLinear,
  AxisLinearOptions,
  AxisOptions,
  AxisTime,
  AxisTimeOptions,
  GridDimensions,
  ResolvedAxisOptions,
  Series,
} from '../types'

function defaultAxisOptions<TDatum>(
  options: AxisOptions<TDatum>
): ResolvedAxisOptions<AxisOptions<TDatum>> {
  return {
    ...options,
    elementType: options.elementType ?? 'line',
    // tickCount: options.tickCount ?? 10,
    // minTickCount: options.minTickCount ?? 1,
    // maxTickCount: options.maxTickCount ?? 99999999,
    // tickSizeInner: options.tickSizeInner ?? 6,
    // tickSizeOuter: options.tickSizeOuter ?? 6,
    minTickPaddingForRotation: options.minTickPaddingForRotation ?? 10,
    tickLabelRotationDeg: options.tickLabelRotationDeg ?? 60,
    innerBandPadding: options.innerBandPadding ?? 0.6,
    outerBandPadding: options.outerBandPadding ?? 0.2,
    // showTicks: options.showTicks ?? true,
    // filterTicks: options.filterTicks ?? (d => d),
    show: options.show ?? true,
    stacked: options.stacked ?? false,
  }
}

export default function buildAxisLinear<TDatum>(
  userOptions: AxisOptions<TDatum>,
  series: Series<TDatum>[],
  gridDimensions: GridDimensions,
  width: number,
  height: number
): Axis<TDatum> {
  const options = defaultAxisOptions(userOptions)

  if (!options.position) {
    throw new Error(`Chart axes must have a valid 'position' property`)
  }

  const isVertical = ['left', 'right'].indexOf(options.position) > -1

  // Now we need to figure out the range
  const range: [number, number] = isVertical
    ? [gridDimensions.gridHeight, 0]
    : [0, gridDimensions.gridWidth]

  const outerRange: [number, number] = isVertical ? [height, 0] : [0, width]

  // Give the scale a home
  return options.scaleType === 'time' || options.scaleType === 'localTime'
    ? buildTimeAxis(options, series, isVertical, range, outerRange)
    : options.scaleType === 'linear' || options.scaleType === 'log'
    ? buildLinearAxis(options, series, isVertical, range, outerRange)
    : options.scaleType === 'band'
    ? buildBandAxis(options, series, isVertical, range, outerRange)
    : (() => {
        throw new Error('Invalid scale type')
      })()

  // @ts-ignore
  // const scaleFormat = scale.tickFormat ? scale.tickFormat() : d => d

  // const userFormat = options?.format

  // const format = userFormat
  //   ? (value: unknown, index: number) =>
  //       userFormat(value, index, scaleFormat(value))
  //   : scaleFormat

  // const resolvedTickCount = options.tickCount

  // const ticks = options.filterTicks(
  //   options.tickValues ||
  //     // @ts-ignore
  //     (scale.ticks ? scale.ticks(resolvedTickCount) : scale.domain())
  // )

  // const scaleMax =
  //   options.position === 'bottom'
  //     ? -gridDimensions.gridHeight
  //     : options.position === 'left'
  //     ? gridDimensions.gridWidth
  //     : options.position === 'top'
  //     ? gridDimensions.gridHeight
  //     : -gridDimensions.gridWidth

  // // const directionMultiplier =
  // //   options.position === 'top' || options.position === 'left' ? -1 : 1

  // const transform = !isVertical ? translateX : translateY

  // const tickSpacing = Math.max(options.tickSizeInner, 0) + options.tickPadding

  // Pass down the axis config (including the scale itself) for posterity
}

function buildTimeAxis<TDatum>(
  options: ResolvedAxisOptions<AxisTimeOptions<TDatum>>,
  series: Series<TDatum>[],
  isVertical: boolean,
  range: [number, number],
  outerRange: [number, number]
): AxisTime<TDatum> {
  const scaleFn = options.scaleType === 'localTime' ? scaleTime : scaleUtc

  // Now set the range
  const scale = scaleFn(range)

  const allDatums = series.map(d => d.datums).flat()

  const [minValue, maxValue] = extent(allDatums, datum =>
    options.getValue(datum.originalDatum)
  )

  if (minValue === undefined) {
    throw new Error('Invalid scale min/max')
  }

  if (maxValue === undefined) {
    throw new Error('Invalid scale min/max')
  }

  // Set the domain
  scale.domain([minValue, maxValue])

  if (typeof options.hardMin === 'number') {
    scale.domain([options.hardMin, Number(scale.domain()[1])])
  }
  if (typeof options.hardMax === 'number') {
    scale.domain([Number(scale.domain()[0]), options.hardMax])
  }

  if (options.invert) {
    scale.domain(Array.from(scale.domain()).reverse())
  }

  scale.nice()

  const outerScale = scale.copy().range(outerRange)

  // Supplmentary band scale
  const bandScale = buildImpliedBandScale(options, scale, series, range)

  return {
    ...options,
    axisFamily: 'time',
    isVertical,
    scale,
    range,
    outerScale,
    bandScale,
    format: scale.tickFormat(),
  }
}

function buildLinearAxis<TDatum>(
  options: ResolvedAxisOptions<AxisLinearOptions<TDatum>>,
  series: Series<TDatum>[],
  isVertical: boolean,
  range: [number, number],
  outerRange: [number, number]
): AxisLinear<TDatum> {
  const scale = options.scaleType === 'log' ? scaleLog() : scaleLinear()

  const allDatums = series.map(d => d.datums).flat(2)

  const [minValue, maxValue] = options.stacked
    ? extent(
        (series
          .map(s => s.datums.map(datum => datum.stackData ?? []))
          .flat(2) as unknown) as number[]
      )
    : extent(allDatums, datum => options.getValue(datum.originalDatum))

  if (minValue === undefined) {
    throw new Error('Invalid scale min/max')
  }

  if (maxValue === undefined) {
    throw new Error('Invalid scale min/max')
  }

  // Set the domain
  scale.domain([minValue, maxValue])

  if (typeof options.hardMin === 'number') {
    scale.domain([options.hardMin, Number(scale.domain()[1])])
  }
  if (typeof options.hardMax === 'number') {
    scale.domain([Number(scale.domain()[0]), options.hardMax])
  }

  if (options.invert) {
    scale.domain(Array.from(scale.domain()).reverse())
  }

  scale.range(range)

  scale.nice()

  const outerScale = scale.copy().range(outerRange)

  const bandScale = buildImpliedBandScale(options, scale, series, range)

  return {
    ...options,
    axisFamily: 'linear',
    isVertical,
    scale,
    range,
    outerScale,
    bandScale,
    format: scale.tickFormat(),
  }
}

function buildBandAxis<TDatum>(
  options: ResolvedAxisOptions<AxisBandOptions<TDatum>>,
  series: Series<TDatum>[],
  isVertical: boolean,
  range: [number, number],
  outerRange: [number, number]
): AxisBand<TDatum> {
  const domain = Array.from(
    new Set(
      series
        .map(d => d.datums)
        .flat()
        .map(datum => options.getValue(datum.originalDatum))
    )
  )

  const scale = scaleBand(domain, range)
    .round(false)
    .paddingOuter(options.outerBandPadding ?? 0)
    .paddingInner(options.innerBandPadding ?? 0)

  // Invert if necessary
  if (options.invert) {
    scale.domain(Array.from(scale.domain()).reverse())
  }

  const outerScale = scale.copy().range(outerRange)

  // // @ts-ignore
  // const scaleFormat = scale.tickFormat ? scale.tickFormat() : d => d

  // const userFormat = options?.format

  // const format = userFormat
  //   ? (value: unknown, index: number) =>
  //       userFormat(value, index, scaleFormat(value))
  //   : scaleFormat

  // const resolvedTickCount = options.tickCount

  // const ticks = options.filterTicks(
  //   options.tickValues ||
  //     // @ts-ignore
  //     (scale.ticks ? scale.ticks(resolvedTickCount) : scale.domain())
  // )

  // const scaleMax =
  //   options.position === 'bottom'
  //     ? -gridDimensions.gridHeight
  //     : options.position === 'left'
  //     ? gridDimensions.gridWidth
  //     : options.position === 'top'
  //     ? gridDimensions.gridHeight
  //     : -gridDimensions.gridWidth

  // const directionMultiplier =
  //   options.position === 'top' || options.position === 'left' ? -1 : 1

  // const transform = !isVertical ? translateX : translateY

  // const tickSpacing = Math.max(options.tickSizeInner, 0) + options.tickPadding

  return {
    ...options,
    axisFamily: 'band',
    isVertical,
    scale,
    range,
    outerScale,
    format: d => d,
  }
}

//

function buildImpliedBandScale<TDatum>(
  options: ResolvedAxisOptions<AxisOptions<TDatum>>,
  scale:
    | ScaleTime<number, number, never>
    | ScaleLinear<number, number, never>
    | ScaleOrdinal<string | Date | number, number>,
  series: Series<TDatum>[],
  range: [number, number]
) {
  // Find the two closest points along axis

  let impliedBandWidth: number = Math.max(...range)

  series.forEach(serie => {
    serie.datums.forEach(d1 => {
      const one = scale(options.getValue(d1.originalDatum) ?? NaN)

      serie.datums.forEach(d2 => {
        const two = scale(options.getValue(d2.originalDatum) ?? NaN)

        if (one === two) {
          return
        }

        const r = [one, two].sort()

        const diff = Math.abs(r[1] - r[0])

        if (diff < impliedBandWidth) {
          impliedBandWidth = diff
        }
      })
    })
  })

  const bandRange = Math.max(...range)

  const bandDomain = d3Range(bandRange / impliedBandWidth)

  const bandScale = scaleBand(bandDomain, range)
    .round(false)
    .paddingOuter(options.outerBandPadding ?? 0)
    .paddingInner(options.innerBandPadding ?? 0)

  return bandScale
}
