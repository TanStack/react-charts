import React, { useContext } from 'react'

import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'
import {
  selectSeries,
  selectDatum,
  hoverSeries,
  hoverDatum
} from '../utils/interactionMethods'

//
import Path from '../primitives/Path'

// if (!props.interaction) {
//   this.props.dispatch(state => ({
//     ...state,
//     interaction: 'element'
//   }))
// }
// this.props.dispatch(state => ({
//   ...state,
//   hoverMode: 'radial'
// }))

export default function Pie({ series }) {
  const [
    { selected, hovered, interaction, primaryAxes },
    setChartState
  ] = useContext(ChartContext)

  const style = series.getStatusStyle(
    Utils.getStatus(series, hovered, selected)
  )

  const primaryAxis = primaryAxes[0]

  const interactiveSeries = interaction === 'series'
  const seriesInteractionProps = interactiveSeries
    ? {
      onClick: () => selectSeries(series, { setChartState }),
      onMouseEnter: () => hoverSeries(series, { setChartState }),
      onMouseMove: () => hoverSeries(series, { setChartState }),
      onMouseLeave: () => hoverSeries(null, { setChartState })
    }
    : {}

  return (
    <g
      style={{
        transform: `translate3d(${primaryAxis.width /
          2}px, ${primaryAxis.height / 2}px, 0)`
      }}
    >
      {series.datums.map((datum, i) => {
        const dataStyle = datum.getStatusStyle(
          Utils.getStatus(datum, hovered, selected)
        )

        const interactiveDatum = interaction === 'element'
        const datumInteractionProps = interactiveDatum
          ? {
            onClick: () => selectDatum(datum, { setChartState }),
            onMouseEnter: () => hoverDatum(datum, { setChartState }),
            onMouseMove: () => hoverDatum(datum, { setChartState }),
            onMouseLeave: () => hoverDatum(null, { setChartState })
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
              pointerEvents: interactiveDatum ? 'all' : 'none'
            }}
            {...seriesInteractionProps}
            {...datumInteractionProps}
          />
        )
      })}
    </g>
  )
}

Pie.defaultProps = {
  showPoints: true
}

Pie.plotDatum = (datum, { primaryAxis }) => {
  // Decorate the datum with the scale info
  datum = {
    ...datum,
    ...primaryAxis.scale(datum),
    defined:
      Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue)
  }

  // Set the focus point
  datum.focus = { x: datum.x, y: datum.y }

  // Set the pointer points (used in voronoi)
  datum.pointerPoints = [datum.focus]

  // Return the new datum
  return datum
}

Pie.buildStyles = (series, { getStyles, getDatumStyles, defaultColors }) => {
  series.getStatusStyle = status => {
    series.style = Utils.getStatusStyle(series, status, getStyles)
    return series.style
  }

  // We also need to decorate each datum in the same fashion
  series.datums.forEach(datum => {
    datum.getStatusStyle = status => {
      datum.style = Utils.getStatusStyle(datum, status, getDatumStyles, {
        color: defaultColors[datum.index % (defaultColors.length - 1)]
      })
      return datum.style
    }
  })
}
