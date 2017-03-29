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
      hovered
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
              />
              {inter.data.map((d, i) => {
                const active = hovered && hovered.seriesID === series.id && hovered.index === i
                const inactive = hovered && (hovered.seriesID !== series.id || hovered.index !== i)

                let {
                  style: dataStyle,
                  className: dataClassName,
                  ...dataProps
                } = getDataProps({
                  ...series,
                  active,
                  inactive
                })

                dataStyle = Utils.extractColor(dataStyle)

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
    hovered: state.hovered
  }
})(Area)
