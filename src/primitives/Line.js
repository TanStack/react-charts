import React from 'react'

import Animate from '../utils/Animate'

const defaultStyle = {
  strokeWidth: 1,
  stroke: 'black',
  fill: 'transparent',
  opacity: 1
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
          opacity: Number(visible || 0) * resolvedStyle.opacity
        }}
      >
        {(inter) => {
          return (
            <line
              {...inter}
              {...rest}
            />
          )
        }}
      </Animate>
    )
  }
})
