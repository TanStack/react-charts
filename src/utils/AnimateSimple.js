import React from 'react'
// import { timer as Timer } from 'd3-timer'
import * as Easing from 'd3-ease'
import { interpolate } from 'd3-interpolate'
//
import Timer from '../utils/Timer'

export default React.createClass({
  getDefaultProps () {
    return {
      data: {},
      duration: 1000,
      easing: 'easeCubicOut',
      ignore: []
    }
  },
  getInitialState () {
    return {
      ...this.props.default || this.props.data
    }
  },
  componentDidMount () {
    this.animate(this.props, true)
  },
  componentWillUnmount () {
    this.unmounting = true
    this.timer && this.timer()
  },
  componentWillReceiveProps (newProps) {
    this.animate(newProps)
  },
  animate (newProps, first) {
    const {
      data,
      easing,
      duration
    } = newProps

    let shouldUpdate = first || false
    if (!first) {
      const oldProps = this.props
      for (let prop in data) {
        if (oldProps.data[prop] !== data[prop]) {
          shouldUpdate = true
          break
        }
      }
    }

    if (!shouldUpdate) {
      return
    }

    // Create the easing function
    const easer = Easing[easing] || Easing.easeCubicOut

    // Copy the current state for the transition
    const originState = {...this.state}

    // Set the update function
    const updateState = percentage => {
      if (this.unmounting) {
        return
      }
      this.setState(this.tweenState(originState, data, easer(percentage)))
    }

    // Stop an existing timer if it exists
    if (this.timer) {
      this.timer()
    }

    updateState(0) // Make sure the first state is always fired
    this.timer = Timer(progress => {
      updateState(progress) // update with progress of the duration
      if (progress === 1) {
        this.timer = null
      }
    }, duration)
  },
  tweenState (oldState, newState, percentage) {
    const {
      ignore
    } = this.props
    const nextState = {}
    for (let prop in newState) {
      const shouldIgnore = ignore.indexOf(prop) > -1
      nextState[prop] = oldState[prop] === newState[prop] ? newState[prop]
        : percentage ? (
          shouldIgnore ? newState[prop] : interpolate(oldState[prop], newState[prop])(percentage)
        )
        : oldState[prop] || 0
    }
    return nextState
  },
  render () {
    const {
      children
    } = this.props

    return children(this.state)
  }
})
