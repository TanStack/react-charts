import React, { PureComponent } from 'react'
//
import Selectors from '../utils/Selectors'
import Connect from '../utils/Connect'

import Animated from './Animated'
//

class Tooltip extends PureComponent {
  render () {
    const {
      hovered,
      scales: {
        x: scaleX,
        y: scaleY
      } = {},
      getX,
      getY,
      offset: {
        left,
        top
      },
      gridX,
      gridY
    } = this.props

    if (!scaleX || !scaleY || !hovered) {
      return null
    }

    const x = gridX + scaleX(getX(hovered))
    const y = gridY + scaleY(getY(hovered))

    const alignX = '-50%'
    const alignY = '-100%'

    return (
      <Animated
        style={spring => ({
          x: spring(x, { stiffneess: 250 }),
          y: spring(y, { stiffneess: 250 }),
          alignX: spring(alignX, { stiffneess: 250 }),
          alignY: spring(alignY, { stiffneess: 250 })
        })}
      >
        {({
          x,
          y,
          alignX,
          alignY
        }) => (
          <div
            className='tooltip-wrap'
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`
            }}
          >
            <div
              style={{
                transform: `translate(${x}px, ${y}px)`
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
                    padding: '5px',
                    background: '#262626',
                    color: 'white',
                    opacity: 0.8,
                    borderRadius: '3px',
                    position: 'relative'
                  }}
                >
                  {hovered.x}, {hovered.y}
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translate(-50%, 0)',
                      width: '0',
                      height: '0',
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: '5px solid #262626'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Animated>
    )
  }
}

export default Connect(state => ({
  data: state.data,
  scales: state.scales,
  getX: state.getX,
  getY: state.getY,
  gridX: Selectors.gridX(state),
  gridY: Selectors.gridY(state),
  hovered: state.hovered,
  offset: Selectors.offset(state)
}))(Tooltip)
