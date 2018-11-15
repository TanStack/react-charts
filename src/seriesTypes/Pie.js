import React, { useContext } from 'react'

import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'

//
import Path from '../primitives/Path'

export default function Pie({ series }) {
  const [{ selected, focused, primaryAxes }] = useContext(ChartContext)

  const style = series.getStatusStyle(
    Utils.getStatus(series, focused, selected)
  )

  const primaryAxis = primaryAxes[0]

  return (
    <g
      style={{
        transform: Utils.translate(
          primaryAxis.width / 2,
          primaryAxis.height / 2
        )
      }}
    >
      {series.datums.map((datum, i) => {
        const dataStyle = datum.getStatusStyle(
          Utils.getStatus(datum, focused, selected)
        )

        return (
          <Path
            key={i}
            d={datum.arc()}
            style={{
              ...style,
              ...style.arc,
              ...dataStyle,
              ...dataStyle.arc
            }}
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

  // Set the anchor point
  datum.anchor = { x: datum.x, y: datum.y }

  // Set the pointer points (used in voronoi)
  datum.boundingPoints = [datum.anchor]

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
