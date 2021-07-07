import React from 'react'

import { Area, LinePath } from '@visx/shape'

import useChartContext from '../components/Chart'
import { Axis, Series, Datum } from '../types'
import { translate } from '../utils/Utils'
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

  const getY = (datum: Datum<TDatum>, isEnd: 0 | 1) =>
    yAxis.scale(
      yAxis.stacked
        ? datum.stackData?.[isEnd]
        : yAxis.getValue(datum.originalDatum)
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

        return (
          <g key={`lines-${i}`}>
            <Area<Datum<TDatum>>
              curve={curve}
              data={series.datums}
              x={datum => getX(datum) ?? NaN}
              y0={datum => getY(datum, 0) ?? NaN}
              y1={datum => getY(datum, 1) ?? NaN}
              style={areaStyle}
            />
            <LinePath<Datum<TDatum>>
              curve={curve}
              data={series.datums}
              x={datum => getX(datum) ?? NaN}
              y={datum => getY(datum, 1) ?? NaN}
              style={lineStyle}
            />
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
                  cy={getY(datum, 1) ?? NaN}
                  stroke="rgba(33,33,33,0.5)"
                  fill="transparent"
                  style={{
                    // @ts-ignore
                    r: 2,
                    opacity: 1,
                    ...(!secondaryAxis.showDatumElements
                      ? {
                          opacity: 0,
                          pointerEvents: 'none',
                        }
                      : {}),
                    ...style,
                    ...style.circle,
                    ...dataStyle,
                    ...dataStyle.circle,
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
