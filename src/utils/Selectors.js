import Memoize from './Memoize'

export default {
  primaryAxes: () =>
    Memoize(
      state => [state.axes],
      axes => {
        if (!axes) return []
        return Object.keys(axes)
          .map(key => {
            if (axes[key].primary) {
              return axes[key]
            }
            return null
          })
          .filter(Boolean)
      }
    ),

  secondaryAxes: () =>
    Memoize(
      state => [state.axes],
      axes => {
        if (!axes) return []
        return Object.keys(axes)
          .map(key => {
            if (!axes[key].primary) {
              return axes[key]
            }
            return null
          })
          .filter(Boolean)
      }
    ),

  offset: () =>
    Memoize(
      state => [
        (state && state.offset && state.offset.left) || 0,
        (state && state.offset && state.offset.top) || 0,
      ],
      (left, top) => ({
        left,
        top,
      })
    ),

  gridX: () =>
    Memoize(
      state => [
        (state && state.padding && state.padding.left) || 0,
        state && state.axisDimensions && state.axisDimensions.left,
        state && state.axisDimensions && state.axisDimensions.top,
        state && state.axisDimensions && state.axisDimensions.bottom,
      ],
      (paddingLeft, axisDimensionsLeft, axisDimensionsTop, axisDimensionsBottom) => {
        const axesLeftWidth = (axisDimensionsLeft && sumObjBy(axisDimensionsLeft, 'width')) || 0
        const axesTopLeft = (axisDimensionsTop && sumObjBy(axisDimensionsTop, 'left')) || 0
        const axesBottomLeft = (axisDimensionsBottom && sumObjBy(axisDimensionsBottom, 'left')) || 0
        return paddingLeft + Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft)
      }
    ),

  gridY: () =>
    Memoize(
      state => [
        (state && state.padding && state.padding.top) || 0,
        state && state.axisDimensions && state.axisDimensions.top,
        state && state.axisDimensions && state.axisDimensions.left,
        state && state.axisDimensions && state.axisDimensions.right,
      ],
      (paddingTop, axisDimensionsTop, axisDimensionsLeft, axisDimensionsRight) => {
        const axesTopHeight = (axisDimensionsTop && sumObjBy(axisDimensionsTop, 'height')) || 0
        const axesLeftTop = (axisDimensionsLeft && sumObjBy(axisDimensionsLeft, 'top')) || 0
        const axesRightTop = (axisDimensionsRight && sumObjBy(axisDimensionsRight, 'top')) || 0
        return paddingTop + Math.max(axesTopHeight, axesLeftTop, axesRightTop)
      }
    ),

  gridWidth: () =>
    Memoize(
      state => [
        state && state.width,
        state && state.padding,
        state && state.axisDimensions && state.axisDimensions.top,
        state && state.axisDimensions && state.axisDimensions.bottom,
        state && state.axisDimensions && state.axisDimensions.left,
        state && state.axisDimensions && state.axisDimensions.right,
      ],
      (
        width,
        padding,
        axisDimensionsTop,
        axisDimensionsBottom,
        axisDimensionsLeft,
        axisDimensionsRight
      ) => {
        const paddingLeft = (padding && padding.left) || 0
        const paddingRight = (padding && padding.right) || 0
        const axesLeftWidth = (axisDimensionsLeft && sumObjBy(axisDimensionsLeft, 'width')) || 0
        const axesRightWidth = (axisDimensionsRight && sumObjBy(axisDimensionsRight, 'width')) || 0
        const axesTopLeft = (axisDimensionsTop && sumObjBy(axisDimensionsTop, 'left')) || 0
        const axesTopRight = (axisDimensionsTop && sumObjBy(axisDimensionsTop, 'right')) || 0
        const axesBottomLeft = (axisDimensionsBottom && sumObjBy(axisDimensionsBottom, 'left')) || 0
        const axesBottomRight =
          (axisDimensionsBottom && sumObjBy(axisDimensionsBottom, 'right')) || 0

        return (
          (width || 0) -
          paddingLeft -
          paddingRight -
          Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft) -
          Math.max(axesRightWidth, axesTopRight, axesBottomRight)
        )
      }
    ),

  gridHeight: () =>
    Memoize(
      state => [
        state && state.height,
        state && state.padding,
        state && state.axisDimensions && state.axisDimensions.top,
        state && state.axisDimensions && state.axisDimensions.bottom,
        state && state.axisDimensions && state.axisDimensions.left,
        state && state.axisDimensions && state.axisDimensions.right,
      ],
      (
        height,
        padding,
        axisDimensionsTop,
        axisDimensionsBottom,
        axisDimensionsLeft,
        axisDimensionsRight
      ) => {
        const paddingTop = (padding && padding.top) || 0
        const paddingBottom = (padding && padding.right) || 0
        const axesTopHeight = (axisDimensionsTop && sumObjBy(axisDimensionsTop, 'height')) || 0
        const axesBottomHeight =
          (axisDimensionsBottom && sumObjBy(axisDimensionsBottom, 'height')) || 0
        const axesLeftTop = (axisDimensionsLeft && sumObjBy(axisDimensionsLeft, 'top')) || 0
        const axesLeftBottom = (axisDimensionsLeft && sumObjBy(axisDimensionsLeft, 'bottom')) || 0
        const axesRightTop = (axisDimensionsRight && sumObjBy(axisDimensionsRight, 'top')) || 0
        const axesRightBottom =
          (axisDimensionsRight && sumObjBy(axisDimensionsRight, 'bottom')) || 0

        return (
          (height || 0) -
          paddingTop -
          paddingBottom -
          Math.max(axesTopHeight, axesLeftTop, axesRightTop) -
          Math.max(axesBottomHeight, axesLeftBottom, axesRightBottom)
        )
      }
    ),
}

function sumObjBy (obj, str) {
  return Object.keys(obj)
    .map(key => obj[key])
    .reduce((prev, curr) => prev + curr[str] || 0, 0)
}
