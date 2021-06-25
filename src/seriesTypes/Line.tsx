import { useAtom } from 'jotai'
import React from 'react'

import { LinePath } from '@visx/shape'

import { focusedDatumAtom } from '../atoms'
import useChartContext from '../components/Chart'
import Circle from '../primitives/Circle'
import { AxisLinear, Datum, Series } from '../types'
//
import { isValidPoint } from '../utils/Utils'
import { monotoneX } from '../utils/curveMonotone'

const pathDefaultStyle = {
  strokeWidth: 2,
}

const circleDefaultStyle = {
  r: 2,
}

export default function Line<TDatum extends Datum>({
  series,
}: {
  series: Series
}) {
  const { getX, getY } = useChartContext()
  const curve = series.curve ?? monotoneX

  const [focusedDatum] = useAtom(focusedDatumAtom)
  const style = series.getStatusStyle(focusedDatum)

  const lineStyle = {
    ...pathDefaultStyle,
    ...style,
    ...style.line,
    fill: 'none',
  }

  return (
    <g>
      <LinePath<TDatum>
        curve={curve}
        data={series.datums}
        x={d => series.xScale(getX(d)) ?? 0}
        y={d => series.yScale(getY(d)) ?? 0}
        shapeRendering="geometricPrecision"
        // markerMid="url(#marker-circle)"
        // markerStart={markerStart}
        // markerEnd={markerEnd}
        style={lineStyle}
      />
      {series.showPoints ?? true
        ? series.datums.map((datum, i) => {
            const dataStyle = datum.getStatusStyle(focusedDatum)

            const circleProps = {
              key: i,
              cx: series.xScale(getX(datum)),
              cy: series.yScale(getY(datum)),
              style: {
                ...circleDefaultStyle,
                ...style,
                ...style.circle,
                ...dataStyle,
                ...dataStyle.circle,
              },
            }

            if (!datum.defined) {
              return null
            }

            return <Circle {...circleProps} />
          })
        : null}
    </g>
  )
}

Line.plotDatum = (
  datum: Datum,
  primaryAxis: AxisLinear,
  secondaryAxis: AxisLinear,
  xAxis: AxisLinear,
  yAxis: AxisLinear
) => {
  datum.primaryCoord = primaryAxis.scale(datum.primary)
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary)
  datum.x = xAxis.scale(datum.xValue as any)
  datum.y = yAxis.scale(datum.yValue as any)
  datum.defined = isValidPoint(datum.xValue) && isValidPoint(datum.yValue)
  datum.base = primaryAxis.isVertical
    ? xAxis.scale(datum.baseValue as any)
    : yAxis.scale(datum.baseValue as any)

  // Adjust non-bar elements for ordinal scales
  if (xAxis.type === 'ordinal') {
    datum.x! += xAxis.tickOffset
  }
  if (yAxis.type === 'ordinal') {
    datum.y! += yAxis.tickOffset
  }

  // Set the default anchor point
  datum.anchor = {
    primaryCoord: datum.primaryCoord,
    secondaryCoord: datum.secondaryCoord,
    x: datum.x,
    y: datum.y,
  }

  // Set the pointer points (used in voronoi)
  datum.boundingPoints = [datum.anchor]
}
