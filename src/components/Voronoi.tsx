import React from 'react'
import { Delaunay } from 'd3-delaunay'

//
import { Axis, Datum } from '../types'
import { translate } from '../utils/Utils'
import useChartContext from '../utils/chartContext'
import { line } from 'd3-shape'
import { getPrimaryGroupLength, getPrimaryLength } from '../seriesTypes/Bar'

export default function Voronoi<TDatum>() {
  const { getOptions, focusedDatumState } = useChartContext<TDatum>()

  const [, setFocusedDatum] = focusedDatumState

  const {
    onFocusDatum,
    onClickDatum,
    tooltip,
    primaryCursor,
    secondaryCursor,
    showVoronoi,
    interactionMode,
  } = getOptions()

  const handleFocus = React.useCallback(
    (datum: Datum<TDatum> | null) => {
      getOptions().onFocusDatum?.(datum)
      setFocusedDatum(datum)
    },
    [getOptions, setFocusedDatum]
  )

  const needsVoronoi =
    onFocusDatum ||
    onClickDatum ||
    tooltip ||
    primaryCursor ||
    secondaryCursor ||
    showVoronoi

  if (!needsVoronoi) {
    return null
  }

  const props = {
    handleFocus,
  }

  if (interactionMode === 'closest') {
    return <SingleVoronoi {...props} />
  }

  return <PrimaryVoronoi {...props} />
}

function PrimaryVoronoi<TDatum>({
  handleFocus,
}: {
  handleFocus: (datum: Datum<TDatum> | null) => void
}) {
  const {
    primaryAxis,
    secondaryAxes,
    getOptions,
    gridDimensions,
    datumsByInteractionGroup,
  } = useChartContext<TDatum>()

  const stackedVoronoi = secondaryAxes.length === 1 && secondaryAxes[0].stacked

  const useBarPx = secondaryAxes.every(
    d => d.elementType === 'bar' && !d.stacked
  )

  return React.useMemo(() => {
    let preColumns = Array.from(datumsByInteractionGroup.entries())
      .map(([_, datums]) => datums)
      .filter(datums => {
        const datum = datums[0]

        if (!datum) {
          return
        }

        const primaryValue = datum.primaryValue
        return primaryValue !== 'undefined' && primaryValue !== null
      })
      .sort((a, b) => {
        const aAxis = secondaryAxes.find(d => d.id === a[0].secondaryAxisId)!
        const bAxis = secondaryAxes.find(d => d.id === b[0].secondaryAxisId)!

        const aPx = getPrimary(a[0], primaryAxis, aAxis, useBarPx)
        const bPx = getPrimary(b[0], primaryAxis, bAxis, useBarPx)

        return aPx - bPx
      })

    if (primaryAxis.isVertical) {
      preColumns.reverse()
    }

    const columns = preColumns.map((datums, i, all) => {
      const datum = datums[0]

      const prev = all[i - 1]
      const next = all[i + 1]

      const secondaryAxis = secondaryAxes.find(
        d => d.id === datum.secondaryAxisId
      )!
      const primaryPx = getPrimary(datum, primaryAxis, secondaryAxis, useBarPx)

      let range = primaryAxis?.scale.range() ?? [0, 0]

      let [primaryStart, primaryEnd] = range

      if (prev) {
        const secondaryAxis = secondaryAxes.find(
          d => d.id === prev[0].secondaryAxisId
        )!
        const prevPx = getPrimary(prev[0], primaryAxis, secondaryAxis, useBarPx)
        primaryStart = primaryPx - (primaryPx - prevPx) / 2
      }

      if (next) {
        const secondaryAxis = secondaryAxes.find(
          d => d.id === next[0].secondaryAxisId
        )!
        const nextPx = getPrimary(next[0], primaryAxis, secondaryAxis, useBarPx)
        primaryEnd = primaryPx + (nextPx - primaryPx) / 2
      }

      return {
        primaryStart,
        primaryEnd,
        primaryPx,
        datumBoundaries: datums
          .filter(datum => {
            const secondaryValue = datum.secondaryValue
            return (
              typeof secondaryValue !== 'undefined' && secondaryValue !== null
            )
          })
          .map((datum, i, all) => {
            const prev = all[i - 1]
            const next = all[i + 1]

            const secondaryAxis = secondaryAxes.find(
              d => d.id === datum.secondaryAxisId
            )

            if (stackedVoronoi) {
              let range = secondaryAxis?.scale.range() ?? [0, 0]

              let stackData = [datum.stackData?.[0], datum.stackData?.[1]]

              if (secondaryAxis?.isVertical) {
                range.reverse()
                stackData.reverse()
              }

              let [secondaryStart, secondaryEnd] = range

              if (prev) {
                secondaryStart =
                  secondaryAxis?.scale(stackData[0] ?? NaN) ?? NaN
              }

              if (next) {
                secondaryEnd = secondaryAxis?.scale(stackData[1] ?? NaN) ?? NaN
              }

              return {
                secondaryStart,
                secondaryEnd,
                datum,
              }
            }

            const value =
              secondaryAxis?.scale(
                secondaryAxis.stacked
                  ? datum.stackData?.[1]
                  : datum.secondaryValue
              ) ?? NaN

            let range = secondaryAxis?.scale.range() ?? [0, 0]

            if (secondaryAxis?.isVertical) {
              range.reverse()
            }

            let [secondaryStart, secondaryEnd] = range

            if (prev) {
              const prevAxis = secondaryAxes.find(
                d => d.id === prev?.secondaryAxisId
              )
              const prevValue =
                prevAxis?.scale(
                  prevAxis.stacked ? prev.stackData?.[1] : prev.secondaryValue
                ) ?? NaN
              secondaryStart = value - (value - prevValue) / 2
            }

            if (next) {
              const nextAxis = secondaryAxes.find(
                d => d.id === next?.secondaryAxisId
              )
              const nextValue =
                nextAxis?.scale(
                  nextAxis.stacked ? next.stackData?.[1] : next.secondaryValue
                ) ?? NaN
              secondaryEnd = value + (nextValue - value) / 2
            }

            return {
              secondaryStart,
              secondaryEnd,
              datum,
            }
          }),
      }
    })

    return (
      <g
        {...{
          onMouseLeave: () => handleFocus(null),
          style: {
            transform: translate(gridDimensions.left, gridDimensions.top),
          },
        }}
      >
        {columns.map((column, i) => {
          return (
            <g key={`${column.primaryPx}_${i}`}>
              {column.datumBoundaries.map((datumBoundary, i) => {
                const x1 = !primaryAxis.isVertical
                  ? column.primaryStart
                  : datumBoundary.secondaryStart
                const x2 = !primaryAxis.isVertical
                  ? column.primaryEnd
                  : datumBoundary.secondaryEnd
                const y1 = !primaryAxis.isVertical
                  ? datumBoundary.secondaryStart
                  : column.primaryStart
                const y2 = !primaryAxis.isVertical
                  ? datumBoundary.secondaryEnd
                  : column.primaryEnd

                const x = Math.min(x1, x2)
                const y = Math.min(y1, y2)
                const xEnd = Math.max(x1, x2)
                const yEnd = Math.max(y1, y2)

                const height = Math.max(yEnd - y, 0)
                const width = Math.max(xEnd - x, 0)

                return (
                  <rect
                    {...{
                      key: i,
                      x,
                      y,
                      width,
                      height,
                      className: 'action-voronoi',
                      onMouseEnter: () => handleFocus(datumBoundary.datum),
                      style: {
                        fill: getOptions().dark
                          ? '#ffffff33'
                          : 'rgba(0,0,0,0.2)',
                        strokeWidth: 1,
                        stroke: getOptions().dark ? 'white' : 'black',
                        opacity: getOptions().showVoronoi ? 1 : 0,
                      },
                    }}
                  />
                )
              })}
            </g>
          )
        })}
      </g>
    )
  }, [
    datumsByInteractionGroup,
    primaryAxis,
    gridDimensions.left,
    gridDimensions.top,
    secondaryAxes,
    useBarPx,
    stackedVoronoi,
    handleFocus,
    getOptions,
  ])
}

const delaunayLineFn = line()

function SingleVoronoi<TDatum>({
  handleFocus,
}: {
  handleFocus: (datum: Datum<TDatum> | null) => void
}) {
  const {
    primaryAxis,
    series,
    secondaryAxes,
    getOptions,
    gridDimensions,
    // datumsByInteractionGroup,
  } = useChartContext<TDatum>()

  let polygons = null

  const voronoiData: { x: number; y: number; datum: Datum<TDatum> }[] = []

  const useBarPx = secondaryAxes.every(
    d => d.elementType === 'bar' && !d.stacked
  )

  series.forEach(serie => {
    serie.datums
      .filter(datum => {
        const primaryValue = datum.primaryValue
        const secondaryValue = datum.secondaryValue
        return (
          primaryValue !== 'undefined' &&
          primaryValue !== null &&
          secondaryValue !== 'undefined' &&
          secondaryValue !== null
        )
      })
      .forEach(datum => {
        const secondaryAxis = secondaryAxes.find(
          d => d.id === datum.secondaryAxisId
        )
        const x = getX(datum, primaryAxis, secondaryAxis!, useBarPx)
        const y = getY(datum, primaryAxis, secondaryAxis!, useBarPx)

        if (
          typeof x !== 'number' ||
          typeof y !== 'number' ||
          Number.isNaN(y) ||
          Number.isNaN(x)
        ) {
          return
        }

        voronoiData.push({
          x,
          y,
          datum,
        })
      })
  })

  const delaunay = Delaunay.from(
    voronoiData,
    d => Math.max(d.x, 0),
    d => Math.max(d.y, 0)
  )

  const voronoi = delaunay.voronoi([
    0,
    0,
    gridDimensions.width,
    gridDimensions.height,
  ])

  polygons = voronoi.cellPolygons()

  polygons = Array.from(polygons)

  return (
    <g
      {...{
        onMouseLeave: () => handleFocus(null),
        style: {
          transform: translate(gridDimensions.left, gridDimensions.top),
        },
      }}
    >
      {polygons.map((points, i) => {
        const index = points.index
        const datum = voronoiData[index].datum
        const path = delaunayLineFn(points as any) || undefined
        return (
          <path
            {...{
              key: i,
              d: path,
              className: 'action-voronoi',
              onMouseEnter: () => handleFocus(datum),
              style: {
                fill: getOptions().dark ? '#ffffff33' : 'rgba(0,0,0,0.2)',
                strokeWidth: 1,
                stroke: getOptions().dark ? 'white' : 'black',
                opacity: getOptions().showVoronoi ? 1 : 0,
              },
            }}
          />
        )
      })}
    </g>
  )
}

function getX<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>,
  useBarPx: boolean
): number {
  return primaryAxis.isVertical
    ? getSecondary(datum, secondaryAxis)
    : getPrimary(datum, primaryAxis, secondaryAxis, useBarPx)
}

function getY<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>,
  useBarPx: boolean
): number {
  return primaryAxis.isVertical
    ? getPrimary(datum, primaryAxis, secondaryAxis, useBarPx)
    : getSecondary(datum, secondaryAxis)
}

function getPrimary<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>,
  useBarPx: boolean
): number {
  let primary = primaryAxis.scale(datum.primaryValue) ?? NaN

  if (useBarPx && secondaryAxis.elementType === 'bar') {
    if (!secondaryAxis.stacked) {
      primary += primaryAxis.seriesBandScale!(datum.seriesIndex) ?? NaN
      primary += getPrimaryLength(datum, primaryAxis, secondaryAxis) / 2
    } else {
      primary += getPrimaryGroupLength(datum, primaryAxis) / 2
    }
  }

  return primary
}

function getSecondary<TDatum>(
  datum: Datum<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  if (secondaryAxis.stacked) {
    return secondaryAxis.scale(datum.stackData?.[1] ?? NaN) ?? NaN
  }

  return secondaryAxis.scale(datum.secondaryValue) ?? NaN
}
