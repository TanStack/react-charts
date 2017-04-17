import React, { PureComponent } from 'react'
import { Connect } from 'codux'
import { voronoi } from 'd3-voronoi'
import { line } from 'd3-shape'
//
import Path from '../primitives/Path'
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
      decoratedData,
      primaryAxis,
      secondaryAxis
    } = this.props

    // Don't render until we have all dependencies
    if (
      !decoratedData ||
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
      const voronoiData = decoratedData.reduce((prev, now) => prev.concat(now.data), []).map(d => ({
        x: d.x,
        y: d.y,
        series: decoratedData[d.seriesIndex],
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
      const voronoiData = decoratedData.reduce((prev, now) => prev.concat(now.data), []).map(d => ({
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
      const allDatums = decoratedData.reduce((prev, now) => prev.concat(now.data), [])
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
              // onMouseMove={this.onHover.bind(this, points.data.series, points.data.datums)}
              onClick={this.onClick.bind(this, points.data.series, points.data.datums)}
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
      }, {
        type: 'hoveredVoronoi'
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
    }, {
      type: 'hoveredVoronoi'
    })
  }
  onClick (series, datums) {
    if (series || datums) {
      return this.props.dispatch(state => {
        return {
          ...state,
          selected: {
            active: true,
            series,
            datums
          }
        }
      }, {
        type: 'selectedVoronoi'
      })
    }
  }
}

export default Connect(() => {
  const selectors = {
    primaryAxis: Selectors.primaryAxis(),
    secondaryAxis: Selectors.secondaryAxis()
  }
  return state => ({
    decoratedData: state.decoratedData,
    primaryAxis: selectors.primaryAxis(state),
    secondaryAxis: selectors.secondaryAxis(state),
    interaction: state.interaction
  })
}, {
  filter: (oldState, newState, meta) => meta.type !== 'cursor'
})(Interaction)
