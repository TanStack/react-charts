import { ScaleLinear, ScaleTime } from 'd3-scale'
import React from 'react'

import { Axis, AxisTime } from '../types'
import { getTickPx, translate } from '../utils/Utils'
import useChartContext from '../utils/chartContext'
//
import useMeasure from './AxisLinear.useMeasure'

export default function AxisLinearComp<TDatum>(axis: Axis<TDatum>) {
  const [showRotated, setShowRotated] = React.useState(false)
  const {
    getOptions,
    gridDimensions,
    width,
    height,
  } = useChartContext<TDatum>()

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

    const getTicks = (
      scale: ScaleTime<any, any> | ScaleLinear<any, any>,
      num: number
    ) => {
      if (scale.ticks) {
        return scale.ticks(num)
      }

      return scale.domain()
    }

    const resolvedHeight = isOuter ? height : gridDimensions.gridHeight
    const resolvedWidth = isOuter ? width : gridDimensions.gridWidth

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

    return (
      <g
        key={`Axis-Group ${isOuter ? 'outer' : 'inner'}`}
        className={`Axis-Group ${isOuter ? 'outer' : 'inner'}`}
        style={{
          transform: isOuter
            ? undefined
            : translate(gridDimensions.gridX, gridDimensions.gridY),
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
          <line
            className="domain"
            x1={lineFrom.x}
            y1={lineFrom.y}
            x2={lineTo.x}
            y2={lineTo.y}
            stroke={dark ? 'rgba(255,255,255, .2)' : 'rgba(0,0,0, .2)'}
          />
          {getTicks(scale as ScaleTime<any, any>, 10).map((tick, i) => {
            const px = getTickPx(scale, tick)

            const [tickFrom, tickTo, gridTo] =
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

            let { x: tickLabelX, y: tickLabelY } = tickTo

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
                {(axis.showGrid ?? true) && !isOuter ? (
                  <line
                    x1={tickFrom.x}
                    y1={tickFrom.y}
                    x2={gridTo.x}
                    y2={gridTo.y}
                    stroke={
                      dark ? 'rgba(255,255,255, .05)' : 'rgba(0,0,0, .05)'
                    }
                  />
                ) : null}
                {!isOuter ? (
                  <line
                    x1={tickFrom.x}
                    y1={tickFrom.y}
                    x2={tickTo.x}
                    y2={tickTo.y}
                    stroke={dark ? 'rgba(255,255,255, .2)' : 'rgba(0,0,0, .2)'}
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
                  {(axis as AxisTime<any>).formatters.scale(tick as Date)}
                </text>
              </g>
            )
          })}
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
