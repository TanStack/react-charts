import React from 'react'
import * as Easing from 'd3-ease'
import { interpolate } from 'd3-interpolate'
//
import Timer from '../utils/Timer'

export default React.createClass({
  getDefaultProps () {
    return {
      data: [],
      duration: 1000,
      easing: 'easeCubicOut',
      ignore: []
    }
  },
  getInitialState () {
    return {
      items: []
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
      update,
      enter = leave || update,
      leave = enter || update,
      duration,
      easing
    } = newProps

    let needsUpdate = first || this.props.data !== newProps.data

    if (!needsUpdate) {
      for (var i = 0; i < this.props.data.length; i++) {
        if (this.props.data[i] !== newProps.data[i]) {
          needsUpdate = true
          break
        }
        let oldState = this.props.update(this.props.data[i])
        let newState = update(newProps.data[i])
        for (var prop in newState) {
          if (oldState[prop] !== newState[prop]) {
            needsUpdate = true
            break
          }
        }
      }
    }

    if (!needsUpdate) {
      return
    }

    // Get the model for the new new items
    const newItems = newProps.data.map(this.getItemModel)
    // Copy the old items out of the state
    const oldItems = [...this.state.items.map(d => ({...d}))]

    // Distinguish the stable, entering and leaveing items and
    // tag the items with their appropriate state
    const stableItems = newItems.filter(newItem => {
      return oldItems.find(oldItem => oldItem.key === newItem.key)
    })
    stableItems.forEach(item => {
      item.stable = false
      item.leaving = false
      item.entering = true
    })

    const enteringItems = newItems.filter(newItem => {
      return !oldItems.find(oldItem => oldItem.key === newItem.key)
    })
    enteringItems.forEach(item => {
      item.stable = false
      item.leaving = false
      item.entering = true
    })

    const leavingItems = oldItems.filter(oldItem => {
      return !newItems.find(newItem => newItem.key === oldItem.key)
    })
    leavingItems.forEach(item => {
      item.stable = false
      item.leaving = true
      item.entering = false
    })

    const allItems = mergeDiff(oldItems, newItems).map(item => {
      if (item.stable) {
        return {
          ...item,
          state: update(item.data, item.key, item)
        }
      }

      if (item.entering) {
        return {
          ...item,
          state: update(item.data, item.key, item),
          originState: enter(item.data, item.key, item) // Used for origin
        }
      }

      if (item.leaving) {
        return {
          ...item,
          state: leave(item.data, item.key, item)
        }
      }
    })

    // Create the easing function
    const easer = Easing[easing] || Easing.easeCubicOut

    const updateItems = percentage => {
      if (this.unmounting) {
        return
      }
      this.setState({
        items: this.tweenItems(oldItems, allItems, easer(percentage))
      })
    }

    // Stop an existing timer if it exists
    if (this.timer) {
      this.timer()
    }

    // Perform the update
    updateItems(0) // Make sure the first state is always fired
    this.timer = Timer(progress => {
      updateItems(progress) // update with progress of the duration
      if (progress === 1) {
        this.removeExitedItems()
      }
    }, duration)
  },
  removeExitedItems () {
    this.setState(state => {
      const resolvedItems = state.items
        .filter(item => !item.leaving)
        .map(item => ({
          ...item,
          stable: true,
          entering: false,
          leaving: false
        }))

      return {
        items: resolvedItems
      }
    })
  },
  tweenItems (oldItems, newItems, percentage) {
    const {
      ignore
    } = this.props

    return newItems.map(newItem => {
      const oldItem = oldItems.find(oldItem => oldItem.key === newItem.key) || {
        state: newItem.originState
      }
      const newState = {}
      for (let prop in newItem.state) {
        const shouldIgnore = ignore.indexOf(prop) > -1
        newState[prop] = oldItem.state[prop] === newItem.state[prop] ? newItem.state[prop]
          : percentage ? (
            shouldIgnore ? newItem.state[prop] : interpolate(oldItem.state[prop], newItem.state[prop])(percentage)
          )
          : oldItem.state[prop] || 0
      }
      return {
        ...newItem,
        state: newState
      }
    })
  },
  getItemModel (item, i) {
    const {
      getKey,
      update
    } = this.props
    return {
      key: getKey(item, i),
      data: item,
      state: update(item, i),
      stable: true,
      entering: false,
      leaving: false
    }
  },
  render () {
    const {
      children
    } = this.props
    const {
      items
    } = this.state

    return children(items)
  }
})

// Taken from react-motion's mergeDiff (https://github.com/chenglou/react-motion/blob/446a8d0130072c4a59fec1ab788bfc2cc5c5b788/src/mergeDiff.js)
function mergeDiff (prev, next) {
  let prevKeyIndex = {}
  for (let i = 0; i < prev.length; i++) {
    prevKeyIndex[prev[i].key] = i
  }
  let nextKeyIndex = {}
  for (let i = 0; i < next.length; i++) {
    nextKeyIndex[next[i].key] = i
  }
  // Merge the arrays
  let ret = []
  for (let i = 0; i < next.length; i++) {
    ret[i] = next[i]
  }
  for (let i = 0; i < prev.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(nextKeyIndex, prev[i].key)) {
      ret.push(prev[i])
    }
  }
  // now all the items all present. Core sorting logic to have the right order
  return ret.sort(function (a, b) {
    let nextOrderA = nextKeyIndex[a.key]
    let nextOrderB = nextKeyIndex[b.key]
    let prevOrderA = prevKeyIndex[a.key]
    let prevOrderB = prevKeyIndex[b.key]
    if (nextOrderA != null && nextOrderB != null) {
      // both keys in next
      return nextKeyIndex[a.key] - nextKeyIndex[b.key]
    } else if (prevOrderA != null && prevOrderB != null) {
      // both keys in prev
      return prevKeyIndex[a.key] - prevKeyIndex[b.key]
    } else if (nextOrderA != null) {
      // key a in next, key b in prev
      // how to determine the order between a and b? We find a "pivot" (term
      // abuse), a key present in both prev and next, that is sandwiched between
      // a and b. In the context of our above example, if we're comparing a and
      // d, b's (the only) pivot
      for (let i = 0; i < next.length; i++) {
        let pivot = next[i].key
        if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
          continue
        }
        if (
          nextOrderA < nextKeyIndex[pivot] && prevOrderB > prevKeyIndex[pivot]
        ) {
          return -1
        } else if (
          nextOrderA > nextKeyIndex[pivot] && prevOrderB < prevKeyIndex[pivot]
        ) {
          return 1
        }
      }
      // pluggable. default to: next bigger than prev
      return 1
    }
    // prevOrderA, nextOrderB
    for (let i = 0; i < next.length; i++) {
      let pivot = next[i].key
      if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
        continue
      }
      if (
        nextOrderB < nextKeyIndex[pivot] && prevOrderA > prevKeyIndex[pivot]
      ) {
        return 1
      } else if (
        nextOrderB > nextKeyIndex[pivot] && prevOrderA < prevKeyIndex[pivot]
      ) {
        return -1
      }
    }
    // pluggable. default to: next bigger than prev
    return -1
  })
}
