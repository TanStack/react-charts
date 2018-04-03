import React, { Component } from 'react'
import { NodeGroup as RMNodeGroup } from 'react-move'
import { easeCubicOut } from 'd3-ease'

const defaultTiming = {
  duration: 300,
  ease: easeCubicOut,
}

export const NodeGroup = ({ timing, ...rest }) => (
  <RMNodeGroup timing={{ ...defaultTiming, ...timing }} {...rest} />
)

export class Animate extends Component {
  static defaultProps = {
    show: true,
  }

  render () {
    const {
      show, start, enter, update, leave, children, render, timing,
    } = this.props

    return (
      <NodeGroup
        data={show ? [true] : []}
        keyAccessor={d => d}
        start={typeof start === 'function' ? start : () => start}
        enter={typeof enter === 'function' ? enter : () => enter}
        update={typeof update === 'function' ? update : () => update}
        leave={typeof leave === 'function' ? leave : () => leave}
        timing={timing}
      >
        {inters => {
          if (!inters.length) {
            return null
          }
          const rendered = (render || children)(inters[0].state)
          return rendered ? React.Children.only(rendered) : null
        }}
      </NodeGroup>
    )
  }
}
