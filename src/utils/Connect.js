import React, { PureComponent, PropTypes } from 'react'

export default function Connect (mapStateToProps) {
  return (ComponentToWrap, statics = {}) => {
    class ConnectedReactChartCmp extends PureComponent {
      // let’s define what’s needed from the `context`
      static displayName = `Connect(${ComponentToWrap.displayName || ComponentToWrap.name})`
      static contextTypes = {
        reactChart: PropTypes.object.isRequired
      }
      constructor () {
        super()
        this.handleChange = this.handleChange.bind(this)
      }
      componentDidMount () {
        this.unsubscribe = this.context.reactChart.subscribe(this.handleChange.bind(this))
      }
      componentWillUnmount () {
        this.unsubscribe()
      }

      handleChange () {
        this.forceUpdate()
      }
      render () {
        const {
          reactChart
        } = this.context
        return (
          <ComponentToWrap
            {...this.props}
            {...mapStateToProps(reactChart.getState(), this.props)}
            dispatch={reactChart.dispatch}
          />
        )
      }
    }
    for (var prop in statics) {
      if (statics.hasOwnProperty(prop)) {
        ConnectedReactChartCmp[prop] = statics[prop]
      }
    }
    return ConnectedReactChartCmp
  }
}
