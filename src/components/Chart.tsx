import { groups, sort, sum } from 'd3-array'
import React, { ComponentPropsWithoutRef } from 'react'

import useGetLatest from '../hooks/useGetLatest'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import Bar, { getPrimary } from '../seriesTypes/Bar'
import Line from '../seriesTypes/Line'
//
import {
  Axis,
  AxisDimensions,
  AxisOptions,
  AxisOptionsWithScaleType,
  BuildAxisOptions,
  ChartContextValue,
  ChartOptions,
  Datum,
  GridDimensions,
  RequiredChartOptions,
  Series,
  UserSerie,
} from '../types'
import {
  materializeStyles,
  getSeriesStatus,
  getDatumStatus,
} from '../utils/Utils'
import buildAxisLinear from '../utils/buildAxis.linear'
import { ChartContextProvider } from '../utils/chartContext'
import AxisLinear from './AxisLinear'
// import Brush from './Brush'
import Cursors from './Cursors'
import Tooltip, { defaultTooltip } from './Tooltip'
import Voronoi from './Voronoi'

//

//

const defaultColorScheme = [
  '#0f83ab',
  '#faa43a',
  '#fd6868',
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

const defaultPadding = 5

function defaultChartOptions<TDatum>(
  options: ChartOptions<TDatum>
): RequiredChartOptions<TDatum> {
  return {
    ...options,
    initialWidth: options.initialWidth ?? 300,
    initialHeight: options.initialHeight ?? 200,
    getSeriesOrder:
      options.getSeriesOrder ?? ((series: Series<TDatum>[]) => series),
    interactionMode: options.interactionMode ?? 'primary',
    showVoronoi: options.showVoronoi ?? false,
    defaultColors: options.defaultColors ?? defaultColorScheme,
    useIntersectionObserver: options.useIntersectionObserver ?? false,
    intersectionObserverRootMargin:
      options.intersectionObserverRootMargin ?? '1000px',
    primaryCursor: options.primaryCursor ?? true,
    secondaryCursor: options.secondaryCursor ?? true,
    padding: options.padding ?? defaultPadding,
  }
}

export function Chart<TDatum>({
  options: userOptions,
  className,
  style = {},
  ...rest
}: ComponentPropsWithoutRef<'div'> & { options: ChartOptions<TDatum> }) {
  const options = defaultChartOptions(userOptions)
  const [chartElement, setContainerElement] =
    React.useState<HTMLDivElement | null>(null)

  const containerEl = chartElement?.parentElement

  const nearestScrollableParent = React.useMemo(() => {
    const run = (el?: Element | null): Element | null => {
      if (!el) {
        return null
      }

      const grandParent = el.parentElement

      if (!grandParent) {
        return null
      }

      if (grandParent.scrollHeight > grandParent.clientHeight) {
        const { overflow } = window.getComputedStyle(grandParent)

        if (overflow.includes('scroll') || overflow.includes('auto')) {
          return grandParent
        }
      }

      return run(grandParent)
    }

    return run(containerEl)
  }, [containerEl])

  const [{ width, height }, setDims] = React.useState({
    width: options.initialWidth,
    height: options.initialHeight,
  })

  useIsomorphicLayoutEffect(() => {
    if (containerEl) {
      const computed = window.getComputedStyle(containerEl)

      if (!['relative', 'absolute', 'fixed'].includes(computed.position)) {
        containerEl.style.position = 'relative'
      }
    }
  }, [containerEl])

  React.useEffect(() => {
    if (!containerEl) {
      return
    }

    const observer = new ResizeObserver(() => {
      const rect = containerEl?.getBoundingClientRect()
      const styles = window.getComputedStyle(containerEl)

      if (rect) {
        setDims({
          width:
            rect.width -
            parseInt(styles.borderLeftWidth) -
            parseInt(styles.borderRightWidth),
          height:
            rect.height -
            parseInt(styles.borderTopWidth) -
            parseInt(styles.borderBottomWidth),
        })
      }
    })

    observer.observe(containerEl)

    return () => {
      observer.unobserve(containerEl)
    }
  }, [containerEl])

  const [isIntersecting, setIsIntersecting] = React.useState(true)

  React.useEffect(() => {
    if (!containerEl || !options.useIntersectionObserver) return

    let observer = new IntersectionObserver(
      entries => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            setIsIntersecting(true)
          } else {
            setIsIntersecting(false)
          }
        }
      },
      {
        root: nearestScrollableParent,
        rootMargin: options.intersectionObserverRootMargin,
      }
    )

    observer.observe(containerEl)

    return () => {
      observer.unobserve(containerEl)
    }
  }, [
    containerEl,
    nearestScrollableParent,
    options.intersectionObserverRootMargin,
    options.useIntersectionObserver,
  ])

  return (
    <div
      ref={setContainerElement}
      {...rest}
      className={`ReactChart ${className || ''}`}
      style={{
        fontFamily: 'sans-serif',
        ...style,
        position: 'absolute',
        width,
        height,
      }}
    >
      {options.useIntersectionObserver && !isIntersecting ? null : (
        <ChartInner options={options} {...{ width, height }} />
      )}
    </div>
  )
}

function ChartInner<TDatum>({
  options,
  width,
  height,
}: {
  options: RequiredChartOptions<TDatum>
  width: number
  height: number
}) {
  if (!options.primaryAxis) {
    throw new Error('A primaryAxis is required')
  }

  if (!options.secondaryAxes.length) {
    throw new Error('At least one secondaryAxis is required')
  }

  const primaryAxisOptions = React.useMemo((): BuildAxisOptions<TDatum> => {
    const firstValue = getFirstDefinedValue(options.primaryAxis, options.data)
    const axisOptions = axisOptionsWithScaleType(
      options.primaryAxis,
      firstValue
    )

    return { position: 'bottom', ...axisOptions }
  }, [options.data, options.primaryAxis])

  const secondaryAxesOptions = React.useMemo(() => {
    return options.secondaryAxes.map(
      (secondaryAxis, i): BuildAxisOptions<TDatum> => {
        const firstValue = getFirstDefinedValue(secondaryAxis, options.data)

        const axisOptions = axisOptionsWithScaleType(secondaryAxis, firstValue)

        if (!axisOptions.elementType) {
          if (primaryAxisOptions.scaleType === 'band') {
            axisOptions.elementType = 'bar'
          } else if (axisOptions.stacked) {
            axisOptions.elementType = 'area'
          }
        }

        if (
          typeof axisOptions.stacked === 'undefined' &&
          axisOptions.elementType &&
          ['area'].includes(axisOptions.elementType)
        ) {
          axisOptions.stacked = true
        }

        return {
          position: !i ? 'left' : 'right',
          ...axisOptions,
        }
      }
    )
  }, [options.data, options.secondaryAxes, primaryAxisOptions])

  // Resolve Tooltip Option
  const tooltipOptions = React.useMemo(() => {
    const tooltipOptions = defaultTooltip(options?.tooltip)
    tooltipOptions.groupingMode =
      tooltipOptions.groupingMode ??
      (() => {
        if (options.interactionMode === 'closest') {
          return 'single'
        }
        return 'primary'
      })()

    return tooltipOptions
  }, [options.interactionMode, options?.tooltip])

  options = {
    ...options,
    tooltip: tooltipOptions,
  }

  //

  const svgRef = React.useRef<SVGSVGElement>(null)
  const getOptions = useGetLatest({ ...options, tooltip: tooltipOptions })

  const axisDimensionsState = React.useState<AxisDimensions>({
    left: {},
    right: {},
    top: {},
    bottom: {},
  })

  const [axisDimensions] = axisDimensionsState

  const isInteractingState = React.useState<boolean>(false)
  const [isInteracting] = isInteractingState

  const focusedDatumState = React.useState<Datum<TDatum> | null>(null)
  const [focusedDatum] = focusedDatumState

  // useAtom<Datum<TDatum> | null>(focusedDatumAtom)

  const gridDimensions = React.useMemo((): GridDimensions => {
    const padding = {
      left:
        typeof options.padding === 'object'
          ? options.padding.left ?? defaultPadding
          : options.padding,
      right:
        typeof options.padding === 'object'
          ? options.padding.right ?? defaultPadding
          : options.padding,
      bottom:
        typeof options.padding === 'object'
          ? options.padding.bottom ?? defaultPadding
          : options.padding,
      top:
        typeof options.padding === 'object'
          ? options.padding.top ?? defaultPadding
          : options.padding,
    }

    const left =
      padding.left +
      Math.max(
        sum(Object.values(axisDimensions.left), d => d.width),
        sum(Object.values(axisDimensions.top), d => d.paddingLeft),
        sum(Object.values(axisDimensions.bottom), d => d.paddingLeft)
      )

    const top =
      padding.top +
      Math.max(
        sum(Object.values(axisDimensions.top), d => d.height),
        sum(Object.values(axisDimensions.left), d => d.paddingTop),
        sum(Object.values(axisDimensions.right), d => d.paddingTop)
      )

    const right =
      padding.right +
      Math.max(
        sum(Object.values(axisDimensions.right), d => d.width),
        sum(Object.values(axisDimensions.top), d => d.paddingRight),
        sum(Object.values(axisDimensions.bottom), d => d.paddingRight)
      )

    const bottom =
      padding.bottom +
      Math.max(
        sum(Object.values(axisDimensions.bottom), d => d.height),
        sum(Object.values(axisDimensions.left), d => d.paddingBottom),
        sum(Object.values(axisDimensions.right), d => d.paddingBottom)
      )

    const gridWidth = Math.max(0, width - left - right)
    const gridHeight = Math.max(0, height - top - bottom)

    return { left, top, right, bottom, width: gridWidth, height: gridHeight }
  }, [
    options.padding,
    axisDimensions.left,
    axisDimensions.top,
    axisDimensions.bottom,
    axisDimensions.right,
    width,
    height,
  ])

  const series = React.useMemo(() => {
    const series: Series<TDatum>[] = []

    const indicesByAxisId: Record<string, number> = {}

    for (
      let seriesIndex = 0;
      seriesIndex < options.data.length;
      seriesIndex++
    ) {
      const originalSeries = options.data[seriesIndex]
      const seriesId = originalSeries.id ?? seriesIndex + ''
      const seriesLabel = originalSeries.label ?? `Series ${seriesIndex + 1}`
      const secondaryAxisId = originalSeries.secondaryAxisId
      const originalDatums = originalSeries.data
      const datums = []

      indicesByAxisId[`${secondaryAxisId}`] =
        indicesByAxisId[`${secondaryAxisId}`] ?? 0
      const seriesIndexPerAxis = indicesByAxisId[`${secondaryAxisId}`]

      indicesByAxisId[`${secondaryAxisId}`]++

      for (
        let datumIndex = 0;
        datumIndex < originalDatums.length;
        datumIndex++
      ) {
        const originalDatum = originalDatums[datumIndex]
        datums[datumIndex] = {
          originalSeries,
          seriesIndex,
          seriesIndexPerAxis,
          seriesId,
          seriesLabel,
          secondaryAxisId,
          index: datumIndex,
          originalDatum,
        }
      }

      series[seriesIndex] = {
        originalSeries,
        index: seriesIndex,
        id: seriesId,
        label: seriesLabel,
        indexPerAxis: seriesIndexPerAxis,
        secondaryAxisId,
        datums,
      }
    }

    return series
  }, [options.data])

  let allDatums = React.useMemo(() => {
    return series.map(s => s.datums).flat(2)
  }, [series])

  const primaryAxis = React.useMemo(() => {
    return buildAxisLinear<TDatum>(
      true,
      primaryAxisOptions,
      series,
      allDatums,
      gridDimensions,
      width,
      height
    )
  }, [allDatums, gridDimensions, height, primaryAxisOptions, series, width])

  const secondaryAxes = React.useMemo(() => {
    return secondaryAxesOptions.map(secondaryAxis => {
      return buildAxisLinear<TDatum>(
        false,
        secondaryAxis,
        series,
        allDatums,
        gridDimensions,
        width,
        height
      )
    })
  }, [allDatums, gridDimensions, height, secondaryAxesOptions, series, width])

  const [datumsByInteractionGroup, datumsByTooltipGroup] = React.useMemo(() => {
    if (!isInteracting) {
      return [new Map(), new Map()]
    }

    const datumsByInteractionGroup = new Map<any, Datum<TDatum>[]>()
    const datumsByTooltipGroup = new Map<any, Datum<TDatum>[]>()

    const allBarAndNotStacked = secondaryAxes.every(
      d => d.elementType === 'bar' && !d.stacked
    )

    let getInteractionPrimary = (datum: Datum<TDatum>) => {
      if (allBarAndNotStacked) {
        const secondaryAxis = secondaryAxes.find(
          d => d.id === datum.secondaryAxisId
        )!

        if (secondaryAxis.elementType === 'bar' && !secondaryAxis.stacked) {
          return getPrimary(datum, primaryAxis, secondaryAxis)
        }
      }

      return datum.primaryValue
    }

    let getInteractionKey = (datum: Datum<TDatum>) =>
      `${getInteractionPrimary(datum)}`
    let getTooltipKey = (datum: Datum<TDatum>) => `${datum.primaryValue}`

    if (options.interactionMode === 'closest') {
      getInteractionKey = datum =>
        `${getInteractionPrimary(datum)}_${datum.secondaryValue}`
    }

    if (tooltipOptions.groupingMode === 'single') {
      getTooltipKey = datum => `${datum.primaryValue}_${datum.secondaryValue}`
    } else if (tooltipOptions.groupingMode === 'secondary') {
      getTooltipKey = datum => `${datum.secondaryValue}`
    } else if (tooltipOptions.groupingMode === 'series') {
      getTooltipKey = datum => `${datum.seriesIndex}`
    }

    allDatums.forEach(datum => {
      const interactionKey = (getInteractionKey as Function)(datum)
      const tooltipKey = (getTooltipKey as Function)(datum)

      if (!datumsByInteractionGroup.has(interactionKey)) {
        datumsByInteractionGroup.set(interactionKey, [])
      }

      if (!datumsByTooltipGroup.has(tooltipKey)) {
        datumsByTooltipGroup.set(tooltipKey, [])
      }

      datumsByInteractionGroup.get(interactionKey)!.push(datum)
      datumsByTooltipGroup.get(tooltipKey)!.push(datum)
    })

    datumsByInteractionGroup.forEach((value, key) => {
      datumsByInteractionGroup.set(
        key,
        sortDatumsBySecondaryPx(value, secondaryAxes)
      )
    })

    datumsByTooltipGroup.forEach((value, key) => {
      datumsByTooltipGroup.set(
        key,
        sortDatumsBySecondaryPx(value, secondaryAxes)
      )
    })

    allDatums.forEach(datum => {
      const interactionKey = (getInteractionKey as Function)(datum)
      const tooltipKey = (getTooltipKey as Function)(datum)
      datum.interactiveGroup = datumsByInteractionGroup.get(interactionKey)
      datum.tooltipGroup = datumsByTooltipGroup.get(tooltipKey)
    })

    return [datumsByInteractionGroup, datumsByTooltipGroup]
  }, [
    isInteracting,
    allDatums,
    options.interactionMode,
    primaryAxis,
    secondaryAxes,
    tooltipOptions.groupingMode,
  ])

  const getSeriesStatusStyle = React.useCallback(
    (series: Series<TDatum>, focusedDatum: Datum<TDatum> | null) => {
      const base = {
        color:
          getOptions().defaultColors[
            series.index % getOptions().defaultColors.length
          ],
      }

      const status = getSeriesStatus(series, focusedDatum)
      const statusStyles = getOptions().getSeriesStyle?.(series, status) ?? {}
      series.style = materializeStyles(statusStyles, base)
      return series.style
    },
    [getOptions]
  )

  const getDatumStatusStyle = React.useCallback(
    (datum: Datum<TDatum>, focusedDatum: Datum<TDatum> | null) => {
      const base = {
        ...series[datum.seriesIndex]?.style,
        color:
          getOptions().defaultColors[
            datum.seriesIndex % getOptions().defaultColors.length
          ],
      }

      const status = getDatumStatus(datum as Datum<TDatum>, focusedDatum)
      const statusStyles =
        getOptions().getDatumStyle?.(datum as Datum<TDatum>, status) ?? {}

      datum.style = materializeStyles(statusStyles, base)

      return datum.style
    },
    [getOptions, series]
  )

  // Reverse the stack order for proper z-indexing
  let orderedSeries = React.useMemo(() => {
    const reversedSeries = [...series].reverse()

    return getOptions().getSeriesOrder(reversedSeries)
  }, [getOptions, series])

  useIsomorphicLayoutEffect(() => {
    if (
      svgRef.current &&
      svgRef.current.parentElement &&
      !svgRef.current.parentElement.style.position
    ) {
      svgRef.current.parentElement.style.position = 'relative'
    }
  })

  const contextValue: ChartContextValue<TDatum> = {
    getOptions,
    gridDimensions,
    primaryAxis,
    secondaryAxes,
    series,
    orderedSeries,
    datumsByInteractionGroup,
    datumsByTooltipGroup,
    width,
    height,
    getSeriesStatusStyle,
    getDatumStatusStyle,
    axisDimensionsState,
    focusedDatumState,
    svgRef,
    isInteractingState,
  }

  const seriesByAxisId = React.useMemo(
    () =>
      sort(
        groups(orderedSeries, d => d.secondaryAxisId),
        ([key]) => secondaryAxes.findIndex(axis => axis.id === key)
      ),
    [orderedSeries, secondaryAxes]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let getSeriesInfo = () => ({
    primaryAxis,
    secondaryAxes,
    seriesByAxisId,
  })

  let getMemoizedSeriesInfo = React.useCallback(
    () => ({
      primaryAxis,
      secondaryAxes,
      seriesByAxisId,
    }),
    [primaryAxis, secondaryAxes, seriesByAxisId]
  )

  if (options.memoizeSeries) {
    getSeriesInfo = getMemoizedSeriesInfo
  }

  const seriesEl = React.useMemo(() => {
    const { primaryAxis, secondaryAxes, seriesByAxisId } = getSeriesInfo()
    return seriesByAxisId.map(([axisId, series]) => {
      const secondaryAxis = secondaryAxes.find(d => d.id === axisId)

      if (!secondaryAxis) {
        return null
      }

      const { elementType } = secondaryAxis
      const Component = (() => {
        if (
          elementType === 'line' ||
          elementType === 'bubble' ||
          elementType === 'area'
        ) {
          return Line
        }
        if (elementType === 'bar') {
          return Bar
        }
        throw new Error('Invalid elementType')
      })()

      if (primaryAxis.isInvalid || secondaryAxis.isInvalid) {
        return null
      }

      return (
        <Component
          key={axisId ?? '__default__'}
          primaryAxis={primaryAxis}
          secondaryAxis={secondaryAxis}
          series={series}
        />
      )
    })
  }, [getSeriesInfo])

  return (
    <ChartContextProvider value={useGetLatest(contextValue)}>
      <div>
        <svg
          ref={svgRef}
          style={{
            width,
            height,
            overflow: options.brush ? 'hidden' : 'visible',
          }}
          onClick={e => options.onClickDatum?.(focusedDatum, e)}
          onMouseEnter={() => {
            isInteractingState[1](true)
          }}
          onMouseLeave={() => {
            isInteractingState[1](false)
          }}
        >
          <g className="axes">
            {[primaryAxis, ...secondaryAxes].map(axis => (
              <AxisLinear key={[axis.position, axis.id].join('')} {...axis} />
            ))}
          </g>
          <g
            className="Series"
            style={{
              pointerEvents: 'none',
            }}
          >
            {seriesEl}
          </g>
          <Voronoi />
          {options.renderSVG?.() ?? null}
        </svg>
        <Cursors />
        <Tooltip />
      </div>
    </ChartContextProvider>
  )
}

function getFirstDefinedValue<TDatum>(
  options: AxisOptions<TDatum>,
  data: UserSerie<TDatum>[]
) {
  let firstDefinedValue: Date | number | string | undefined

  data.some(serie => {
    return serie.data.some(originalDatum => {
      const value = options.getValue(originalDatum)
      if (value !== null && typeof value !== 'undefined') {
        firstDefinedValue = value
        return true
      }
    })
  })

  return firstDefinedValue
}

function axisOptionsWithScaleType<TDatum>(
  options: AxisOptions<TDatum>,
  firstValue: Date | number | string | undefined
): AxisOptionsWithScaleType<TDatum> {
  let scaleType = options.scaleType

  if (!options.scaleType) {
    if (typeof firstValue === 'number') {
      scaleType = 'linear'
    } else if (typeof (firstValue as Date)?.getMonth === 'function') {
      scaleType = 'time'
    } else if (
      typeof firstValue === 'string' ||
      typeof firstValue === 'boolean'
    ) {
      scaleType = 'band'
    } else {
      throw new Error('Invalid scale type: Unable to infer type from data')
    }
  }

  return { ...options, scaleType } as AxisOptionsWithScaleType<TDatum>
}

function sortDatumsBySecondaryPx<TDatum>(
  datums: Datum<TDatum>[],
  secondaryAxes: Axis<TDatum>[]
) {
  if (secondaryAxes.every(d => d.stacked)) {
    const differingInverts =
      secondaryAxes.some(d => d.invert) && secondaryAxes.some(d => !d.invert)

    if (!differingInverts) {
      return datums
    }
  }

  return [...datums].sort((a, b) => {
    const aAxis = secondaryAxes.find(d => d.id === a.secondaryAxisId)
    const bAxis = secondaryAxes.find(d => d.id === b.secondaryAxisId)

    const aPx =
      aAxis?.scale(aAxis.stacked ? a.stackData?.[1] : a.secondaryValue) ?? NaN

    const bPx =
      bAxis?.scale(bAxis.stacked ? b.stackData?.[1] : b.secondaryValue) ?? NaN

    return aPx > bPx ? 1 : aPx < bPx ? -1 : 0
  })
}
