import React from 'react'

//
import { Datum } from '../types'
import { translate } from '../utils/Utils'
import useChartContext from '../utils/chartContext'

export default function Voronoi<TDatum>() {
  const { getOptions, useFocusedDatumAtom } = useChartContext<TDatum>()

  const [, setFocusedDatum] = useFocusedDatumAtom()

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
    (datum: Datum<TDatum> | null) => {
      onFocusDatum?.(datum)
      setFocusedDatum(datum)
    },
    [onFocusDatum, setFocusedDatum]
  )

  const needsVoronoi =
    onFocusDatum ||
    onClickDatum ||
    tooltip ||
    primaryCursor ||
    secondaryCursor ||
    showVoronoi

  // Don't render until we have all dependencies
  if (!needsVoronoi) {
    return null
  }

  const props = {
    handleFocus,
  }

  if (groupingMode === 'primary') {
    return <PrimaryVoronoi {...props} />
  }

  return null

  // return <ClosestVoronoi {...props} />
}

function PrimaryVoronoi<TDatum>({
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
    groupedDatums,
  } = useChartContext<TDatum>()

  return React.useMemo(() => {
    const columns = series[0].datums.map((datum, i) => {
      const prev = series[0].datums[i - 1]
      const next = series[0].datums[i + 1]

      const primaryValue = primaryAxis.getValue(datum.originalDatum)
      const primaryPx = primaryAxis?.scale(primaryValue) ?? NaN

      let range = primaryAxis?.scale.range() ?? [0, 0]

      if (primaryAxis?.isVertical) {
        range.reverse()
      }

      let [primaryStart, primaryEnd] = range

      if (prev) {
        const prevPx =
          primaryAxis?.scale(primaryAxis.getValue(prev.originalDatum)) ?? NaN
        primaryStart = primaryPx - (primaryPx - prevPx) / 2
      }

      if (next) {
        const nextPx =
          primaryAxis?.scale(primaryAxis.getValue(next.originalDatum)) ?? NaN
        primaryEnd = primaryPx + (nextPx - primaryPx) / 2
      }

      const datums = groupedDatums.get(`${primaryValue}`) ?? []

      datums.sort((a, b) => {
        const aAxis = secondaryAxes.find(d => d.id === a.secondaryAxisId)
        const bAxis = secondaryAxes.find(d => d.id === b.secondaryAxisId)

        const aPx =
          aAxis?.scale(
            aAxis.stacked ? a.stackData?.[1] : aAxis?.getValue(a.originalDatum)
          ) ?? NaN
        const bPx =
          bAxis?.scale(
            bAxis.stacked ? b.stackData?.[1] : bAxis?.getValue(b.originalDatum)
          ) ?? NaN

        return aPx - bPx
      })

      return {
        primaryStart,
        primaryEnd,
        primaryPx,
        datumBoundaries: datums.map((datum, i) => {
          const prev = datums[i - 1]
          const next = datums[i + 1]

          const secondaryAxis = secondaryAxes.find(
            d => d.id === datum.secondaryAxisId
          )

          if (secondaryAxis?.stacked) {
            let range = secondaryAxis?.scale.range() ?? [0, 0]

            if (secondaryAxis?.isVertical) {
              range.reverse()
            }

            let [secondaryStart, secondaryEnd] = range

            if (prev) {
              secondaryStart =
                secondaryAxis?.scale(datum.stackData?.[1] ?? NaN) ?? NaN
            }

            if (next) {
              secondaryEnd =
                secondaryAxis?.scale(datum.stackData?.[0] ?? NaN) ?? NaN
            }

            return {
              secondaryStart,
              secondaryEnd,
              datum,
            }
          }

          const value =
            secondaryAxis?.scale(
              secondaryAxis?.getValue(datum.originalDatum)
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
              prevAxis?.scale(prevAxis?.getValue(prev.originalDatum)) ?? NaN
            secondaryStart = value - (value - prevValue) / 2
          }

          if (next) {
            const nextAxis = secondaryAxes.find(
              d => d.id === next?.secondaryAxisId
            )
            const nextValue =
              nextAxis?.scale(nextAxis?.getValue(next.originalDatum)) ?? NaN
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
            transform: translate(gridDimensions.gridX, gridDimensions.gridY),
          },
        }}
      >
        {columns.map(column => {
          return (
            <React.Fragment key={column.primaryPx}>
              {column.datumBoundaries.map(datumBoundary => {
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
                      key: `${column.primaryPx}_${datumBoundary.datum.seriesIndex}`,
                      x,
                      y,
                      width,
                      height,
                      className: 'action-voronoi',
                      onMouseEnter: () => handleFocus(datumBoundary.datum),
                      style: {
                        fill: randomFill(),
                        opacity: getOptions().showVoronoi ? 1 : 0,
                      },
                    }}
                  />
                )
              })}
            </React.Fragment>
          )
        })}
      </g>
    )
  }, [
    getOptions,
    gridDimensions.gridX,
    gridDimensions.gridY,
    groupedDatums,
    handleFocus,
    primaryAxis,
    secondaryAxes,
    series,
  ])
}

// function ClosestVoronoi({
//   stackData,
//   extent,
//   handleFocus,
//   showVoronoi,
// }: {
//   stackData: Series[]
//   extent: number[][]
//   handleFocus: (datum: Datum | null) => void
//   showVoronoi: boolean
// }) {
//   let polygons = null

//   const voronoiData: { x: number; y: number; datum: Datum }[] = []

//   stackData.forEach(series => {
//     series.datums
//       .filter(d => d.defined)
//       .forEach(datum => {
//         datum.boundingPoints.forEach(boundingPoint => {
//           if (
//             typeof datum.x !== 'number' ||
//             typeof datum.y !== 'number' ||
//             Number.isNaN(datum.y) ||
//             Number.isNaN(datum.x)
//           ) {
//             return
//           }
//           voronoiData.push({
//             x: boundingPoint.x,
//             y: boundingPoint.y,
//             datum,
//           })
//         })
//       })
//   })

//   const delaunay = Delaunay.from(
//     voronoiData,
//     d => Math.max(d.x, 0),
//     d => Math.max(d.y, 0)
//   )

//   const flatExtent = extent.flat().map(d => Math.max(d, 0))

//   const voronoi = delaunay.voronoi(flatExtent)

//   polygons = voronoi.cellPolygons()

//   polygons = Array.from(polygons)

//   return (
//     <g>
//       {polygons.map((points, i) => {
//         const index = points.index
//         const datum = voronoiData[index].datum
//         const path = lineFn(points as any) || undefined
//         return (
//           <Path
//             key={i}
//             d={path}
//             className="action-voronoi"
//             onMouseEnter={() => handleFocus(datum)}
//             onMouseLeave={() => handleFocus(null)}
//             style={{
//               fill: randomFill(),
//               opacity: showVoronoi ? 1 : 0,
//             }}
//           />
//         )
//       })}
//     </g>
//   )
// }

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
