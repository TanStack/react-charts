import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
//

const defaultStyle = {
  r: 2,
  strokeWidth: '1',
  stroke: '#000000',
  fill: '#000000',
  opacity: 1
}

export default class Circle extends PureComponent {
  static defaultProps = {
    opacity: 1
  }
  render() {
    const { x, y, r, style, opacity, ...rest } = this.props

    const resolvedStyle = {
      ...defaultStyle,
      ...style
    }
    return (
      <Animate data={resolvedStyle}>
        {inter => {
          return (
            <circle
              {...rest}
              cx={x || 0}
              cy={y || 0}
              r={r || 0}
              style={{
                ...inter,
                opacity: opacity * inter.opacity
              }}
            />
          )
        }}
      </Animate>
    )
  }
}
