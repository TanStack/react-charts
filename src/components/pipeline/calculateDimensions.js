import { useMemo } from 'use-react-hooks'

import Utils from '../../utils/Utils'

export default ({ width, height, axisDimensions, padding, offset }) => {
  offset = useMemo(
    () => {
      return {
        left: offset.left || 0,
        top: offset.top || 0
      }
    },
    [offset]
  )
  const { gridX, gridY, gridWidth, gridHeight } = useMemo(
    () => {
      // Left
      const axesLeftWidth =
        (axisDimensions.left && Utils.sumObjBy(axisDimensions.left, 'width')) ||
        0
      const axesLeftTop =
        (axisDimensions.left && Utils.sumObjBy(axisDimensions.left, 'top')) || 0
      const axesLeftBottom =
        (axisDimensions.left &&
          Utils.sumObjBy(axisDimensions.left, 'bottom')) ||
        0

      // Right
      const axesRightWidth =
        (axisDimensions.right &&
          Utils.sumObjBy(axisDimensions.right, 'width')) ||
        0
      const axesRightTop =
        (axisDimensions.right && Utils.sumObjBy(axisDimensions.right, 'top')) ||
        0
      const axesRightBottom =
        (axisDimensions.right &&
          Utils.sumObjBy(axisDimensions.right, 'bottom')) ||
        0

      // Top
      const axesTopHeight =
        (axisDimensions.top && Utils.sumObjBy(axisDimensions.top, 'height')) ||
        0
      const axesTopLeft =
        (axisDimensions.top && Utils.sumObjBy(axisDimensions.top, 'left')) || 0
      const axesTopRight =
        (axisDimensions.top && Utils.sumObjBy(axisDimensions.top, 'right')) || 0

      // Bottom
      const axesBottomHeight =
        (axisDimensions.bottom &&
          Utils.sumObjBy(axisDimensions.bottom, 'height')) ||
        0
      const axesBottomLeft =
        (axisDimensions.bottom &&
          Utils.sumObjBy(axisDimensions.bottom, 'left')) ||
        0
      const axesBottomRight =
        (axisDimensions.bottom &&
          Utils.sumObjBy(axisDimensions.bottom, 'right')) ||
        0

      const paddingLeft = padding.left || 0
      const paddingRight = padding.right || 0
      const paddingTop = padding.top || 0
      const paddingBottom = padding.bottom || 0

      const gridX =
        paddingLeft + Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft)

      const gridY =
        paddingTop + Math.max(axesTopHeight, axesLeftTop, axesRightTop)

      const gridWidth =
        width -
        paddingLeft -
        paddingRight -
        Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft) -
        Math.max(axesRightWidth, axesTopRight, axesBottomRight)

      const gridHeight =
        height -
        paddingTop -
        paddingBottom -
        Math.max(axesTopHeight, axesLeftTop, axesRightTop) -
        Math.max(axesBottomHeight, axesLeftBottom, axesRightBottom)

      return { gridX, gridY, gridWidth, gridHeight }
    },
    [width, height, axisDimensions, padding]
  )

  return {
    offset,
    gridX,
    gridY,
    gridWidth,
    gridHeight
  }
}
