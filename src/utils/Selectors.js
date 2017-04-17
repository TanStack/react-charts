import _ from './Utils'
import Memoize from './Memoize'

export default {
  primaryAxis: () => Memoize(state => [
    state.axes
  ], axes => {
    for (var key in axes) {
      if (axes.hasOwnProperty(key)) {
        if (axes[key].primary) {
          return axes[key]
        }
      }
    }
    return undefined
  }),

  secondaryAxis: () => Memoize(state => [
    state.axes
  ], axes => {
    for (var key in axes) {
      if (axes.hasOwnProperty(key)) {
        if (!axes[key].primary) {
          return axes[key]
        }
      }
    }
    return undefined
  }),

  offset: () => Memoize(state => [
    _.get(() => state.offset.left, 0),
    _.get(() => state.offset.top, 0)
  ], (
    left,
    top
  ) => {
    return {
      left,
      top
    }
  }),

  gridX: () => Memoize(state => [
    _.get(() => state.padding.left, 0),
    _.get(() => state.axisDimensions.left.width, 0),
    _.get(() => state.axisDimensions.top.left, 0),
    _.get(() => state.axisDimensions.bottom.left, 0)
  ], (
    paddingLeft,
    axesLeftWidth,
    axesTopLeft,
    axesBottomLeft
  ) => {
    return paddingLeft + Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft)
  }),

  gridY: () => Memoize(state => [
    _.get(() => state.padding.top, 0),
    _.get(() => state.axisDimensions.top.height, 0),
    _.get(() => state.axisDimensions.left.top, 0),
    _.get(() => state.axisDimensions.right.top, 0)
  ], (
    paddingTop,
    axesTopHeight,
    axesLeftTop,
    axesRightTop
  ) => {
    return paddingTop + Math.max(axesTopHeight, axesLeftTop, axesRightTop)
  }),

  gridWidth: () => Memoize(state => [
    _.get(() => state.width, 0),
    _.get(() => state.padding.left, 0),
    _.get(() => state.padding.right, 0),
    _.get(() => state.axisDimensions.left.width, 0),
    _.get(() => state.axisDimensions.right.width, 0),
    _.get(() => state.axisDimensions.top.left, 0),
    _.get(() => state.axisDimensions.top.right, 0),
    _.get(() => state.axisDimensions.bottom.left, 0),
    _.get(() => state.axisDimensions.bottom.right, 0)
  ], (
    width,
    paddingLeft,
    paddingRight,
    axesLeftWidth,
    axesRightWidth,
    axesTopLeft,
    axesTopRight,
    axesBottomLeft,
    axesBottomRight,
  ) => {
    return width -
      paddingLeft -
      paddingRight -
      Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft) -
      Math.max(axesRightWidth, axesTopRight, axesBottomRight)
  }),

  gridHeight: () => Memoize(state => [
    _.get(() => state.height, 0),
    _.get(() => state.padding.top, 0),
    _.get(() => state.padding.bottom, 0),
    _.get(() => state.axisDimensions.top.height, 0),
    _.get(() => state.axisDimensions.bottom.height, 0),
    _.get(() => state.axisDimensions.left.top, 0),
    _.get(() => state.axisDimensions.left.bottom, 0),
    _.get(() => state.axisDimensions.right.top, 0),
    _.get(() => state.axisDimensions.right.bottom, 0)
  ], (
    height,
    paddingTop,
    paddingBottom,
    axesTopHeight,
    axesBottomHeight,
    axesLeftTop,
    axesLeftBottom,
    axesRightTop,
    axesRightBottom,
  ) => {
    return height -
      paddingTop -
      paddingBottom -
      Math.max(axesTopHeight, axesLeftTop, axesRightTop) -
      Math.max(axesBottomHeight, axesLeftBottom, axesRightBottom)
  })
}
