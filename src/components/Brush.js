import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
//
import Selectors from '../utils/Selectors'
// import Rectangle from '../primitives/Rectangle'

class Brush extends PureComponent {
  static defaultProps = {
    onSelect: () => {},
  }
  static isHtml = true
  componentWillReceiveProps (nextProps) {
    const { onSelect, cursor, primaryAxes } = this.props
    if (this.props.cursor && nextProps.cursor.released !== this.props.cursor.released) {
      if (Math.abs(cursor.sourceX - cursor.x) < 20) {
        return
      }
      onSelect({
        cursor: nextProps.cursor.released,
        start: primaryAxes[0].scale.invert(cursor.sourceX),
        end: primaryAxes[0].scale.invert(cursor.x),
      })
    }
  }
  render () {
    const {
      cursor = {}, offset, gridX, gridY, gridHeight, style = {},
    } = this.props

    return (
      <div
        className="Brush"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: `${offset.left + gridX}px`,
          top: `${offset.top + gridY}px`,
          opacity: cursor.dragging ? (Math.abs(cursor.sourceX - cursor.x) < 20 ? 0.5 : 1) : 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `${Math.min(cursor.x, cursor.sourceX)}px`,
            width: `${Math.abs(cursor.x - cursor.sourceX)}px`,
            height: `${gridHeight}px`,
            background: 'rgba(0,0,0,.3)',
            ...style,
          }}
        />
      </div>
    )
  }
}

export default Connect(() => {
  const selectors = {
    primaryAxes: Selectors.primaryAxes(),
    offset: Selectors.offset(),
    gridHeight: Selectors.gridHeight(),
    gridX: Selectors.gridX(),
    gridY: Selectors.gridY(),
  }
  return state => ({
    primaryAxes: selectors.primaryAxes(state),
    cursor: state.cursor,
    offset: selectors.offset(state),
    gridHeight: selectors.gridHeight(state),
    gridX: selectors.gridX(state),
    gridY: selectors.gridY(state),
  })
})(Brush)
