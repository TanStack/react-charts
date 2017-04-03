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
        datums,
        primaryAxis,
        secondaryAxis
      } = props
      return series ? (
        <div>
          <strong>{series.label}</strong><br />
        </div>
      ) : datums && datums.length ? (
        <div>
          <strong>{primaryAxis.scale.tickFormat()(datums[0].primary)}</strong><br />
          <br />
          {datums.map((d, i) => (
            <div key={i}>{d.seriesLabel}: {secondaryAxis.scale.tickFormat()(d.secondary)}<br /></div>
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
      position,
      align,
      children
    } = this.props

    if (!primaryAxis || !secondaryAxis || !hovered) {
      return null
    }

    const datums = hovered.datums && hovered.datums.length ? hovered.datums : hovered.series ? hovered.series.data : null

    const focus = datums ? (
      typeof position === 'function' ? position(datums, cursor)
        : position === 'left' ? Utils.getCenterPointOfSide('left', datums)
        : position === 'right' ? Utils.getCenterPointOfSide('right', datums)
        : position === 'top' ? Utils.getCenterPointOfSide('top', datums)
        : position === 'bottom' ? Utils.getCenterPointOfSide('bottom', datums)
        : position === 'center' ? Utils.getCenterPointOfSide('center', datums)
        : position === 'cursor' ? cursor
        : Utils.getClosestPoint(cursor, datums)
    ) : {
      x: gridX,
      y: gridY
    }

    const x = gridX + focus.x
    const y = gridY + focus.y

    let alignX
    let alignY

    if (align === 'top') {
      alignX = '-50%'
      alignY = '-100%'
    } else if (align === 'bottom') {
      alignX = '-50%'
      alignY = '0%'
    } else if (align === 'left') {
      alignX = '-100%'
      alignY = '-50%'
    } else if (align === 'right') {
      alignX = '0%'
      alignY = '-50%'
    } else {
      // TODO: Automatic Mode
      alignX = '-50%'
      alignY = '-100%'
    }

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
                  {children({
                    ...hovered,
                    primaryAxis,
                    secondaryAxis
                  })}
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
