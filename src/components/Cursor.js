import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { Animate } from './ReactMove'
//
import Selectors from '../utils/Selectors'
import Utils from '../utils/Utils'

class Cursor extends PureComponent {
  static defaultProps = {
    children: ({ label }) => <span>{label}</span>,
    snap: true,
  }
  static isHtml = true
  constructor () {
    super()
    this.onHover = this.onHover.bind(this)
    this.onActivate = this.onActivate.bind(this)
  }
  render () {
    const {
      primary,
      snap,
      //
      stackData,
      primaryAxis,
      secondaryAxis,
      cursor,
      offset: { left, top },
      gridHeight,
      gridWidth,
      gridX,
      gridY,
      hovered,
      render,
      children,
      Component: Comp,
    } = this.props

    // Don't render until we have all dependencies
    if (!stackData || !cursor || !primaryAxis || !secondaryAxis) {
      return null
    }

    // Get the cursor information
    let { x, y } = cursor
    let animated = false
    let coordinate
    let value
    let label
    let visibility = snap ? (hovered.active ? 1 : 0) : cursor.active ? 1 : 0

    // If the cursor isn't in the grid, don't display
    if (x < -1 || x > gridWidth + 1 || y < -1 || y > gridHeight + 1) {
      visibility = 0
    }

    // Determine the axis to use
    const axis = primary ? primaryAxis : secondaryAxis
    const axisKey = primary ? 'primary' : 'secondary'
    // Determine the sibling axis to use
    const siblingAxis = primary ? secondaryAxis : primaryAxis
    // Get the sibling range
    const siblingRange = siblingAxis.scale.range()

    // Resolve the invert function
    const invert = axis.scale.invert || (d => d)

    let x1
    let x2
    let y1
    let y2
    let alignPctX
    let alignPctY

    if (axis.type === 'ordinal' || snap) {
      // For snapping we need the hovered datums
      if (!hovered || !hovered.datums || !hovered.datums.length) {
        return null
      }
      // Must be ordinal axis or snap is on, so turn animation on
      animated = true

      // Vertical snapping
      const datum = Utils.getClosestPoint(cursor, hovered.datums)

      if (axis.vertical) {
        y = datum.focus.y
        label =
          typeof datum[axisKey] !== 'undefined'
            ? axis.format(axis.stacked && !primary ? datum.totalValue : datum[axisKey])
            : undefined
      } else {
        // Horizontal snapping
        x = datum.focus.x
        label =
          typeof datum[axisKey] !== 'undefined'
            ? axis.format(axis.stacked && !primary ? datum.totalValue : datum[axisKey])
            : undefined
      }
    }

    // Vertical alignment
    if (axis.vertical) {
      y = Math.max(0, Math.min(gridHeight, y)) // Limit within grid size
      coordinate = y
      x1 = siblingRange[0]
      x2 = siblingRange[1]
      y1 = y - 1
      y2 = y + 1
      value = invert(y)
      label = typeof label !== 'undefined' ? label : axis.format(value)
      if (axis.position === 'left') {
        alignPctX = -100
        alignPctY = -50
      } else {
        alignPctX = 0
        alignPctY = -50
      }
    } else {
      x = Math.max(0, Math.min(gridWidth, x)) // Limit within grid size
      coordinate = x
      x1 = x - 1
      x2 = x + 1
      y1 = siblingRange[0]
      y2 = siblingRange[1]
      value = invert(x)
      label = typeof label !== 'undefined' ? label : axis.format(value)
      if (axis.position === 'top') {
        alignPctX = -500
        alignPctY = -100
      } else {
        alignPctX = -50
        alignPctY = 0
      }
    }

    const lineStartX = Math.min(x1, x2)
    const lineStartY = Math.min(y1, y2)
    const lineEndX = Math.max(x1, x2)
    const lineEndY = Math.max(y1, y2)
    const bubbleX = x1 + (!axis.vertical ? 1 : 0)
    const bubbleY = y1 + (axis.vertical ? 1 : 0)

    const lineHeight = Math.max(lineEndY - lineStartY, 0)
    const lineWidth = Math.max(lineEndX - lineStartX, 0)

    let renderedChildren

    const renderProps = {
      coordinate,
      value,
      label,
    }

    if (Comp) {
      renderedChildren = React.createElement(Comp, null, renderProps)
    } else {
      renderedChildren = (render || children)(renderProps)
    }

    const start = {
      lineStartX,
      lineStartY,
      lineWidth,
      lineHeight,
      bubbleX,
      bubbleY,
      visibility: 0,
    }

    const update = {}
    Object.keys(start).forEach(key => {
      update[key] = [start[key]]
    })
    update.visibility = [visibility]

    return (
      <Animate show={visibility} start={start} enter={update} update={update} leave={update}>
        {inter => (
          <div
            className="Cursor"
            onMouseLeave={e => this.onHover(null, e)}
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              left: `${left + gridX}px`,
              top: `${top + gridY}px`,
              opacity: inter.visibility,
            }}
          >
            {/* Render the cursor line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translate3d(${animated ? inter.lineStartX : lineStartX}px, ${
                  animated ? inter.lineStartY : lineStartY
                }px, 0px)`,
                width: `${animated ? inter.lineWidth : lineWidth}px`,
                height: `${animated ? inter.lineHeight : lineHeight}px`,
                background: 'rgba(0,0,0,.3)',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />
            {/* Render the cursor bubble */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translate3d(${animated ? inter.bubbleX : bubbleX}px, ${
                  animated ? inter.bubbleY : bubbleY
                }px, 0px)`,
              }}
            >
              {/* Render the cursor label */}
              <div
                style={{
                  padding: '5px',
                  fontSize: '10px',
                  background: 'rgba(0,0,0,.6)',
                  color: 'white',
                  borderRadius: '3px',
                  position: 'relative',
                  transform: `translate3d(${alignPctX}%, ${alignPctY}%, 0px)`,
                  whiteSpace: !axis.vertical && 'nowrap',
                }}
              >
                {renderedChildren}
              </div>
            </div>
          </div>
        )}
      </Animate>
    )
  }
  onHover (hovered) {
    return this.props.dispatch(
      state => ({
        ...state,
        hovered,
      }),
      {
        type: 'hovered',
      }
    )
  }
  onActivate (newActive) {
    const { active, dispatch } = this.props
    if (active === newActive) {
      return dispatch(
        state => ({
          ...state,
          active: null,
        }),
        {
          type: 'active',
        }
      )
    }
    dispatch(
      state => ({
        ...state,
        active: newActive,
      }),
      {
        type: 'active',
      }
    )
  }
}

export default Connect(() => {
  const selectors = {
    primaryAxis: Selectors.primaryAxis(),
    secondaryAxis: Selectors.secondaryAxis(),
    offset: Selectors.offset(),
    gridHeight: Selectors.gridHeight(),
    gridWidth: Selectors.gridWidth(),
    gridX: Selectors.gridX(),
    gridY: Selectors.gridY(),
  }
  return state => ({
    stackData: state.stackData,
    primaryAxis: selectors.primaryAxis(state),
    secondaryAxis: selectors.secondaryAxis(state),
    cursor: state.cursor,
    hovered: state.hovered,
    offset: selectors.offset(state),
    gridHeight: selectors.gridHeight(state),
    gridWidth: selectors.gridWidth(state),
    gridX: selectors.gridX(state),
    gridY: selectors.gridY(state),
  })
})(Cursor)
