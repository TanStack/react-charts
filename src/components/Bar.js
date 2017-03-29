import React from 'react'
import { Animate } from 'react-move'
import classnames from 'classnames'
//
import Utils from '../utils/Utils'
import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'
import Rectangle from '../primitives/Rectangle'

export default Connect((state, props) => {
  return {
    primaryAxis: Selectors.primaryAxis(state),
    hovered: state.hovered
  }
})(React.createClass({
  displayName: 'Bars',
  render () {
    const {
      series,
      active,
      inactive,
      visibility,
      getProps,
      getDataProps,
      //
      primaryAxis,
      hovered
    } = this.props

    const barWidth = primaryAxis.barWidth

    // const seriesPadding = primaryAxis.centerTicks ? primaryAxis.barPaddingOuterSize : 0
    const seriesPadding = 0

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
          return (
            <g
              className='series bars'
            >
              {inter.data.map((d, i) => {
                let x1, y1, x2, y2
                if (primaryAxis.vertical) {
                  x1 = d.yBase
                  x2 = d.y
                  y1 = d.x + seriesPadding
                  y2 = y1 + barWidth
                } else {
                  x1 = d.x + seriesPadding
                  x2 = x1 + barWidth
                  y1 = d.y
                  y2 = d.yBase
                }

                const dataActive = hovered && active && hovered.index === i
                const dataInactive = hovered && (inactive || hovered.index !== i)

                let {
                  style: dataStyle,
                  className: dataClassName,
                  ...dataProps
                } = getDataProps({
                  ...series,
                  active: dataActive,
                  inactive: dataInactive
                })

                dataStyle = Utils.extractColor(dataStyle)

                return (
                  <Rectangle
                    {...props}
                    {...dataProps}
                    className={classnames(className, dataClassName)}
                    style={{
                      ...style,
                      ...dataStyle
                    }}
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
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
}))
