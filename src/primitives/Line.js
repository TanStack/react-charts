import React from 'react'
import { Animate } from 'react-move'
//

const defaultStyle = {
  strokeWidth: 1,
  stroke: 'black',
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
