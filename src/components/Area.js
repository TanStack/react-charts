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

import Path from '../primitives/Path'
import Circle from '../primitives/Circle'

import { defaultProps } from './Data'

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
          const areaPath = areaFn(inter.data.map(d => ([d.x, d.y, d.yBase])))
          const linePath = lineFn(inter.data.map(d => ([d.x, d.y])))

          const seriesInteractionProps = interaction === 'series' ? {
            onMouseEnter: this.hoverSeries.bind(this, series),
            onMouseMove: this.hoverSeries.bind(this, series),
            onMouseLeave: this.hoverSeries.bind(this, null)
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
                  inactive: datumInactive,
                  defaults: defaultProps
                })

                dataStyle = Utils.extractColor(dataStyle)

                const datumInteractionProps = interaction === 'element' ? {
                  onMouseEnter: this.hoverDatum.bind(this, d),
                  onMouseMove: this.hoverDatum.bind(this, d),
                  onMouseLeave: this.hoverDatum.bind(this, null)
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
  hoverSeries (series) {
    this.props.dispatch(state => ({
      ...state,
      hovered: series ? {
        active: true,
        series,
        datums: null,
        single: false
      } : {
        ...state.hovered,
        active: false
      }
    }))
  }
  hoverDatum (datum) {
    this.props.dispatch(state => ({
      ...state,
      hovered: datum ? {
        active: true,
        series: null,
        datums: [datum],
        single: true
      } : {
        ...state.hovered,
        active: false
      }
    }))
  }
}

export default Connect((state, props) => {
  return {
    hovered: state.hovered,
    interaction: state.interaction
  }
})(Area)
