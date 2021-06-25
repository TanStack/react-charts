import { ScaleLinear } from 'd3-scale'
import { area, line } from 'd3-shape'
import { useAtom } from 'jotai'
import React, { CSSProperties, PropsWithoutRef, SVGProps } from 'react'

import { focusedDatumAtom } from '../atoms'
import Circle from '../primitives/Circle'
import Line from '../primitives/Line'
import Path from '../primitives/Path'
import { AnchorMode, AxisLinear, Datum, DatumAnchor, Series } from '../types'
//
import { isValidPoint } from '../utils/Utils'
import { monotoneX } from '../utils/curveMonotone'

const defaultAreaStyle = {
  strokeWidth: 0,
}

const defaultLineStyle = {
  strokeWidth: 2,
}

const circleDefaultStyle = {
  r: 1.5,
}

export default function Area({ series }: { series: Series }) {
  const curve = series.curve ?? monotoneX

  const areaFn = React.useMemo(
    () =>
      area<Datum>()
        .x(d => d.x ?? 0)
        .y0(d => d.base ?? 0)
        .y1(d => d.y ?? 0)
        .defined(d => d.defined)
        .curve(curve),
    [curve]
  )

  const lineFn = React.useMemo(
    () =>
      line<Datum>()
        .x(d => d.x ?? 0)
        .y(d => d.y ?? 0)
        .defined(d => d.defined)
        .curve(curve),
    [curve]
  )

  const areaPath = React.useMemo(() => areaFn(series.datums), [
    areaFn,
    series.datums,
  ])

  const linePath = React.useMemo(() => lineFn(series.datums), [
    lineFn,
    series.datums,
  ])

  const [focusedDatum] = useAtom(focusedDatumAtom)
  const style = series.getStatusStyle(focusedDatum)

  const areaPathProps = {
    d: areaPath || undefined,
    style: {
      ...defaultAreaStyle,
      ...style,
      ...style.area,
    },
  }

  const linePathProps = {
    d: linePath || undefined,
    style: {
      ...defaultLineStyle,
      ...style,
      ...style.line,
      fill: 'none',
    },
  }

  return (
    <g>
      <Path {...areaPathProps} />
      <Path {...linePathProps} />
      {series.showOrphans
        ? series.datums.map((datum, index, all) => {
            return (
              <OrphanLine
                {...{
                  key: index,
                  datum,
                  style,
                  all,
                  index,
                }}
              />
            )
          })
        : null}
      {series.showPoints
        ? series.datums.map((datum, i) => {
            return (
              <Point
                {...{
                  key: i,
                  datum,
                  style,
                }}
              />
            )
          })
        : null}
    </g>
  )
}

Area.plotDatum = (
  datum: Datum,
  primaryAxis: AxisLinear,
  secondaryAxis: AxisLinear,
  xAxis: AxisLinear,
  yAxis: AxisLinear
) => {
  // Turn clamping on for secondaryAxis
  ;(secondaryAxis.scale as ScaleLinear<number, number>).clamp(true)

  datum.primaryCoord = primaryAxis.scale(datum.primary) ?? null
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary) ?? null
  datum.x = xAxis.scale(datum.xValue as any) ?? null
  datum.y = yAxis.scale(datum.yValue as any) ?? null
  datum.defined = isValidPoint(datum.xValue) && isValidPoint(datum.yValue)
  datum.base =
    (primaryAxis.isVertical
      ? xAxis.scale(datum.baseValue as any)
      : yAxis.scale(datum.baseValue as any)) ?? null

  // Turn clamping back off for secondaryAxis
  ;(secondaryAxis.scale as ScaleLinear<number, number>).clamp(false)

  if (datum.x == null) {
    return
  }

  if (datum.y == null) {
    return
  }

  // Adjust non-bar elements for ordinal scales
  if (xAxis.type === 'ordinal') {
    datum.x += xAxis.tickOffset
  }
  if (yAxis.type === 'ordinal') {
    datum.y += yAxis.tickOffset
  }

  // Set the default anchor point
  datum.anchor = datum

  const anchorX = primaryAxis.isVertical
    ? primaryAxis.position === 'left'
      ? datum.base ?? 0 - 1
      : datum.base
    : datum.anchor.x

  const anchorY = !primaryAxis.isVertical
    ? primaryAxis.position === 'bottom'
      ? datum.base ?? 0 - 1
      : datum.base
    : datum.anchor.y

  // Set the pointer points (used in voronoi)
  datum.boundingPoints = [
    datum.anchor,
    {
      x: anchorX,
      y: anchorY,
      primaryCoord: primaryAxis.isVertical ? anchorY : anchorX,
      secondaryCoord: primaryAxis.isVertical ? anchorX : anchorY,
    },
  ]
}

const OrphanLine = function OrphanLine({
  datum,
  style,
  all,
  index,
}: {
  datum: Datum
  style: CSSProperties & { line?: CSSProperties }
  all: Datum[]
  index: number
}) {
  const prev = all[index - 1] || { defined: false }
  const next = all[index + 1] || { defined: false }

  const [focusedDatum] = useAtom(focusedDatumAtom)
  const dataStyle = datum.getStatusStyle(focusedDatum)

  const lineProps = {
    x1: !datum || Number.isNaN(datum.x) ? null : datum.x,
    y1: !datum || Number.isNaN(datum.base) ? null : datum.base,
    x2: !datum || Number.isNaN(datum.x) ? null : datum.x,
    y2: !datum || Number.isNaN(datum.y) ? null : datum.y,
    style: {
      ...defaultLineStyle,
      ...style,
      ...style.line,
      ...dataStyle,
      ...dataStyle.line,
    },
  }

  if (!datum.defined || prev.defined || next.defined) {
    return null
  }

  // @ts-ignore
  return <Line {...lineProps} />
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

  const circleProps: PropsWithoutRef<SVGProps<SVGCircleElement>> = {
    cx: datum ? datum.x : undefined,
    cy: datum ? datum.y : undefined,
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
}
