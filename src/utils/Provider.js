import React, { Component, PropTypes } from 'react'

export default function Provider (ComponentToWrap) {
  return class Provider extends Component {
    static childContextTypes = {
      reactChart: PropTypes.object.isRequired,
      reactChartDispatch: PropTypes.func.isRequired
    }
    constructor (props) {
      super()
      this.state = {}
      this.dispatch = this.dispatch.bind(this)
    }
    dispatch (fn, callback) {
      // Force any updates to be performed with functional setState
      return this.setState(state => {
        // console.info('Chart State Update', fn(state))
        return fn(state)
      }, callback)
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
