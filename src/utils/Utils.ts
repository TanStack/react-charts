import {
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
    datum.tooltipGroup?.some(groupDatum => {
      groupDatum.seriesId === focusedDatum?.seriesId &&
        groupDatum.index === focusedDatum?.index
    })
  ) {
    return 'groupFocused'
  }

  return 'none'
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

export function translate(x: number, y: number) {
  return `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`
}

//

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

export function isDefined(num: number) {
  return typeof num === 'number' && !Number.isNaN(num)
}
