import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
//
import Utils from '../utils/Utils'
import Selectors from '../utils/Selectors'
import Connect from '../utils/Connect'
//

const fontSize = 12

class Tooltip extends PureComponent {
  static defaultProps = {
    position: 'average',
    children: (props) => {
      const {
        series,
        datums
      } = props
      return series ? (
        <div>
          <strong>{series.label}</strong><br />
        </div>
      ) : datums && datums.length ? (
        <div>
          <strong>{datums[0].primary}</strong><br />
          {datums.map((d, i) => (
            <div key={i}>{d.seriesLabel}: {d.secondary}<br /></div>
          ))}
        </div>
      ) : null
    }
  }
  render () {
    const {
      hovered,
      primaryAxis,
      secondaryAxis,
      offset: {
        left,
        top
      },
      gridX,
      gridY,
      cursor,
      //
      position, // nearest, average
      children
    } = this.props

    if (!primaryAxis || !secondaryAxis || !hovered) {
      return null
    }

    const datums = hovered.datums && hovered.datums.length ? hovered.datums : hovered.series ? hovered.series.data : null

    const resolvedCursor = {
      x: cursor.x - gridX,
      y: cursor.y - gridY
    }

    const focus = datums ? (
      typeof position === 'function' ? position(datums, resolvedCursor)
        : position === 'top' ? Utils.getCenterPointOfSide('top', datums)
        : position === 'right' ? Utils.getCenterPointOfSide('right', datums)
        : position === 'top' ? Utils.getCenterPointOfSide('top', datums)
        : position === 'bottom' ? Utils.getCenterPointOfSide('bottom', datums)
        : position === 'center' ? Utils.getCenterPointOfSide('center', datums)
        : position === 'cursor' ? resolvedCursor
        : Utils.getClosestPoint(resolvedCursor, datums)
    ) : {
      x: gridX,
      y: gridY
    }

    const x = gridX + focus.x
    const y = gridY + focus.y

    const alignX = '-50%'
    const alignY = '-100%'

    const visibility = hovered.active ? 1 : 0

    return (
      <Animate
        data={{
          x,
          y,
          alignX,
          alignY,
          visibility
        }}
      >
        {({
          x,
          y,
          alignX,
          alignY,
          visibility
        }) => (
          <div
            className='tooltip-wrap'
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`,
              opacity: visibility
            }}
          >
            <div
              style={{
                transform: `translate3d(${x}px, ${y}px, 0px)`
              }}
            >
              <div
                style={{
                  transform: `translate(${alignX}, ${alignY})`,
                  padding: '7px'
                }}
              >
                <div
                  style={{
                    fontSize: fontSize + 'px',
                    padding: '5px',
                    background: 'rgba(38, 38, 38, 0.8)',
                    color: 'white',
                    borderRadius: '3px',
                    position: 'relative'
                  }}
                >
                  {children(hovered)}
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translate(-50%, 0%)',
                      width: '0',
                      height: '0',
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: '5px solid rgba(38, 38, 38, 0.8)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Animate>
    )
  }
}

export default Connect(state => ({
  primaryAxis: Selectors.primaryAxis(state),
  secondaryAxis: Selectors.secondaryAxis(state),
  gridX: Selectors.gridX(state),
  gridY: Selectors.gridY(state),
  hovered: state.hovered,
  cursor: state.cursor,
  offset: Selectors.offset(state)
}))(Tooltip, {
  isHTML: true
})
