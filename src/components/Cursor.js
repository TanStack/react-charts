import React, { PureComponent } from 'react'
import { Connect } from 'codux'
import { Animate } from 'react-move'
//
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
      snap,
      //
      stackData,
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
      !stackData ||
      !cursor ||
      !primaryAxis ||
      !secondaryAxis
    ) {
      return null
    }

    let x = cursor.x
    let y = cursor.y
    let animated = false

    const axis = primary ? primaryAxis : secondaryAxis
    const siblingAxis = primary ? secondaryAxis : primaryAxis
    const siblingRange = siblingAxis.scale.range()

    let
      x1,
      x2,
      y1,
      y2,
      label,
      alignPctX,
      alignPctY

    if (primary && (axis.type === 'ordinal' || snap)) {
      animated = true
      let closestDatum
      if (primaryAxis.vertical) {
        let smallestDistance = 10000000
        stackData.forEach(series => {
          series.data.forEach(datum => {
            const distance = Math.abs(y - datum.x)
            if (distance < smallestDistance) {
              smallestDistance = distance
              closestDatum = datum
            }
          })
        })
        y = closestDatum.x
        label = axis.format(closestDatum.primary)
      } else {
        let smallestDistance = 10000000
        stackData.forEach(series => {
          series.data.forEach(datum => {
            const distance = Math.abs(x - datum.x)
            if (distance < smallestDistance) {
              smallestDistance = distance
              closestDatum = datum
            }
          })
        })
        x = closestDatum.x
        label = axis.format(closestDatum.primary)
      }
    }

    if (axis.vertical) {
      x1 = siblingRange[0]
      x2 = siblingRange[1]
      y1 = y
      y2 = y + 1
      label = typeof label !== 'undefined' ? label : axis.format(axis.scale.invert(cursor.y))
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
      y1 = siblingRange[0]
      y2 = siblingRange[1]
      label = typeof label !== 'undefined' ? label : axis.format(axis.scale.invert(cursor.x))
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
          xStart,
          yStart,
          width,
          height,
          x1,
          y1,
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
              left: `${left + gridX}px`,
              top: `${top + gridY}px`,
              opacity: inter.visibility
            }}
          >
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(${animated ? inter.xStart : xStart}px, ${animated ? inter.yStart : yStart}px, 0px)`,
                width: `${animated ? inter.width : width}px`,
                height: `${animated ? inter.height : height}px`,
                background: 'rgba(0,0,0,.3)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(${animated ? inter.x1 : x1}px, ${animated ? inter.y1 : y1}px, 0px)`
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
    }), {
      type: 'hovered'
    })
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
      }), {
        type: 'active'
      })
    }
    dispatch(state => ({
      ...state,
      active: newActive
    }), {
      type: 'active'
    })
  }
}

export default Connect(() => {
  const selectors = {
    primaryAxis: Selectors.primaryAxis(),
    secondaryAxis: Selectors.secondaryAxis(),
    offset: Selectors.offset(),
    gridX: Selectors.gridX(),
    gridY: Selectors.gridY()
  }
  return state => ({
    stackData: state.stackData,
    primaryAxis: selectors.primaryAxis(state),
    secondaryAxis: selectors.secondaryAxis(state),
    cursor: state.cursor,
    offset: selectors.offset(state),
    gridX: selectors.gridX(state),
    gridY: selectors.gridY(state)
  })
}, {
  statics: {
    isHTML: true
  }
})(Cursor)

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
