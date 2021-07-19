import React from 'react'

import { Axis, Series } from '../types'
import {
  getHeight,
  getWidth,
  getRectX,
  getRectY,
  translate,
} from '../utils/Utils'
import useChartContext from '../utils/chartContext'

//

export default function BarComponent<TDatum>({
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

  const [focusedDatum] = focusedDatumState

  return (
    <g
      style={{
        transform: translate(gridDimensions.left, gridDimensions.top),
      }}
    >
      {allSeries.map((series, i) => {
        const style = getSeriesStatusStyle(series, focusedDatum)

        return (
          <g key={`lines-${i}`}>
            {series.datums.map((datum, i) => {
              const dataStyle = getDatumStatusStyle(datum, focusedDatum)

              const x = getRectX(datum, primaryAxis, secondaryAxis) ?? NaN
              const y = getRectY(datum, primaryAxis, secondaryAxis) ?? NaN
              const width = getWidth(datum, primaryAxis, secondaryAxis) ?? NaN
              const height = getHeight(datum, primaryAxis, secondaryAxis) ?? NaN

              return (
                <rect
                  {...{
                    ref: el => {
                      datum.element = el
                    },
                    key: i,
                    x,
                    y,
                    width,
                    height,
                    style: {
                      strokeWidth: 0,
                      ...style,
                      ...style.rectangle,
                      ...dataStyle,
                      ...dataStyle.rectangle,
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
}
