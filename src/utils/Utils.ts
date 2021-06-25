import {
  AxisLinear,
  Datum,
  DatumFocusStatus,
  DatumStyles,
  Series,
  SeriesFocusStatus,
  SeriesStyles,
} from '../types'

export function getSeriesStatus(
  series: Series,
  focusedDatum: Datum | null
): SeriesFocusStatus {
  if (focusedDatum?.series.id === series.id) {
    return 'focused'
  }

  return 'none'
}

export function getDatumStatus(
  datum: Datum,
  focusedDatum: Datum | null
): DatumFocusStatus {
  if (datum === focusedDatum) {
    return 'focused'
  }

  if (
    datum.group.some(groupDatum => {
      groupDatum.seriesId === focusedDatum?.series.id &&
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

export function getAxisByAxisId(axes: AxisLinear[], id?: string): AxisLinear {
  return axes.find(d => d.id === id) || axes[0]
}

export function getAxisIndexByAxisId(axes: AxisLinear[], id?: string): number {
  const index = axes.findIndex(d => d.id === id)
  return index > -1 ? index : 0
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
