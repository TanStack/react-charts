import { line } from 'd3-shape'
import React from 'react'

import { Axis, Series, Datum } from '../types'
import { getX, getY, translate } from '../utils/Utils'
import useChartContext from '../utils/chartContext'
//
import { monotoneX } from '../utils/curveMonotone'

const pathDefaultStyle = {
  strokeWidth: 2,
}

export default function Line<TDatum>({
  primaryAxis,
  secondaryAxis,
  series: allSeries,
}: {
  primaryAxis: Axis<TDatum>
  secondaryAxis: Axis<TDatum>
  series: Series<TDatum>[]
}) {
  const {
    getSeriesStatusStyle,
    getDatumStatusStyle,
    focusedDatumState,
    gridDimensions,
  } = useChartContext<TDatum>()

  const curve = secondaryAxis.curve ?? monotoneX

  const [focusedDatum] = focusedDatumState

  return (
    <g
      style={{
        transform: translate(gridDimensions.left, gridDimensions.top),
      }}
    >
      {allSeries.map((series, i) => {
        const style = getSeriesStatusStyle(series, focusedDatum)

        const lineStyle = {
          ...pathDefaultStyle,
          ...style,
          ...style.line,
          fill: 'none',
        }

        const linePath =
          line<Datum<TDatum>>(
            datum => getX(datum, primaryAxis, secondaryAxis) ?? NaN,
            datum => getY(datum, primaryAxis, secondaryAxis) ?? NaN
          ).curve(curve)(series.datums) ?? undefined

        return (
          <g key={`lines-${i}`}>
            {series.datums.map((datum, i) => {
              const dataStyle = getDatumStatusStyle(datum, focusedDatum)

              return (
                <circle
                  key={i}
                  ref={el => {
                    datum.element = el
                  }}
                  r={2}
                  cx={getX(datum, primaryAxis, secondaryAxis)}
                  cy={getY(datum, primaryAxis, secondaryAxis)}
                  stroke="rgba(33,33,33,0.5)"
                  fill="transparent"
                  style={{
                    // @ts-ignore
                    r: 2,
                    ...style,
                    ...style.circle,
                    ...dataStyle,
                    ...dataStyle.circle,
                    ...(!(secondaryAxis.showDatumElements ?? true)
                      ? {
                          opacity: 0,
                        }
                      : {}),
                  }}
                />
              )
            })}
            <path d={linePath} style={lineStyle} />
          </g>
        )
      })}
    </g>
  )
}
