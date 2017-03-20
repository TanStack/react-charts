import React from 'react'
import now from 'performance-now'
import RAF from 'raf'
import { interpolate } from 'd3-interpolate'
import * as Easing from 'd3-ease'
//

const msPerFrame = 1000 / 60

export default React.createClass({
  getDefaultProps () {
    return {
      data: {},
      duration: 1000,
      ignore: [],
      easing: 'easeCubicInOut',
      onRest: () => null
    }
  },
  getInitialState () {
    const {
      default: defaultState,
      data
    } = this.props
    // Remove any springs from the default data
    this.origin = defaultState || data
    this.destination = data
    // Start velocity map off with zeros
    return {
      current: this.origin
    }
  },

  componentWillMount () {
    this.wasAnimating = false
    this.animationID = null
    this.prevTime = 0
    this.accumulatedTime = 0
    this.interpolators = {}
  },

  componentDidMount () {
    this.pivot(this.props)
    this.ranFirst = true
  },

  componentWillReceiveProps (props) {
    this.pivot(props)
  },

  componentWillUnmount () {
    if (this.animationID != null) {
      RAF.cancel(this.animationID)
      this.animationID = null
    }
  },

  pivot (props, first) {
    // Detect non-change render
    let needsUpdate = false
    for (let key in props.data) {
      if (!Object.prototype.hasOwnProperty.call(this.destination, key)) {
        continue
      }
      if (this.props.data[key] !== props.data[key]) {
        needsUpdate = true
      }
    }

    if (this.ranFirst && !needsUpdate) {
      return
    }

    // Update the easing function
    this.easer = Easing[props.easing] || Easing.easeCubicInOut

    // Update the origin and destination
    this.origin = {...this.state.current}
    this.destination = {...props.data}

    // Update the interpolators
    for (let key in this.destination) {
      if (!Object.prototype.hasOwnProperty.call(this.destination, key)) {
        continue
      }
      if (props.ignore.indexOf(key) > -1) {
        this.interpolators[key] = null
        continue
      }
      this.interpolators[key] = interpolate(this.origin[key], this.destination[key])
    }

    // Reset the startTime and progress
    this.startTime = now()
    this.progress = 0

    // Animate if needed
    this.animate()
  },

  animate () {
    if (this.animationID) {
      return
    }

    const {
      data,
      onRest,
      duration
    } = this.props

    this.animationID = RAF((timestamp) => {
      // If the animation is complete, tie up any loose ends...
      if (this.progress === 1) {
        if (this.wasAnimating) {
          onRest()
        }

        // no need to cancel animationID here shouldn't have any in flight
        this.animationID = null
        this.wasAnimating = false
        this.accumulatedTime = 0
        return
      }

      // It's time to animate!
      this.wasAnimating = true

      // Keep track of time
      let currentTime = timestamp || now()
      const timeSinceLastFrame = currentTime - this.prevTime
      this.prevTime = currentTime
      this.accumulatedTime = this.accumulatedTime + timeSinceLastFrame

      // more than 10 frames? they probably switched browser tabs
      // just carry on from this point in time
      if (this.accumulatedTime > msPerFrame * 10) {
        this.startTime = now()
        this.accumulatedTime = 0
        this.animationID = null
        this.animate()
        return
      }

      // How many milliseconds behind are we?
      const timeToCatchUp = Math.max(Math.floor(this.accumulatedTime - msPerFrame), 0)

      // Add that to the previous time and currentTime
      this.prevTime = this.prevTime + timeToCatchUp
      currentTime += timeToCatchUp

      // Set the progress percentage
      this.progress = Math.min((currentTime - this.startTime) / duration, 1)

      let newCurrent = {}

      for (let key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) {
          continue
        }

        // If ignored, skip right to the value
        if (!this.interpolators[key]) {
          newCurrent[key] = data[key]
        } else {
          // Otherwise, interpolate with the progress
          newCurrent[key] = this.interpolators[key](this.easer(this.progress))
        }
      }

      // Mark the frame as done
      this.animationID = null
      // Reset the accumulatedTime
      this.accumulatedTime = 0

      this.setState({
        current: newCurrent
      })

      this.animate()
    })
  },

  render () {
    const renderedChildren = this.props.children(this.state.current)
    return renderedChildren && React.Children.only(renderedChildren)
  }
})
