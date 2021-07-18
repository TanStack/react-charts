import { area, line } from 'd3-shape'
import React from 'react'

import { Axis, Series, Datum } from '../types'
import {
  clampPxToAxis,
  getPrimary,
  getSecondary,
  getSecondaryStart,
  getX,
  getY,
  translate,
} from '../utils/Utils'
import useChartContext from '../utils/chartContext'
//
import { monotoneX } from '../utils/curveMonotone'

export default function AreaComponent<TDatum>({
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
        transform: translate(gridDimensions.gridX, gridDimensions.gridY),
      }}
    >
      {allSeries.map((series, i) => {
        const style = getSeriesStatusStyle(series, focusedDatum)

        const lineStyle = {
          strokeWidth: 2,
          ...style,
          ...style.line,
          fill: 'none',
        }

        const areaStyle = {
          strokeWidth: 2,
          opacity: 0.5,
          ...style,
          ...style.area,
        }

        const areaPath =
          area<Datum<TDatum>>(
            datum => getPrimary(datum, primaryAxis) ?? NaN,
            datum =>
              clampPxToAxis(
                getSecondaryStart(datum, secondaryAxis) ?? NaN,
                secondaryAxis
              ),
            datum =>
              clampPxToAxis(
                getSecondary(datum, secondaryAxis) ?? NaN,
                secondaryAxis
              )
          ).curve(curve)(series.datums) ?? undefined

        const linePath =
          line<Datum<TDatum>>(
            datum => getPrimary(datum, primaryAxis) ?? NaN,
            datum => getSecondary(datum, secondaryAxis) ?? NaN
          ).curve(curve)(series.datums) ?? undefined

        return (
          <g key={`lines-${i}`}>
            <path d={areaPath} style={areaStyle} />
            <path d={linePath} style={lineStyle} />
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
                  cy={getY(datum, primaryAxis, secondaryAxis) ?? NaN}
                  stroke="rgba(33,33,33,0.5)"
                  style={{
                    // @ts-ignore
                    r: 2,
                    ...style,
                    ...style.circle,
                    ...dataStyle,
                    ...dataStyle.circle,
                    ...(!(secondaryAxis.showDatumElements ?? false)
                      ? {
                          opacity: 0,
                        }
                      : {}),
                  }}
                />
              )
            })}
          </g>
        )
      })}
    </g>
  )
}
