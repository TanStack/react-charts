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

    const updateResolvedStyle = {}
    Object.keys(resolvedStyle).forEach(key => {
      updateResolvedStyle[key] = [resolvedStyle[key]]
    })

    return (
      <Animate start={resolvedStyle} update={updateResolvedStyle}>
        {inter => <line {...inter} {...rest} />}
      </Animate>
    )
  }
}
