import React from 'react'
//
import buildAxis from '../../utils/buildAxis'

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
          gridHeight,
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
          gridHeight,
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
    yAxes,
  }
}
