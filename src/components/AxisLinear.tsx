import React from 'react'

import Group from '../primitives/Group'
import Line from '../primitives/Line'
import Path from '../primitives/Path'
import Text from '../primitives/Text'
import { AxisLinear } from '../types'
//
import { translateX, translateY, translate } from '../utils/Utils'
import useMeasure from './AxisLinear.useMeasure'
import useChartContext from './Chart'

const defaultStyles = {
  line: {
    strokeWidth: '1',
    fill: 'transparent',
  },
  tick: {
    fontSize: 10,
    fontFamily: 'sans-serif',
  },
}

export default function AxisLinear(axis: AxisLinear) {
  const [showRotated, setShowRotated] = React.useState(false)
  const { getOptions, gridDimensions } = useChartContext()

  const { dark } = getOptions()

  const elRef = React.useRef<SVGGElement>(null)

  useMeasure({
    axis,
    elRef,
    gridDimensions,
    showRotated,
    setShowRotated,
  })

  // Not ready? Render null
  if (!axis.show) {
    return null
  }

  let axisPath: string

  if (axis.isVertical) {
    if (axis.position === 'left') {
      axisPath = `
        M ${-axis.tickSizeOuter}, ${axis.range[0]}
        H 0
        V ${axis.range[1]}
        H ${-axis.tickSizeOuter}
      `
    } else {
      axisPath = `
        M ${axis.tickSizeOuter}, ${axis.range[0]}
        H 0
        V ${axis.range[1]}
        H ${axis.tickSizeOuter}
      `
    }
  } else if (axis.position === 'bottom') {
    axisPath = `
        M 0, ${axis.tickSizeOuter}
        V 0
        H ${axis.range[1]}
        V ${axis.tickSizeOuter}
      `
  } else {
    axisPath = `
        M 0, ${-axis.tickSizeOuter}
        V 0
        H ${axis.range[1]}
        V ${-axis.tickSizeOuter}
              `
  }

  let showGridLine = true

  if (typeof axis.showGrid === 'boolean') {
    showGridLine = axis.showGrid
  } else if (axis.type === 'ordinal') {
    showGridLine = false
  }

  // Combine default styles with style props
  const axisStyles = {
    ...defaultStyles,
    ...(axis.styles ?? {}),
  }

  const renderAxis = (isRotated: boolean) => {
    const show = isRotated ? showRotated : !showRotated

    return (
      <Group
        className={`Axis ${isRotated ? 'rotated' : 'unrotated'}`}
        style={{
          transform:
            axis.position === 'right'
              ? translateX(gridDimensions.gridWidth)
              : axis.position === 'bottom'
              ? translateY(gridDimensions.gridHeight)
              : undefined,
          ...(show
            ? {
                opacity: 1,
                pointerEvents: 'all',
              }
            : {
                opacity: 0,
                pointerEvents: 'none',
              }),
        }}
      >
        <Path
          className="domain"
          d={axisPath}
          style={{
            stroke: dark ? 'rgba(255,255,255, .1)' : 'rgba(0,0,0, .1)',
            ...axisStyles.line,
          }}
        />
        <Group className="ticks">
          {axis.ticks.map((tick, i) => (
            <Group
              key={[String(tick), i].join('_')}
              className="tick"
              style={{
                transform: axis.transform(axis.scale(tick as any) || 0),
              }}
            >
              {/* Render the grid line */}
              {showGridLine && (
                <Line
                  className="gridLine"
                  x1={axis.isVertical ? 0 : axis.gridOffset}
                  x2={axis.isVertical ? axis.max : axis.gridOffset}
                  y1={axis.isVertical ? axis.gridOffset : 0}
                  y2={axis.isVertical ? axis.gridOffset : axis.max}
                  style={{
                    stroke: dark
                      ? 'rgba(255,255,255, .05)'
                      : 'rgba(0,0,0, .05)',
                    strokeWidth: 1,
                    ...axisStyles.line,
                  }}
                />
              )}
              {/* Render the tick line  */}
              {axis.showTicks ? (
                <g className="labelGroup">
                  <Line
                    className="tickline"
                    x1={axis.isVertical ? 0 : axis.tickOffset}
                    x2={
                      axis.isVertical
                        ? axis.directionMultiplier * axis.tickSizeInner
                        : axis.tickOffset
                    }
                    y1={axis.isVertical ? axis.tickOffset : 0}
                    y2={
                      axis.isVertical
                        ? axis.tickOffset
                        : axis.directionMultiplier * axis.tickSizeInner
                    }
                    style={{
                      stroke: dark
                        ? 'rgba(255,255,255, .1)'
                        : 'rgba(0,0,0, .1)',
                      strokeWidth: 1,
                      ...axisStyles.line,
                    }}
                  />
                  <Text
                    className="tickLabel"
                    style={{
                      fill: dark ? 'white' : 'black',
                      ...axisStyles.tick,
                      transform: `${translate(
                        axis.isVertical
                          ? axis.directionMultiplier * axis.tickSpacing
                          : axis.tickOffset,
                        axis.isVertical
                          ? axis.tickOffset
                          : axis.directionMultiplier * axis.tickSpacing
                      )} rotate(${
                        isRotated
                          ? axis.position === 'top'
                            ? axis.labelRotation
                            : -axis.labelRotation
                          : 0
                      }deg)`,
                    }}
                    dominantBaseline={
                      isRotated
                        ? 'central'
                        : axis.position === 'bottom'
                        ? 'hanging'
                        : axis.position === 'top'
                        ? 'alphabetic'
                        : 'central'
                    }
                    textAnchor={
                      isRotated
                        ? 'end'
                        : axis.position === 'right'
                        ? 'start'
                        : axis.position === 'left'
                        ? 'end'
                        : 'middle'
                    }
                  >
                    {axis.format(tick, i)}
                  </Text>
                </g>
              ) : null}
            </Group>
          ))}
        </Group>
      </Group>
    )
  }

  return (
    <Group ref={elRef}>
      {renderAxis(false)}
      {showRotated ? renderAxis(true) : null}
    </Group>
  )
}
