import React, { PureComponent } from 'react'
import { Connect } from 'react-state'
import { Animate } from 'react-move'
//
import Utils from '../utils/Utils'
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
      selected,
      hovered,
      interaction
    } = this.props

    const status = Utils.seriesStatus(series, hovered, selected)
    const style = Utils.getStatusStyle(status, series.statusStyles)

    const barSize = primaryAxis.barSize
    const tickOffset = primaryAxis.tickOffset
    const barOffset = primaryAxis.barOffset

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
              {inter.data.map((datum, i) => {
                let x1, y1, x2, y2
                if (primaryAxis.vertical) {
                  x1 = datum.base
                  x2 = datum.x
                  y1 = datum.y + barOffset
                  y2 = y1 + barSize
                } else {
                  x1 = datum.x + barOffset
                  x2 = x1 + barSize
                  y1 = datum.y
                  y2 = datum.base
                }

                const status = Utils.datumStatus(series, datum, hovered, selected)
                const dataStyle = Utils.getStatusStyle(status, datum.statusStyles)

                const datumInteractionProps = interaction === 'element' ? {
                  onClick: selectDatum.bind(this, datum),
                  onMouseEnter: hoverDatum.bind(this, datum),
                  onMouseMove: hoverDatum.bind(this, datum),
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
  filter: (oldState, newState, meta) => meta.type !== 'cursor',
  statics: {
    SeriesType: 'Bar'
  }
})(Bars)
