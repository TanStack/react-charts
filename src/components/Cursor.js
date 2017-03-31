import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
//
// import Line from '../primitives/Line'
// import Text from '../primitives/Text'
// import Rectangle from '../primitives/Rectangle'
import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'

class Cursor extends PureComponent {
  static defaultProps = {
    children: ({
      label
    }) => <span>{label}</span>
  }
  constructor () {
    super()
    this.onHover = this.onHover.bind(this)
    this.onActivate = this.onActivate.bind(this)
  }
  render () {
    const {
      primary,
      //
      primaryAxis,
      secondaryAxis,
      cursor,
      offset: {
        left,
        top
      },
      gridX,
      gridY,
      children
    } = this.props

    // Don't render until we have all dependencies
    if (
      !cursor ||
      !primaryAxis ||
      !secondaryAxis
    ) {
      return null
    }

    const x = cursor.x
    const y = cursor.y
    // const x = cursor.x
    // const y = cursor.y

    const axis = primary ? primaryAxis : secondaryAxis
    const siblingAxis = primary ? secondaryAxis : primaryAxis
    const siblingRange = siblingAxis.scale.range()

    const formatLabel = axis.scale.tickFormat(axis.scale.ticks().length)

    let
      x1,
      x2,
      y1,
      y2,
      label,
      alignPctX,
      alignPctY

    if (axis.vertical) {
      x1 = gridX + siblingRange[0]
      x2 = gridX + siblingRange[1]
      y1 = y
      y2 = y + 1
      label = formatLabel(axis.scale.invert(cursor.y))
      if (axis.position === 'left') {
        alignPctX = -100
        alignPctY = -50
      } else {
        alignPctX = 0
        alignPctY = -50
      }
    } else {
      x1 = x
      x2 = x + 1
      y1 = gridY + siblingRange[0]
      y2 = gridY + siblingRange[1]
      label = formatLabel(axis.scale.invert(cursor.x))
      if (axis.position === 'top') {
        alignPctX = -500
        alignPctY = -100
      } else {
        alignPctX = -50
        alignPctY = 0
      }
    }

    const xStart = Math.min(x1, x2)
    const yStart = Math.min(y1, y2)
    const xEnd = Math.max(x1, x2)
    const yEnd = Math.max(y1, y2)

    const height = Math.max(yEnd - yStart, 0)
    const width = Math.max(xEnd - xStart, 0)

    return (
      <Animate
        data={{
          visibility: cursor.active ? 1 : 0
        }}
      >
        {inter => (
          <div
            className='Cursor'
            onMouseLeave={e => this.onHover(null, e)}
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`,
              opacity: inter.visibility
            }}
          >
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(${xStart}px, ${yStart}px, 0px)`,
                width: `${width}px`,
                height: `${height}px`,
                background: 'rgba(0,0,0,.3)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(${x1}px, ${y1}px, 0px)`
              }}
            >
              <div
                style={{
                  padding: '5px',
                  fontSize: '10px',
                  background: 'rgba(0,0,0,.6)',
                  color: 'white',
                  borderRadius: '3px',
                  position: 'relative',
                  transform: `translate3d(${alignPctX}%, ${alignPctY}%, 0px)`
                }}
              >
                {children({
                  label
                })}
              </div>
            </div>
          </div>
        )}
      </Animate>
    )
  }
  onHover (hovered, e) {
    return this.props.dispatch(state => ({
      ...state,
      hovered
    }))
  }
  onActivate (newActive, e) {
    const {
      active,
      dispatch
    } = this.props
    if (active === newActive) {
      return dispatch(state => ({
        ...state,
        active: null
      }))
    }
    dispatch(state => ({
      ...state,
      active: newActive
    }))
  }
}

export default Connect(state => ({
  primaryAxis: Selectors.primaryAxis(state),
  secondaryAxis: Selectors.secondaryAxis(state),
  cursor: state.cursor,
  offset: Selectors.offset(state),
  gridX: Selectors.gridX(state),
  gridY: Selectors.gridY(state)
}))(Cursor, {
  isHTML: true
})

/* <g

  >

  <Rectangle
    x1={labelX1}
    x2={labelX2}
    y1={labelY1}
    y2={labelY2}
  />
  <Text
    x={x1}
    y={y1}
    fontSize={fontSize}
    textAnchor={axis.position === 'left' ? 'end' : axis.position === 'right' ? 'start' : 'middle'}
    dominantBaseline={axis.position === 'top' ? 'alphabetic' : axis.position === 'bottom' ? 'hanging' : 'central'}
  >
    {label}
  </Text>
</g> */
