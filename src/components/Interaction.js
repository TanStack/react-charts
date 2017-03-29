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
  constructor () {
    super()
    this.onHover = this.onHover.bind(this)
    this.onActivate = this.onActivate.bind(this)
  }
  render () {
    const {
      stackData,
      primaryAxis,
      secondaryAxis
    } = this.props

    // Don't render until we have all dependencies
    if (
      !stackData ||
      !primaryAxis ||
      !secondaryAxis
    ) {
      return null
    }

    // TODO: Need to support different types of voronoi's here.
    // - Closest / Hit Point / Element Hover
    // - Point / Y Axis / Stack

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
        onMouseLeave={e => this.onHover(null, e)}
      >
        {polygons.map((points, i) => {
          const path = lineFn(points)
          return (
            <Path
              key={i}
              d={path}
              className='action-voronoi'
              stroke='transparent'
              onMouseEnter={e => this.onHover(points.data, e)}
              onClick={e => this.onActivate(points.data, e)}
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
    )
  }
  onHover (hovered, e) {
    return this.props.dispatch(state => ({
      ...state,
      hovered
    }))
  }
  onActivate (newActive, e) {
    const {
      active,
      dispatch
    } = this.props
    if (active === newActive) {
      return dispatch(state => ({
        ...state,
        active: null
      }))
    }
    dispatch(state => ({
      ...state,
      active: newActive
    }))
  }
}

export default Connect(state => ({
  stackData: state.stackData,
  primaryAxis: Selectors.primaryAxis(state),
  secondaryAxis: Selectors.secondaryAxis(state)
}))(Interaction)
