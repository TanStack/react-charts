import React from 'react'
import { voronoi } from 'd3-voronoi'
import { line } from 'd3-shape'
//
import Path from '../primitives/Path'

const noop = () => null

export default React.createClass({
  getDefaultProps () {
    return {
      onHover: noop,
      onActivate: noop
    }
  },
  getInitialState () {
    return {
      tooltip: null
    }
  },
  render () {
    const {
      data,
      scaleX,
      scaleY,
      getX,
      getY,
      onHover,
      onActivate
    } = this.props

    const flatData = data.reduce((prev, now) => prev.concat(now), [])
    const extent = [[0, 0], [scaleX.range()[1], scaleY.range()[0]]]

    const vor = voronoi()
      .x(d => scaleX(getX(d)))
      .y(d => scaleY(getY(d)))
      .extent(extent)(flatData)

    const polygons = vor.polygons()

    const lineFn = line()

    return (
      <g
        className='tooltips'
        onMouseLeave={e => onHover(null, e)}
      >
        <g>
          {polygons.map((points, i) => {
            const path = lineFn(points)
            return (
              <Path
                key={i}
                d={path}
                className='action-voronoi'
                stroke='transparent'
                onMouseEnter={e => onHover(points.data, e)}
                onClick={e => onActivate(points.data, e)}
                onTap={e => onActivate(points.data, e)}
              />
            )
          })}
        </g>
        )}
      </g>
    )
  }
})
