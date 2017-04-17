import React, { PureComponent } from 'react'
import { Connect } from 'codux'
import { Animate } from 'react-move'

import { selectSeries, hoverSeries, selectDatum, hoverDatum } from '../utils/interactionMethods'

//
import Circle from '../primitives/Circle'

const circleDefaultStyle = {
  r: 2
}

class Line extends PureComponent {
  render () {
    const {
      series,
      visibility,
      //
      interaction
    } = this.props

    const style = series.style

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
            <g>
              {inter.data.map((d, i) => {
                let dataStyle = d.style

                const datumInteractionProps = interaction === 'element' ? {
                  onClick: selectDatum.bind(this, d),
                  onMouseEnter: hoverDatum.bind(this, d),
                  onMouseMove: hoverDatum.bind(this, d),
                  onMouseLeave: hoverDatum.bind(this, null)
                } : {}

                return (
                  <Circle
                    key={i}
                    x={d.x}
                    y={d.y}
                    r={d.r}
                    style={{
                      ...circleDefaultStyle,
                      ...style,
                      ...style.circle,
                      ...dataStyle,
                      ...dataStyle.circle
                    }}
                    opacity={inter.visibility}
                    {...seriesInteractionProps}
                    {...datumInteractionProps}
                  />
                )
              }
              )})}
            </g>
          )
        }}
      </Animate>
    )
  }
}

export default Connect((state, props) => {
  return {
    hovered: state.hovered,
    selected: state.selected,
    interaction: state.interaction
  }
}, {
  filter: (oldState, newState, meta) => meta.type !== 'cursor'
})(Line)
