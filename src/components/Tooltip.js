import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
//
import Selectors from '../utils/Selectors'
import Connect from '../utils/Connect'
//

class Tooltip extends PureComponent {
  render () {
    const {
      hovered,
      primaryAxis,
      secondaryAxis,
      getX,
      getY,
      offset: {
        left,
        top
      },
      gridX,
      gridY
    } = this.props

    if (!primaryAxis || !secondaryAxis || !hovered) {
      return null
    }

    const x = gridX + primaryAxis(getX(hovered))
    const y = gridY + secondaryAxis(getY(hovered))

    const alignX = '-50%'
    const alignY = '-100%'

    return (
      <Animate
        data={{
          x,
          y,
          alignX,
          alignY
        }}
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
      </Animate>
    )
  }
}

export default Connect(state => ({
  data: state.data,
  scales: state.scales,
  primaryAxis: Selectors.primaryAxis(state),
  secondaryAxis: Selectors.secondaryAxis(state),
  getX: state.getX,
  getY: state.getY,
  gridX: Selectors.gridX(state),
  gridY: Selectors.gridY(state),
  hovered: state.hovered,
  offset: Selectors.offset(state)
}))(Tooltip)
