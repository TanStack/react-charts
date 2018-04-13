import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { voronoi } from 'd3-voronoi'
import { line } from 'd3-shape'
//
import Path from '../primitives/Path'
import Selectors from '../utils/Selectors'

const noop = () => null

const modeClosestPoint = 'closestPoint'
const modePrimary = 'primary'
const modeSecondary = 'secondary'

class Voronoi extends PureComponent {
  static defaultProps = {
    onHover: noop,
    onActivate: noop,
  }
  constructor () {
    super()
    this.onHover = this.onHover.bind(this)
  }
  render () {
    const {
      hoverMode,
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

    if (hoverMode === modeClosestPoint) {
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
              datums: [datum],
            })
          })
        })
      })

      vor = voronoi()
        .x(d => d.x)
        .y(d => d.y)
        .extent(extent)(voronoiData)
    } else if ([modePrimary, modeSecondary].includes(hoverMode)) {
      // Group all data points based on primaryAxis
      const datumsByAxis = {}

      stackData.forEach(series => {
        series.data.forEach(datum => {
          const axis = modePrimary ? primaryAxis : secondaryAxis
          const axisKey = String(axis.vertical ? datum.y : datum.x)

          datumsByAxis[axisKey] = datumsByAxis[axisKey] || []
          datumsByAxis[axisKey].push(datum)
        })
      })

      const voronoiData = []

      Object.values(datumsByAxis).forEach(datums => {
        datums.forEach(datum => {
          datum.cursorPoints.forEach(cursorPoint => {
            voronoiData.push({
              x: cursorPoint.x,
              y: cursorPoint.y,
              datums,
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

    return (
      <g className="Voronoi" onMouseLeave={() => this.onHover(null)}>
        {polygons.map((points, i) => {
          const path = lineFn(points)
          return (
            <Path
              key={i}
              d={path}
              className="action-voronoi"
              onMouseEnter={() => this.onHover(points.data.datums)}
              style={{
                fill: 'rgba(0,0,0,.2)',
                stroke: 'rgba(255,255,255,.5)',
                opacity: showVoronoi ? 1 : 0,
              }}
            />
          )
        })}
      </g>
    )
  }
  onHover (datums) {
    // activate the hover with any series or datums
    if (datums) {
      return this.props.dispatch(
        state => ({
          ...state,
          hovered: {
            active: true,
            datums,
          },
        }),
        {
          type: 'hovered',
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
        type: 'hovered',
      }
    )
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
      hoverMode: state.hoverMode,
      showVoronoi: state.showVoronoi,
    })
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
  }
)(Voronoi)
