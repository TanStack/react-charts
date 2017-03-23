import React from 'react'
import { Animate } from 'react-move'
//

const defaultStyle = {
  strokeWidth: 0,
  fill: '#333',
  opacity: 1,
  rx: 0,
  ry: 0
}

export default React.createClass({
  render () {
    const {
      isActive,
      isInactive,
      visible,
      style,
      ...rest
    } = this.props

    const resolvedStyle = {
      ...defaultStyle,
      ...style
    }

    return (
      <Animate
        data={{
          ...resolvedStyle,
          opacity: visible * resolvedStyle.opacity
        }}
      >
        {(inter) => {
          return (
            <rect
              {...inter}
              {...rest}
            />
          )
        }}
      </Animate>
    )
  }
})
