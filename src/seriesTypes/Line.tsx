import { area, line } from 'd3-shape'
import React from 'react'

import { Axis, Series, Datum } from '../types'
import { translate } from '../utils/Utils'
import useChartContext from '../utils/chartContext'
//
import { monotoneX } from '../utils/curveMonotone'

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

        const areaPath =
          secondaryAxis.elementType === 'area'
            ? area<Datum<TDatum>>(
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
            : undefined

        const linePath =
          secondaryAxis.elementType === 'area' ||
          secondaryAxis.elementType === 'line'
            ? line<Datum<TDatum>>(
                datum => getPrimary(datum, primaryAxis) ?? NaN,
                datum => getSecondary(datum, secondaryAxis) ?? NaN
              ).curve(curve)(series.datums) ?? undefined
            : undefined

        const showDatumElements =
          secondaryAxis.showDatumElements ??
          (secondaryAxis.elementType === 'bubble' || 'onFocus')

        return (
          <g key={`lines-${i}`}>
            {areaPath ? (
              <path
                d={areaPath}
                style={{
                  strokeWidth: 2,
                  opacity: 0.5,
                  ...style,
                  ...style.area,
                }}
              />
            ) : null}
            {linePath ? (
              <path
                d={linePath}
                style={{
                  strokeWidth: 2,
                  ...style,
                  ...style.line,
                  fill: 'none',
                }}
              />
            ) : null}
            {series.datums.map((datum, i) => {
              const dataStyle = getDatumStatusStyle(datum, focusedDatum)

              const radius =
                showDatumElements === 'onFocus'
                  ? datum === focusedDatum
                    ? 4
                    : 0
                  : 2

              const show =
                showDatumElements === 'onFocus'
                  ? datum === focusedDatum
                  : secondaryAxis.showDatumElements ??
                    secondaryAxis.elementType === 'bubble'

              return (
                <circle
                  key={i}
                  ref={el => {
                    datum.element = el
                  }}
                  cx={getX(datum, primaryAxis, secondaryAxis)}
                  cy={getY(datum, primaryAxis, secondaryAxis)}
                  style={{
                    // @ts-ignore
                    r: radius,
                    transition: 'all .3s ease-out',
                    ...style,
                    ...style.circle,
                    ...dataStyle,
                    ...dataStyle.circle,
                    ...(!show ? { opacity: 0 } : {}),
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

function getX<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  return primaryAxis.isVertical
    ? getSecondary(datum, secondaryAxis)
    : getPrimary(datum, primaryAxis)
}

function getY<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  return primaryAxis.isVertical
    ? getPrimary(datum, primaryAxis)
    : getSecondary(datum, secondaryAxis)
}

function getPrimary<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>
): number {
  let primary = primaryAxis.scale(datum.primaryValue) ?? NaN

  if (primaryAxis.axisFamily === 'band') {
    primary += primaryAxis.scale.bandwidth() / 2
  }

  return primary
}

function getSecondary<TDatum>(
  datum: Datum<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  if (secondaryAxis.stacked) {
    return secondaryAxis.scale(datum.stackData?.[1] ?? NaN) ?? NaN
  }

  return secondaryAxis.scale(datum.secondaryValue) ?? NaN
}

function getSecondaryStart<TDatum>(
  datum: Datum<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  if (secondaryAxis.stacked) {
    return secondaryAxis.scale(datum.stackData?.[0] ?? NaN) ?? NaN
  }

  return secondaryAxis.scale(0) ?? NaN
}

function clampPxToAxis<TDatum>(px: number, axis: Axis<TDatum>) {
  const range = axis.scale.range()
  if (axis.isVertical) {
    range.reverse()
  }

  return Math.max(range[0], Math.min(px, range[1]))
}
