import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
import classnames from 'classnames'
import {
  area,
  line,
  curveCardinal,
  curveMonotoneX
} from 'd3-shape'
//
import Connect from '../utils/Connect'
import Utils from '../utils/Utils'
import { hoverSeries, hoverDatum } from '../utils/hoverMethods'

import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

const pathDefaultStyle = {
  strokeWidth: 2
}

const circleDefaultStyle = {
  r: 2
}

class Area extends PureComponent {
  render () {
    const {
      series,
      active,
      inactive,
      visibility,
      getProps,
      getDataProps,
      //
      hovered,
      interaction
    } = this.props

    const areaFn = area()
    .curve(curveMonotoneX)
    .y0(d => d[2])

    const lineFn = line()
    .curve(curveMonotoneX)

    let { style, className, ...props } = getProps({
      ...series,
      active,
      inactive
    })

    style = Utils.extractColor(style)

    return (
      <Animate
        data={{
          data: series.data
        }}
      >
        {inter => {
          const areaPath = areaFn(inter.data.map(d => ([d.x, d.y, d.base])))
          const linePath = lineFn(inter.data.map(d => ([d.x, d.y])))

          const seriesInteractionProps = interaction === 'series' ? {
            onMouseEnter: hoverSeries.bind(this, series),
            onMouseMove: hoverSeries.bind(this, series),
            onMouseLeave: hoverSeries.bind(this, null)
          } : {}

          return (
            <g>
              <Path
                {...props}
                d={areaPath}
                className={classnames(className)}
                style={{
                  ...pathDefaultStyle,
                  ...style,
                  stroke: 'transparent'
                }}
                opacity={visibility}
                {...seriesInteractionProps}
              />
              <Path
                d={linePath}
                {...props}
                className={classnames(className)}
                style={{
                  ...pathDefaultStyle,
                  ...style,
                  fill: 'transparent'
                }}
                opacity={visibility}
                {...seriesInteractionProps}
              />
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
                    {...dataProps}
                    className={classnames(dataClassName)}
                    style={{
                      ...circleDefaultStyle,
                      ...style,
                      ...dataStyle
                    }}
                    opacity={visibility}
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
    hovered: state.hovered,
    interaction: state.interaction
  }
})(Area)
