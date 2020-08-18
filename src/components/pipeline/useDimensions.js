import React from 'react'

const sumAllDimensionProperties = (side = {}, prop) =>
  Object.keys(side).reduce(
    (sum, subside) => sum + side[subside]?.[prop] || 0,
    0
  )

export default ({ width, height, axisDimensions }) => {
  const { gridX, gridY, gridWidth, gridHeight } = React.useMemo(() => {
    // Left
    const [axesLeftWidth, axesLeftTop, axesLeftBottom] = [
      'width',
      'top',
      'bottom',
    ].map(prop => sumAllDimensionProperties(axisDimensions.left, prop))

    const [axesRightWidth, axesRightTop, axesRightBottom] = [
      'width',
      'top',
      'bottom',
    ].map(prop => sumAllDimensionProperties(axisDimensions.right, prop))

    const [axesTopHeight, axesTopLeft, axesTopRight] = [
      'height',
      'left',
      'right',
    ].map(prop => sumAllDimensionProperties(axisDimensions.top, prop))

    const [axesBottomHeight, axesBottomLeft, axesBottomRight] = [
      'height',
      'left',
      'right',
    ].map(prop => sumAllDimensionProperties(axisDimensions.bottom, prop))

    const gridX = Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft)
    const gridY = Math.max(axesTopHeight, axesLeftTop, axesRightTop)
    const gridWidth = Math.max(
      0,
      width -
        Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft) -
        Math.max(axesRightWidth, axesTopRight, axesBottomRight)
    )
    const gridHeight = Math.max(
      0,
      height -
        Math.max(axesTopHeight, axesLeftTop, axesRightTop) -
        Math.max(axesBottomHeight, axesLeftBottom, axesRightBottom)
    )

    return { gridX, gridY, gridWidth, gridHeight }
  }, [width, height, axisDimensions])

  return {
    gridX,
    gridY,
    gridWidth,
    gridHeight,
  }
}
