import React from 'react'
import PropTypes from 'prop-types'
//
import buildAxis from '../../utils/buildAxis'

import {
  axisTypeOrdinal,
  axisTypeTime,
  axisTypeUtc,
  axisTypeLinear,
  axisTypeLog,
  positionTop,
  positionRight,
  positionBottom,
  positionLeft
} from '../../utils/Constants'

export const axisShape = PropTypes.shape({
  primary: PropTypes.bool,
  type: PropTypes.oneOf([
    axisTypeOrdinal,
    axisTypeTime,
    axisTypeUtc,
    axisTypeLinear,
    axisTypeLog
  ]).isRequired,
  invert: PropTypes.bool,
  position: PropTypes.oneOf([
    positionTop,
    positionRight,
    positionBottom,
    positionLeft
  ]),
  primaryAxisID: PropTypes.any,
  min: PropTypes.any,
  max: PropTypes.any,
  hardMin: PropTypes.any,
  hardMax: PropTypes.any,
  base: PropTypes.any,
  tickArguments: PropTypes.any,
  tickValues: PropTypes.any,
  tickFormat: PropTypes.func,
  tickSizeInner: PropTypes.number,
  tickSizeOuter: PropTypes.number,
  tickPadding: PropTypes.number,
  maxLabelRotation: PropTypes.number,
  innerPadding: PropTypes.number,
  outerPadding: PropTypes.number,
  showGrid: PropTypes.bool,
  showTicks: PropTypes.bool,
  show: PropTypes.bool,
  stacked: PropTypes.bool,
  id: PropTypes.any
})

export default ({ axes, materializedData, gridHeight, gridWidth }) => {
  // Detect axes changes and build axes
  let prePrimaryAxes = axes.filter(d => d.primary)
  let preSecondaryAxes = axes.filter(d => !d.primary)

  const primaryAxesHashes = JSON.stringify(prePrimaryAxes)
  const secondaryAxesHashes = JSON.stringify(preSecondaryAxes)

  // Calculate primary axes
  const primaryAxes = React.useMemo(
    () => {
      return prePrimaryAxes.map((axis, i) => {
        return buildAxis({
          axis,
          materializedData,
          gridWidth,
          gridHeight
        })
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [primaryAxesHashes, materializedData, gridHeight, gridWidth]
  )
  // Calculate secondary axes
  const secondaryAxes = React.useMemo(
    () => {
      return preSecondaryAxes.map((axis, i) => {
        return buildAxis({
          axis,
          primaryAxes,
          materializedData,
          gridWidth,
          gridHeight
        })
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [secondaryAxesHashes, materializedData, gridHeight, gridWidth]
  )

  // Make sure we're mapping x and y to the correct axes
  const xKey = primaryAxes.find(d => d.vertical) ? 'secondary' : 'primary'
  const yKey = primaryAxes.find(d => d.vertical) ? 'primary' : 'secondary'
  const xAxes = primaryAxes.find(d => d.vertical) ? secondaryAxes : primaryAxes
  const yAxes = primaryAxes.find(d => d.vertical) ? primaryAxes : secondaryAxes

  return {
    primaryAxes,
    secondaryAxes,
    xKey,
    yKey,
    xAxes,
    yAxes
  }
}
