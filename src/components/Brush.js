import React from 'react'
//
import { ChartConnect, PointerConnect } from '../utils/Context'
import Selectors from '../utils/Selectors'
// import Rectangle from '../primitives/Rectangle'

class Brush extends React.PureComponent {
  static defaultProps = {
    onSelect: () => {},
  }
  static isHtml = true
  componentDidUpdate (oldProps) {
    const { onSelect, pointer, primaryAxes } = oldProps
    if (oldProps.pointer && this.props.pointer.released !== oldProps.pointer.released) {
      if (Math.abs(pointer.sourceX - pointer.x) < 20) {
        return
      }
      onSelect({
        pointer: this.props.pointer.released,
        start: primaryAxes[0].scale.invert(pointer.sourceX),
        end: primaryAxes[0].scale.invert(pointer.x),
      })
    }
  }
  render () {
    const {
      pointer = {}, offset, gridX, gridY, gridHeight, style = {},
    } = this.props

    return (
      <div
        className="Brush"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate3d(${offset.left + gridX}px, ${offset.top + gridY}px, 0)`,
          opacity: pointer.dragging ? (Math.abs(pointer.sourceX - pointer.x) < 20 ? 0.5 : 1) : 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            transform: `translate3d(${Math.min(pointer.x, pointer.sourceX)}px, 0px, 0)`,
            width: `${Math.abs(pointer.x - pointer.sourceX)}px`,
            height: `${gridHeight}px`,
            background: 'rgba(0,0,0,.3)',
            ...style,
          }}
        />
      </div>
    )
  }
}

export default PointerConnect(state => ({
  pointer: state.pointer,
}))(
  ChartConnect(() => {
    const selectors = {
      primaryAxes: Selectors.primaryAxes(),
      offset: Selectors.offset(),
      gridHeight: Selectors.gridHeight(),
      gridX: Selectors.gridX(),
      gridY: Selectors.gridY(),
    }
    return state => ({
      primaryAxes: selectors.primaryAxes(state),
      offset: selectors.offset(state),
      gridHeight: selectors.gridHeight(state),
      gridX: selectors.gridX(state),
      gridY: selectors.gridY(state),
    })
  })(Brush)
)
