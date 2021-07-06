import React from 'react'

import { Axis as VisAxis } from '@visx/axis'
import { GridRows, GridColumns } from '@visx/grid'
import { Line } from '@visx/shape'

import { Axis } from '../types'
import { translate } from '../utils/Utils'
//
import useMeasure from './AxisLinear.useMeasure'
import useChartContext from './Chart'

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

  const GridComponent = axis.isVertical ? GridRows : GridColumns

  const renderAxis = (isOuter: boolean) => {
    const isRotated = !isOuter && showRotated

    const scale = isOuter ? axis.outerScale : axis.scale

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
        {axis.showGrid && !isOuter ? (
          <GridComponent
            {...{
              scale: scale,
              stroke: dark ? 'rgba(255,255,255, .05)' : 'rgba(0,0,0, .05)',
              height: !axis.isVertical ? gridDimensions.gridHeight : 0,
              width: axis.isVertical ? gridDimensions.gridWidth : 0,
            }}
          />
        ) : null}
        <VisAxis
          {...{
            scale,
            orientation: axis.position,
            top:
              axis.position === 'bottom'
                ? isOuter
                  ? height
                  : gridDimensions.gridHeight
                : undefined,
            left:
              axis.position === 'right'
                ? isOuter
                  ? width
                  : gridDimensions.gridWidth
                : undefined,
            tickLength: axis.tickSizeOuter,
          }}
        >
          {props => {
            return (
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
                <Line
                  className="domain"
                  from={props.axisFromPoint}
                  to={props.axisToPoint}
                  stroke={dark ? 'rgba(255,255,255, .2)' : 'rgba(0,0,0, .2)'}
                  // strokeWidth={props.strokeWidth}
                  // strokeDasharray={props.strokeDasharray}
                />
                {props.ticks.map((tick, i) => {
                  let tickX = tick.to.x
                  let tickY = tick.to.y

                  if (axis.position === 'top') {
                    tickY -= props.tickLength ?? 0
                  } else if (axis.position === 'bottom') {
                    tickY += props.tickLength ?? 0
                  } else if (axis.position === 'left') {
                    tickX -= props.tickLength ?? 0
                  } else if (axis.position === 'right') {
                    tickX += props.tickLength ?? 0
                  }

                  return (
                    <g key={`vx-tick-${tick.value}-${i}`} className={'tick'}>
                      {!isOuter ? (
                        <Line
                          from={tick.from}
                          to={tick.to}
                          stroke={
                            dark ? 'rgba(255,255,255, .2)' : 'rgba(0,0,0, .2)'
                          }
                        />
                      ) : null}
                      <text
                        className="tickLabel"
                        style={{
                          fontSize: 10,
                          fontFamily: 'sans-serif',
                          fill: dark
                            ? 'rgba(255,255,255, .7)'
                            : 'rgba(0,0,0, .7)',
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
                        transform={`translate(${tickX}, ${tickY}) rotate(${
                          isRotated ? (axis.position === 'top' ? 60 : -60) : 0
                        })`}
                      >
                        {tick.formattedValue}
                      </text>
                    </g>
                  )
                })}
              </g>
            )
          }}
        </VisAxis>
      </g>
    )
  }

  return (
    <g ref={elRef}>
      {renderAxis(false)}
      {renderAxis(true)}
    </g>
  )
}
