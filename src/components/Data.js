import React from 'react'
//
import Selectors from '../utils/Selectors'
import Connect from '../utils/Connect'

import { Transition } from 'react-move'
import Line from './Line'
import Area from './Area'
import Bars from './Bars'

const stackTypes = {
  line: Line,
  area: Area,
  bar: Bars
}

export default Connect((state, props) => {
  return {
    accessedData: state.accessedData,
    stackData: state.stackData,
    hovered: state.hovered,
    primaryAxis: Selectors.primaryAxis(state),
    secondaryAxis: Selectors.secondaryAxis(state)
  }
})(React.createClass({
  displayName: 'Data',
  componentDidMount () {
    this.updateStackData(this.props)
  },
  componentWillUpdate (newProps) {
    const oldProps = this.props

    // If any of the following change,
    // we need to update the stack
    if (
      newProps.accessedData !== oldProps.accessedData ||
      newProps.axes !== oldProps.axes ||
      newProps.type !== oldProps.type ||
      newProps.seriesKey !== oldProps.seriesKey ||
      newProps.primaryAxis !== oldProps.primaryAxis ||
      newProps.secondaryAxis !== oldProps.secondaryAxis ||
      newProps.hovered !== oldProps.hovered
    ) {
      this.updateStackData(newProps)
    }
  },
  updateStackData (props) {
    const {
      //
      accessedData,
      primaryAxis,
      secondaryAxis
    } = props

    // If the axes are not ready, just provide the accessedData
    if (!accessedData || !primaryAxis || !secondaryAxis) {
      return
    }

    // If the axes are ready, let's decorate the accessedData for visual plotting
    const secondaryStacked = secondaryAxis.stacked
    // "totals" are used if secondaryAxis stacking is enabled
    const totals = secondaryStacked && accessedData.map(s => {
      return s.map(d => (0))
    })
    let stackData = accessedData.map((series, seriesIndex) => {
      return series.map((d, index) => {
        const datum = {
          ...d,
          x: d.primary,
          y: d.secondary,
          yBase: 0
        }
        if (secondaryStacked) {
          const start = (typeof totals[seriesIndex - 1] !== 'undefined' ? totals[seriesIndex - 1] : totals[0])[index]
          datum.yBase = start
          datum.y = start + datum.y
          totals[seriesIndex][index] = datum.y
        }
        return datum
      })
    })

    // Now, scale the datapoints to their axis coordinates
    stackData = stackData.map((series, seriesIndex) => {
      return series.map((d, index) => {
        return {
          ...d,
          x: primaryAxis.scale(d.x),
          y: secondaryAxis.scale(d.y),
          yBase: secondaryAxis.scale(d.yBase)
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

    if (!stackData) {
      return null
    }

    const StackCmp = stackTypes[type]

    return (
      <Transition
        data={stackData}
        getKey={(d, i) => d.seriesID}
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
                const rgb2 = Math.floor(50 * ((i + 1) / inters.length))
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
                      stroke: `rgb(${rgb}, ${rgb2}, 0)`
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
