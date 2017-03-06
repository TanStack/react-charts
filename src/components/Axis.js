import React from 'react'
import { Motion, spring } from 'react-motion'
//
import AnimatedGroup from './AnimatedGroup'
import Path from '../primitives/Path'
import Line from '../primitives/Line'
import Text from '../primitives/Text'

const top = 'top'
const right = 'right'
const bottom = 'bottom'
const left = 'left'

export default React.createClass({
  getDefaultProps () {
    return {
      tickArguments: [],
      tickValues: null,
      tickFormat: null,
      tickSizeInner: 6,
      tickSizeOuter: 6,
      tickPadding: 3
    }
  },
  componentWillReceiveProps (newProps) {
    const oldProps = this.props
    if (oldProps.scale !== newProps.scale) {
      this.prevScale = oldProps.scale
    }
  },
  render () {
    const {
      scale,
      position,
      width,
      height,
      tickArguments,
      tickValues,
      tickFormat,
      tickSizeInner,
      tickSizeOuter,
      tickPadding
    } = this.props

    const isVertical = position === left || position === right
    const k = position === top || position === left ? -1 : 1
    const transform = !isVertical ? translateX : translateY
    const ticks = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues
    const format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat
    const spacing = Math.max(tickSizeInner, 0) + tickPadding
    const range = scale.range()
    const range0 = range[0] + 0.5
    const range1 = range[range.length - 1] + 0.5
    const scaleCopy = (scale.bandwidth ? center : identity)(scale.copy())

    return (
      <Motion
        style={{
          width: spring(width),
          height: spring(height),
          range0: spring(range0),
          range1: spring(range1),
          k: spring(k),
          tickSizeOuter: spring(tickSizeOuter)
        }}
      >
        {({
          width,
          height,
          range0,
          range1,
          k,
          tickSizeOuter
        }) => {
          const axisPath = isVertical
            ? `M ${range1 + k * tickSizeOuter},${range0} H0.5 V${range1} H${range1 + k * tickSizeOuter}`
            : `M ${range0},${k * tickSizeOuter} V0.5 H${range1} V${k * tickSizeOuter}`

          return (
            <g
              fill='none'
              fontSize='10'
              fontFamily='sans-serif'
              textAnchor={position === right ? 'start' : position === left ? 'end' : 'middle'}
              transform={position === right ? translateX(width) : position === bottom ? translateY(height) : undefined}
            >
              <Path
                className='domain'
                d={axisPath}
              />
              <AnimatedGroup
                data={ticks}
                getKey={(d, i) => d}
                style={(d, i, spring) => {
                  return {
                    tick: spring(scaleCopy(d)),
                    opacity: spring(1)
                  }
                }}
                willEnter={(inter, spring) => {
                  return {
                    tick: this.prevScale(inter.data),
                    opacity: 0
                  }
                }}
                willLeave={(inter, spring) => {
                  return {
                    tick: spring(scaleCopy(inter.data)),
                    opacity: spring(0)
                  }
                }}
              >
                {(inters) => {
                  return (
                    <g>
                      {inters.map((inter) => {
                        return (
                          <g
                            key={inter.key}
                            className='tick'
                            opacity={inter.style.opacity}
                            transform={transform(inter.style.tick)}
                          >
                            <Line
                              x1={isVertical ? '0.5' : '0.5'}
                              x2={isVertical ? k * tickSizeInner : '0.5'}
                              y1={isVertical ? '0.5' : '0.5'}
                              y2={isVertical ? '0.5' : k * tickSizeInner}
                            />
                            <Text
                              fill='#000'
                              x={isVertical ? k * spacing : '0.5'}
                              y={isVertical ? '0.5' : k * spacing}
                              dy={position === top ? '0em' : position === bottom ? '0.71em' : '0.32em'}
                            >
                              {format(inter.data)}
                            </Text>
                          </g>
                        )
                      })}
                    </g>
                  )
                }}
              </AnimatedGroup>
            </g>
          )
        }}
      </Motion>
    )
  }
})

function identity (x) {
  return x
}

function translateX (x) {
  return 'translate(' + x + ',0)'
}

function translateY (y) {
  return 'translate(0,' + y + ')'
}

function center (scale) {
  var offset = scale.bandwidth() / 2
  if (scale.round()) offset = Math.round(offset)
  return function (d) {
    return scale(d) + offset
  }
}
