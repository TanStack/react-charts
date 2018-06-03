import React from 'react'
//
import AxisPie from './AxisPie'
import AxisLinear from './AxisLinear'

export default class Axis extends React.Component {
  render () {
    const { type, primary, position } = this.props

    const resolvedPosition = position || (primary ? 'bottom' : 'left')

    if (type === 'pie') {
      return <AxisPie {...this.props} position={resolvedPosition} />
    }

    return <AxisLinear {...this.props} position={resolvedPosition} />
  }
}
