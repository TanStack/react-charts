import React from 'react'
//
import Selectors from '../utils/Selectors'
import Connect from '../utils/Connect'

import { Transition } from 'react-move'
import Curve from './Curve'
import Bars from './Bars'

export const stackKey = '__stack'

const stackTypes = {
  line: Curve,
  bar: Bars
}

export default Connect((state, props) => {
  return {
    data: state.data,
    hovered: state.hovered,
    primaryAxis: Selectors.primaryAxis(state),
    secondaryAxis: Selectors.secondaryAxis(state),
    getSeries: state.getSeries,
    getX: state.getX,
    getY: state.getY,
    getR: state.getR
  }
})(React.createClass({
  render () {
    const {
      type,
      seriesKey,
      //
      data,
      primaryAxis,
      secondaryAxis,
      hovered,
      getSeries,
      getX,
      getY,
      getR,
      ...rest
    } = this.props

    // Don't render until dependencies are met
    if (!primaryAxis || !secondaryAxis) {
      return null
    }

    const secondaryStacked = secondaryAxis.isStacked

    const StackCmp = stackTypes[type]

    const totals = secondaryStacked && data.map(s => {
      return getSeries(s).map(d => (0))
    })

    const stackData = data.map((s, i) => {
      return getSeries(s).map((d, key) => {
        let datum = {
          x: getX(d),
          r: getR(d)
        }
        if (secondaryStacked) {
          const start = (totals[i - 1] || totals[0])[key]
          datum.y = start
          datum.y2 = start + getY(d)
          totals[i][key] = datum.y2
        } else {
          datum.y = getY(d)
        }
        return datum
      })
    })

    // const longestSeries = data.reduce((longest, d) => d.length > longest ? d : longest)
    // const stackData = longestSeries.map((d, key) => {
    //   let stackRow = {}
    //   data.forEach((series, i) => {
    //     stackRow[i] = data[i][key]
    //   })
    //   return stackRow
    // })
    //
    // const stack = Stack()
    //   .keys(data.map((d, i) => i))
    //   .value((d, key) => getY(d[key]))
    //
    // const stacks = stack(stackData)

    // const stack = Stack()
    //   .keys((d, i) => {
    //     console.log(d, i)
    //   })
    //   .value((d, key) => getY(d))

    // const stacks = stack(data)

    // console.log(data, stacks)

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
                const isActive = hovered && hovered.seriesIndex === i
                const isInactive = hovered && hovered.seriesIndex !== i
                return (
                  <StackCmp
                    key={inter.key}
                    data={inter.data}
                    isActive={isActive}
                    isInactive={isInactive}
                    visible={inter.state.visible}
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
