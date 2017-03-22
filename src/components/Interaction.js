import React, { PureComponent } from 'react'
import { voronoi } from 'd3-voronoi'
import { line } from 'd3-shape'
//
import Path from '../primitives/Path'
import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'

const noop = () => null

class Interaction extends PureComponent {
  static defaultProps = {
    onHover: noop,
    onActivate: noop
  }
  render () {
    const {
      data,
      primaryAxis,
      secondaryAxis,
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
    if (!primaryAxis || !secondaryAxis) {
      return null
    }

    const extent = [[0, 0], [primaryAxis.range()[1], secondaryAxis.range()[0]]]
    const vor = voronoi()
      .x(d => primaryAxis(getX(d)))
      .y(d => secondaryAxis(getY(d)))
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
                visible={0}
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
  primaryAxis: Selectors.primaryAxis(state),
  secondaryAxis: Selectors.secondaryAxis(state),
  getX: state.getX,
  getY: state.getY
}))(Interaction)
