import React from 'react'

import { Axis, Series } from '../types'
import { getHeight, getWidth, getX, getY, translate } from '../utils/Utils'
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
    useFocusedDatumAtom,
    gridDimensions,
  } = useChartContext<TDatum>()

  const [focusedDatum] = useFocusedDatumAtom()

  return (
    <g
      style={{
        transform: translate(gridDimensions.gridX, gridDimensions.gridY),
      }}
    >
      {allSeries.map((series, i) => {
        const style = getSeriesStatusStyle(series, focusedDatum)

        return (
          <g key={`lines-${i}`}>
            {series.datums.map((datum, i) => {
              const dataStyle = getDatumStatusStyle(datum, focusedDatum)

              return (
                <rect
                  ref={el => {
                    datum.element = el
                  }}
                  key={i}
                  x={getX(datum, primaryAxis, secondaryAxis) ?? NaN}
                  y={getY(datum, primaryAxis, secondaryAxis) ?? NaN}
                  width={getWidth(datum, primaryAxis, secondaryAxis) ?? NaN}
                  height={getHeight(datum, primaryAxis, secondaryAxis) ?? NaN}
                  style={{
                    strokeWidth: 0,
                    ...style,
                    ...style.rectangle,
                    ...dataStyle,
                    ...dataStyle.rectangle,
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
