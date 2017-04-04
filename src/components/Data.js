import React, { PureComponent } from 'react'
//
import Selectors from '../utils/Selectors'
import Connect from '../utils/Connect'
import Utils from '../utils/Utils'

import { Transition } from 'react-move'
import Line from './Line'
import Area from './Area'
import Bar from './Bar'
import Bubble from './Bubble'

const stackTypes = {
  line: Line,
  area: Area,
  bar: Bar,
  bubble: Bubble
}

const defaultColors = [
  '#4ab5eb',
  '#fc6868',
  '#DECF3F',
  '#60BD68',
  '#FAA43A',
  '#c63b89',
  '#1aaabe',
  '#734fe9',
  '#1828bd',
  '#cd82ad'
]

class Data extends PureComponent {
  static defaultProps = {
    type: 'line',
    getProps: (d, i) => ({
      style: {
        color: defaultColors[d.index % defaultColors.length]
      }
    }),
    getDataProps: ({
      active
    }) => ({
      r: active ? 4 : 2
    })
  }
  componentDidMount () {
    this.updateStackData(this.props)
  }
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
  }
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

    const xKey = primaryAxis.vertical ? 'secondary' : 'primary'
    const yKey = primaryAxis.vertical ? 'primary' : 'secondary'
    const xScale = primaryAxis.vertical ? secondaryAxis.scale : primaryAxis.scale
    const yScale = primaryAxis.vertical ? primaryAxis.scale : secondaryAxis.scale

    let stackData = accessedData.map((series, seriesIndex) => {
      return {
        ...series,
        data: series.data.map((d, index) => {
          const datum = {
            ...d,
            x: d[xKey],
            y: d[yKey],
            base: 0
          }
          if (secondaryStacked) {
            const start = (typeof totals[seriesIndex - 1] !== 'undefined' ? totals[seriesIndex - 1] : totals[0])[index]
            datum.base = start
            // Stack the x or y values (according to axis positioning)
            if (primaryAxis.vertical) {
              datum.x = start + datum.x
              totals[seriesIndex][index] = datum.x
            } else {
              datum.y = start + datum.y
              totals[seriesIndex][index] = datum.y
            }
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
            x: xScale(d.x),
            y: yScale(d.y),
            base: primaryAxis.vertical ? xScale(d.base) : yScale(d.base)
          }
        })
      }
    })

    this.props.dispatch(state => ({
      ...state,
      stackData
    }))
  }
  render () {
    const {
      type,
      getProps,
      getDataProps,
      hovered,
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
          visibility: 1
        })}
        enter={(d, i) => ({
          visibility: 0
        })}
        leave={d => ({
          visibility: 0
        })}
      >
        {(inters) => {
          return (
            <g
              className='Stack'
            >
              {inters.map((inter, i) => {
                const {
                  active,
                  inactive
                } = Utils.seriesStatus(inter.data, hovered)

                const resolvedType = typeGetter({
                  ...inter.data,
                  active,
                  inactive
                }, inter.data.id)
                const StackCmp = stackTypes[resolvedType]
                return (
                  <StackCmp
                    key={inter.key}
                    series={inter.data}
                    active={active}
                    inactive={inactive}
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
}

export default Connect((state, props) => {
  return {
    accessedData: state.accessedData,
    stackData: state.stackData,
    primaryAxis: Selectors.primaryAxis(state),
    secondaryAxis: Selectors.secondaryAxis(state),
    hovered: state.hovered
  }
})(Data)
