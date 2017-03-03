import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import { line } from 'd3-shape'

class Line extends Component {
  render () {
    const {
      data
    } = this.props

    const pathKeyPrefix = 'path_'
    const pathXPrefix = pathKeyPrefix + 'x_'
    const pathYPrefix = pathKeyPrefix + 'y_'

    const pathSpringMap = {}
    data.forEach((d, i) => {
      pathSpringMap[pathXPrefix + i] = spring(d[0])
      pathSpringMap[pathYPrefix + i] = spring(d[1])
    })

    return (
      <Motion
        style={{
          ...pathSpringMap
        }}
      >
        {interpolated => {
          const path = line()(data.map((d, i) =>
            [
              interpolated[pathXPrefix + i],
              interpolated[pathYPrefix + i]
            ]
          ))
          return (
            <path
              d={path}
              strokeWidth='2'
              stroke='black'
              fill='transparent'
            />
          )
        }}
      </Motion>
    )
  }
}

export default class extends Component {
  render () {
    const {
      data
    } = this.props

    return (
      <svg
        width='500'
        height='500'
        viewBox='0 0 500 500'
        xmlns='http://www.w3.org/2000/svg'
      >
        {data.map((series, i) => (
          <Line
            key={i}
            data={series}
          />
        ))}
      </svg>
    )
  }
}
