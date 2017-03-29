import React from 'react'
import { Animate } from 'react-move'
//

const defaultStyle = {
  fontFamily: 'Helvetica',
  stroke: 'none',
  fill: 'black',
  fontSize: 10,
  opacity: 1
}

export default React.createClass({
  getDefaultProps () {
    return {
      opacity: 1
    }
  },
  render () {
    const {
      style,
      opacity,
      ...rest
    } = this.props

    const resolvedStyle = {
      ...defaultStyle,
      ...style
    }
    return (
      <Animate
        data={resolvedStyle}
      >
        {(inter) => {
          return (
            <text
              {...rest}
              style={{
                ...inter,
                opacity: opacity * inter.opacity
              }}
            />
          )
        }}
      </Animate>
    )
  }
})
