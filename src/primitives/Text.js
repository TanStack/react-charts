import React from 'react'
//
import Animate from '../utils/Animate'

const defaultStyle = {
  fontFamily: 'Helvetica',
  stroke: 'none',
  fill: 'black',
  fontSize: 10,
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
            <text
              {...inter}
              {...rest}
            />
          )
        }}
      </Animate>
    )
  }
})
