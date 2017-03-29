import React from 'react'
//
import Selectors from '../utils/Selectors'
import Connect from '../utils/Connect'
import Utils from '../utils/Utils'

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
    primaryAxis: Selectors.primaryAxis(state),
    secondaryAxis: Selectors.secondaryAxis(state)
  }
})(React.createClass({
  displayName: 'Data',
  getDefaultProps () {
    return {
      type: 'line',
      getStyle: d => ({}),
      getActiveStyle: d => ({}),
      getInactiveStyle: d => ({})
    }
  },
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
      return s.data.map(d => (0))
    })
    let stackData = accessedData.map((series, seriesIndex) => {
      return {
        ...series,
        data: series.data.map((d, index) => {
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
      }
    })

    // Now, scale the datapoints to their axis coordinates
    stackData = stackData.map((series) => {
      return {
        ...series,
        data: series.data.map((d, index) => {
          return {
            ...d,
            x: primaryAxis.scale(d.x),
            y: secondaryAxis.scale(d.y),
            yBase: secondaryAxis.scale(d.yBase)
          }
        })
      }
    })

    this.props.dispatch(state => ({
      stackData
    }))
  },
  render () {
    const {
      type,
      getProps,
      getDataProps,
      //
      stackData
    } = this.props

    if (!stackData) {
      return null
    }

    // Allow dynamic types
    const typeGetter = Utils.normalizeGetter(type)

    return (
      <Transition
        data={[...stackData].reverse()} // The stack is reversed for proper z-index painting
        getKey={(d, i) => d.id}
        update={d => ({
          timer: 1,
          visibility: 1
        })}
        enter={(d, i) => ({
          timer: 0,
          visibility: 0
        })}
        leave={d => ({
          timer: 0,
          visibility: 0
        })}
      >
        {(inters) => {
          return (
            <g
              className='Stack'
            >
              {inters.map((inter) => {
                const resolvedType = typeGetter(inter.data, inter.data.id)
                const StackCmp = stackTypes[resolvedType]
                return (
                  <StackCmp
                    key={inter.key}
                    series={inter.data}
                    getProps={getProps}
                    getDataProps={getDataProps}
                    visibility={inter.state.visibility}
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
