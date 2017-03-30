import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
//
import Selectors from '../utils/Selectors'
import Connect from '../utils/Connect'
//

class Tooltip extends PureComponent {
  static defaultProps = {
    children: ({
      seriesLabel,
      primary,
      secondary
    }) => (
      <span>{seriesLabel} - {primary}, {secondary}</span>
    )
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
      //
      children
    } = this.props

    if (!primaryAxis || !secondaryAxis || !hovered) {
      return null
    }

    const x = gridX + hovered.x
    const y = gridY + hovered.y

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
  offset: Selectors.offset(state)
}))(Tooltip, {
  isHTML: true
})
