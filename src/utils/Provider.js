import React, { PureComponent, PropTypes } from 'react'

export default function Provider (ComponentToWrap) {
  return class Provider extends PureComponent {
    static childContextTypes = {
      reactChart: PropTypes.object.isRequired
    }
    constructor (props) {
      super()
      this.store = {...props}
      this.subscribers = []
      this.subscribe = this.subscribe.bind(this)
      this.notify = this.notify.bind(this)
      this.dispatch = this.dispatch.bind(this)
    }
    componentWillReceiveProps (newProps) {
      for (var prop in newProps) {
        if (newProps.hasOwnProperty(prop)) {
          if (this.store[prop] !== newProps[prop]) {
            this.dispatch(store => ({
              ...store,
              ...newProps
            }))
          }
        }
      }
    }
    subscribe (cb) {
      // Add the subscription
      this.subscribers.push(cb)
      // return an unsubscribe function
      return () => {
        this.subscribers = this.subscribers.filter(d => d !== cb)
      }
    }
    dispatch (fn) {
      // Functionally replace the store
      this.store = fn(this.store)
      // Then notify all subscribers
      this.notify()
    }
    notify () {
      this.subscribers.forEach(d => d())
    }
    getChildContext () {
      return {
        reactChart: {
          getState: () => this.store,
          subscribe: this.subscribe,
          dispatch: this.dispatch
        }
      }
    }
    render () {
      return <ComponentToWrap {...this.props} />
    }
  }
}
