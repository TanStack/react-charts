import React from 'react'
//
import Selectors from '../utils/Selectors'
import Connect from '../utils/Connect'

import { Transition } from 'react-move'
import Curve from './Curve'
import Bars from './Bars'

const stackTypes = {
  line: Curve,
  bar: Bars
}

export default Connect((state, props) => {
  return {
    data: state.data,
    stackData: state.stackData,
    hovered: state.hovered,
    primaryAxis: Selectors.primaryAxis(state),
    secondaryAxis: Selectors.secondaryAxis(state),
    getSeries: state.getSeries,
    getX: state.getX,
    getY: state.getY,
    getR: state.getR
  }
})(React.createClass({
  componentDidMount () {
    this.updateStackData(this.props)
  },
  componentWillUpdate (newProps) {
    const oldProps = this.props

    // If any of the following change,
    // we need to update the stack
    if (
      newProps.axes !== oldProps.axes ||
      newProps.type !== oldProps.type ||
      newProps.seriesKey !== oldProps.seriesKey ||
      newProps.data !== oldProps.data ||
      newProps.primaryAxis !== oldProps.primaryAxis ||
      newProps.secondaryAxis !== oldProps.secondaryAxis ||
      newProps.hovered !== oldProps.hovered ||
      newProps.getSeries !== oldProps.getSeries ||
      newProps.getX !== oldProps.getX ||
      newProps.getY !== oldProps.getY ||
      newProps.getR !== oldProps.getR
    ) {
      this.updateStackData(newProps)
    }
  },
  updateStackData (props) {
    const {
      //
      data,
      primaryAxis,
      secondaryAxis,
      getSeries,
      getX,
      getY,
      getR
    } = props

    // Don't render until dependencies are met
    if (!primaryAxis || !secondaryAxis) {
      return null
    }

    const secondaryStacked = secondaryAxis.stacked

    const totals = secondaryStacked && data.map(s => {
      return getSeries(s).map(d => (0))
    })

    const accessedStackData = data.map((s, seriesIndex) => {
      return getSeries(s).map((d, index) => {
        let datum = {
          seriesIndex,
          index,
          x: getX(d),
          r: getR(d)
        }
        if (secondaryStacked) {
          const start = (totals[seriesIndex - 1] || totals[0])[index]
          datum.yBase = start
          datum.y = start + getY(d)
          totals[seriesIndex][index] = datum.y
        } else {
          datum.yBase = 0
          datum.y = getY(d)
        }
        return datum
      })
    })

    // scale the datapoints to their axis coordinates
    const stackData = accessedStackData.map((s, seriesIndex) => {
      return s.map((d, index) => {
        return {
          ...d,
          x: primaryAxis.scale(d.x),
          yBase: secondaryAxis.scale(d.yBase),
          y: secondaryAxis.scale(d.y)
        }
      })
    })

    this.props.dispatch(state => ({
      stackData
    }))
  },
  render () {
    const {
      type,
      //
      stackData,
      hovered
    } = this.props

    const StackCmp = stackTypes[type]

    return (
      <Transition
        data={stackData}
        getKey={(d, i) => i}
        update={d => ({
          timer: 1,
          visible: 1
        })}
        enter={d => ({
          timer: 0,
          visible: 0
        })}
        leave={d => ({
          timer: 0,
          visible: 0
        })}
        ignore={['visible']}
      >
        {(inters) => {
          return (
            <g
              className='Stack'
            >
              {inters.map((inter, i) => {
                const rgb = Math.floor(255 * ((i + 1) / inters.length))
                const rgb2 = Math.floor(100 * ((i + 1) / inters.length))
                // TODO: should we do this here? or should we send the
                // indices down the chain and let the lower level items
                // decide if they are truly active or not?
                const isActive = hovered && hovered.seriesIndex === i
                const isInactive = hovered && hovered.seriesIndex !== i
                return (
                  <StackCmp
                    key={inter.key}
                    data={inter.data}
                    isActive={isActive}
                    isInactive={isInactive}
                    visible={inter.state.visible}
                    style={{
                      opacity: 0.5,
                      fill: `rgb(${rgb}, ${rgb2}, 0)`
                    }}
                  />
                )
              })}
            </g>
          )
        }}
      </Transition>
    )
  }
}))
