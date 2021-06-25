import { ScaleLinear } from 'd3-scale'
import { useAtom } from 'jotai'
import Raf from 'raf'
import React, { ComponentPropsWithoutRef } from 'react'

import {
  axisDimensionsAtom,
  chartOffsetAtom,
  focusedDatumAtom,
  pointerAtom,
} from '../atoms'
import useGetLatest from '../hooks/useGetLatest'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import useRect from '../hooks/useRect'
import Rectangle from '../primitives/Rectangle'
import Area from '../seriesTypes/Area'
import Bar from '../seriesTypes/Bar'
import Bubble from '../seriesTypes/Bubble'
import Line from '../seriesTypes/Line'
import {
  AxesInfo,
  AxisDimension,
  ChartOptions,
  Datum,
  GridDimensions,
  GroupingMode,
  Measurement,
  Pointer,
  RequiredChartOptions,
  Series,
  SeriesOptions,
  SeriesUnplotted,
  SeriesWithComponent,
  SeriesWithComponentIndex,
} from '../types'
import {
  getAxisIndexByAxisId,
  materializeStyles,
  isValidPoint,
  getSeriesStatus,
  getDatumStatus,
  translate,
} from '../utils/Utils'
import buildAxis from '../utils/buildAxis'
import { monotoneX } from '../utils/curveMonotone'
import AxisLinear from './AxisLinear'
import Brush from './Brush'
import Cursor from './Cursor'
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

const defaultSeries: SeriesOptions = {
  type: 'line' as const,
  // showPoints: true,
  showOrphans: true,
  curve: monotoneX,
}

function applyDefaults(options: ChartOptions): RequiredChartOptions {
  return {
    ...options,
    getSeriesStyle: options.getSeriesStyle ?? (() => ({})),
    getDatumStyle: options.getDatumStyle ?? (() => ({})),
    getSeriesOrder: options.getSeriesOrder ?? ((series: Series[]) => series),
    groupingMode: options.groupingMode ?? 'primary',
    showVoronoi: options.showVoronoi ?? false,
    defaultColors: options.defaultColors ?? defaultColorScheme,
  }
}

export type ChartContextValue = {
  getOptions: () => RequiredChartOptions
  gridDimensions: GridDimensions
  axesInfo: AxesInfo
  stackData: Series[]
  orderedStackData: Series[]
  width: number
  height: number
  getX: (datum: Datum) => any
  getY: (datum: Datum) => any
}

const chartContext = React.createContext<() => ChartContextValue>(null!)

export default function useChartContext() {
  return React.useContext(chartContext)()
}

export function Chart({
  options: userOptions,
  className,
  style = {},
  ...rest
}: ComponentPropsWithoutRef<'div'> & { options: ChartOptions }) {
  const options = applyDefaults(userOptions)
  const responsiveElRef = React.useRef<HTMLDivElement>(null)
  const { width, height } = useRect(
    responsiveElRef.current?.parentElement,
    options
  )

  return (
    <div
      ref={responsiveElRef}
      {...rest}
      className={`ReactChart ${className || ''}`}
      style={{
        width,
        height,
        position: 'absolute',
        ...style,
      }}
    >
      <ChartInner options={options} {...{ width, height }} />
    </div>
  )
}

function ChartInner({
  options,
  width,
  height,
}: {
  options: RequiredChartOptions
  width: number
  height: number
}) {
  const svgRef = React.useRef<SVGSVGElement>(null)

  const getOptions = useGetLatest(options)

  const [axisDimensions] = useAtom(axisDimensionsAtom)
  const [offset, setOffset] = useAtom(chartOffsetAtom)
  const [focusedDatum] = useAtom(focusedDatumAtom)
  const [, setPointer] = useAtom(pointerAtom)

  const gridDimensions = React.useMemo((): GridDimensions => {
    // Left
    const [axesLeftWidth, axesLeftTop, axesLeftBottom] = ([
      'width',
      'top',
      'bottom',
    ] as Measurement[]).map(prop =>
      sumAllDimensionProperties(axisDimensions.left, prop)
    )

    const [axesRightWidth, axesRightTop, axesRightBottom] = ([
      'width',
      'top',
      'bottom',
    ] as Measurement[]).map(prop =>
      sumAllDimensionProperties(axisDimensions.right, prop)
    )

    const [axesTopHeight, axesTopLeft, axesTopRight] = ([
      'height',
      'left',
      'right',
    ] as Measurement[]).map(prop =>
      sumAllDimensionProperties(axisDimensions.top, prop)
    )

    const [axesBottomHeight, axesBottomLeft, axesBottomRight] = ([
      'height',
      'left',
      'right',
    ] as Measurement[]).map(prop =>
      sumAllDimensionProperties(axisDimensions.bottom, prop)
    )

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

  const seriesWithComponentIndex = React.useMemo(() => {
    const series = []

    for (
      let seriesIndex = 0;
      seriesIndex < options.data.length;
      seriesIndex++
    ) {
      const originalSeries = options.data[seriesIndex]
      const seriesId = originalSeries.id ?? seriesIndex + ''
      const seriesLabel = originalSeries.label ?? `Series ${seriesIndex + 1}`
      const primaryAxisId = originalSeries.primaryAxisId
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
          index: datumIndex,
          originalDatum,
          primary: originalDatum.primary,
          secondary: originalDatum.secondary,
          radius: originalDatum.radius,
        }
      }

      series[seriesIndex] = {
        originalSeries,
        index: seriesIndex,
        id: seriesId,
        label: seriesLabel,
        primaryAxisId,
        secondaryAxisId,
        datums,
      }
    }

    const seriesWithComponent = series.map((serie, seriesIndex) => {
      const { type, ...rest } = {
        ...defaultSeries,
        ...serie,
        ...getOptions().getSeriesOptions?.(serie, seriesIndex),
      }

      let Component

      if (type === 'line') {
        Component = Line
      } else if (type === 'bubble') {
        Component = Bubble
      } else if (type === 'area') {
        Component = Area
      } else if (type === 'bar') {
        Component = Bar
      }

      if (!Component) {
        throw new Error(`Could not find a registered series type for ${type}`)
      }

      const seriesWithComponent: SeriesWithComponent = {
        ...serie,
        ...rest,
        type,
        Component,
      }

      return seriesWithComponent
    })

    return seriesWithComponent.map((prev, i, all) => {
      const seriesTypeIndex: number = all.filter(
        (d, j) => j < i && d.Component === prev.Component
      ).length

      const series: SeriesWithComponentIndex = {
        ...prev,
        seriesTypeIndex,
        datums: [], // placeholder
      }

      series.datums = prev.datums.map(datum => ({
        ...datum,
        seriesTypeIndex,
      }))

      return series
    })
  }, [getOptions, options.data])

  const axesInfo = React.useMemo((): AxesInfo => {
    // Calculate primary axes
    const axes = options.axes.map(axis => {
      return buildAxis(axis, seriesWithComponentIndex, gridDimensions)
    })

    // Detect axes changes and build axes
    const primaryAxes = axes.filter(d => d.primary)
    const secondaryAxes = axes.filter(d => !d.primary)

    // Make sure we're mapping x and y to the correct axes
    const xKey = primaryAxes.find(d => d.isVertical) ? 'secondary' : 'primary'
    const yKey = primaryAxes.find(d => d.isVertical) ? 'primary' : 'secondary'
    const xAxes = primaryAxes.find(d => d.isVertical)
      ? secondaryAxes
      : primaryAxes
    const yAxes = primaryAxes.find(d => d.isVertical)
      ? primaryAxes
      : secondaryAxes

    if (!primaryAxes.length || !secondaryAxes.length) {
      throw new Error('At least one primary and secondary axis are required!')
    }

    return {
      axes,
      primaryAxes,
      secondaryAxes,
      xKey,
      yKey,
      xAxes,
      yAxes,
    }
  }, [gridDimensions, options.axes, seriesWithComponentIndex])

  const stackData: Series[] = React.useMemo(() => {
    // If the axes are ready, let's decorate the materializedData for visual plotting
    // "totals" are kept per secondaryAxis and used for bases if secondaryAxis stacking is enabled
    const scaleTotals: Record<
      string,
      { negative: number; positive: number }
    >[] = axesInfo.secondaryAxes.map(() => ({}))

    seriesWithComponentIndex.forEach(series => {
      const axisIndex = getAxisIndexByAxisId(
        axesInfo.secondaryAxes,
        series.secondaryAxisId
      )
      series.datums.forEach(datum => {
        scaleTotals[axisIndex][datum.primary as any] = {
          negative: 0,
          positive: 0,
        }
      })
    })

    // Determine the correct primary and secondary values for each axis
    // Also calculate bases and totals if either axis is stacked
    let preStackData = seriesWithComponentIndex.map(series => {
      const primaryAxisIndex = getAxisIndexByAxisId(
        axesInfo.primaryAxes,
        series.primaryAxisId
      )
      const primaryAxis = axesInfo.primaryAxes[primaryAxisIndex]
      const secondaryAxisIndex = getAxisIndexByAxisId(
        axesInfo.secondaryAxes,
        series.secondaryAxisId
      )
      const secondaryAxis = axesInfo.secondaryAxes[secondaryAxisIndex]
      const seriesUnplotted: SeriesUnplotted = {
        ...series,
        primaryAxis,
        secondaryAxis,
        getStatusStyle: undefined!,
        datums: series.datums.map(d => {
          const datum = {
            ...d,
            primaryAxis,
            secondaryAxis,
            xValue: d[axesInfo.xKey],
            yValue: d[axesInfo.yKey],
            baseValue: 0,
            totalValue: 0,
            group: undefined!,
            getStatusStyle: undefined!,
          }

          if (secondaryAxis.stacked) {
            const start = scaleTotals[secondaryAxisIndex][d.primary as any]
            // Stack the x or y values (according to axis positioning)
            if (primaryAxis.isVertical) {
              // Is this a valid point?
              const validPoint = isValidPoint(datum.xValue)
              // Should we use positive or negative base?
              const totalKey =
                (datum.xValue as number) >= 0 ? 'positive' : 'negative'
              // Assign the base
              datum.baseValue = start[totalKey]
              // Add the value for a total
              datum.totalValue =
                datum.baseValue + (validPoint ? (datum.xValue as number) : 0)
              // Update the totals
              scaleTotals[secondaryAxisIndex][d.primary as any][totalKey] =
                datum.totalValue
              // Make the total the new value
              datum.xValue = validPoint ? datum.totalValue : null
            } else {
              // Is this a valid point?
              const validPoint = isValidPoint(datum.yValue)
              // Should we use positive or negative base?
              const totalKey =
                (datum.yValue as number) >= 0 ? 'positive' : 'negative'
              // Assign the base
              datum.baseValue = start[totalKey]
              // Add the value to the base
              datum.totalValue =
                datum.baseValue + (validPoint ? (datum.yValue as number) : 0)
              // Update the totals
              scaleTotals[secondaryAxisIndex][d.primary as any][totalKey] =
                datum.totalValue
              // Make the total the new value
              datum.yValue = validPoint ? datum.totalValue : null
            }
          }

          return datum
        }),
      }

      return seriesUnplotted
    })

    // Use the plotDatum method on each series
    let stackData: Series[] = preStackData.map((series, i) => {
      if (!series.Component.plotDatum) {
        throw new Error(
          `Could not find a [SeriesType].plotDatum() static method for the series Component above (index: ${i})`
        )
      }

      const primaryAxisIndex = getAxisIndexByAxisId(
        axesInfo.primaryAxes,
        series.primaryAxisId
      )
      const secondaryAxisIndex = getAxisIndexByAxisId(
        axesInfo.secondaryAxes,
        series.secondaryAxisId
      )

      const primaryAxis = axesInfo.primaryAxes[primaryAxisIndex]
      const secondaryAxis = axesInfo.secondaryAxes[secondaryAxisIndex]

      const xAxisIndex = getAxisIndexByAxisId(
        axesInfo.xAxes,
        series[`${axesInfo.xKey}AxisId` as const]
      )
      const yAxisIndex = getAxisIndexByAxisId(
        axesInfo.yAxes,
        series[`${axesInfo.yKey}AxisId` as const]
      )

      const xAxis = axesInfo.xAxes[xAxisIndex]
      const yAxis = axesInfo.yAxes[yAxisIndex]

      series.datums = series.datums.map(d => {
        // Data for cartesian charts
        series.Component.plotDatum(
          d as Datum,
          primaryAxis,
          secondaryAxis,
          xAxis,
          yAxis
        )

        return d as Datum
      })

      return series as Series
    })

    // Do any data grouping ahead of time using
    if (['single', 'series'].includes(options.groupingMode)) {
      for (let seriesIndex = 0; seriesIndex < stackData.length; seriesIndex++) {
        const series = stackData[seriesIndex]
        for (
          let datumIndex = 0;
          datumIndex < series.datums.length;
          datumIndex++
        ) {
          const datum = series.datums[datumIndex]
          datum.group =
            options.groupingMode === 'series'
              ? (series.datums as Datum[])
              : [datum as Datum]
        }
      }
    } else if (['primary', 'secondary'].includes(options.groupingMode)) {
      const datumsByGrouping: Record<string, Datum[]> = {}

      for (let seriesIndex = 0; seriesIndex < stackData.length; seriesIndex++) {
        const series = stackData[seriesIndex]

        for (
          let datumIndex = 0;
          datumIndex < series.datums.length;
          datumIndex++
        ) {
          const datum = series.datums[datumIndex]
          const axisKey = String(
            options.groupingMode === 'primary' ? datum.primary : datum.secondary
          )

          datumsByGrouping[axisKey] = datumsByGrouping[axisKey] || []
          datumsByGrouping[axisKey].push(datum as Datum)
        }
      }

      for (let seriesIndex = 0; seriesIndex < stackData.length; seriesIndex++) {
        const series = stackData[seriesIndex]
        for (
          let datumIndex = 0;
          datumIndex < series.datums.length;
          datumIndex++
        ) {
          const datum = series.datums[datumIndex]
          const axisKey = String(
            options.groupingMode === 'primary' ? datum.primary : datum.secondary
          )

          datum.group = datumsByGrouping[axisKey]
        }
      }
    }

    stackData = stackData.map(series => {
      const defaults = {
        color:
          options.defaultColors[
            series.index % (options.defaultColors.length - 1)
          ],
      }

      series.getStatusStyle = (focusedDatum: Datum | null) => {
        const status = getSeriesStatus(series as Series, focusedDatum)
        const statusStyles = options.getSeriesStyle(series as Series, status)
        series.style = materializeStyles(statusStyles, defaults)
        return series.style
      }

      // We also need to decorate each datum in the same fashion
      series.datums.forEach(datum => {
        datum.getStatusStyle = (focusedDatum: Datum | null) => {
          const status = getDatumStatus(datum as Datum, focusedDatum)
          const statusStyles = options.getDatumStyle(datum as Datum, status)
          datum.style = materializeStyles(statusStyles, {
            ...defaults,
            ...series.style,
          })
          return datum.style
        }

        datum.series = series
      })

      return series
    })

    return stackData
  }, [
    axesInfo.secondaryAxes,
    axesInfo.primaryAxes,
    axesInfo.xKey,
    axesInfo.yKey,
    axesInfo.xAxes,
    axesInfo.yAxes,
    seriesWithComponentIndex,
    options,
  ])

  // const getSeriesStyle = React.useCallback(
  //   (series, ...args) => ({
  //     color: series.originalSeries.color,
  //     ...options.getSeriesStyle(series, ...args),
  //   }),
  //   [options.getSeriesStyle]
  // )

  // Measure SVG element to detect grid offset in screen
  useIsomorphicLayoutEffect(() => {
    if (!svgRef.current) {
      return
    }

    const current = svgRef.current.getBoundingClientRect()

    if (current.left !== offset.left || current.top !== offset.top) {
      setOffset({
        left: current.left,
        top: current.top,
      })
    }
  })

  const mouseMoveRafRef = React.useRef<number | null>()

  const onMouseMove = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent> | MouseEvent
  ) => {
    if (mouseMoveRafRef.current) {
      Raf.cancel(mouseMoveRafRef.current)
    }

    mouseMoveRafRef.current = Raf(() => {
      mouseMoveRafRef.current = null
      const { clientX, clientY } = e

      setPointer(old => {
        const x = clientX - offset.left - gridDimensions.gridX
        const y = clientY - offset.top - gridDimensions.gridY

        return {
          ...old,
          svgHovered: true,
          x,
          y,
        }
      })
    })
  }

  const onMouseUp = () => {
    document.removeEventListener('mouseup', onMouseUp)
    document.removeEventListener('mousemove', onMouseMove)

    // if (options.brush?.onSelect && pointer.dragging) {
    //   if (Math.abs(pointer.startX - pointer.x) >= 20) {
    //     options.brush.onSelect({
    //       pointer,
    //       start: (axesInfo.primaryAxes[0].scale as ScaleLinear<
    //         number,
    //         number
    //       >).invert(pointer.startX),
    //       end: (axesInfo.primaryAxes[0].scale as ScaleLinear<
    //         number,
    //         number
    //       >).invert(pointer.x),
    //     })
    //   }
    // }

    setPointer(
      (old): Pointer => {
        return {
          ...old,
          dragging: false,
        }
      }
    )
  }

  const onMouseDown = () => {
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)

    setPointer(
      (old): Pointer => {
        return {
          ...old,
          startX: old.x,
          startY: old.y,
          dragging: true,
        }
      }
    )
  }

  // Reverse the stack order for proper z-indexing
  const reversedStackData = [...stackData].reverse()
  const orderedStackData = options.getSeriesOrder(reversedStackData)

  const focusedSeriesIndex = focusedDatum
    ? orderedStackData.findIndex(series => series.id === focusedDatum.series.id)
    : -1

  // Bring focused series to the front
  const focusOrderedStackData = focusedDatum
    ? [
        ...orderedStackData.slice(0, focusedSeriesIndex),
        ...orderedStackData.slice(focusedSeriesIndex + 1),
        orderedStackData[focusedSeriesIndex],
      ]
    : orderedStackData

  const stacks = focusOrderedStackData.map(stack => {
    return <stack.Component key={stack.id} series={stack} />
  })

  useIsomorphicLayoutEffect(() => {
    if (
      svgRef.current &&
      svgRef.current.parentElement &&
      !svgRef.current.parentElement.style.position
    ) {
      svgRef.current.parentElement.style.position = 'relative'
    }
  })

  const contextValue: ChartContextValue = {
    getOptions,
    gridDimensions,
    axesInfo,
    stackData,
    orderedStackData,
    width,
    height,
  }

  return (
    <chartContext.Provider value={useGetLatest(contextValue)}>
      <svg
        ref={svgRef}
        style={{
          width,
          height,
          overflow: options.brush ? 'hidden' : 'visible',
        }}
        onMouseEnter={e => {
          e.persist()
          onMouseMove(e)
        }}
        onMouseMove={e => {
          e.persist()
          onMouseMove(e)
        }}
        onMouseLeave={e => {
          e.persist()
          setPointer(old => {
            return {
              ...old,
              svgHovered: false,
            }
          })
        }}
        onMouseDown={e => {
          e.persist()
          onMouseDown()
        }}
        onClick={e => options.onClickDatum?.(focusedDatum, e)}
      >
        <g
          style={{
            transform: translate(gridDimensions.gridX, gridDimensions.gridY),
          }}
        >
          <Rectangle
            // To ensure the pointer always has something to hit
            x1={-gridDimensions.gridX}
            x2={width - gridDimensions.gridX}
            y1={-gridDimensions.gridY}
            y2={height - gridDimensions.gridY}
            style={{
              opacity: 0,
            }}
          />
          <g className="axes">
            {[...axesInfo.primaryAxes, ...axesInfo.secondaryAxes].map(axis => (
              <AxisLinear key={axis.id} {...axis} />
            ))}
          </g>
          <g
            className="Series"
            style={{
              pointerEvents: 'none',
            }}
          >
            {stacks}
          </g>
          <Voronoi />
        </g>
        {options.renderSVG?.() ?? null}
      </svg>
      <Cursor isPrimary />
      <Cursor />
      <Brush />
      <Tooltip />
    </chartContext.Provider>
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
