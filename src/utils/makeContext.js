import React from 'react'

const defualtSubscribe = state => state
const defaultMiddleware = ({ action, setState }) =>
  new Promise(resolve => setState(action, resolve))
const globalDefaultProps = {
  name: 'NewContext',
  initialState: {},
  middleware: defaultMiddleware,
}

export default function makeContext (userDefaultProps) {
  const Context = React.createContext({})

  const defaultProps = {
    ...globalDefaultProps,
    ...userDefaultProps,
  }

  class Provider extends React.Component {
    static defaultProps = defaultProps
    static displayName = `${defaultProps.displayName}`
    constructor (props) {
      super(props)
      this.state = {
        ...this.props.initialState,
        setContext: this.setContext, // eslint-disable-line
      }
    }
    safeSetState = (...args) => this.setState(...args)
    setContext = action =>
      this.props.middleware({
        action,
        setState: this.safeSetState,
        state: this.state,
        props: this.props,
      })
    render () {
      return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>
    }
  }

  const withProvider = providerOpts => Component => props => (
    <Context.Provider {...providerOpts}>
      <Component {...props} />
    </Context.Provider>
  )

  const Consumer = ({ subscribe = defualtSubscribe, render, children }) => (
    <Context.Consumer>
      {({ setContext, ...state }) => (render || children)({ ...subscribe(state), setContext })}
    </Context.Consumer>
  )

  const withConsumer = (subscribe = defualtSubscribe) => Component => props => (
    <Context.Consumer>
      {({ setContext, ...state }) => (
        <Component {...{ ...props, ...subscribe(state, props), setContext }} />
      )}
    </Context.Consumer>
  )

  return {
    Provider,
    withProvider,
    Consumer,
    withConsumer,
  }
}

// Usage

// // Make a new context with default props
// const { Provider, Consumer, withConsumer } = makeContext({
//   displayName: 'Todos',
//   initialState: {
//     todos: [],
//   },
// })

// // You can use selectors
// const selectTodos = state => ({ todos: state.todos })

// // Render-prop style
// const OnTheFlyTodos = () => (
//   <Consumer subscribe={selectTodos} render={({ todos }) => <div>{todos}</div>} />
// )
// // HOC style
// const HocTodos = withConsumer(selectTodos)(({ todos }) => <div>{todos}</div>)
// // Pure HOC style
// const PureTodos = withConsumer(selectTodos)(
//   class extends React.PureComponent {
//     render () {
//       const { todos } = this.props
//       return <div>{todos}</div>
//     }
//   }
// )

// const App = (
//   <Provider
//     // You can optionally override the initial state on the Provider
//     initialState={{
//       todos: [],
//     }}
//     // You can optionally override the middleware on the Provider
//     middleware={({
//  action, setState, state, props,
// }) => {
//       /* */
//     }}
//   >
//     <div>
//       <OnTheFlyTodos />
//       <HocTodos />
//       <PureTodos />
//     </div>
//   </Provider>
// )
