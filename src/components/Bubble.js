import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
import classnames from 'classnames'

import Connect from '../utils/Connect'
import Utils from '../utils/Utils'
import { hoverDatum } from '../utils/hoverMethods'

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
      getDataProps,
      //
      hovered,
      interaction
    } = this.props

    return (
      <Animate
        data={{
          data: series.data
        }}
      >
        {inter => {
          return (
            <g>
              {inter.data.map((d, i) => {
                const {
                  active: datumActive,
                  inactive: datumInactive
                } = Utils.datumStatus(series, d, hovered)

                let {
                  style: dataStyle,
                  className: dataClassName,
                  ...dataProps
                } = getDataProps({
                  ...series,
                  active: datumActive,
                  inactive: datumInactive
                })

                dataStyle = Utils.extractColor(dataStyle)
                
                const datumInteractionProps = interaction === 'element' ? {
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
                    {...dataProps}
                    className={classnames(dataClassName)}
                    style={{
                      ...circleDefaultStyle,
                      ...dataStyle
                    }}
                    opacity={visibility}
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
    hovered: state.hovered
  }
})(Line)
