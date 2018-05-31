import React from 'react'
//
import { Animate } from '../components/ReactMove'

const defaultStyle = {
  strokeWidth: 1,
  stroke: 'black',
  fill: 'transparent',
  opacity: 1,
  transition: 'all .3s ease-out',
}

export default class Line extends React.Component {
  render () {
    const { style, ...rest } = this.props

    const resolvedStyle = {
      ...defaultStyle,
      ...style,
    }

    return <line {...rest} style={resolvedStyle} />
  }
}
