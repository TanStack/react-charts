import _ from './Utils'
import Memoize from './Memoize'

export default {
  primaryAxis: state => {
    for (var key in state.axes) {
      if (state.axes.hasOwnProperty(key)) {
        if (state.axes[key].primary) {
          return state.axes[key]
        }
      }
    }
    return undefined
  },
  secondaryAxis: state => {
    for (var key in state.axes) {
      if (state.axes.hasOwnProperty(key)) {
        if (!state.axes[key].primary) {
          return state.axes[key]
        }
      }
    }
    return undefined
  },
  offset: state => offset(
    _.get(state, 'offset.left', 0),
    _.get(state, 'offset.top', 0)
  ),
  gridX: state => gridX(
    _.get(state, 'padding.left', 0),
    _.get(state, 'axisDimensions.left.width', 0),
    _.get(state, 'axisDimensions.top.left', 0),
    _.get(state, 'axisDimensions.bottom.left', 0)
  ),
  gridY: state => gridY(
    _.get(state, 'padding.top', 0),
    _.get(state, 'axisDimensions.top.height', 0),
    _.get(state, 'axisDimensions.left.top', 0),
    _.get(state, 'axisDimensions.right.top', 0)
  ),
  gridWidth: state => gridWidth(
    _.get(state, 'width', 0),
    _.get(state, 'padding.left', 0),
    _.get(state, 'padding.right', 0),
    _.get(state, 'axisDimensions.left.width', 0),
    _.get(state, 'axisDimensions.right.width', 0),
    _.get(state, 'axisDimensions.top.left', 0),
    _.get(state, 'axisDimensions.top.right', 0),
    _.get(state, 'axisDimensions.bottom.left', 0),
    _.get(state, 'axisDimensions.bottom.right', 0),
  ),
  gridHeight: state => gridHeight(
    _.get(state, 'height', 0),
    _.get(state, 'padding.top', 0),
    _.get(state, 'padding.bottom', 0),
    _.get(state, 'axisDimensions.top.height', 0),
    _.get(state, 'axisDimensions.bottom.height', 0),
    _.get(state, 'axisDimensions.left.top', 0),
    _.get(state, 'axisDimensions.left.bottom', 0),
    _.get(state, 'axisDimensions.right.top', 0),
    _.get(state, 'axisDimensions.right.bottom', 0),
  )
}

const offset = Memoize((
  left,
  top
) => {
  return {
    left,
    top
  }
})

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
