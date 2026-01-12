import { extent, max, median, min, range as d3Range } from 'd3-array'
import { stack, stackOffsetNone } from 'd3-shape'
import {
  scaleLinear,
  scaleLog,
  scaleTime,
  scaleUtc,
  scaleBand,
  ScaleTime,
  ScaleLinear,
  ScaleBand,
} from 'd3-scale'

import {
  timeSecond,
  timeMinute,
  timeHour,
  timeDay,
  timeMonth,
  timeYear,
  utcYear,
  utcMonth,
  utcDay,
  utcHour,
  utcMinute,
  utcSecond,
} from 'd3-time'

import { timeFormat, utcFormat } from 'd3-time-format'

import {
  Axis,
  AxisBand,
  AxisBandOptions,
  AxisLinear,
  AxisLinearOptions,
  AxisOptions,
  AxisTime,
  AxisTimeOptions,
  BuildAxisOptions,
  Datum,
  GridDimensions,
  ResolvedAxisOptions,
  Series,
  StackDatum,
} from '../types'

function defaultAxisOptions<TDatum>(
  options: BuildAxisOptions<TDatum>
): ResolvedAxisOptions<AxisOptions<TDatum>> {
  return {
    ...options,
    elementType: options.elementType ?? 'line',
    minTickPaddingForRotation: options.minTickPaddingForRotation ?? 10,
    tickLabelRotationDeg: options.tickLabelRotationDeg ?? 60,
    innerBandPadding: options.innerBandPadding ?? 0.5,
    outerBandPadding: options.outerBandPadding ?? 0.2,
    innerSeriesBandPadding: options.innerSeriesBandPadding ?? 0.2,
    outerSeriesBandPadding: options.outerSeriesBandPadding ?? 0,
    show: options.show ?? true,
    stacked: options.stacked ?? false,
    shouldNice: options.shouldNice ?? true,
  }
}

export default function buildAxisLinear<TDatum>(
  isPrimary: boolean,
  userOptions: BuildAxisOptions<TDatum>,
  series: Series<TDatum>[],
  allDatums: Datum<TDatum>[],
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
    ? [gridDimensions.height, 0]
    : [0, gridDimensions.width]

  const outerRange: [number, number] = isVertical ? [height, 0] : [0, width]

  // Give the scale a home
  return options.scaleType === 'time' || options.scaleType === 'localTime'
    ? buildTimeAxis(
        isPrimary,
        options,
        series,
        allDatums,
        isVertical,
        range,
        outerRange
      )
    : options.scaleType === 'linear' || options.scaleType === 'log'
    ? buildLinearAxis(
        isPrimary,
        options,
        series,
        allDatums,
        isVertical,
        range,
        outerRange
      )
    : options.scaleType === 'band'
    ? buildBandAxis(isPrimary, options, series, isVertical, range, outerRange)
    : (() => {
        throw new Error('Invalid scale type')
      })()
}

function buildTimeAxis<TDatum>(
  isPrimary: boolean,
  options: ResolvedAxisOptions<AxisTimeOptions<TDatum>>,
  series: Series<TDatum>[],
  allDatums: Datum<TDatum>[],
  isVertical: boolean,
  range: [number, number],
  outerRange: [number, number]
): AxisTime<TDatum> {
  const isLocal = options.scaleType === 'localTime'
  const scaleFn = isLocal ? scaleTime : scaleUtc

  let isInvalid = false

  series = isPrimary
    ? series
    : series.filter(s => s.secondaryAxisId === options.id)

  allDatums = isPrimary
    ? allDatums
    : allDatums.filter(d => d.secondaryAxisId === options.id)

  // Now set the range
  const scale = scaleFn(range)

  let [minValue, maxValue] = extent(allDatums, datum => {
    const value = options.getValue(datum.originalDatum)
    datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value
    return value
  })

  // Here, we find the maximum context (in descending order from year
  // down to millisecond) needed to understand the
  // dates in this dataset. If the min/max dates span multiples of
  // any of the time units OR if the max date resides in a different
  // unit boundary than today's, we use that unit as context.

  let autoFormatStr: string

  const units = isLocal
    ? {
        year: timeYear,
        month: timeMonth,
        day: timeDay,
        hour: timeHour,
        minute: timeMinute,
        second: timeSecond,
      }
    : {
        year: utcYear,
        month: utcMonth,
        day: utcDay,
        hour: utcHour,
        minute: utcMinute,
        second: utcSecond,
      }

  if (minValue && maxValue) {
    if (
      units.year.count(minValue, maxValue) > 0 ||
      units.year.floor(maxValue) < units.year()
    ) {
      autoFormatStr = '%b %-d, %Y %-I:%M:%S.%L %p'
    } else if (
      units.month.count(minValue, maxValue) > 0 ||
      units.month.floor(maxValue) < units.month()
    ) {
      autoFormatStr = '%b %-d, %-I:%M:%S.%L %p'
    } else if (
      units.day.count(minValue, maxValue) > 0 ||
      units.day.floor(maxValue) < units.day()
    ) {
      autoFormatStr = '%b %-d, %-I:%M:%S.%L %p'
    } else if (
      units.hour.count(minValue, maxValue) > 0 ||
      units.hour.floor(maxValue) < units.hour()
    ) {
      autoFormatStr = '%-I:%M:%S.%L %p'
    } else if (
      units.minute.count(minValue, maxValue) > 0 ||
      units.minute.floor(maxValue) < units.minute()
    ) {
      autoFormatStr = '%-I:%M:%S.%L'
    } else if (
      units.second.count(minValue, maxValue) > 0 ||
      units.second.floor(maxValue) < units.second()
    ) {
      autoFormatStr = '%L'
    }
  }

  const resolvedTimeFormat = isLocal ? timeFormat : utcFormat
  const trimFormat = (str: string) => str.trim().replace(/(,$|^,)/, '')

  const contextFormat = (format: string, date: Date) => {
    if (units.second(date) < date) {
      // milliseconds - Do not remove any context
      return resolvedTimeFormat(format)(date)
    }
    if (units.minute(date) < date) {
      // seconds - remove potential milliseconds
      return resolvedTimeFormat(
        trimFormat(format.replace(/\.%L.*?(\s|$)/, ''))
      )(date)
    }
    if (units.hour(date) < date) {
      // minutes - remove potential seconds and milliseconds
      return resolvedTimeFormat(trimFormat(format.replace(/:%S.*?(\s|$)/, '')))(
        date
      )
    }
    if (units.day(date) < date) {
      // hours - remove potential minutes and seconds and milliseconds
      return resolvedTimeFormat(trimFormat(format.replace(/:%M.*?(\s|$)/, '')))(
        date
      )
    }
    if (units.month(date) < date) {
      // days  - remove potential hours, minutes, seconds and milliseconds
      return resolvedTimeFormat(trimFormat(format.replace(/%-I.*/, '')))(date)
    }
    if (units.year(date) < date) {
      // months - remove potential days, hours, minutes, seconds and milliseconds
      return resolvedTimeFormat(trimFormat(format.replace(/%-d.*/, '')))(date)
    }
    // years
    return resolvedTimeFormat('%Y')(date)
  }

  let shouldNice = options.shouldNice

  // see https://stackoverflow.com/a/2831422
  if (Object.prototype.toString.call(options.min) === '[object Date]') {
    minValue = min([options.min as Date, minValue as Date])
    shouldNice = false
  }

  if (Object.prototype.toString.call(options.max) === '[object Date]') {
    maxValue = max([options.max as Date, maxValue as Date])
    shouldNice = false
  }

  if (Object.prototype.toString.call(options.hardMin) === '[object Date]') {
    minValue = options.hardMin
    shouldNice = false
  }

  if (Object.prototype.toString.call(options.hardMax) === '[object Date]') {
    maxValue = options.hardMax
    shouldNice = false
  }

  if (minValue === undefined || maxValue === undefined) {
    console.info('Invalid scale min/max', {
      options,
      series,
      range,
      values: allDatums.map(d =>
        isPrimary ? d.primaryValue : d.secondaryValue
      ),
    })
    isInvalid = true
  }

  // Set the domain
  scale.domain([minValue as Date, maxValue as Date])

  if (options.invert) {
    scale.domain(Array.from(scale.domain()).reverse())
  }

  if (shouldNice) {
    scale.nice()
  }

  const outerScale = scale.copy().range(outerRange)

  // Supplementary band scale
  const primaryBandScale = isPrimary
    ? buildPrimaryBandScale(options, scale, series, range)
    : undefined

  const seriesBandScale = primaryBandScale
    ? buildSeriesBandScale(options, primaryBandScale, series)
    : undefined

  const primaryBandWidth = primaryBandScale?.bandwidth()

  if (options.padBandRange && primaryBandWidth) {
    const bandStart = scale.invert(0)
    const bandEnd = scale.invert(primaryBandWidth)
    const diff = bandEnd.valueOf() - bandStart.valueOf()

    scale.domain([
      new Date(scale.domain()[0].valueOf() - diff / 2),
      new Date(scale.domain()[1].valueOf() + diff / 2),
    ])
  }

  const formatters = {} as AxisTime<TDatum>['formatters']

  const defaultFormat = scale.tickFormat()

  const scaleFormat = (value: Date) =>
    options.formatters?.scale?.(value, { ...formatters, scale: undefined }) ??
    contextFormat(autoFormatStr, value)

  const tooltipFormat = (value: Date) =>
    options.formatters?.tooltip?.(value, {
      ...formatters,
      tooltip: undefined,
    }) ?? scaleFormat(value)

  const cursorFormat = (value: Date) =>
    options.formatters?.cursor?.(value, { ...formatters, cursor: undefined }) ??
    scaleFormat(value)

  Object.assign(formatters, {
    default: defaultFormat,
    scale: scaleFormat,
    tooltip: tooltipFormat,
    cursor: cursorFormat,
  })

  return {
    ...options,
    isInvalid,
    axisFamily: 'time',
    isVertical,
    scale,
    range,
    outerScale,
    primaryBandScale,
    seriesBandScale,
    formatters: formatters,
  }
}

function buildLinearAxis<TDatum>(
  isPrimary: boolean,
  options: ResolvedAxisOptions<AxisLinearOptions<TDatum>>,
  series: Series<TDatum>[],
  allDatums: Datum<TDatum>[],
  isVertical: boolean,
  range: [number, number],
  outerRange: [number, number]
): AxisLinear<TDatum> {
  const scale = options.scaleType === 'log' ? scaleLog() : scaleLinear()

  let isInvalid = false

  series = isPrimary
    ? series
    : series.filter(s => s.secondaryAxisId === options.id)

  allDatums = isPrimary
    ? allDatums
    : allDatums.filter(d => d.secondaryAxisId === options.id)

  if (options.stacked) {
    stackSeries(series, options)
  }

  let [minValue, maxValue] = options.stacked
    ? extent(
        series
          .map(s =>
            s.datums.map(datum => {
              const value = options.getValue(datum.originalDatum)
              datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value
              return datum.stackData ?? []
            })
          )
          .flat(2) as unknown as number[]
      )
    : extent(allDatums, datum => {
        const value = options.getValue(datum.originalDatum)
        datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value
        return value
      })

  let shouldNice = options.shouldNice

  if (typeof options.min === 'number') {
    minValue = min([options.min, minValue as number])
    shouldNice = false
  }

  if (typeof options.max === 'number') {
    maxValue = max([options.max, maxValue as number])
    shouldNice = false
  }

  if (
    typeof options.minDomainLength === 'number' &&
    !(minValue === undefined || maxValue === undefined)
  ) {
    const mid = median([minValue, maxValue])!
    const top = mid + options.minDomainLength / 2
    const bottom = mid - options.minDomainLength / 2
    maxValue = Math.max(top, maxValue)
    minValue = Math.min(bottom, minValue)
  }

  if (typeof options.hardMin === 'number') {
    minValue = options.hardMin
    shouldNice = false
  }

  if (typeof options.hardMax === 'number') {
    maxValue = options.hardMax
    shouldNice = false
  }

  if (minValue === undefined || maxValue === undefined) {
    isInvalid = true
    console.info('Invalid scale min/max', {
      options,
      series,
      range,
      values: allDatums.map(d =>
        isPrimary ? d.primaryValue : d.secondaryValue
      ),
    })
    minValue = minValue ?? 0
    maxValue = maxValue ?? 0
    // throw new Error('Invalid scale min/max'
  }

  // Set the domain
  scale.domain([minValue, maxValue])

  if (options.invert) {
    scale.domain(Array.from(scale.domain()).reverse())
  }

  scale.range(range)

  if (shouldNice) {
    scale.nice()
  }

  const outerScale = scale.copy().range(outerRange)

  const primaryBandScale = isPrimary
    ? buildPrimaryBandScale(options, scale, series, range)
    : undefined

  const seriesBandScale = primaryBandScale
    ? buildSeriesBandScale(options, primaryBandScale, series)
    : undefined

  const defaultFormat = scale.tickFormat()

  const formatters = {} as AxisLinear<TDatum>['formatters']

  const scaleFormat = (value: number) =>
    options.formatters?.scale?.(value, { ...formatters, scale: undefined }) ??
    defaultFormat(value)

  const tooltipFormat = (value: number) =>
    options.formatters?.tooltip?.(value, {
      ...formatters,
      tooltip: undefined,
    }) ?? scaleFormat(value)

  const cursorFormat = (value: number) =>
    options.formatters?.cursor?.(value, { ...formatters, cursor: undefined }) ??
    tooltipFormat(value)

  Object.assign(formatters, {
    default: defaultFormat,
    scale: scaleFormat,
    tooltip: tooltipFormat,
    cursor: cursorFormat,
  })

  return {
    ...options,
    isInvalid,
    axisFamily: 'linear',
    isVertical,
    scale,
    range,
    outerScale,
    primaryBandScale,
    seriesBandScale,
    formatters,
  }
}

function buildBandAxis<TDatum>(
  isPrimary: boolean,
  options: ResolvedAxisOptions<AxisBandOptions<TDatum>>,
  series: Series<TDatum>[],
  isVertical: boolean,
  range: [number, number],
  outerRange: [number, number]
): AxisBand<TDatum> {
  series = series.filter(d => d.secondaryAxisId === options.id)

  let isInvalid = false

  const domain = Array.from(
    new Set(
      series
        .map(d => d.datums)
        .flat()
        .map(datum => {
          const value = options.getValue(datum.originalDatum)
          datum[isPrimary ? 'primaryValue' : 'secondaryValue'] = value
          return value
        })
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

  const primaryBandScale = scale

  const seriesBandScale = buildSeriesBandScale(
    options,
    primaryBandScale,
    series
  )

  const defaultFormat = (d: { toString: () => string }) => d

  const formatters = {} as AxisBand<TDatum>['formatters']

  const scaleFormat = (value: number) =>
    options.formatters?.scale?.(value, { ...formatters, scale: undefined }) ??
    defaultFormat(value)

  const tooltipFormat = (value: number) =>
    options.formatters?.tooltip?.(value, {
      ...formatters,
      tooltip: undefined,
    }) ?? scaleFormat(value)

  const cursorFormat = (value: number) =>
    options.formatters?.cursor?.(value, { ...formatters, cursor: undefined }) ??
    tooltipFormat(value)

  Object.assign(formatters, {
    default: defaultFormat,
    scale: scaleFormat,
    tooltip: tooltipFormat,
    cursor: cursorFormat,
  })

  return {
    ...options,
    isInvalid,
    axisFamily: 'band',
    isVertical,
    scale,
    range,
    outerScale,
    formatters,
    primaryBandScale,
    seriesBandScale,
  }
}

//

function stackSeries<TDatum>(
  series: Series<TDatum>[],
  axisOptions: AxisOptions<TDatum>
) {
  const seriesIndices = Object.keys(series)
  const stacker = stack()
    .keys(seriesIndices)
    .value((_, seriesIndex, index) => {
      const originalDatum =
        series[Number(seriesIndex)]?.datums[index]?.originalDatum

      const val =
        typeof originalDatum !== 'undefined'
          ? axisOptions.getValue(originalDatum)
          : 0

      if (typeof val === 'undefined' || val === null) {
        return 0
      }

      return val
    })
    .offset(axisOptions.stackOffset ?? stackOffsetNone)

  const stacked = stacker(
    Array.from({
      length: series.sort((a, b) => b.datums.length - a.datums.length)[0].datums
        .length,
    })
  )

  for (let sIndex = 0; sIndex < stacked.length; sIndex++) {
    const s = stacked[sIndex]

    for (let i = 0; i < s.length; i++) {
      const datum = s[i]

      if (series[sIndex].datums[i]) {
        // @ts-ignore
        datum.data = series[sIndex].datums[i]

        series[sIndex].datums[i].stackData =
          datum as unknown as StackDatum<TDatum>
      }
    }
  }
}

function buildPrimaryBandScale<TDatum>(
  options: ResolvedAxisOptions<AxisOptions<TDatum>>,
  scale: ScaleTime<number, number, never> | ScaleLinear<number, number, never>,
  series: Series<TDatum>[],
  range: [number, number]
) {
  // Find the two closest points along axis
  // Do not allow the band to be smaller than single pixel of the output range

  let impliedBandWidth: number = Math.max(...range)
  const bandRange: number = Math.max(...range)

  ;(() => {
    for (let i = 0; i < series.length; i++) {
      const serie = series[i]

      for (let j = 0; j < serie.datums.length; j++) {
        const d1 = serie.datums[j]
        const one = scale(d1.primaryValue ?? NaN)

        for (let k = 0; k < serie.datums.length; k++) {
          const d2 = serie.datums[k]
          const two = scale(d2.primaryValue ?? NaN)

          if (one === two) {
            continue
          }

          const diff = Math.abs(Math.max(one, two) - Math.min(one, two))

          if (diff < impliedBandWidth) {
            impliedBandWidth = Math.max(diff, bandRange)

            if (impliedBandWidth === bandRange) {
              return
            }
          }
        }
      }
    }
  })()

  const bandDomain = d3Range(bandRange / impliedBandWidth)

  const primaryBandScale = scaleBand(bandDomain, range)
    .round(false)
    .paddingOuter(options.outerBandPadding ?? 0)
    .paddingInner(options.innerBandPadding ?? 0)

  return primaryBandScale
}

function buildSeriesBandScale<TDatum>(
  options: ResolvedAxisOptions<AxisOptions<TDatum>>,
  primaryBandScale: ScaleBand<number>,
  series: Series<TDatum>[]
) {
  const bandDomain = d3Range(series.length)

  const seriesBandScale = scaleBand(bandDomain, [
    0,
    primaryBandScale.bandwidth(),
  ])
    .round(false)
    .paddingOuter(
      options.outerSeriesBandPadding ??
        (options.outerBandPadding ? options.outerBandPadding / 2 : 0)
    )
    .paddingInner(
      options.innerSeriesBandPadding ??
        (options.innerBandPadding ? options.innerBandPadding / 2 : 0)
    )

  const scale = (seriesIndex: number) =>
    seriesBandScale(series.find(d => d.index === seriesIndex)!?.indexPerAxis)

  return Object.assign(scale, seriesBandScale)
}
