import { groups, sort } from 'd3-array'
import { stack, stackOffsetNone } from 'd3-shape'
import { atom, useAtom } from 'jotai'
import React, { ComponentPropsWithoutRef } from 'react'

import useGetLatest from '../hooks/useGetLatest'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import useRect from '../hooks/useRect'
import Area from '../seriesTypes/Area'
import Bar from '../seriesTypes/Bar'
import Line from '../seriesTypes/Line'
//
import {
  AxesInfo,
  AxisDimension,
  AxisDimensions,
  ChartContextValue,
  ChartOptions,
  Datum,
  GridDimensions,
  Measurement,
  RequiredChartOptions,
  Series,
  StackDatum,
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
    getSeriesStyle: options.getSeriesStyle ?? (() => ({})),
    getDatumStyle: options.getDatumStyle ?? (() => ({})),
    getSeriesOrder:
      options.getSeriesOrder ?? ((series: Series<TDatum>[]) => series),
    groupingMode: options.groupingMode ?? 'primary',
    showVoronoi: options.showVoronoi ?? false,
    defaultColors: options.defaultColors ?? defaultColorScheme,
  }
}

export function Chart<TDatum>({
  options: userOptions,
  className,
  style = {},
  ...rest
}: ComponentPropsWithoutRef<'div'> & { options: ChartOptions<TDatum> }) {
  const options = defaultChartOptions(userOptions)
  const [
    containerElement,
    setContainerElement,
  ] = React.useState<HTMLDivElement | null>(null)
  const parentElement = containerElement?.parentElement

  const { width, height } = useRect(parentElement, options)

  useIsomorphicLayoutEffect(() => {
    if (parentElement) {
      const computed = window.getComputedStyle(parentElement)

      if (!['relative', 'absolute', 'fixed'].includes(computed.display)) {
        parentElement.style.position = 'relative'
      }
    }
  }, [parentElement])

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
      <ChartInner options={options} {...{ width, height }} />
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

  const svgRef = React.useRef<SVGSVGElement>(null)
  const svgRect = useRect(svgRef.current)
  const getOptions = useGetLatest(options)

  const axisDimensionsAtom = React.useMemo(
    () =>
      atom<AxisDimensions>({
        left: {},
        right: {},
        top: {},
        bottom: {},
      }),
    []
  )

  const focusedDatumAtom = React.useMemo(
    () => atom<Datum<TDatum> | null>(null),
    []
  )

  const useAxisDimensionsAtom = React.useCallback(() => {
    // eslint-disable-next-line
    return useAtom(axisDimensionsAtom)
  }, [axisDimensionsAtom])
  const useFocusedDatumAtom = React.useCallback(() => {
    // eslint-disable-next-line
    return useAtom(focusedDatumAtom)
  }, [focusedDatumAtom])

  // useAtom<Datum<TDatum> | null>(focusedDatumAtom)

  const [axisDimensions] = useAxisDimensionsAtom()
  const [focusedDatum] = useFocusedDatumAtom()

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

    if (options.secondaryAxes.some(axisOptions => axisOptions.stacked)) {
      options.secondaryAxes
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

              axisSeries[sIndex].datums[
                i
              ].stackData = (datum as unknown) as StackDatum<TDatum>
            })
          })
        })
    }

    return series
  }, [options.data, options.secondaryAxes])

  const primaryAxis = React.useMemo(() => {
    return buildAxisLinear<TDatum>(
      options.primaryAxis,
      series,
      gridDimensions,
      width,
      height
    )
  }, [gridDimensions, height, options.primaryAxis, series, width])

  const secondaryAxes = React.useMemo(() => {
    return options.secondaryAxes.map(secondaryAxis => {
      return buildAxisLinear<TDatum>(
        secondaryAxis,
        series,
        gridDimensions,
        width,
        height
      )
    })
  }, [gridDimensions, height, options.secondaryAxes, series, width])

  const axesInfo: AxesInfo = React.useMemo(() => {
    // Make sure we're mapping x and y to the correct axes
    const xKey = primaryAxis.isVertical ? 'secondary' : 'primary'
    const yKey = primaryAxis.isVertical ? 'primary' : 'secondary'

    return {
      xKey,
      yKey,
    }
  }, [primaryAxis])

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
        color: getOptions().defaultColors[
          series.index % (getOptions().defaultColors.length - 1)
        ],
      }

      const status = getSeriesStatus(series, focusedDatum)
      const statusStyles = getOptions().getSeriesStyle(series, status)
      series.style = materializeStyles(statusStyles, base)
      return series.style
    },
    [getOptions]
  )

  const getDatumStatusStyle = React.useCallback(
    (datum: Datum<TDatum>, focusedDatum: Datum<TDatum> | null) => {
      const base = {
        ...series[datum.seriesIndex].style,
        color: getOptions().defaultColors[
          datum.seriesIndex % (getOptions().defaultColors.length - 1)
        ],
      }

      const status = getDatumStatus(datum as Datum<TDatum>, focusedDatum)
      const statusStyles = getOptions().getDatumStyle(
        datum as Datum<TDatum>,
        status
      )

      datum.style = materializeStyles(statusStyles, base)

      return datum.style
    },
    [getOptions, series]
  )

  // const mouseMoveRafRef = React.useRef<number | null>()

  // const onMouseMove = (
  //   e: React.MouseEvent<SVGSVGElement, MouseEvent> | MouseEvent
  // ) => {
  //   if (mouseMoveRafRef.current) {
  //     Raf.cancel(mouseMoveRafRef.current)
  //   }

  //   mouseMoveRafRef.current = Raf(() => {
  //     mouseMoveRafRef.current = null
  //     const { clientX, clientY } = e

  //     setPointer(old => {
  //       const x = clientX - svgRect.left - gridDimensions.gridX
  //       const y = clientY - svgRect.top - gridDimensions.gridY

  //       return {
  //         ...old,
  //         svgHovered: true,
  //         x,
  //         y,
  //       }
  //     })
  //   })
  // }

  // const onMouseUp = () => {
  //   document.removeEventListener('mouseup', onMouseUp)
  //   document.removeEventListener('mousemove', onMouseMove)

  //   // if (options.brush?.onSelect && pointer.dragging) {
  //   //   if (Math.abs(pointer.startX - pointer.x) >= 20) {
  //   //     options.brush.onSelect({
  //   //       pointer,
  //   //       start: (axesInfo.primaryAxes[0].scale as ScaleLinear<
  //   //         number,
  //   //         number
  //   //       >).invert(pointer.startX),
  //   //       end: (axesInfo.primaryAxes[0].scale as ScaleLinear<
  //   //         number,
  //   //         number
  //   //       >).invert(pointer.x),
  //   //     })
  //   //   }
  //   // }

  //   setPointer(
  //     (old): Pointer => {
  //       return {
  //         ...old,
  //         dragging: false,
  //       }
  //     }
  //   )
  // }

  // const onMouseDown = () => {
  //   document.addEventListener('mouseup', onMouseUp)
  //   document.addEventListener('mousemove', onMouseMove)

  //   setPointer(
  //     (old): Pointer => {
  //       return {
  //         ...old,
  //         startX: old.x,
  //         startY: old.y,
  //         dragging: true,
  //       }
  //     }
  //   )
  // }

  // Reverse the stack order for proper z-indexing
  const reversedSeries = [...series].reverse()
  let orderedSeries = options.getSeriesOrder(reversedSeries)

  // const focusedSeriesIndex = focusedDatum
  //   ? orderedSeries.findIndex(series => series.id === focusedDatum.seriesId)
  //   : -1

  // Bring focused series to the front
  // orderedSeries = focusedDatum
  //   ? [
  //       ...orderedSeries.slice(0, focusedSeriesIndex),
  //       ...orderedSeries.slice(focusedSeriesIndex + 1),
  //       orderedSeries[focusedSeriesIndex],
  //     ]
  //   : orderedSeries

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
    axesInfo,
    series,
    orderedSeries,
    groupedDatums,
    width,
    height,
    getSeriesStatusStyle,
    getDatumStatusStyle,
    useAxisDimensionsAtom,
    useFocusedDatumAtom,
    svgRect,
  }

  const seriesByAxisId = sort(
    groups(orderedSeries, d => d.secondaryAxisId),
    ([key]) => secondaryAxes.findIndex(axis => axis.id === key)
  )

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
          // onMouseEnter={e => {
          //   e.persist()
          //   onMouseMove(e)
          // }}
          // onMouseMove={e => {
          //   e.persist()
          //   onMouseMove(e)
          // }}
          // onMouseLeave={e => {
          //   e.persist()
          //   setPointer(old => {
          //     return {
          //       ...old,
          //       svgHovered: false,
          //     }
          //   })
          // }}
          // onMouseDown={e => {
          //   e.persist()
          //   onMouseDown()
          // }}
          onClick={e => options.onClickDatum?.(focusedDatum, e)}
        >
          <g
            className="Series"
            style={{
              pointerEvents: 'none',
            }}
          >
            {seriesByAxisId.map(([axisId, series]) => {
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
            })}
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
