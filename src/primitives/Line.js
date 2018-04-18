import React, { PureComponent } from 'react'
//
import { Animate } from '../components/ReactMove'

const defaultStyle = {
  strokeWidth: 1,
  stroke: 'black',
  fill: 'transparent',
  opacity: 1,
}

export default class Line extends PureComponent {
  render () {
    const { style, ...rest } = this.props

    const resolvedStyle = {
      ...defaultStyle,
      ...style,
    }

    return <line {...rest} style={resolvedStyle} />
  }
}
