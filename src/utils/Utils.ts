import {
  Axis,
  Datum,
  DatumFocusStatus,
  DatumStyles,
  Series,
  SeriesFocusStatus,
  SeriesStyles,
} from '../types'

export function getSeriesStatus<TDatum>(
  series: Series<TDatum>,
  focusedDatum: Datum<TDatum> | null
): SeriesFocusStatus {
  if (focusedDatum?.seriesId === series.id) {
    return 'focused'
  }

  return 'none'
}

export function getDatumStatus<TDatum>(
  datum: Datum<TDatum>,
  focusedDatum: Datum<TDatum> | null
): DatumFocusStatus {
  if (datum === focusedDatum) {
    return 'focused'
  }

  if (
    datum.group?.some(groupDatum => {
      groupDatum.seriesId === focusedDatum?.seriesId &&
        groupDatum.index === focusedDatum?.index
    })
  ) {
    return 'groupFocused'
  }

  return 'none'
}

function normalizeColor(
  style: SeriesStyles | DatumStyles,
  defaults: SeriesStyles | DatumStyles
): SeriesStyles | DatumStyles {
  return {
    ...style,
    stroke: style.stroke || style.color || defaults.stroke || defaults.color,
    fill: style.fill || style.color || defaults.fill || defaults.color,
  }
}

const elementTypes = ['area', 'line', 'rectangle', 'circle'] as const

export function materializeStyles(
  style: SeriesStyles | DatumStyles = {},
  defaults: SeriesStyles | DatumStyles = {}
) {
  style = normalizeColor(style, defaults)
  for (let i = 0; i < elementTypes.length; i++) {
    const type = elementTypes[i]
    if (style[type] && defaults[type]) {
      style[type] = materializeStyles(style[type], defaults)
    }
  }
  return style
}

export function isValidPoint(d: any) {
  if (d === null) {
    return false
  }
  if (typeof d === 'undefined') {
    return false
  }
  if (typeof d === 'string' && d === 'null') {
    return false
  }
  return true
}

export function translateX(x: number) {
  return `translate3d(${Math.round(x)}px, 0, 0)`
}

export function translateY(y: number) {
  return `translate3d(0, ${Math.round(y)}px, 0)`
}

export function translate(x: number, y: number) {
  return `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`
}

export function getSecondaries<TDatum>(
  datum: Datum<TDatum>,
  secondaryAxis: Axis<TDatum>
): [number, number] {
  if (secondaryAxis.stacked) {
    return [
      secondaryAxis.scale(datum.stackData?.[0] ?? NaN) ?? NaN,
      secondaryAxis.scale(datum.stackData?.[1] ?? NaN) ?? NaN,
    ]
  }

  return [
    secondaryAxis.scale(0) ?? NaN,
    secondaryAxis.scale(secondaryAxis.getValue(datum.originalDatum)) ?? NaN,
  ]
}

export function getPrimary<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>
): number {
  let primary: number

  if (primaryAxis.stacked) {
    primary =
      primaryAxis.scale(datum.stackData?.[primaryAxis.invert ? 1 : 0] ?? NaN) ??
      NaN
  } else {
    primary =
      primaryAxis.scale(primaryAxis.getValue(datum.originalDatum)) ?? NaN
  }

  if (primaryAxis.axisFamily !== 'band') {
    primary = primary - getPrimaryLength(datum, primaryAxis) / 2
  }

  return primary
}

export function getPrimaryLength<TDatum>(
  _datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>
) {
  if (primaryAxis.axisFamily === 'band') {
    return Math.min(
      Math.max(
        primaryAxis.scale.bandwidth(),
        primaryAxis.minBandSize ?? 99999999
      ),
      primaryAxis.maxBandSize ?? 1
    )
  }

  return Math.max(primaryAxis.bandScale.bandwidth(), 1)
}

export function getSecondaryLength<TDatum>(
  datum: Datum<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  const secondary = getSecondaries(datum, secondaryAxis).sort()
  return Math.abs(secondary[1] - secondary[0])
}

export function getX<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  return primaryAxis.isVertical
    ? getSecondaries(datum, secondaryAxis)[secondaryAxis.invert ? 1 : 0]
    : getPrimary(datum, primaryAxis)
}

export function getY<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  return primaryAxis.isVertical
    ? getPrimary(datum, primaryAxis)
    : getSecondaries(datum, secondaryAxis)[secondaryAxis.invert ? 1 : 0] -
        getSecondaryLength(datum, secondaryAxis)
}

export function getWidth<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  return primaryAxis.isVertical
    ? getSecondaryLength(datum, secondaryAxis)
    : getPrimaryLength(datum, primaryAxis)
}

export function getHeight<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  return primaryAxis.isVertical
    ? getPrimaryLength(datum, primaryAxis)
    : getSecondaryLength(datum, secondaryAxis)
}

export function getTickPx<TDatum>(scale: Axis<TDatum>['scale'], value: any) {
  let px = scale(value) ?? NaN

  // @ts-ignore
  if (scale.bandwidth) {
    // @ts-ignore
    return px + scale.bandwidth() / 2
  }

  return px
}
