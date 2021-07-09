import { line } from 'd3-shape'
import React from 'react'

import { Axis, Series, Datum } from '../types'
import { translate } from '../utils/Utils'
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
    useFocusedDatumAtom,
    gridDimensions,
  } = useChartContext<TDatum>()

  const curve = secondaryAxis.curve ?? monotoneX

  const [focusedDatum] = useFocusedDatumAtom()

  const xAxis = primaryAxis.isVertical ? secondaryAxis : primaryAxis
  const yAxis = !primaryAxis.isVertical ? secondaryAxis : primaryAxis

  const getX = (datum: Datum<TDatum>) =>
    xAxis.scale(
      xAxis.stacked ? datum.stackData?.[1] : xAxis.getValue(datum.originalDatum)
    )

  const getY = (datum: Datum<TDatum>) =>
    yAxis.scale(
      yAxis.stacked ? datum.stackData?.[1] : yAxis.getValue(datum.originalDatum)
    )

  return (
    <g
      style={{
        transform: translate(gridDimensions.gridX, gridDimensions.gridY),
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
            datum => getX(datum) ?? NaN,
            datum => getY(datum) ?? NaN
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
                  cx={getX(datum)}
                  cy={getY(datum)}
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
