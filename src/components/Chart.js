import React from 'react'
//
import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'

import useHyperResponsive from '../hooks/useHyperResponsive'
import useLatestRef from '../hooks/useLatestRef'
import useLatest from '../hooks/useLatest'
import usePrevious from '../hooks/usePrevious'

import ChartInner from './ChartInner'

import useMaterializeData from './pipeline/useMaterializeData'
import useSeriesOptions from './pipeline/useSeriesOptions'
import useSeriesTypes from './pipeline/useSeriesTypes'
import useDimensions from './pipeline/useDimensions'
import useAxes from './pipeline/useAxes'
import useStackData from './pipeline/useStackData'
import useTooltip from './pipeline/useTooltip'
import useCursors from './pipeline/useCursors'

import {
  groupingPrimary,
  focusAuto,
  focusElement,
  focusClosest,
} from '../utils/Constants'

const defaultColorScheme = [
  '#0f83ab',
  '#faa43a',
  '#ff4e4e',
  '#53cfc9',
  '#a2d925',
  '#decf3f',
  '#734fe9',
  '#cd82ad',
  '#006d92',
  '#de7c00',
  '#f33232',
  '#3f9a80',
  '#53c200',
  '#d7af00',
  '#4c26c9',
  '#d44d99',
]

function applyDefaults({
  getDatums = d => (Array.isArray(d) ? d : d.datums || d.data),
  getLabel = (d, i) => d.label || `Series ${i + 1}`,
  getSeriesId = (d, i) => i,
  getPrimary = d => (Array.isArray(d) ? d[0] : d.primary || d.x),
  getSecondary = d => (Array.isArray(d) ? d[1] : d.secondary || d.y),
  getR = d => (Array.isArray(d) ? d[2] : d.radius || d.r),
  getPrimaryAxisId = s => s.primaryAxisId,
  getSecondaryAxisId = s => s.secondaryAxisId,
  getSeriesStyle = () => ({}),
  getDatumStyle = () => ({}),
  getSeriesOrder = d => d,
  onHover = () => {},
  grouping = groupingPrimary,
  focus = focusAuto,
  showVoronoi = false,
  defaultColors = defaultColorScheme,
  ...rest
}) {
  return {
    getDatums,
    getLabel,
    getSeriesId,
    getPrimary,
    getSecondary,
    getR,
    getPrimaryAxisId,
    getSecondaryAxisId,
    getSeriesStyle,
    getDatumStyle,
    getSeriesOrder,
    onHover,
    grouping,
    focus,
    showVoronoi,
    defaultColors,
    ...rest,
  }
}

export default function Chart(options) {
  let {
    data,
    grouping,
    focus,
    showVoronoi,
    dark,
    series,
    axes,
    primaryCursor,
    secondaryCursor,
    tooltip,
    brush,
    renderSVG,
    getDatums,
    getLabel,
    getSeriesId,
    getPrimary,
    getSecondary,
    getR,
    getPrimaryAxisId,
    getSecondaryAxisId,
    getSeriesStyle: getSeriesStyleOriginal,
    getDatumStyle,
    onClick,
    onFocus,
    onHover,
    getSeriesOrder,
    defaultColors,
    ...rest
  } = applyDefaults(options)

  let [
    { focused, element, axisDimensions, offset: offsetState, padding, pointer },
    setChartState,
  ] = React.useState({
    focused: null,
    element: null,
    axisDimensions: {},
    padding: {},
    offset: {},
    pointer: {},
  })

  const onClickRef = useLatestRef(onClick)
  const onFocusRef = useLatestRef(onFocus)
  const onHoverRef = useLatestRef(onHover)

  const responsiveElRef = React.useRef()
  const { width, height } = useHyperResponsive(responsiveElRef)

  getSeriesId = React.useCallback(Utils.normalizeGetter(getSeriesId), [
    getSeriesId,
  ])
  getLabel = React.useCallback(Utils.normalizeGetter(getLabel), [getLabel])
  getPrimaryAxisId = React.useCallback(
    Utils.normalizeGetter(getPrimaryAxisId),
    [getPrimaryAxisId]
  )
  getSecondaryAxisId = React.useCallback(
    Utils.normalizeGetter(getSecondaryAxisId),
    [getSecondaryAxisId]
  )
  getDatums = React.useCallback(Utils.normalizeGetter(getDatums), [getDatums])
  getPrimary = React.useCallback(Utils.normalizeGetter(getPrimary), [
    getPrimary,
  ])
  getSecondary = React.useCallback(Utils.normalizeGetter(getSecondary), [
    getSecondary,
  ])
  getR = React.useCallback(Utils.normalizeGetter(getR), [getR])

  let materializedData = useMaterializeData({
    data,
    getSeriesId,
    getLabel,
    getPrimaryAxisId,
    getSecondaryAxisId,
    getDatums,
    getPrimary,
    getSecondary,
    getR,
  })

  const seriesOptions = useSeriesOptions({
    materializedData,
    series,
  })

  materializedData = useSeriesTypes({
    materializedData,
    seriesOptions,
  })

  const { offset, gridX, gridY, gridWidth, gridHeight } = useDimensions({
    width,
    height,
    axisDimensions,
    padding,
    offset: offsetState,
  })

  const { primaryAxes, secondaryAxes, xKey, yKey, xAxes, yAxes } = useAxes({
    axes,
    materializedData,
    gridHeight,
    gridWidth,
    axisDimensions,
  })

  const stackData = useStackData({
    materializedData,
    primaryAxes,
    secondaryAxes,
    yAxes,
    yKey,
    xAxes,
    xKey,
    grouping,
    defaultColors,
  })

  pointer = React.useMemo(() => {
    return {
      ...pointer,
      axisValues: [...primaryAxes, ...secondaryAxes].map(axis => ({
        axis,
        value: axis.scale.invert
          ? axis.scale.invert(pointer[axis.vertical ? 'y' : 'x'])
          : null,
      })),
    }
  }, [pointer, primaryAxes, secondaryAxes])

  focused = React.useMemo(() => {
    // Get the closest focus datum out of the datum group
    if (focused || element) {
      let resolvedFocus = focus

      if (focus === focusAuto) {
        if (element) {
          resolvedFocus = focusElement
        } else {
          resolvedFocus = focusClosest
        }
      }

      if (resolvedFocus === focusElement && element) {
        return element
      } else if (resolvedFocus === focusClosest) {
        return Utils.getClosestPoint(pointer, focused.group)
      }
    }
    return null
  }, [element, focus, focused, pointer])

  // keep the previous focused value around for animations
  const latestFocused = useLatest(focused, focused)

  // Calculate Tooltip
  tooltip = useTooltip({
    focused,
    tooltip,
    pointer,
    gridWidth,
    gridHeight,
  })

  // Cursors
  ;[primaryCursor, secondaryCursor] = useCursors({
    primaryCursor,
    secondaryCursor,
    primaryAxes,
    secondaryAxes,
    focused,
    pointer,
    gridWidth,
    gridHeight,
    stackData,
  })

  React.useEffect(() => {
    if (onFocusRef.current) {
      onFocusRef.current(focused)
    }
  }, [onFocusRef, focused])

  React.useEffect(() => {
    if (onHoverRef.current) {
      onHoverRef.current(pointer)
    }
  }, [onHoverRef, pointer])

  const previousDragging = usePrevious(pointer.dragging)

  React.useEffect(() => {
    if (brush && previousDragging && !pointer.dragging) {
      if (Math.abs(pointer.sourceX - pointer.x) < 20) {
        return
      }
      brush.onSelect({
        pointer: pointer.released,
        start: primaryAxes[0].scale.invert(pointer.sourceX),
        end: primaryAxes[0].scale.invert(pointer.x),
      })
    }
  }, [
    brush,
    pointer,
    pointer.released,
    pointer.sourceX,
    pointer.x,
    previousDragging,
    primaryAxes,
  ])

  const getSeriesStyle = React.useCallback(
    (series, ...args) => ({
      color: series.originalSeries.color,
      ...getSeriesStyleOriginal(series, ...args),
    }),
    [getSeriesStyleOriginal]
  )

  // Decorate the chartState with computed values (or ones we just
  // want to pass down through context)
  const chartState = React.useMemo(
    () => ({
      focused,
      latestFocused,
      pointer,
      tooltip,
      axisDimensions,
      offset,
      padding,
      width,
      height,
      brush,
      grouping,
      showVoronoi,
      materializedData,
      stackData,
      primaryAxes,
      secondaryAxes,
      primaryCursor,
      secondaryCursor,
      gridX,
      gridY,
      gridWidth,
      gridHeight,
      dark,
      renderSVG,
      xKey,
      yKey,
      xAxes,
      yAxes,
      onClickRef,
      getSeriesStyle,
      getDatumStyle,
      seriesOptions,
      getSeriesOrder,
    }),
    [
      axisDimensions,
      brush,
      dark,
      focused,
      getDatumStyle,
      getSeriesOrder,
      getSeriesStyle,
      gridHeight,
      gridWidth,
      gridX,
      gridY,
      grouping,
      height,
      latestFocused,
      materializedData,
      offset,
      onClickRef,
      padding,
      pointer,
      primaryAxes,
      primaryCursor,
      renderSVG,
      secondaryAxes,
      secondaryCursor,
      seriesOptions,
      showVoronoi,
      stackData,
      tooltip,
      width,
      xAxes,
      xKey,
      yAxes,
      yKey,
    ]
  )

  const chartStateContextValue = React.useMemo(
    () => [chartState, setChartState],
    [chartState, setChartState]
  )

  return (
    <ChartContext.Provider value={chartStateContextValue}>
      <ChartInner
        ref={responsiveElRef}
        {...rest}
        onClick={e => {
          if (onClickRef.current) {
            onClickRef.current(focused)
          }
        }}
      />
    </ChartContext.Provider>
  )
}
