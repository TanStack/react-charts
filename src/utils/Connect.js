import React, { Component, PropTypes } from 'react'

export default function Connect (mapStateToProps) {
  return (ComponentToWrap) => {
    return class ConnectedReactChartCmp extends Component {
      // let’s define what’s needed from the `context`
      static displayName = `Connect(${ComponentToWrap.displayName || ComponentToWrap.name})`
      static contextTypes = {
        reactChart: PropTypes.object.isRequired,
        reactChartDispatch: PropTypes.func.isRequired
      }
      render () {
        const {
          reactChart,
          reactChartDispatch
        } = this.context
        return (
          <ComponentToWrap
            {...mapStateToProps(reactChart, this.props)}
            dispatch={reactChartDispatch}
            {...this.props}
          />
        )
      }
    }
  }
}
