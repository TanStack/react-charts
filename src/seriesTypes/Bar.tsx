import { ScaleLinear } from 'd3-scale'
import { useAtom } from 'jotai'
import React, { CSSProperties } from 'react'

import { focusedDatumAtom } from '../atoms'
import useChartContext from '../components/Chart'
import Rectangle from '../primitives/Rectangle'
import { AxisLinear, Datum, Series } from '../types'
//
import { isValidPoint } from '../utils/Utils'

export default function Bar({ series }: { series: Series }) {
  const { axesInfo } = useChartContext()

  const [focusedDatum] = useAtom(focusedDatumAtom)
  const style = series.getStatusStyle(focusedDatum)

  const primaryAxis = series.primaryAxisId
    ? axesInfo.primaryAxes.find(d => d.id === series.primaryAxisId)
    : axesInfo.primaryAxes[0]

  return (
    <g className="series bar">
      {series.datums.map((datum, i) => {
        return (
          <BarPiece
            key={i}
            {...{
              datum,
              barOffset: primaryAxis?.barOffset,
              style,
            }}
          />
        )
      })}
    </g>
  )
}

Bar.isBar = true

function BarPiece({
  datum,
  barOffset,
  style,
}: {
  datum: Datum
  barOffset?: number
  style: CSSProperties & { rectangle?: CSSProperties }
}) {
  const { axesInfo } = useChartContext()

  const x = datum ? datum.x : 0
  const y = datum ? datum.y : 0
  const base = datum ? datum.base : 0
  const size = Math.max(datum ? datum.size : 1, 1)

  let x1: number | undefined
  let y1: number | undefined
  let x2: number | undefined
  let y2: number | undefined

  if (axesInfo.primaryAxes.find(d => d.isVertical)) {
    x1 = base
    x2 = x
    y1 = (y ?? 0) + (barOffset ?? 0)
    y2 = y1 + size
  } else {
    x1 = (x ?? 0) + (barOffset ?? 0)
    x2 = x1 + size
    y1 = y
    y2 = base
  }

  const [focusedDatum] = useAtom(focusedDatumAtom)
  const dataStyle = datum.getStatusStyle(focusedDatum)

  if ([x1, y1, x2, y2].some(d => Number.isNaN(d) || typeof d === 'undefined')) {
    return null
  }

  const rectangleProps = {
    style: {
      pointerEvents: 'all',
      ...style,
      ...style.rectangle,
      ...dataStyle,
      ...dataStyle.rectangle,
    },
    x1,
    y1,
    x2,
    y2,
  }

  // @ts-ignore
  return <Rectangle {...rectangleProps} />
}

Bar.plotDatum = (
  datum: Datum,
  xAxis: AxisLinear,
  yAxis: AxisLinear,
  primaryAxis: AxisLinear,
  secondaryAxis: AxisLinear
) => {
  // Turn clamping on for secondaryAxis
  ;(secondaryAxis.scale as ScaleLinear<number, number>).clamp(true)

  datum.primaryCoord = primaryAxis.scale(datum.primary)
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary)
  datum.x = xAxis.scale(datum.xValue as any)
  datum.y = yAxis.scale(datum.yValue as any)
  datum.defined = isValidPoint(datum.xValue) && isValidPoint(datum.yValue)
  datum.base = secondaryAxis.scale(datum.baseValue as any)
  datum.size = primaryAxis.barSize

  // Turn clamping back off for secondaryAxis
  ;(secondaryAxis.scale as ScaleLinear<number, number>).clamp(false)

  if (!secondaryAxis.stacked) {
    datum.size = primaryAxis.seriesBarSize
    // Use the seriesTypeIndex here in case we have mixed types.
    const seriesBandScaleOffset = primaryAxis.seriesBandScale?.(
      `${datum.seriesTypeIndex}`
    )
    if (secondaryAxis.isVertical) {
      datum.x! += seriesBandScaleOffset ?? 0
    } else {
      datum.y! += seriesBandScaleOffset ?? 0
    }
  }

  // Set the default anchor point
  datum.anchor = {
    x: datum.x,
    y: datum.y,
    horizontalPadding: secondaryAxis.isVertical ? datum.size / 2 : 0,
    verticalPadding: secondaryAxis.isVertical ? 0 : datum.size / 2,
  }

  // Adjust the anchor point for bars
  if (!primaryAxis.isVertical) {
    datum.anchor.x! += primaryAxis.type !== 'ordinal' ? 0 : datum.size / 2
  } else {
    datum.anchor.y! += primaryAxis.type !== 'ordinal' ? 0 : datum.size / 2
  }

  // Set the pointer points (used in voronoi)
  datum.boundingPoints = [
    // End of bar
    datum.anchor,
    // Start of bar
    {
      x: primaryAxis.isVertical
        ? primaryAxis.position === 'left'
          ? (datum.base ?? 0) + 1
          : datum.base
        : datum.anchor.x,
      y: !primaryAxis.isVertical
        ? primaryAxis.position === 'bottom'
          ? (datum.base ?? 0) - 1
          : datum.base
        : datum.anchor.y,
    },
  ]
}
