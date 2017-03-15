import React, { PureComponent } from 'react'
import { voronoi } from 'd3-voronoi'
import { line } from 'd3-shape'
//
import Path from '../primitives/Path'
import Connect from '../utils/Connect'

const noop = () => null

class Interaction extends PureComponent {
  static defaultProps = {
    onHover: noop,
    onActivate: noop
  }
  render () {
    const {
      data,
      scales: {
        x: scaleX,
        y: scaleY
      } = {},
      getX,
      getY,
      onHover,
      onActivate
    } = this.props

    const decoratedData = data.map((series, i) => {
      return series.map((d, ii) => {
        return {
          ...d,
          seriesIndex: i,
          index: ii
        }
      })
    })
    const flatData = decoratedData.reduce((prev, now) => prev.concat(now), [])

    // Bail out if the scale isn't available
    if (!scaleX || !scaleY) {
      return null
    }

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
                style={{
                  stroke: 'transparent',
                  fill: 'transparent',
                  strokeWidth: 0
                }}
              />
            )
          })}
        </g>
        )}
      </g>
    )
  }
}

export default Connect(state => ({
  data: state.data,
  scales: state.scales,
  getX: state.getX,
  getY: state.getY
}))(Interaction)
