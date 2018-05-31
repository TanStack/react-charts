import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { voronoi } from 'd3-voronoi'
import { line, arc as makeArc } from 'd3-shape'
//
import Path from '../primitives/Path'
import Selectors from '../utils/Selectors'
import Utils from '../utils/Utils'

const noop = () => null

const modeClosestPoint = 'closestPoint'
const modePrimary = 'primary'
const modeSecondary = 'secondary'
const modeRadial = 'radial'

class Voronoi extends PureComponent {
  static defaultProps = {
    onHover: noop,
    onActivate: noop,
  }
  constructor () {
    super()
    this.onHover = Utils.throttle(this.onHover.bind(this))
  }
  render () {
    const {
      hoverMode,
      //
      stackData,
      primaryAxes,
      secondaryAxes,
      showVoronoi,
    } = this.props

    // Don't render until we have all dependencies
    if (!stackData || !primaryAxes.length || !secondaryAxes.length) {
      return null
    }

    const primaryVertical = primaryAxes.find(d => d.vertical)

    const xScales = primaryVertical ? secondaryAxes : primaryAxes
    const yScales = primaryVertical ? primaryAxes : secondaryAxes

    const extent = [
      [xScales[0].scale.range()[0], yScales[0].scale.range()[1]],
      [xScales[0].scale.range()[1], yScales[0].scale.range()[0]],
    ]
    const lineFn = line()

    const VoronoiElement = ({ children, ...rest }) => (
      <g className="Voronoi" onMouseLeave={() => this.onHover(null)} {...rest}>
        {children}
      </g>
    )

    if (hoverMode === modeRadial) {
      const primaryAxis = primaryAxes[0]

      return (
        <VoronoiElement
          style={{
            transform: `translate3d(${primaryAxis.width / 2}px, ${primaryAxis.height / 2}px, 0)`,
          }}
        >
          {stackData.map(series => (
            <React.Fragment key={series.index}>
              {series.datums.map((datum, i) => {
                const arc = makeArc()
                  .startAngle(datum.arcData.startAngle)
                  .endAngle(datum.arcData.endAngle)
                  .padAngle(0)
                  .padRadius(0)
                  .innerRadius(
                    !series.index
                      ? 0
                      : datum.arcData.innerRadius - datum.arcData.seriesPaddingRadius / 2
                  )
                  .outerRadius(
                    series.index === stackData.length - 1
                      ? Math.max(primaryAxis.width, primaryAxis.height)
                      : datum.arcData.outerRadius + datum.arcData.seriesPaddingRadius / 2
                  )
                  .cornerRadius(0)

                return (
                  <Path
                    key={i}
                    d={arc()}
                    className="action-voronoi"
                    onMouseEnter={() => this.onHover([datum])}
                    style={{
                      fill: 'rgba(0,0,0,.2)',
                      stroke: 'rgba(255,255,255,.5)',
                      opacity: showVoronoi ? 1 : 0,
                      transition: 'none',
                    }}
                  />
                )
              })}
            </React.Fragment>
          ))}
        </VoronoiElement>
      )
    }

    let vor
    let polygons = null

    if (hoverMode === modeClosestPoint) {
      const voronoiData = []
      stackData.forEach(series => {
        series.datums.filter(d => d.defined).forEach(datum => {
          datum.pointerPoints.forEach(pointerPoint => {
            if (typeof datum.x !== 'number' || typeof datum.y !== 'number') {
              return
            }
            voronoiData.push({
              x: pointerPoint.x,
              y: pointerPoint.y,
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
        series.datums.filter(d => d.defined).forEach(datum => {
          const axis = modePrimary
            ? Utils.getAxisByAxisID(primaryAxes, series.primaryAxisID)
            : Utils.getAxisByAxisID(secondaryAxes, series.secondaryAxisID)
          const axisKey = String(axis.vertical ? datum.y : datum.x)

          datumsByAxis[axisKey] = datumsByAxis[axisKey] || []
          datumsByAxis[axisKey].push(datum)
        })
      })

      const voronoiData = []

      Object.values(datumsByAxis).forEach(datums => {
        datums.forEach(datum => {
          datum.pointerPoints.forEach(pointerPoint => {
            voronoiData.push({
              x: pointerPoint.x,
              y: pointerPoint.y,
              datums,
            })
          })
        })
      })

      vor = voronoi()
        .x(d => (primaryVertical ? 0 : d.x))
        .y(d => (primaryVertical ? d.y : 0))
        .extent(extent)(voronoiData)
    } else {
      return null
    }

    polygons = vor.polygons()

    return (
      <VoronoiElement>
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
                transition: 'none',
              }}
            />
          )
        })}
      </VoronoiElement>
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
      primaryAxes: Selectors.primaryAxes(),
      secondaryAxes: Selectors.secondaryAxes(),
    }
    return state => ({
      primaryAxes: selectors.primaryAxes(state),
      secondaryAxes: selectors.secondaryAxes(state),
      stackData: state.stackData,
      hoverMode: state.hoverMode,
      showVoronoi: state.showVoronoi,
    })
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'pointer',
  }
)(Voronoi)
