import React, { PureComponent } from 'react'
import { Connect } from 'react-state'

import { Animate } from '../components/ReactMove'
import Selectors from '../utils/Selectors'
import Utils from '../utils/Utils'
import { selectSeries, selectDatum, hoverSeries, hoverDatum } from '../utils/interactionMethods'

//
import Path from '../primitives/Path'

class Pie extends PureComponent {
  static defaultProps = {
    showPoints: true,
  }
  constructor (props) {
    super(props)
    if (!props.interaction) {
      this.props.dispatch(state => ({
        ...state,
        interaction: 'element',
      }))
    }
    this.props.dispatch(state => ({
      ...state,
      hoverMode: 'radial',
    }))
    this.selectSeries = selectSeries.bind(this)
    this.hoverSeries = hoverSeries.bind(this)
    this.selectDatum = selectDatum.bind(this)
    this.hoverDatum = hoverDatum.bind(this)
  }
  static plotDatum = (datum, { primaryAxis }) => {
    // Decorate the datum with the scale info
    datum = {
      ...datum,
      ...primaryAxis.scale(datum),
      defined: Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue),
    }

    // Set the focus point
    datum.focus = { x: datum.x, y: datum.y }

    // Set the pointer points (used in voronoi)
    datum.pointerPoints = [datum.focus]

    // Return the new datum
    return datum
  }
  static buildStyles = (series, { getStyles, getDatumStyles, defaultColors }) => {
    series.getStatusStyle = status => {
      series.style = Utils.getStatusStyle(series, status, getStyles)
      return series.style
    }

    // We also need to decorate each datum in the same fashion
    series.datums.forEach(datum => {
      datum.getStatusStyle = status => {
        datum.style = Utils.getStatusStyle(datum, status, getDatumStyles, {
          color: defaultColors[datum.index % (defaultColors.length - 1)],
        })
        return datum.style
      }
    })
  }
  render () {
    const {
      series,
      //
      selected,
      hovered,
      interaction,
      primaryAxes,
    } = this.props

    if (!primaryAxes.length) {
      return
    }

    const style = series.getStatusStyle(Utils.getStatus(series, hovered, selected))

    const primaryAxis = primaryAxes[0]

    const interactiveSeries = interaction === 'series'
    const seriesInteractionProps = interactiveSeries
      ? {
        onClick: () => this.selectSeries(series),
        onMouseEnter: () => this.hoverSeries(series),
        onMouseMove: () => this.hoverSeries(series),
        onMouseLeave: () => this.hoverSeries(null),
      }
      : {}

    return (
      <g transform={`translate(${primaryAxis.width / 2}, ${primaryAxis.height / 2})`}>
        {series.datums.map((datum, i) => {
          const dataStyle = datum.getStatusStyle(Utils.getStatus(datum, hovered, selected))

          const interactiveDatum = interaction === 'element'
          const datumInteractionProps = interactiveDatum
            ? {
                onClick: () => this.selectDatum(datum),
                onMouseEnter: () => this.hoverDatum(datum),
                onMouseMove: () => this.hoverDatum(datum),
                onMouseLeave: () => this.hoverDatum(null),
              }
            : {}

          return (
            <Path
              key={i}
              d={datum.arc()}
              style={{
                ...style,
                ...style.arc,
                ...dataStyle,
                ...dataStyle.arc,
                pointerEvents: interactiveDatum ? 'all' : 'none',
              }}
              {...seriesInteractionProps}
              {...datumInteractionProps}
            />
          )
        })}
      </g>
    )
  }
}

export default Connect(
  () => {
    const selectors = {
      primaryAxes: Selectors.primaryAxes(),
    }
    return state => ({
      primaryAxes: selectors.primaryAxes(state),
      hovered: state.hovered,
      selected: state.selected,
      interaction: state.interaction,
    })
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'pointer',
  }
)(Pie)
