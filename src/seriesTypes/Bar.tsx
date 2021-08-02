import React from 'react'

import { Axis, AxisBand, Datum, Series } from '../types'
import { translate } from '../utils/Utils'
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

  const xAxis = primaryAxis.isVertical ? secondaryAxis : primaryAxis
  const yAxis = primaryAxis.isVertical ? primaryAxis : secondaryAxis

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

              const x = clampPxToAxis(
                0,
                getRectX(datum, primaryAxis, secondaryAxis) ?? NaN,
                xAxis
              )
              const y = clampPxToAxis(
                0,
                getRectY(datum, primaryAxis, secondaryAxis) ?? NaN,
                yAxis
              )
              const width = clampPxToAxis(
                x,
                getWidth(datum, primaryAxis, secondaryAxis) ?? NaN,
                xAxis
              )
              const height = clampPxToAxis(
                y,
                getHeight(datum, primaryAxis, secondaryAxis) ?? NaN,
                yAxis
              )

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

function getWidth<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  return primaryAxis.isVertical
    ? getSecondaryLength(datum, secondaryAxis)
    : getPrimaryLength(datum, primaryAxis, secondaryAxis)
}

function getHeight<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  return primaryAxis.isVertical
    ? getPrimaryLength(datum, primaryAxis, secondaryAxis)
    : getSecondaryLength(datum, secondaryAxis)
}

export function getPrimaryGroupLength<TDatum>(
  _datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>
) {
  return Math.max(primaryAxis.primaryBandScale!.bandwidth(), 1)
}

export function getPrimaryLength<TDatum>(
  _datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
) {
  if (primaryAxis.axisFamily === 'band') {
    const bandWidth = secondaryAxis.stacked
      ? primaryAxis.scale.bandwidth()
      : primaryAxis.seriesBandScale.bandwidth()

    return Math.min(
      Math.max(bandWidth, primaryAxis.minBandSize ?? 1),
      primaryAxis.maxBandSize ?? 99999999
    )
  }

  return Math.max(
    secondaryAxis.stacked
      ? primaryAxis.primaryBandScale!.bandwidth()
      : primaryAxis.seriesBandScale!.bandwidth(),
    1
  )
}

function getSecondaryLength<TDatum>(
  datum: Datum<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  const secondary = [
    getSecondaryStart(datum, secondaryAxis),
    getSecondary(datum, secondaryAxis),
  ]

  return Math.abs(secondary[1] - secondary[0])
}

function getRectX<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  return primaryAxis.isVertical
    ? getSecondaryStart(datum, secondaryAxis)
    : getPrimary(datum, primaryAxis, secondaryAxis)
}

function getRectY<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  return primaryAxis.isVertical
    ? getPrimary(datum, primaryAxis, secondaryAxis)
    : getSecondary(datum, secondaryAxis)
}

export function getPrimary<TDatum>(
  datum: Datum<TDatum>,
  primaryAxis: Axis<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  let primary = primaryAxis.scale(datum.primaryValue) ?? NaN

  if (primaryAxis.axisFamily !== 'band') {
    primary -= getPrimaryGroupLength(datum, primaryAxis) / 2
  }

  if (!secondaryAxis.stacked) {
    primary =
      primary +
      ((primaryAxis as AxisBand<any>).seriesBandScale(datum.seriesIndex) ?? NaN)
  }

  return primary
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

function getSecondary<TDatum>(
  datum: Datum<TDatum>,
  secondaryAxis: Axis<TDatum>
): number {
  if (secondaryAxis.stacked) {
    return secondaryAxis.scale(datum.stackData?.[1] ?? NaN) ?? NaN
  }

  return secondaryAxis.scale(datum.secondaryValue) ?? NaN
}

function clampPxToAxis<TDatum>(base: number, px: number, axis: Axis<TDatum>) {
  const range = axis.scale.range()

  if (axis.isVertical) {
    range.reverse()
  }

  return Math.max(range[0], Math.min(px, range[1] - base))
}
