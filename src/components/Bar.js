import React, { PureComponent } from 'react'
import { Connect } from 'codux'
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
      getDataStyles,
      style,
      //
      primaryAxis,
      hovered: chartHovered,
      selected: chartSelected,
      interaction
    } = this.props

    const barWidth = primaryAxis.barWidth

    const seriesPadding = primaryAxis.centerTicks ? primaryAxis.barPaddingOuterSize : 0
    // const seriesPadding = 0

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
                  y1 = d.y + seriesPadding
                  y2 = y1 + barWidth
                } else {
                  x1 = d.x + seriesPadding
                  x2 = x1 + barWidth
                  y1 = d.y
                  y2 = d.base
                }

                const {
                  selected,
                  hovered,
                  otherSelected,
                  otherHovered
                } = Utils.datumStatus(series, d, chartHovered, chartSelected)

                let dataStyle = Utils.extractColor(getDataStyles({
                  ...d,
                  series,
                  selected,
                  hovered,
                  otherSelected,
                  otherHovered,
                  type: 'rectangle'
                }))

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
                      ...dataStyle
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

export default Connect((state, props) => {
  return {
    primaryAxis: Selectors.primaryAxis(state),
    hovered: state.hovered,
    selected: state.selected,
    interaction: state.interaction
  }
})(Bars)
