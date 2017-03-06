import React from 'react'

const top = 'top'
const right = 'right'
const bottom = 'bottom'
const left = 'left'

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

export default React.createClass({
  render () {
    const {
      scale,
      position
    } = this.props
    const tickArguments = []
    const tickValues = null
    const tickFormat = null
    const tickSizeInner = 6
    const tickSizeOuter = 6
    const tickPadding = 3

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

    const axisPath = isVertical
      ? 'M' + k * tickSizeOuter + ',' + range0 + 'H0.5V' + range1 + 'H' + k * tickSizeOuter
      : 'M' + range0 + ',' + k * tickSizeOuter + 'V0.5H' + range1 + 'V' + k * tickSizeOuter

    return (
      <g
        fill='none'
        font-size='10'
        font-family='sans-serif'
        text-anchor={position === right ? 'start' : position === left ? 'end' : 'middle'}>
        <path
          class='domain'
          stroke='#000'
          d={axisPath}
        />
        {ticks.map(tick => {
          return (
            <g
              class='tick'
              opacity='1'
              transform={transform(scaleCopy(tick))}
            >
              <line
                stroke='#000'
                x1='0'
                x2={k * tickSizeInner}
                y1='0.5'
                y2='0.5'
              />
              <text
                fill='#000'
                x={k * spacing}
                y='0.5'
                dy={position === top ? '0em' : position === bottom ? '0.71em' : '0.32em'}
              >
                {format(tick)}
              </text>
            </g>
          )
        })}
      </g>
    )
  }
})
