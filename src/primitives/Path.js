import React from 'react'
import { Animate } from 'react-move'
//

const defaultStyle = {
  strokeWidth: 2,
  stroke: '#6b6b6b',
  fill: 'transparent',
  opacity: 1
}

export default React.createClass({
  render () {
    const {
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
          ...resolvedStyle
        }}
      >
        {(inter) => {
          return (
            <path
              {...inter}
              {...rest}
            />
          )
        }}
      </Animate>
    )
  }
})
