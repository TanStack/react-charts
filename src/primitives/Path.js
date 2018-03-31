import React, { PureComponent } from 'react'
//
import { Animate } from '../components/ReactMove'

const defaultStyle = {
  strokeWidth: 2,
  stroke: '#6b6b6b',
  fill: 'transparent',
  opacity: 1,
}

export default class Path extends PureComponent {
  static defaultProps = {
    opacity: 1,
  }
  render () {
    const { style, opacity, ...rest } = this.props

    const resolvedStyle = {
      ...defaultStyle,
      ...style,
    }

    const updateResolvedStyle = {}
    Object.keys(resolvedStyle).forEach(key => {
      updateResolvedStyle[key] = [resolvedStyle[key]]
    })

    return (
      <Animate start={resolvedStyle} update={updateResolvedStyle}>
        {inter => (
          <path
            {...rest}
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
