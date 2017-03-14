import React, { Component, PropTypes } from 'react'

export default function Provider (ComponentToWrap) {
  return class Provider extends Component {
    static childContextTypes = {
      reactChart: PropTypes.object.isRequired,
      reactChartDispatch: PropTypes.func.isRequired
    }
    constructor (props) {
      super()
      this.state = {...props}
      this.dispatch = this.dispatch.bind(this)
    }
    dispatch (fn, callback) {
      return this.setState(fn, callback)
    }
    componentWillReceiveProps (nextProps) {
      this.setState(nextProps)
    }
    getChildContext () {
      return {
        reactChart: this.state,
        reactChartDispatch: this.dispatch
      }
    }
    render () {
      return <ComponentToWrap {...this.props} />
    }
  }
}
