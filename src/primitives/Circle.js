import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
//

const defaultStyle = {
  r: 2,
  strokeWidth: '1',
  stroke: '#000000',
  fill: '#000000',
  opacity: 1,
}

export default class Circle extends PureComponent {
  static defaultProps = {
    opacity: 1,
  }
  render () {
    const {
      x, y, r, style, opacity, ...rest
    } = this.props

    if (typeof x !== 'number' || typeof y !== 'number' || Number.isNaN(x) || Number.isNaN(y)) {
      return null
    }

    const resolvedStyle = {
      ...defaultStyle,
      ...style,
    }

    const updateResolvedStyle = {}
    Object.keys(resolvedStyle).forEach(key => {
      updateResolvedStyle[key] = [resolvedStyle[key]]
    })

    return (
      <Animate start={resolvedStyle} data={updateResolvedStyle}>
        {inter => (
          <circle
            {...rest}
            cx={x || 0}
            cy={y || 0}
            r={r || 0}
            style={{
              ...inter,
              opacity: opacity * inter.opacity,
            }}
          />
        )}
      </Animate>
    )
  }
}
