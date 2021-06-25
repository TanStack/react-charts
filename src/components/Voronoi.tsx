import { Delaunay } from 'd3-delaunay'
import { line } from 'd3-shape'
import { useAtom } from 'jotai'
import React, { ComponentPropsWithoutRef } from 'react'

import { focusedDatumAtom } from '../atoms'
//
import Path from '../primitives/Path'
import Rectangle from '../primitives/Rectangle'
import { AxisLinear, Datum, GroupingMode, Series } from '../types'
import useChartContext from './Chart'

type DatumBoundary = {
  start?: number
  end?: number
  datum: Datum
}

const lineFn = line()

const VoronoiElement = ({
  children,
  ...rest
}: ComponentPropsWithoutRef<'g'>) => (
  <g className="Voronoi" {...rest}>
    {children}
  </g>
)

export default function Voronoi() {
  const {
    getOptions,
    stackData,
    axesInfo,
    width,
    height,
    gridDimensions,
  } = useChartContext()

  const [, setFocusedDatum] = useAtom(focusedDatumAtom)

  const {
    onFocusDatum,
    onClickDatum,
    tooltip,
    primaryCursor,
    secondaryCursor,
    showVoronoi,
    groupingMode,
  } = getOptions()

  const handleFocus = React.useCallback(
    (datum: Datum | null) => {
      onFocusDatum?.(datum)
      setFocusedDatum(datum)
    },
    [onFocusDatum, setFocusedDatum]
  )

  const needsVoronoi =
    onFocusDatum || onClickDatum || tooltip || primaryCursor || secondaryCursor

  return React.useMemo(() => {
    // Don't render until we have all dependencies
    if (
      !stackData ||
      !axesInfo.primaryAxes.length ||
      !axesInfo.secondaryAxes.length ||
      !width ||
      !height ||
      !needsVoronoi
    ) {
      return null
    }

    const extent = [
      [0, 0],
      [gridDimensions.gridWidth, gridDimensions.gridHeight],
    ]

    const props = {
      stackData,
      extent,
      handleFocus,
      showVoronoi,
      primaryAxes: axesInfo.primaryAxes,
    }

    if (groupingMode === 'primary') {
      return <PrimaryVoronoi {...props} />
    }

    return <ClosestVoronoi {...props} />
  }, [
    stackData,
    axesInfo.primaryAxes,
    axesInfo.secondaryAxes.length,
    width,
    height,
    needsVoronoi,
    gridDimensions.gridWidth,
    gridDimensions.gridHeight,
    handleFocus,
    showVoronoi,
    groupingMode,
  ])
}

function PrimaryVoronoi({
  stackData,
  extent,
  handleFocus,
  showVoronoi,
  primaryAxes,
}: {
  stackData: Series[]
  extent: number[][]
  handleFocus: (datum: Datum | null) => void
  showVoronoi: boolean
  primaryAxes: AxisLinear[]
}) {
  const primaryAxis = primaryAxes[0]
  const isVertical = primaryAxis.isVertical

  const datumBoundaries: DatumBoundary[] = []

  stackData.forEach(series => {
    series.datums
      .filter(d => d.defined)
      .forEach(datum => {
        let start: number | undefined
        let end: number | undefined

        datum.boundingPoints.forEach(boundingPoint => {
          if (
            typeof datum.primaryCoord !== 'number' ||
            typeof datum.secondaryCoord !== 'number' ||
            Number.isNaN(datum.secondaryCoord) ||
            Number.isNaN(datum.primaryCoord)
          ) {
            return
          }

          start = Math.min(
            start ?? boundingPoint.secondaryCoord,
            boundingPoint.secondaryCoord
          )
          end = Math.max(
            end ?? boundingPoint.secondaryCoord,
            boundingPoint.secondaryCoord
          )
        })

        if (typeof start !== 'undefined' && typeof end !== 'undefined') {
          datumBoundaries.push({
            start,
            end,
            datum,
          })
        }
      })
  })

  console.log(datumBoundaries)

  const groupedBoundaries = new Map<any, DatumBoundary[]>()

  datumBoundaries.forEach(datumBoundary => {
    if (!groupedBoundaries.has(datumBoundary.datum.primaryCoord)) {
      groupedBoundaries.set(datumBoundary.datum.primaryCoord, [])
    }

    const previous =
      groupedBoundaries.get(datumBoundary.datum.primaryCoord) ?? []

    groupedBoundaries.set(datumBoundary.datum.primaryCoord, [
      ...previous,
      datumBoundary,
    ])
  })

  const sortedPrimaryKeys = Array.from(groupedBoundaries.keys()).sort(
    (a, b) => a - b
  )

  const columns = sortedPrimaryKeys.map((primaryKey, i) => {
    const prev = sortedPrimaryKeys[i - 1]
    const next = sortedPrimaryKeys[i + 1]

    let primaryStart = 0
    let primaryEnd = extent[1][isVertical ? 1 : 0]

    if (prev) {
      primaryStart = primaryKey - (primaryKey - prev) / 2
    }

    if (next) {
      primaryEnd = primaryKey + (next - primaryKey) / 2
    }

    const datumBoundaries = (groupedBoundaries.get(primaryKey) ?? []).sort(
      (a, b) => {
        return a.start - b.start
      }
    )

    return {
      primaryStart,
      primaryEnd,
      primaryKey,
      datumBoundaries: datumBoundaries.map((datumBoundary, i) => {
        const datum = datumBoundary.datum
        const prev = datumBoundaries[i - 1]
        const next = datumBoundaries[i + 1]

        let secondaryStart = 0
        let secondaryEnd = extent[1][isVertical ? 0 : 1]

        if (prev) {
          secondaryStart =
            datumBoundary.start! - (datumBoundary.start! - prev.end!) / 2
        }

        if (next) {
          secondaryEnd =
            datumBoundary.end! + (next.start! - datumBoundary.end!) / 2
        }

        return {
          secondaryStart,
          secondaryEnd,
          datum,
        }
      }),
    }
  })

  console.log(columns)

  return (
    <VoronoiElement>
      {columns.map(column => {
        return (
          <React.Fragment key={column.primaryKey}>
            {column.datumBoundaries.map(datumBoundary => {
              const x1 = !isVertical
                ? column.primaryStart
                : datumBoundary.secondaryStart
              const x2 = !isVertical
                ? column.primaryEnd
                : datumBoundary.secondaryEnd
              const y1 = !isVertical
                ? datumBoundary.secondaryStart
                : column.primaryStart
              const y2 = !isVertical
                ? datumBoundary.secondaryEnd
                : column.primaryEnd

              return (
                <Rectangle
                  {...{
                    key: `${column.primaryKey}_${datumBoundary.datum.seriesIndex}`,
                    x1,
                    x2,
                    y1,
                    y2,
                    className: 'action-voronoi',
                    onMouseEnter: () => handleFocus(datumBoundary.datum),
                    onMouseLeave: () => handleFocus(null),
                    style: {
                      fill: randomFill(),
                      opacity: showVoronoi ? 1 : 0,
                    },
                  }}
                />
              )
            })}
          </React.Fragment>
        )
      })}
    </VoronoiElement>
  )
}

function ClosestVoronoi({
  stackData,
  extent,
  handleFocus,
  showVoronoi,
}: {
  stackData: Series[]
  extent: number[][]
  handleFocus: (datum: Datum | null) => void
  showVoronoi: boolean
}) {
  let polygons = null

  const voronoiData: { x: number; y: number; datum: Datum }[] = []

  stackData.forEach(series => {
    series.datums
      .filter(d => d.defined)
      .forEach(datum => {
        datum.boundingPoints.forEach(boundingPoint => {
          if (
            typeof datum.x !== 'number' ||
            typeof datum.y !== 'number' ||
            Number.isNaN(datum.y) ||
            Number.isNaN(datum.x)
          ) {
            return
          }
          voronoiData.push({
            x: boundingPoint.x,
            y: boundingPoint.y,
            datum,
          })
        })
      })
  })

  const delaunay = Delaunay.from(
    voronoiData,
    d => Math.max(d.x, 0),
    d => Math.max(d.y, 0)
  )

  const flatExtent = extent.flat().map(d => Math.max(d, 0))

  const voronoi = delaunay.voronoi(flatExtent)

  polygons = voronoi.cellPolygons()

  polygons = Array.from(polygons)

  return (
    <VoronoiElement>
      {polygons.map((points, i) => {
        const index = points.index
        const datum = voronoiData[index].datum
        const path = lineFn(points as any) || undefined
        return (
          <Path
            key={i}
            d={path}
            className="action-voronoi"
            onMouseEnter={() => handleFocus(datum)}
            onMouseLeave={() => handleFocus(null)}
            style={{
              fill: randomFill(),
              opacity: showVoronoi ? 1 : 0,
            }}
          />
        )
      })}
    </VoronoiElement>
  )
}

function randomFill() {
  const r = randomHue(100, 200)
  const g = randomHue(0, r)
  const b = randomHue(0, g)

  const colors = shuffle([r, g, b])

  return `rgba(${colors.join(', ')}, .5)`
}

function randomHue(min = 0, max = 255) {
  return Math.floor(min + Math.random() * Math.min(max, 255 - min))
}

function shuffle<T>(array: T[]): T[] {
  var currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
