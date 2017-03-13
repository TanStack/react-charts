import _ from './Utils'
import Memoize from './Memoize'

export default {
  gridX: state => gridX(
    _.get(state, 'padding.left', 0),
    _.get(state, 'axes.left.width', 0),
    _.get(state, 'axes.top.left', 0),
    _.get(state, 'axes.bottom.left', 0)
  ),
  gridY: state => gridY(
    _.get(state, 'padding.top', 0),
    _.get(state, 'axes.top.height', 0),
    _.get(state, 'axes.left.top', 0),
    _.get(state, 'axes.right.top', 0)
  ),
  gridWidth: state => gridWidth(
    _.get(state, 'width', 0),
    _.get(state, 'padding.left', 0),
    _.get(state, 'padding.right', 0),
    _.get(state, 'axes.left.width', 0),
    _.get(state, 'axes.right.width', 0),
    _.get(state, 'axes.top.left', 0),
    _.get(state, 'axes.top.right', 0),
    _.get(state, 'axes.bottom.left', 0),
    _.get(state, 'axes.bottom.right', 0),
  ),
  gridHeight: state => gridHeight(
    _.get(state, 'height', 0),
    _.get(state, 'padding.top', 0),
    _.get(state, 'padding.bottom', 0),
    _.get(state, 'axes.top.height', 0),
    _.get(state, 'axes.bottom.height', 0),
    _.get(state, 'axes.left.top', 0),
    _.get(state, 'axes.left.bottom', 0),
    _.get(state, 'axes.right.top', 0),
    _.get(state, 'axes.right.bottom', 0),
  )
}

const gridX = Memoize((
  paddingLeft,
  axesLeftWidth,
  axesTopLeft,
  axesBottomLeft
) => {
  return paddingLeft + Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft)
})

const gridY = Memoize((
  paddingTop,
  axesTopHeight,
  axesLeftTop,
  axesRightTop
) => {
  return paddingTop + Math.max(axesTopHeight, axesLeftTop, axesRightTop)
})

const gridWidth = Memoize((
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
})

const gridHeight = Memoize((
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
