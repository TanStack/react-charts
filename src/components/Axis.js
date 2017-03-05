import React from 'react'
//
import Line from '../primitives/Line'
import Text from '../primitives/Text'

export default React.createClass({
  render () {
    const {
      axis,
      scale,
      height,
      width
    } = this.props

    const x1 = 0
    const y1 = height

    const isYAxis = axis === 'y'

    const x2 = isYAxis ? 0 : width
    const y2 = isYAxis ? 0 : height

    const zero = isYAxis ? 0 : height

    const ticks = scale.ticks()

    return (
      <g>
        <Line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isYAxis ? 'red' : 'green'}
        />
        <g>
          {ticks.map((d, i) => {
            const val = scale(d)
            const x = isYAxis ? zero : val
            const y = isYAxis ? val : zero
            return (
              <Line
                key={i}
                x1={x}
                y1={y}
                x2={isYAxis ? x + 5 : x}
                y2={isYAxis ? y : y - 5}
                stroke={isYAxis ? 'red' : 'green'}
              />
            )
          })}
        </g>
        <g>
          {ticks.map((d, i) => {
            const val = scale(d)
            const x = isYAxis ? zero : val
            const y = isYAxis ? val : zero
            return (
              <Text
                key={i}
                x={isYAxis ? x + 5 : x}
                y={isYAxis ? y : y - 5}
                stroke={isYAxis ? 'red' : 'green'}
              >
                {d}
              </Text>
            )
          })}
        </g>
      </g>
    )
  }
})
