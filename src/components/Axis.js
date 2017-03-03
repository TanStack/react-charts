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

    const range = scale.range()

    const x1 = 0
    const y1 = axis === 'x' ? height : 0

    const x2 = axis === 'x' ? width : 0
    const y2 = axis === 'x' ? height : range[1]

    const ticks = scale.ticks()

    return (
      <g>
        <Line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={axis === 'y' ? 'red' : 'green'}
        />
        <g>
          {ticks.map((d, i) => {
            const zero = 0
            const val = scale(d)
            const x = axis === 'y' ? zero : val
            const y = axis === 'y' ? val : height
            return (
              <Line
                key={i}
                x1={x}
                y1={y}
                x2={axis === 'y' ? x + 5 : x}
                y2={axis === 'y' ? y : y - 5}
                stroke={axis === 'y' ? 'red' : 'green'}
              />
            )
          })}
        </g>
        <g>
          {ticks.map((d, i) => {
            const zero = 0
            const val = scale(d)
            const x = axis === 'y' ? zero : val
            const y = axis === 'y' ? val : height
            return (
              <Text
                key={i}
                x={axis === 'y' ? x + 5 : x}
                y={axis === 'y' ? y : y - 5}
                stroke={axis === 'y' ? 'red' : 'green'}
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
