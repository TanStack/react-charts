import React from 'react'

import { Axis, AxisLinear } from '../types'
import { translate } from '../utils/Utils'
import useChartContext from '../utils/chartContext'
//
import useMeasure from './AxisLinear.useMeasure'

export default function AxisLinearComp<TDatum>(axis: Axis<TDatum>) {
  const [showRotated, setShowRotated] = React.useState(false)
  const { getOptions, gridDimensions, width, height } =
    useChartContext<TDatum>()

  const { dark, showDebugAxes } = getOptions()

  const elRef = React.useRef<SVGGElement>(null)

  useMeasure({
    axis,
    elRef,
    gridDimensions,
    showRotated,
    setShowRotated,
  })

  const renderAxis = (isOuter: boolean) => {
    const isRotated = !isOuter && showRotated

    const scale = isOuter ? axis.outerScale : axis.scale
    const [rangeStart, rangeEnd] = scale.range()

    const getTicks = () => {
      const anyAxis = axis as AxisLinear<TDatum>

      if ((anyAxis as AxisLinear<TDatum>).outerScale.ticks!) {
        if (typeof anyAxis.tickCount === 'number') {
          return anyAxis.outerScale.ticks(anyAxis.tickCount)
        }

        const autoSpacing = anyAxis.isVertical ? 40 : 80
        const range = anyAxis.outerScale.range()
        const num = Math.abs(range[1] - range[0]) / autoSpacing

        return anyAxis.outerScale.ticks(num)
      }

      return anyAxis.outerScale.domain()
    }

    const resolvedHeight = isOuter ? height : gridDimensions.height
    const resolvedWidth = isOuter ? width : gridDimensions.width

    const [lineFrom, lineTo] =
      axis.position === 'left'
        ? [
            { x: 0, y: rangeStart },
            { x: 0, y: rangeEnd },
          ]
        : axis.position === 'right'
        ? [
            { x: resolvedWidth, y: rangeStart },
            { x: resolvedWidth, y: rangeEnd },
          ]
        : axis.position === 'top'
        ? [
            { x: rangeStart, y: 0 },
            { x: rangeEnd, y: 0 },
          ]
        : [
            { x: rangeStart, y: resolvedHeight },
            { x: rangeEnd, y: resolvedHeight },
          ]

    const ticks = getTicks().map(tick => {
      const px = getTickPx(scale, tick)

      const [from, to, gridTo] =
        axis.position === 'left'
          ? [
              { x: 0, y: px },
              { x: -8, y: px },
              { x: resolvedWidth, y: px },
            ]
          : axis.position === 'right'
          ? [
              { x: resolvedWidth, y: px },
              { x: resolvedWidth + 8, y: px },
              { x: 0, y: px },
            ]
          : axis.position === 'top'
          ? [
              { x: px, y: 0 },
              { x: px, y: -8 },
              { x: px, y: resolvedHeight },
            ]
          : [
              { x: px, y: resolvedHeight },
              { x: px, y: resolvedHeight + 8 },
              { x: px, y: 0 },
            ]

      return {
        value: tick,
        from,
        to,
        gridTo,
      }
    })

    return (
      <g
        key={`Axis-Group ${isOuter ? 'outer' : 'inner'}`}
        className={`Axis-Group ${isOuter ? 'outer' : 'inner'}`}
        style={{
          transform: isOuter
            ? undefined
            : translate(gridDimensions.left, gridDimensions.top),
        }}
      >
        <g
          className={`Axis`}
          style={{
            ...(isOuter
              ? {
                  opacity: showDebugAxes ? 0.5 : 0,
                  pointerEvents: 'none',
                }
              : {
                  opacity: 1,
                  pointerEvents: 'all',
                }),
          }}
        >
          <g className="domainAndTicks">
            <line
              className="domain"
              x1={lineFrom.x}
              y1={lineFrom.y}
              x2={lineTo.x}
              y2={lineTo.y}
              stroke={dark ? 'rgba(255,255,255, .2)' : 'rgba(0,0,0, .2)'}
            />
            {ticks.map((tick, i) => {
              let { x: tickLabelX, y: tickLabelY } = tick.to

              if (axis.position === 'top') {
                tickLabelY -= 5
              } else if (axis.position === 'bottom') {
                tickLabelY += 5
              } else if (axis.position === 'left') {
                tickLabelX -= 5
              } else if (axis.position === 'right') {
                tickLabelX += 5
              }

              return (
                <g key={`vx-tick-${tick}-${i}`} className={'tick'}>
                  {!isOuter ? (
                    <line
                      x1={tick.from.x}
                      y1={tick.from.y}
                      x2={tick.to.x}
                      y2={tick.to.y}
                      stroke={
                        dark ? 'rgba(255,255,255, .2)' : 'rgba(0,0,0, .2)'
                      }
                    />
                  ) : null}
                  <text
                    className="tickLabel"
                    style={{
                      fontSize: 10,
                      fill: dark ? 'rgba(255,255,255, .7)' : 'rgba(0,0,0, .7)',
                      dominantBaseline: isRotated
                        ? 'central'
                        : axis.position === 'bottom'
                        ? 'hanging'
                        : axis.position === 'top'
                        ? 'alphabetic'
                        : 'central',
                      textAnchor: isRotated
                        ? 'end'
                        : axis.position === 'right'
                        ? 'start'
                        : axis.position === 'left'
                        ? 'end'
                        : 'middle',
                    }}
                    transform={`translate(${tickLabelX}, ${tickLabelY}) rotate(${
                      isRotated ? (axis.position === 'top' ? 60 : -60) : 0
                    })`}
                  >
                    {(axis as AxisLinear<any>).formatters.scale(
                      tick.value as number
                    )}
                  </text>
                </g>
              )
            })}
          </g>
          <g className="grid">
            {ticks.map((tick, i) => {
              return (
                <g key={`vx-tick-${tick}-${i}`} className={'tick'}>
                  {(axis.showGrid ?? true) && !isOuter ? (
                    <line
                      x1={tick.from.x}
                      y1={tick.from.y}
                      x2={tick.gridTo.x}
                      y2={tick.gridTo.y}
                      stroke={
                        dark ? 'rgba(255,255,255, .05)' : 'rgba(0,0,0, .05)'
                      }
                    />
                  ) : null}
                </g>
              )
            })}
          </g>
        </g>
      </g>
    )
  }

  return axis.show ? (
    <g ref={elRef}>
      {renderAxis(false)}
      {renderAxis(true)}
    </g>
  ) : null
}

function getTickPx<TDatum>(scale: Axis<TDatum>['scale'], value: any) {
  let px = scale(value) ?? NaN

  // @ts-ignore
  if (scale.bandwidth) {
    // @ts-ignore
    return px + scale.bandwidth() / 2
  }

  return px
}
