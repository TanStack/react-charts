import React from 'react'
//
import Connect from '../utils/Connect'

import Transition from '../utils/Transition'
import Curve from './Curve'

export default Connect((state, props) => {
  return {
    data: state.data,
    hovered: state.hovered
  }
})(React.createClass({
  render () {
    const {
      data,
      hovered,
      ...rest
    } = this.props

    return (
      <Transition
        data={data}
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
            <g>
              {inters.map((inter, i) => {
                const isActive = hovered && hovered.seriesIndex === i
                const isInactive = hovered && hovered.seriesIndex !== i
                return (
                  <Curve
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
