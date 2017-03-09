import _ from './Utils'
import Memoize from './Memoize'

export default {
  gridX: state => gridX(
    _.get(state, 'padding.left', 0),
    _.get(state, 'gridOffsetX', 0),
  ),
  gridY: state => gridY(
    _.get(state, 'padding.top', 0),
    _.get(state, 'gridOffsetY', 0),
  ),
  gridWidth: state => gridWidth(
    _.get(state, 'width', 0),
    _.get(state, 'padding.left', 0),
    _.get(state, 'padding.right', 0),
    _.get(state, 'gridOffsetWidth', 0),
  ),
  gridHeight: state => gridHeight(
    _.get(state, 'height', 0),
    _.get(state, 'padding.top', 0),
    _.get(state, 'padding.bottom', 0),
    _.get(state, 'gridOffsetHeight', 0),
  )
}

const gridX = Memoize((
  paddingLeft,
  gridOffsetX
) => {
  return paddingLeft + gridOffsetX
})

const gridY = Memoize((
  paddingTop,
  gridOffsetY
) => {
  return paddingTop + gridOffsetY
})

const gridWidth = Memoize((
  width,
  paddingLeft,
  paddingRight,
  offset
) => {
  return width - paddingLeft - paddingRight + offset
})

const gridHeight = Memoize((
  height,
  paddingTop,
  paddingBottom,
  offset
) => {
  return height - paddingTop - paddingBottom + offset
})
