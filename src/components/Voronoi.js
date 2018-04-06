import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { voronoi } from 'd3-voronoi'
import { line } from 'd3-shape'
//
import Path from '../primitives/Path'
import Selectors from '../utils/Selectors'

const noop = () => null

const modeClosestSeries = 'closestSeries'
const modeClosestPoint = 'closestPoint'
const modePrimaryAxis = 'primaryAxis'
const modeSecondaryAxis = 'secondaryAxis'

class Voronoi extends PureComponent {
  static defaultProps = {
    onHover: noop,
    onActivate: noop,
  }
  constructor () {
    super()
    this.onHover = this.onHover.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  render () {
    const {
      hoverGroup,
      //
      stackData,
      primaryAxis,
      secondaryAxis,
      showVoronoi,
    } = this.props

    // Don't render until we have all dependencies
    if (!stackData || !primaryAxis || !secondaryAxis) {
      return null
    }

    const xScale = primaryAxis.vertical ? secondaryAxis : primaryAxis
    const yScale = primaryAxis.vertical ? primaryAxis : secondaryAxis

    const extent = [
      [xScale.scale.range()[0], yScale.scale.range()[1]],
      [xScale.scale.range()[1], yScale.scale.range()[0]],
    ]
    const lineFn = line()

    let vor
    let polygons = null

    if (hoverGroup === modeClosestSeries) {
      const voronoiData = []
      stackData.forEach(series => {
        series.data.forEach(datum => {
          datum.cursorPoints.forEach(cursorPoint => {
            if (typeof datum.x !== 'number' || typeof datum.y !== 'number') {
              return
            }
            voronoiData.push({
              x: cursorPoint.x,
              y: cursorPoint.y,
              cursorPoints: datum.cursorPoints,
              series: stackData[datum.seriesIndex],
              datums: [],
              single: false,
            })
          })
        })
      })

      vor = voronoi()
        .x(d => d.x)
        .y(d => d.y)
        .extent(extent)(voronoiData)
    } else if (hoverGroup === modeClosestPoint) {
      const voronoiData = []
      stackData.forEach(series => {
        series.data.forEach(datum => {
          datum.cursorPoints.forEach(cursorPoint => {
            if (typeof datum.x !== 'number' || typeof datum.y !== 'number') {
              return
            }
            voronoiData.push({
              x: cursorPoint.x,
              y: cursorPoint.y,
              cursorPoints: datum.cursorPoints,
              series: null,
              datums: [datum],
              single: true,
            })
          })
        })
      })

      vor = voronoi()
        .x(d => d.x)
        .y(d => d.y)
        .extent(extent)(voronoiData)
    } else if ([modePrimaryAxis, modeSecondaryAxis].includes(hoverGroup)) {
      // Group all data points based on primaryAxis
      const datumsByAxis = {}

      stackData.forEach(series => {
        series.data.forEach(datum => {
          const axisKey = String(hoverGroup === modePrimaryAxis ? datum.primary : datum.secondary)

          datumsByAxis[axisKey] = datumsByAxis[axisKey] || []
          datumsByAxis[axisKey].push(datum)
        })
      })

      const voronoiData = []

      Object.keys(datumsByAxis).forEach(axisKey => {
        const datums = datumsByAxis[axisKey]
        datums.forEach(datum => {
          datum.cursorPoints.forEach(cursorPoint => {
            voronoiData.push({
              x: cursorPoint.x,
              y: cursorPoint.y,
              series: null, // AxisAxis can't be the series, so don't send it
              datums, // Send all of the datums in this axis
              single: false,
            })
          })
        })
      })

      vor = voronoi()
        .x(d => (primaryAxis.vertical ? 0 : d.x))
        .y(d => (primaryAxis.vertical ? d.y : 0))
        .extent(extent)(voronoiData)
    } else {
      return null
    }

    polygons = vor.polygons()

    // Series and Element hoverGroups modes are handled by the
    // elements themselves, so do nothing for them here.

    return (
      <g className="Voronoi" onMouseLeave={() => this.onHover(null, null)}>
        {polygons
          ? polygons.map((points, i) => {
              // Only draw the voronoi if we need it
              const path = lineFn(points)
              return (
                <Path
                  key={i}
                  d={path}
                  className="action-voronoi"
                  onMouseEnter={() => this.onHover(points.data.series, points.data.datums)}
                  onClick={() => this.onClick(points.data.series, points.data.datums)}
                  style={{
                    fill: 'rgba(0,0,0,.2)',
                    stroke: 'rgba(255,255,255,.5)',
                    opacity: showVoronoi ? 1 : 0,
                  }}
                />
              )
            })
          : null}
      </g>
    )
  }
  onHover (series, datums) {
    // activate the hover with any series or datums
    if (series || datums) {
      return this.props.dispatch(
        state => ({
          ...state,
          hovered: {
            active: true,
            series,
            datums,
          },
        }),
        {
          type: 'hoveredVoronoi',
        }
      )
    }
    // If we just left the area, deactive the hover
    return this.props.dispatch(
      state => ({
        ...state,
        hovered: {
          ...state.hovered,
          active: false,
        },
      }),
      {
        type: 'hoveredVoronoi',
      }
    )
  }
  onClick (series, datums) {
    if (series || datums) {
      return this.props.dispatch(
        state => ({
          ...state,
          selected: {
            active: true,
            series,
            datums,
          },
        }),
        {
          type: 'selectedVoronoi',
        }
      )
    }
  }
}

export default Connect(
  () => {
    const selectors = {
      primaryAxis: Selectors.primaryAxis(),
      secondaryAxis: Selectors.secondaryAxis(),
    }
    return state => ({
      stackData: state.stackData,
      primaryAxis: selectors.primaryAxis(state),
      secondaryAxis: selectors.secondaryAxis(state),
      hoverGroup: state.hoverGroup,
      showVoronoi: state.showVoronoi,
    })
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
  }
)(Voronoi)
