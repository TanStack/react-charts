import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
//
import Selectors from '../utils/Selectors'
// import Rectangle from '../primitives/Rectangle'

class Brush extends PureComponent {
  static defaultProps = {
    onSelect: () => {},
  }
  componentWillReceiveProps (nextProps) {
    const { onSelect, cursor, primaryAxis } = this.props
    if (
      this.props.cursor &&
      nextProps.cursor.released !== this.props.cursor.released
    ) {
      onSelect({
        cursor: nextProps.cursor.released,
        start: primaryAxis.scale.invert(cursor.sourceX),
        end: primaryAxis.scale.invert(cursor.x),
      })
    }
  }
  render () {
    const { cursor = {}, offset, gridX, gridY, gridHeight } = this.props

    return (
      <div
        className='Brush'
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: `${offset.left + gridX}px`,
          top: `${offset.top + gridY}px`,
          opacity: !cursor.dragging ? 0 : 1,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `${Math.min(cursor.x, cursor.sourceX)}px`,
            width: `${Math.abs(cursor.x - cursor.sourceX)}px`,
            height: `${gridHeight}px`,
            background: 'rgba(0,0,0,.2)',
          }}
        />
      </div>
    )
  }
}

export default Connect(
  state => {
    const selectors = {
      primaryAxis: Selectors.primaryAxis(),
      secondaryAxis: Selectors.secondaryAxis(),
      offset: Selectors.offset(),
      gridHeight: Selectors.gridHeight(),
      gridX: Selectors.gridX(),
      gridY: Selectors.gridY(),
    }
    return state => ({
      primaryAxis: selectors.primaryAxis(state),
      secondaryAxis: selectors.secondaryAxis(state),
      cursor: state.cursor,
      offset: selectors.offset(state),
      gridHeight: selectors.gridHeight(state),
      gridX: selectors.gridX(state),
      gridY: selectors.gridY(state),
    })
  },
  {
    statics: {
      isHTML: true,
    },
  }
)(Brush)
