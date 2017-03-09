import React, { PropTypes } from 'react'

export default function Provider (ComponentToWrap) {
  return React.createClass({
    childContextTypes: {
      reactChart: PropTypes.object.isRequired,
      reactChartDispatch: PropTypes.func.isRequired
    },
    getInitialState () {
      return {
        ...this.props
      }
    },
    dispatch (fn) {
      return this.setState(fn)
    },
    componentWillReceiveProps (nextProps) {
      this.setState(nextProps)
    },
    getChildContext () {
      return {
        reactChart: this.state,
        reactChartDispatch: this.dispatch
      }
    },
    render () {
      return <ComponentToWrap {...this.props} />
    }
  })
}
