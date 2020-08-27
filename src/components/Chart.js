import React from 'react'
//
import { functionalUpdate, getClosestPoint } from '../utils/Utils'

import useHyperResponsive from '../hooks/useHyperResponsive'
import useGetLatest from '../hooks/useGetLatest'
import useLatest from '../hooks/useLatest'
import usePrevious from '../hooks/usePrevious'
import useChartState, { createChartState } from '../hooks/useChartState'
import { ChartContextProvider } from '../hooks/useChartContext'

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

function useCreateStore(initialState) {
  const storeRef = React.useRef()

  if (!storeRef.current) {
    storeRef.current = createChartState(initialState)
  }

  return storeRef.current
}

export default function ChartState(options) {
  let { Provider: StateProvider } = useCreateStore(setState => {
    const setOffset = updater =>
      setState(old => {
        const newOffset = functionalUpdate(updater, old.offset)

        return {
          ...old,
          offset: {
            left: newOffset.left ?? 0,
            top: newOffset.top ?? 0,
          },
        }
      })

    return {
      hovered: null,
      element: null,
      axisDimensions: {},
      tickLabelSkipIndices: {},
      offset: {},
      pointer: {},
      setOffset,
    }
  })

  return (
    <StateProvider>
      <Chart {...options} />
    </StateProvider>
  )
}

export function Chart(options) {
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
    getSeriesStyle: getSeriesStyleOriginal,
    getDatumStyle,
    onClick,
    onFocus,
    onHover,
    getSeriesOrder,
    defaultColors,
    ...rest
  } = applyDefaults(options)

  const [{ hovered, element, axisDimensions, pointer }] = useChartState(
    d => ({
      hovered: d.hovered,
      element: d.element,
      axisDimensions: d.axisDimensions,
      pointer: d.pointer,
    }),
    'shallow'
  )

  const responsiveElRef = React.useRef()

  const { width, height } = useHyperResponsive(responsiveElRef)

  const getOnClick = useGetLatest(onClick)
  const getOnFocus = useGetLatest(onFocus)
  const getOnHover = useGetLatest(onHover)

  let materializedData = useMaterializeData({ data })

  const seriesOptions = useSeriesOptions({
    materializedData,
    series,
  })

  materializedData = useSeriesTypes({
    materializedData,
    seriesOptions,
  })

  const { gridX, gridY, gridWidth, gridHeight } = useDimensions({
    width,
    height,
    axisDimensions,
  })

  const { primaryAxes, secondaryAxes, xKey, yKey, xAxes, yAxes } = useAxes({
    axes,
    materializedData,
    gridHeight,
    gridWidth,
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

  const focused = React.useMemo(() => {
    // Get the closest focus datum out of the datum group
    if (hovered || element) {
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
        return getClosestPoint(pointer, hovered.group)
      }
    }
    return null
  }, [element, focus, hovered, pointer])

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

  const getSeriesStyle = React.useCallback(
    (series, ...args) => ({
      color: series.originalSeries.color,
      ...getSeriesStyleOriginal(series, ...args),
    }),
    [getSeriesStyleOriginal]
  )

  const contextValue = {
    latestFocused,
    tooltip,
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
    getOnClick,
    getSeriesStyle,
    getDatumStyle,
    seriesOptions,
    getSeriesOrder,
  }

  React.useEffect(() => {
    if (getOnFocus()) {
      getOnFocus()(focused)
    }
  }, [focused, getOnFocus])

  React.useEffect(() => {
    if (getOnHover()) {
      getOnHover()(focused)
    }
  }, [focused, getOnHover])

  const previousDragging = usePrevious(pointer.dragging)

  React.useEffect(() => {
    if (brush?.onSelect && previousDragging && !pointer.dragging) {
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
    pointer.dragging,
    pointer.released,
    pointer.sourceX,
    pointer.x,
    previousDragging,
    primaryAxes,
  ])

  return (
    <ChartContextProvider value={contextValue}>
      <ChartInner ref={responsiveElRef} {...rest} />
    </ChartContextProvider>
  )
}
