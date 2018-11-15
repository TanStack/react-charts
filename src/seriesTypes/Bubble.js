import React from 'react'
import withHooks, { useMemo, useContext } from '../utils/hooks'

//

import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'

//
import Circle from '../primitives/Circle'

const circleDefaultStyle = {
  r: 2
}

function Bubble({ series }) {
  const [{ focused, selected }] = useContext(ChartContext)

  const style = useMemo(
    () => series.getStatusStyle(Utils.getStatus(series, focused, selected)),
    [series, focused, selected]
  )

  return (
    <g>
      {series.datums.map((datum, i) => {
        return (
          <Point
            {...{
              key: i,
              datum,
              focused,
              selected,
              style
            }}
          />
        )
      })}
    </g>
  )
}

Bubble.plotDatum = (datum, { primaryAxis, xAxis, yAxis }) => {
  datum.x = xAxis.scale(datum.xValue)
  datum.y = yAxis.scale(datum.yValue)
  datum.defined =
    Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue)
  datum.base = primaryAxis.vertical
    ? xAxis.scale(datum.baseValue)
    : yAxis.scale(datum.baseValue)
  // Adjust non-bar elements for ordinal scales
  if (xAxis.type === 'ordinal') {
    datum.x += xAxis.tickOffset
  }
  if (yAxis.type === 'ordinal') {
    datum.y += yAxis.tickOffset
  }

  // Set the default anchor point
  datum.anchor = {
    x: datum.x,
    y: datum.y,
    verticalPadding: datum.r,
    horizontalPadding: datum.r
  }

  // Set the pointer points (used in voronoi)
  datum.boundingPoints = [datum.anchor]
}

Bubble.buildStyles = (series, { getStyles, getDatumStyles, defaultColors }) => {
  const defaults = {
    // Pass some sane defaults
    color: defaultColors[series.index % (defaultColors.length - 1)]
  }

  series.getStatusStyle = status => {
    series.style = Utils.getStatusStyle(series, status, getStyles, defaults)
    return series.style
  }

  // We also need to decorate each datum in the same fashion
  series.datums.forEach(datum => {
    datum.getStatusStyle = status => {
      datum.style = Utils.getStatusStyle(
        datum,
        status,
        getDatumStyles,
        defaults
      )
      return datum.style
    }
  })
}

const Point = withHooks(function Point({ datum, focused, selected, style }) {
  if (!datum.defined) {
    return null
  }

  const dataStyle = useMemo(
    () => datum.getStatusStyle(Utils.getStatus(datum, focused, selected)),
    [datum, focused, selected]
  )

  const circleProps = {
    x: datum ? datum.x : undefined,
    y: datum ? datum.y : undefined,
    style: {
      ...circleDefaultStyle,
      ...style,
      ...style.circle,
      ...dataStyle,
      ...dataStyle.circle,
      ...(typeof datum.r !== 'undefined'
        ? {
          r: datum.r
        }
        : {})
    }
  }
  return Utils.useDeepMemo(() => <Circle {...circleProps} />, circleProps)
})

export default withHooks(Bubble)
