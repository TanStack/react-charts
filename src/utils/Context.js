import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

const ChartContext = React.createContext(null)
const PointerContext = React.createContext(null)

export const ChartProvider = ChartContext.Provider
export const PointerProvider = PointerContext.Provider

const Connect = Consumer => subscribe => Comp => {
  class Connected extends React.PureComponent {
    constructor () {
      super()
      this.subscriber = typeof subscribe({}) === 'function' ? subscribe() : subscribe
    }
    render () {
      return (
        <Consumer>
          {({ dispatch, ...rest }) => (
            <Comp {...this.props} {...this.subscriber(rest, this.props)} dispatch={dispatch} />
          )}
        </Consumer>
      )
    }
  }
  hoistNonReactStatics(Connected, Comp)
  return Connected
}

export const ChartConnect = Connect(ChartContext.Consumer)
export const PointerConnect = Connect(PointerContext.Consumer)
