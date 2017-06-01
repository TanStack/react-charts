import React, { PureComponent } from 'react'
//
import AxisPie from './AxisPie'
import AxisLinear from './AxisLinear'

export default class Axis extends PureComponent {
  render () {
    const { type } = this.props

    if (type === 'pie') {
      return <AxisPie {...this.props} />
    }

    return <AxisLinear {...this.props} />
  }
}
