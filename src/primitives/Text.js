import React, { PureComponent } from 'react'
//
import { Animate } from '../components/ReactMove'

const defaultStyle = {
  fontFamily: 'Helvetica',
  stroke: 'none',
  fill: 'black',
  fontSize: 10,
  opacity: 1,
}

export default class Text extends PureComponent {
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
          <text
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
