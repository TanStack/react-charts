import React from 'react'
//
import AnimatedGroup from './AnimatedGroup'
import Series from './Series'

export default React.createClass({
  render () {
    const {
      data,
      scaleX,
      scaleY,
      getX,
      getY,
      height,
      width,
      hovered,
      active
    } = this.props

    return (
      <AnimatedGroup
        data={data}
        getKey={(d, i) => i}
        style={(d, i, spring) => {
          let opacity = spring(1)
          if (hovered) {
            if (isPointInSeries(hovered, d)) {
              opacity = spring(1)
            } else {
              opacity = spring(0.1)
            }
          }
          return {
            opacity
          }
        }}
        willEnter={(inter, spring) => {
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
              {inters.map((inter) => {
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
                    hovered={hovered}
                    active={active}
                    isRed={inter.data[0].y > 150}
                  />
                )
              })}
            </g>
          )
        }}
      </AnimatedGroup>
    )
  }
})

function isPointInSeries (point, series) {
  return !!series.find(d => d === point)
}
