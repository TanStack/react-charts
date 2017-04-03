import React, { PureComponent } from 'react'
import { voronoi } from 'd3-voronoi'
import { line } from 'd3-shape'
//
import Path from '../primitives/Path'

import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'

const noop = () => null

const modeClosestSeries = 'closestSeries'
const modeClosestPoint = 'closestPoint'
const modeAxis = 'axis'

class Interaction extends PureComponent {
  static defaultProps = {
    onHover: noop,
    onActivate: noop
  }
  render () {
    const {
      interaction,
      //
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

    const xScale = primaryAxis.vertical ? secondaryAxis : primaryAxis
    const yScale = primaryAxis.vertical ? primaryAxis : secondaryAxis

    const extent = [[xScale.scale.range()[0], yScale.scale.range()[1]], [xScale.scale.range()[1], yScale.scale.range()[0]]]
    const lineFn = line()

    let polygons

    if (interaction === modeClosestSeries) {
      // Closest Point Voronoi
      const voronoiData = stackData.reduce((prev, now) => prev.concat(now.data), []).map(d => ({
        x: d.x,
        y: d.y,
        series: stackData[d.seriesIndex],
        datums: null,
        single: false
      }))
      const vor = voronoi()
        .x(d => d.x)
        .y(d => d.y)
        .extent(extent)(voronoiData)
      polygons = vor.polygons()
    } else if (interaction === modeClosestPoint) {
      // Closest Point Voronoi
      const voronoiData = stackData.reduce((prev, now) => prev.concat(now.data), []).map(d => ({
        x: d.x,
        y: d.y,
        series: null,
        datums: [d],
        single: true
      }))
      const vor = voronoi()
        .x(d => d.x)
        .y(d => d.y)
        .extent(extent)(voronoiData)
      polygons = vor.polygons()
    } else if (interaction === modeAxis) {
      // Axis Voronoi
      // Group all data points based on primaryAxis
      const allDatums = stackData.reduce((prev, now) => prev.concat(now.data), [])
      const datumsByAxis = {}
      allDatums.forEach(d => {
        const key = String(d.primary)
        datumsByAxis[key] = datumsByAxis[key] || {
          x: d.x,
          y: d.y,
          series: null, // AxisAxis can't be the series, so don't send it
          datums: [],
          single: false
        }
        datumsByAxis[key].datums.push(d)
      })
      const voronoiData = Object.keys(datumsByAxis).map(d => datumsByAxis[d])
      const vor = voronoi()
        .x(d => primaryAxis.vertical ? 0 : d.x)
        .y(d => primaryAxis.vertical ? d.y : 0)
        .extent(extent)(voronoiData)
      polygons = vor.polygons()
    } else {
      return null
    }

    // Series and Element interactions modes are handled by the
    // elements themselves, so do nothing for them here.

    return (
      <g
        className='Interaction'
        onMouseLeave={this.onHover.bind(this, null, null)}
      >
        {!!polygons && polygons.map((points, i) => { // Only draw the voronoi if we need it
          const path = lineFn(points)
          return (
            <Path
              key={i}
              d={path}
              className='action-voronoi'
              onMouseEnter={this.onHover.bind(this, points.data.series, points.data.datums)}
              onMouseMove={this.onHover.bind(this, points.data.series, points.data.datums)}
              onClick={this.onActivate.bind(this, points.data.series, points.data.datums)}
              style={{
                fill: 'transparent',
                stroke: 'transparent',
                strokeWidth: 0,
                opacity: 0
              }}
            />
          )
        })}
      </g>
    )
  }
  onHover (series, datums) {
    // activate the hover with any series or datums
    if (series || datums) {
      return this.props.dispatch(state => {
        return {
          ...state,
          hovered: {
            active: true,
            series,
            datums
          }
        }
      })
    }
    // If we just left the area, deactive the hover
    return this.props.dispatch(state => {
      return {
        ...state,
        hovered: {
          ...state.hovered,
          active: false
        }
      }
    })
  }
  onActivate (series, datums) {
    // const {
    //   active,
    //   dispatch
    // } = this.props
    // if (active === newActive) {
    //   return dispatch(state => ({
    //     ...state,
    //     active: null
    //   }))
    // }
    // dispatch(state => ({
    //   ...state,
    //   active: newActive
    // }))
  }
}

export default Connect(state => ({
  stackData: state.stackData,
  primaryAxis: Selectors.primaryAxis(state),
  secondaryAxis: Selectors.secondaryAxis(state),
  interaction: state.interaction
}))(Interaction)
