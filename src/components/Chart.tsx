import { groups, sort } from 'd3-array'
import { stack, stackOffsetNone } from 'd3-shape'
import React, { ComponentPropsWithoutRef } from 'react'

import useGetLatest from '../hooks/useGetLatest'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import Area from '../seriesTypes/Area'
import Bar from '../seriesTypes/Bar'
import Line from '../seriesTypes/Line'
//
import {
  AxisDimension,
  AxisDimensions,
  AxisOptions,
  AxisOptionsWithScaleType,
  BuildAxisOptions,
  ChartContextValue,
  ChartOptions,
  Datum,
  GridDimensions,
  Measurement,
  RequiredChartOptions,
  Series,
  StackDatum,
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
import Tooltip from './Tooltip'
import Voronoi from './Voronoi'

//

//

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

function defaultChartOptions<TDatum>(
  options: ChartOptions<TDatum>
): RequiredChartOptions<TDatum> {
  return {
    ...options,
    initialWidth: options.initialWidth ?? 300,
    initialHeight: options.initialHeight ?? 200,
    getSeriesOrder:
      options.getSeriesOrder ?? ((series: Series<TDatum>[]) => series),
    groupingMode: options.groupingMode ?? 'primary',
    showVoronoi: options.showVoronoi ?? false,
    defaultColors: options.defaultColors ?? defaultColorScheme,
    useIntersectionObserver: options.useIntersectionObserver ?? true,
    intersectionObserverRootMargin:
      options.intersectionObserverRootMargin ?? '1000px',
    tooltip: options.tooltip ?? true,
    primaryCursor: options.primaryCursor ?? true,
    secondaryCursor: options.secondaryCursor ?? true,
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

      if (rect) {
        setDims({
          width: rect.width,
          height: rect.height,
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
        ...style,
        position: 'absolute',
        width,
        height,
      }}
    >
      {isIntersecting ? (
        <ChartInner options={options} {...{ width, height }} />
      ) : null}
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
    const optionsWithScaleType = axisOptionsWithScaleType(
      options.primaryAxis,
      firstValue
    )

    return { position: 'bottom', ...optionsWithScaleType }
  }, [options.data, options.primaryAxis])

  const secondaryAxesOptions = React.useMemo(() => {
    return options.secondaryAxes.map(
      (secondaryAxis, i): BuildAxisOptions<TDatum> => {
        const firstValue = getFirstDefinedValue(secondaryAxis, options.data)

        const optionsWithScaleType = axisOptionsWithScaleType(
          secondaryAxis,
          firstValue
        )

        if (!optionsWithScaleType.elementType) {
          if (primaryAxisOptions.scaleType === 'band') {
            optionsWithScaleType.elementType = 'bar'
          } else if (optionsWithScaleType.stacked) {
            optionsWithScaleType.elementType = 'area'
          }
        }

        if (
          typeof optionsWithScaleType.stacked === 'undefined' &&
          optionsWithScaleType.elementType &&
          ['bar', 'area'].includes(optionsWithScaleType.elementType)
        ) {
          optionsWithScaleType.stacked = true
        }

        return { position: !i ? 'left' : 'right', ...optionsWithScaleType }
      }
    )
  }, [options.data, options.secondaryAxes, primaryAxisOptions])

  const svgRef = React.useRef<SVGSVGElement>(null)
  const getOptions = useGetLatest(options)

  const axisDimensionsState = React.useState<AxisDimensions>({
    left: {},
    right: {},
    top: {},
    bottom: {},
  })

  const [axisDimensions] = axisDimensionsState

  const focusedDatumState = React.useState<Datum<TDatum> | null>(null)
  const [focusedDatum] = focusedDatumState

  // useAtom<Datum<TDatum> | null>(focusedDatumAtom)

  const gridDimensions = React.useMemo((): GridDimensions => {
    // Left
    const [axesLeftWidth, axesLeftTop, axesLeftBottom] = (
      ['width', 'top', 'bottom'] as Measurement[]
    ).map(prop => sumAllDimensionProperties(axisDimensions.left, prop))

    const [axesRightWidth, axesRightTop, axesRightBottom] = (
      ['width', 'top', 'bottom'] as Measurement[]
    ).map(prop => sumAllDimensionProperties(axisDimensions.right, prop))

    const [axesTopHeight, axesTopLeft, axesTopRight] = (
      ['height', 'left', 'right'] as Measurement[]
    ).map(prop => sumAllDimensionProperties(axisDimensions.top, prop))

    const [axesBottomHeight, axesBottomLeft, axesBottomRight] = (
      ['height', 'left', 'right'] as Measurement[]
    ).map(prop => sumAllDimensionProperties(axisDimensions.bottom, prop))

    const gridX = Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft)
    const gridY = Math.max(axesTopHeight, axesLeftTop, axesRightTop)
    const gridWidth = Math.max(
      0,
      width -
        Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft) -
        Math.max(axesRightWidth, axesTopRight, axesBottomRight)
    )
    const gridHeight = Math.max(
      0,
      height -
        Math.max(axesTopHeight, axesLeftTop, axesRightTop) -
        Math.max(axesBottomHeight, axesLeftBottom, axesRightBottom)
    )

    return { gridX, gridY, gridWidth, gridHeight }
  }, [width, height, axisDimensions])

  const series = React.useMemo(() => {
    const series: Series<TDatum>[] = []

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

      for (
        let datumIndex = 0;
        datumIndex < originalDatums.length;
        datumIndex++
      ) {
        const originalDatum = originalDatums[datumIndex]
        datums[datumIndex] = {
          originalSeries,
          seriesIndex,
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
        secondaryAxisId,
        datums,
      }
    }

    if (secondaryAxesOptions.some(axisOptions => axisOptions.stacked)) {
      secondaryAxesOptions
        .filter(d => d.stacked)
        .forEach(secondaryAxis => {
          const axisSeries = series.filter(
            s => s.secondaryAxisId === secondaryAxis.id
          )
          const seriesIndices = Object.keys(axisSeries)
          const stacker = stack()
            .keys(seriesIndices)
            .value((_, seriesIndex, index) => {
              const val = secondaryAxis.getValue(
                axisSeries[Number(seriesIndex)].datums[index].originalDatum
              )

              if (typeof val === 'undefined' || val === null) {
                return 0
              }

              return val
            })
            .offset(secondaryAxis.stackOffset ?? stackOffsetNone)

          const stacked = stacker(
            Array.from({
              length: axisSeries.sort(
                (a, b) => b.datums.length - a.datums.length
              )[0].datums.length,
            })
          )

          stacked.forEach((s, sIndex) => {
            s.forEach((datum, i) => {
              // @ts-ignore
              datum.data = axisSeries[sIndex].datums[i]

              axisSeries[sIndex].datums[i].stackData =
                datum as unknown as StackDatum<TDatum>
            })
          })
        })
    }

    return series
  }, [options.data, secondaryAxesOptions])

  const primaryAxis = React.useMemo(() => {
    return buildAxisLinear<TDatum>(
      true,
      primaryAxisOptions,
      series,
      gridDimensions,
      width,
      height
    )
  }, [gridDimensions, height, primaryAxisOptions, series, width])

  const secondaryAxes = React.useMemo(() => {
    return secondaryAxesOptions.map(secondaryAxis => {
      return buildAxisLinear<TDatum>(
        false,
        secondaryAxis,
        series,
        gridDimensions,
        width,
        height
      )
    })
  }, [gridDimensions, height, secondaryAxesOptions, series, width])

  const groupedDatums = React.useMemo(() => {
    const groupedDatums = new Map<any, Datum<TDatum>[]>()

    const allDatums = series.map(s => s.datums).flat(2)

    allDatums.forEach(datum => {
      const primaryValue = `${primaryAxis.getValue(datum.originalDatum)}`

      if (!groupedDatums.has(primaryValue)) {
        groupedDatums.set(primaryValue, [])
      }

      groupedDatums.get(primaryValue)!.push(datum)
    })

    allDatums.forEach(datum => {
      const primaryValue = `${primaryAxis.getValue(datum.originalDatum)}`

      datum.group = groupedDatums.get(primaryValue)
    })

    return groupedDatums
  }, [primaryAxis, series])

  const getSeriesStatusStyle = React.useCallback(
    (series: Series<TDatum>, focusedDatum: Datum<TDatum> | null) => {
      const base = {
        color:
          getOptions().defaultColors[
            series.index % (getOptions().defaultColors.length - 1)
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
            datum.seriesIndex % (getOptions().defaultColors.length - 1)
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
    groupedDatums,
    width,
    height,
    getSeriesStatusStyle,
    getDatumStatusStyle,
    axisDimensionsState,
    focusedDatumState,
    svgRef,
  }

  const seriesByAxisId = React.useMemo(
    () =>
      sort(
        groups(orderedSeries, d => d.secondaryAxisId),
        ([key]) => secondaryAxes.findIndex(axis => axis.id === key)
      ),
    [orderedSeries, secondaryAxes]
  )

  let memoizeSeries = !options.getDatumStyle && !options.getSeriesStyle

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

  if (memoizeSeries) {
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
        if (elementType === 'line') {
          return Line
        }
        if (elementType === 'bar') {
          return Bar
        }
        if (elementType === 'area') {
          return Area
        }
        throw new Error('Invalid elementType')
      })()

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
      <div
        style={{
          fontFamily: 'sans-serif',
        }}
      >
        <svg
          ref={svgRef}
          style={{
            width,
            height,
            overflow: options.brush ? 'hidden' : 'visible',
          }}
          onClick={e => options.onClickDatum?.(focusedDatum, e)}
        >
          <g
            className="Series"
            style={{
              pointerEvents: 'none',
            }}
          >
            {seriesEl}
          </g>
          <g className="axes">
            {[primaryAxis, ...secondaryAxes].map(axis => (
              <AxisLinear key={[axis.position, axis.id].join('')} {...axis} />
            ))}
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

function sumAllDimensionProperties(
  axisDimensions: Record<string, AxisDimension>,
  side: Measurement
) {
  let sum = 0

  Object.keys(axisDimensions).forEach(axisId => {
    sum += axisDimensions[axisId]?.[side] || 0
  })

  return sum
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
