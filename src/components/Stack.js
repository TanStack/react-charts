import React from 'react'
//
import Series from './Series'

export default React.createClass({
  render () {
    const {
      data,
      scaleX,
      scaleY,
      height,
      width
    } = this.props

    return (
      <g>
        {data.map((series, i) => (
          <Series
            key={i}
            data={series}
            scaleX={scaleX}
            scaleY={scaleY}
            width={width}
            height={height}
          />
        ))}
      </g>
    )
  }
})
