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
