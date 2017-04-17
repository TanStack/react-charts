import React, { PureComponent } from 'react'
import { Connect } from 'codux'
import { Animate } from 'react-move'
//
import Selectors from '../utils/Selectors'
import { selectSeries, hoverSeries, selectDatum, hoverDatum } from '../utils/interactionMethods'

import Rectangle from '../primitives/Rectangle'

class Bars extends PureComponent {
  render () {
    const {
      series,
      visibility,
      //
      primaryAxis,
      interaction
    } = this.props

    const style = series.style

    const barWidth = primaryAxis.barWidth
    const tickPosition = primaryAxis.tickPosition
    const barOffset = -(barWidth / 2)

    return (
      <Animate
        default={{
          data: series.data,
          visibility: 0
        }}
        data={{
          data: series.data,
          visibility
        }}
      >
        {inter => {
          const seriesInteractionProps = interaction === 'series' ? {
            onClick: selectSeries.bind(this, series),
            onMouseEnter: hoverSeries.bind(this, series),
            onMouseMove: hoverSeries.bind(this, series),
            onMouseLeave: hoverSeries.bind(this, null)
          } : {}
          return (
            <g
              className='series bar'
            >
              {inter.data.map((d, i) => {
                let x1, y1, x2, y2
                if (primaryAxis.vertical) {
                  x1 = d.base
                  x2 = d.x
                  y1 = d.y + tickPosition + barOffset
                  y2 = y1 + barWidth
                } else {
                  x1 = d.x + tickPosition + barOffset
                  x2 = x1 + barWidth
                  y1 = d.y
                  y2 = d.base
                }

                let dataStyle = d.style

                const datumInteractionProps = interaction === 'element' ? {
                  onClick: selectDatum.bind(this, d),
                  onMouseEnter: hoverDatum.bind(this, d),
                  onMouseMove: hoverDatum.bind(this, d),
                  onMouseLeave: hoverDatum.bind(this, null)
                } : {}

                return (
                  <Rectangle
                    style={{
                      ...style,
                      ...style.rectangle,
                      ...dataStyle,
                      ...dataStyle.rectangle
                    }}
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    opacity={inter.visibility}
                    {...seriesInteractionProps}
                    {...datumInteractionProps}
                  />
                )
              })}
            </g>
          )
        }}
      </Animate>
    )
  }
}

export default Connect(() => {
  const selectors = {
    primaryAxis: Selectors.primaryAxis()
  }
  return (state, props) => {
    return {
      primaryAxis: selectors.primaryAxis(state),
      hovered: state.hovered,
      selected: state.selected,
      interaction: state.interaction
    }
  }
}, {
  filter: (oldState, newState, meta) => meta.type !== 'cursor'
})(Bars)
