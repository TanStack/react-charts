import React from 'react'
//
import Selectors from '../utils/Selectors'
import Connect from '../utils/Connect'

import AnimatedGroup from './AnimatedGroup'
import Series from './Series'

export default Connect((state, props) => {
  const {
    type
  } = props

  return {
    data: state.data,
    width: Selectors.gridWidth(state),
    height: Selectors.gridHeight(state),
    scales: state.scales,
    getX: state.getX,
    getY: state.getY,
    scale: state.scales && state.scales[type],
    hovered: state.hovered
  }
})(React.createClass({
  render () {
    const {
      data,
      scales: {
        x: scaleX,
        y: scaleY
      } = {},
      getX,
      getY,
      height,
      width,
      hovered
    } = this.props

    if (!scaleX || !scaleY) {
      return null
    }

    return (
      <AnimatedGroup
        data={data}
        getKey={(d, i) => i}
        style={(d, i, spring) => {
          return {
            opacity: spring(1)
          }
        }}
        willEnter={(inter) => {
          return {
            opacity: 0
          }
        }}
        willLeave={(inter, spring) => {
          return {
            opacity: spring(0)
          }
        }}
      >
        {(inters) => {
          return (
            <g>
              {inters.map((inter, i) => {
                const isActive = hovered && hovered.seriesIndex === i
                return (
                  <Series
                    key={inter.key}
                    data={inter.data}
                    scaleX={scaleX}
                    scaleY={scaleY}
                    getX={getX}
                    getY={getY}
                    width={width}
                    height={height}
                    opacity={inter.style.opacity}
                    isActive={isActive}
                  />
                )
              })}
            </g>
          )
        }}
      </AnimatedGroup>
    )
  }
}))
