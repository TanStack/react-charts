import { useAtom } from 'jotai'
import React, { CSSProperties } from 'react'

import { focusedDatumAtom } from '../atoms'
import Circle from '../primitives/Circle'
import { AxisLinear, Datum, Series } from '../types'
//
import { isValidPoint } from '../utils/Utils'

const circleDefaultStyle = {
  r: 2,
}

export default function Bubble({ series }: { series: Series }) {
  const [focusedDatum] = useAtom(focusedDatumAtom)
  const style = series.getStatusStyle(focusedDatum)

  return (
    <g>
      {series.datums.map((datum, i) => {
        return (
          <Point
            {...{
              key: i,
              datum,
              style,
            }}
          />
        )
      })}
    </g>
  )
}

Bubble.plotDatum = (
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
    x: datum.x,
    y: datum.y,
    verticalPadding: datum.r,
    horizontalPadding: datum.r,
  }

  // Set the pointer points (used in voronoi)
  datum.boundingPoints = [datum.anchor]
}

function Point({
  datum,
  style,
}: {
  datum: Datum
  style: CSSProperties & { circle?: CSSProperties }
}) {
  const [focusedDatum] = useAtom(focusedDatumAtom)
  const dataStyle = datum.getStatusStyle(focusedDatum)

  const circleProps = {
    cx: datum ? datum.x : undefined,
    cy: datum ? datum.y : undefined,
    style: {
      ...circleDefaultStyle,
      ...(typeof datum.radius !== 'undefined'
        ? {
            r: datum.radius,
          }
        : {}),
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
}
