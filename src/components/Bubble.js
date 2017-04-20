import React, { PureComponent } from 'react'
import { Connect } from 'codux'
import { Animate } from 'react-move'

import Utils from '../utils/Utils'
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
      selected,
      hovered,
      interaction
    } = this.props

    const status = Utils.seriesStatus(series, hovered, selected)
    const style = Utils.getStatusStyle(status, series.statusStyles)

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
              {inter.data.map((datum, i) => {
                const status = Utils.datumStatus(series, datum, hovered, selected)
                const dataStyle = Utils.getStatusStyle(status, datum.statusStyles)

                const datumInteractionProps = interaction === 'element' ? {
                  onClick: selectDatum.bind(this, datum),
                  onMouseEnter: hoverDatum.bind(this, datum),
                  onMouseMove: hoverDatum.bind(this, datum),
                  onMouseLeave: hoverDatum.bind(this, null)
                } : {}

                return (
                  <Circle
                    key={i}
                    x={datum.x}
                    y={datum.y}
                    r={datum.r}
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
