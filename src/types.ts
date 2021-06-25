import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale'
import { CurveFactory } from 'd3-shape'
import { CSSProperties } from 'react'
import * as TSTB from 'ts-toolbelt'

import { TooltipRendererProps } from './components/TooltipRenderer'
import Area from './seriesTypes/Area'
import Bar from './seriesTypes/Bar'
import Bubble from './seriesTypes/Bubble'
import Line from './seriesTypes/Line'
import { translateX, translateY } from './utils/Utils'

export type ChartOptions = {
  data: UserSerie[]
  axes: AxisOptions[]
  getSeriesStyle?: (series: Series, status: SeriesFocusStatus) => SeriesStyles
  getDatumStyle?: (series: Datum, status: DatumFocusStatus) => DatumStyles
  getSeriesOrder?: (series: Series[]) => Series[]
  groupingMode?: GroupingMode
  showVoronoi?: boolean
  defaultColors?: string[]
  getSeriesOptions?: (serie: SeriesBase, index: number) => SeriesOptions
  initialWidth?: number
  initialHeight?: number
  brush?: {
    style?: CSSProperties
    onSelect?: (selection: {
      pointer: Pointer
      start: unknown
      end: unknown
    }) => void
  }
  onFocusDatum?: (datum: Datum | null) => void
  onClickDatum?: (
    datum: Datum | null,
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => void
  dark?: boolean
  renderSVG?: () => React.ReactSVGElement
  primaryCursor?: boolean | CursorOptions
  secondaryCursor?: boolean | CursorOptions
  tooltip?: boolean | TooltipOptions
}

export type RequiredChartOptions = TSTB.Object.Required<
  ChartOptions,
  | 'getSeriesStyle'
  | 'getDatumStyle'
  | 'getSeriesOrder'
  | 'groupingMode'
  | 'showVoronoi'
  | 'defaultColors'
>

export type TooltipOptions = {
  align?: AlignMode
  alignPriority?: AlignPosition[]
  padding?: number
  tooltipArrowPadding?: number
  anchor?: AnchorMode
  arrowPosition?: AlignPosition
  render?: (props: TooltipRendererProps) => React.ReactNode
  formatSecondary?: (d: unknown) => string | number
  formatTertiary?: (d: unknown) => string | number
  invert?: boolean
}

export type ResolvedTooltipOptions = TSTB.Object.Required<
  TooltipOptions,
  | 'align'
  | 'alignPriority'
  | 'padding'
  | 'tooltipArrowPadding'
  | 'anchor'
  | 'render'
>

export type SeriesStyles = CSSProperties & {
  area?: CSSProperties
  line?: CSSProperties
  circle?: CSSProperties
  rectangle?: CSSProperties
}

export type DatumStyles = CSSProperties & {
  area?: CSSProperties
  line?: CSSProperties
  circle?: CSSProperties
  rectangle?: CSSProperties
}

export type Position = 'top' | 'right' | 'bottom' | 'left'

export type GroupingMode = 'single' | 'series' | 'primary' | 'secondary'

export type AlignMode =
  | 'auto'
  | 'right'
  | 'topRight'
  | 'bottomRight'
  | 'left'
  | 'topLeft'
  | 'bottomLeft'
  | 'top'
  | 'bottom'
  | 'center'

export type AlignPosition =
  | 'right'
  | 'topRight'
  | 'bottomRight'
  | 'left'
  | 'topLeft'
  | 'bottomLeft'
  | 'top'
  | 'bottom'

export type AxisType = 'ordinal' | 'time' | 'utc' | 'linear' | 'log'

export type AnchorMode =
  | 'pointer'
  | 'closest'
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'gridTop'
  | 'gridBottom'
  | 'gridLeft'
  | 'gridRight'
  | 'gridCenter'

export type Side = 'left' | 'right' | 'top' | 'bottom'

type PointerBase = {
  x: number
  y: number
  svgHovered: boolean
}

export type PointerUnpressed = PointerBase & {
  dragging: false
}

export type PointerPressed = PointerBase & {
  dragging: true
  startX: number
  startY: number
}

export type Pointer = PointerUnpressed | PointerPressed

export type ChartOffset = {
  left: number
  top: number
}

export type AxisDimension = {
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
}

export type AxisDimensions = {
  left: Record<string, AxisDimension>
  right: Record<string, AxisDimension>
  top: Record<string, AxisDimension>
  bottom: Record<string, AxisDimension>
}

export type AxisOptions = AxisLinearOptions

export type AxisLinearOptionsBase = {
  type: AxisType
  invert?: boolean
  position: Position
  min?: number
  max?: number
  hardMin?: number
  hardMax?: number
  base?: number
  tickCount?: number
  minTickCount?: number
  maxTickCount?: number
  tickValues?: unknown[]
  format?: (value: unknown, index: number, scaleLabel: string) => string
  tickSizeInner?: number
  tickSizeOuter?: number
  tickPadding?: number
  labelRotation?: number
  innerPadding?: number
  outerPadding?: number
  showGrid?: boolean
  showTicks?: boolean
  filterTicks?: <T extends string>(ticks: T[]) => T[]
  show?: boolean
  stacked?: boolean
  id?: string
  styles?: CSSProperties & {
    line?: CSSProperties
    tick?: CSSProperties
  }
}

export type AxisLinearOptionsPrimary = AxisLinearOptionsBase & {
  primary: true
}

export type AxisLinearOptionsSecondary = AxisLinearOptionsBase & {
  primary?: false
  primaryAxisId?: string
}

export type AxisLinearOptions =
  | AxisLinearOptionsPrimary
  | AxisLinearOptionsSecondary

export type ResolvedAxisLinearOptions = TSTB.Object.Required<
  AxisLinearOptions,
  | 'tickCount'
  | 'minTickCount'
  | 'maxTickCount'
  | 'tickSizeInner'
  | 'tickSizeOuter'
  | 'tickPadding'
  | 'labelRotation'
  | 'innerPadding'
  | 'outerPadding'
  | 'showTicks'
  | 'filterTicks'
  | 'show'
  | 'stacked'
>

export type AxisLinear = ResolvedAxisLinearOptions & {
  primary?: boolean
  primaryAxisId?: string
  isTimeType: boolean
  isVertical: boolean
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number, never>
    | ScaleTime<number, number, never>
  uniquePrimariesSet: Set<unknown>
  barSize: number
  cursorSize: number
  stepSize: number
  seriesBandScale?: ScaleBand<string>
  seriesBarSize: number
  domain: [unknown, unknown] | unknown[]
  range: [number, number]
  directionMultiplier: -1 | 1
  transform: typeof translateX | typeof translateY
  ticks: unknown[]
  format: (value: unknown, index: number) => string
  tickSpacing: number
  tickOffset: number
  barOffset: number
  gridOffset: number
}

export type UserSerie = {
  data: UserDatum[]
  id?: string
  label?: string
  color?: string
  primaryAxisId?: string
  secondaryAxisId?: string
}

export type UserDatum = {
  primary: unknown
  secondary: unknown
  radius?: number
  color?: string
}

//

export type SeriesOptions = {
  type: 'line' | 'bubble' | 'area' | 'bar'
  showPoints?: boolean
  showOrphans?: boolean
  curve?: CurveFactory
}

export type SeriesBase = {
  originalSeries: UserSerie
  index: number
  id: string
  label: string
  primaryAxisId?: string
  secondaryAxisId?: string
  datums: DatumBase[]
}

export type DatumBase = {
  originalSeries: UserSerie
  seriesIndex: number
  seriesId: string
  seriesLabel: string
  index: number
  originalDatum: UserDatum
  primary: any
  secondary: any
  radius?: number
}

export type SeriesWithComponent = SeriesBase &
  SeriesOptions & {
    Component: typeof Line | typeof Bubble | typeof Area | typeof Bar
  }

//

export type SeriesWithComponentIndex = Omit<SeriesWithComponent, 'datums'> & {
  datums: DatumWithSeriesTypeIndex[]
  seriesTypeIndex: number
}

export type DatumWithSeriesTypeIndex = DatumBase & {
  seriesTypeIndex: number
}

//

export type SeriesUnplotted = Omit<SeriesWithComponentIndex, 'datums'> & {
  datums: DatumUnplotted[]
  primaryAxis: AxisLinear
  secondaryAxis: AxisLinear
  getStatusStyle: (focusedDatum: Datum | null) => SeriesStyles
  style?: CSSProperties
}

export type DatumUnplotted = DatumWithSeriesTypeIndex & {
  group: Datum[]
  totalValue: number
  xValue: any
  yValue: any
  baseValue: any
  getStatusStyle: (focusedDatum: Datum | null) => DatumStyles
  style?: CSSProperties
  primaryAxis: AxisLinear
  secondaryAxis: AxisLinear
}

//

export type Series = Omit<SeriesUnplotted, 'datums'> & {
  datums: Datum[]
}

export type Datum = DatumUnplotted & {
  series: Series
  size: number
  x: number | null
  y: number | null
  r: number | null
  base: number | null
  primaryCoord: number | null
  secondaryCoord: number | null
  defined: boolean
  anchor: DatumAnchor
  boundingPoints: DatumAnchor[]
}

export type DatumAnchor = {
  x: number | null
  y: number | null
  primaryCoord: number | null
  secondaryCoord: number | null
  horizontalPadding?: number
  verticalPadding?: number
}

export type Measurement = Side | 'width' | 'height'

export type GridDimensions = {
  gridX: number
  gridY: number
  gridWidth: number
  gridHeight: number
}

export type AxesInfo = {
  axes: AxisLinear[]
  primaryAxes: AxisLinear[]
  secondaryAxes: AxisLinear[]
  xKey: 'primary' | 'secondary'
  yKey: 'primary' | 'secondary'
  xAxes: AxisLinear[]
  yAxes: AxisLinear[]
}

export type CursorOptions = {
  value?: unknown
  show?: boolean
  render?: (meta: { formattedValue: string }) => React.ReactNode
  snap?: boolean
  showLine?: boolean
  showLabel?: boolean
  axisId?: string
  onChange?: () => void
}

export type SeriesFocusStatus = 'none' | 'focused'

export type DatumFocusStatus = 'none' | 'focused' | 'groupFocused'
