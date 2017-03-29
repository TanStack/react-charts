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
      stackData,
      primaryAxis,
      secondaryAxis,
      onHover,
      onActivate
    } = this.props

    // Don't render until we have all dependencies
    if (
      !stackData ||
      !primaryAxis ||
      !secondaryAxis
    ) {
      return null
    }

    const flatStackData = stackData.reduce((prev, now) => prev.concat(now.data), [])

    // Bail out if the scale isn't available
    if (!primaryAxis || !secondaryAxis) {
      return null
    }

    const extent = [[0, 0], [primaryAxis.scale.range()[1], secondaryAxis.scale.range()[0]]]
    const vor = voronoi()
      .x(d => d.x)
      .y(d => d.y)
      .extent(extent)(flatStackData)

    const polygons = vor.polygons()
    const lineFn = line()

    return (
      <g
        className='Interaction'
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
                  strokeWidth: 0,
                  opacity: 0
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
  stackData: state.stackData,
  primaryAxis: Selectors.primaryAxis(state),
  secondaryAxis: Selectors.secondaryAxis(state)
}))(Interaction)
