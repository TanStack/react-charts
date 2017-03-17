import React from 'react'
import defaultNow from 'performance-now'
import { interpolate } from 'd3-interpolate'
import RAF from 'raf'
//

const msPerFrame = 1000 / 60

export default React.createClass({
  getInitialState () {
    const {
      default: defaultState,
      data
    } = this.props
    // Remove any springs from the default data
    const startState = defaultState || stripState(data)
    this.originInterpolatedState = {...startState}
    this.interpolatedState = {...startState}
    const currentState = stripState(stripNonFloats(data))
    // Start velocity map off with zeros
    const currentVelocity = mapToZero(currentState)
    return {
      currentState,
      currentVelocity,
      lastState: currentState,
      lastVelocity: currentVelocity
    }
  },

  componentWillMount () {
    this.destinationInterpolatedState = mapToZero(this.props.data)
    this.manageBackingInterpolation({}, this.props.data)
  },

  componentDidMount () {
    this.prevTime = defaultNow()
    this.animate()
  },

  componentWillReceiveProps (props) {
    this.manageBackingInterpolation(this.props.data, props.data)

    if (this.unprocessedState != null) {
      // previous props haven't had the chance to be set yet set them here
      this.digestUnprocessedState(this.unprocessedState)
    }

    // Pending state will be removed as soon as a frame is processed with the new data
    this.unprocessedState = props.data
    if (this.animationID == null) {
      this.prevTime = defaultNow()
      this.animate()
    }
  },

  componentWillUnmount () {
    if (this.animationID != null) {
      RAF.cancel(this.animationID)
      this.animationID = null
    }
  },

  wasAnimating: false,
  animationID: null,
  prevTime: 0,
  accumulatedTime: 0,
  unprocessedState: null,
  oldState: {},
  interpolatedKeys: {},
  originInterpolatedState: {},
  interpolatedState: {},
  destinationInterpolatedState: {},
  interpolators: {},

  manageBackingInterpolation (oldState, newState) {
    for (var key in newState) {
      if (!newState.hasOwnProperty(key)) {
        continue
      }
      // Detect if any properties are non-floats
      if (isSpring(newState[key]) && typeof newState[key].val !== 'number') {
        this.interpolatedKeys[key] = true

        // If any non-float values have changed
        if (!oldState[key] || oldState[key].val !== newState[key].val) {
          // Set the originInterpolatedState to the interpolatedState
          this.originInterpolatedState[key] = typeof this.interpolatedState[key] !== 'undefined' ? this.interpolatedState[key] : this.originInterpolatedState[key]
          // store the new value in the backing state
          this.destinationInterpolatedState[key] = newState[key].val
          // Store the currentState so we can use it to obtain a progress percentage
          this.oldState[key] = this.state.currentState[key]
          // Then replace the springs value with the currentState value (or 0), incremented by 1
          // This should force the spring to move when the value changes
          newState[key].val = (this.state.currentState[key] || 0) + 1
          // Create a new interpolator for the backing values
          this.interpolators[key] = interpolate(this.originInterpolatedState[key], this.destinationInterpolatedState[key])
        }
      }
    }
  },

  digestUnprocessedState (destState) {
    let dirty = false
    let {
      currentState,
      currentVelocity,
      lastState,
      lastVelocity
    } = this.state

    for (let key in destState) {
      if (!Object.prototype.hasOwnProperty.call(destState, key)) {
        continue
      }

      const stateValue = destState[key]
      if (isSpring(stateValue)) {
        if (!dirty) {
          dirty = true
          currentState = {...currentState}
          currentVelocity = {...currentVelocity}
          lastState = {...lastState}
          lastVelocity = {...lastVelocity}
        }

        currentState[key] = stateValue
        currentVelocity[key] = 0
        lastState[key] = stateValue
        lastVelocity[key] = 0
      }
    }

    if (dirty) {
      this.setState({
        currentState,
        currentVelocity,
        lastState,
        lastVelocity
      })
    }
  },

  animate () {
    this.animationID = RAF((timestamp) => {
      // check if we need to animate in the first place
      const {
        data,
        onRest
      } = this.props

      const {
        currentState,
        currentVelocity
      } = this.state

      // If the velocity has reached zero, stop animating
      if (shouldStopAnimation(
        currentState,
        data,
        currentVelocity,
      )) {
        if (this.wasAnimating && onRest) {
          onRest()
        }

        // no need to cancel animationID here shouldn't have any in flight
        this.animationID = null
        this.wasAnimating = false
        this.accumulatedTime = 0
        return
      }

      // Start the animation frame logic
      this.wasAnimating = true

      // Keep track of time
      const currentTime = timestamp || defaultNow()
      const timeSinceLastFrame = currentTime - this.prevTime
      this.prevTime = currentTime
      this.accumulatedTime = this.accumulatedTime + timeSinceLastFrame

      // more than 10 frames? prolly switched browser tab. Restart
      if (this.accumulatedTime > msPerFrame * 10) {
        this.accumulatedTime = 0
      }
      if (this.accumulatedTime === 0) {
        // no need to cancel animationID here shouldn't have any in flight
        this.animationID = null
        this.animate()
        return
      }

      let currentFrameCompletion =
        (this.accumulatedTime - Math.floor(this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame
      const framesToCatchUp = Math.floor(this.accumulatedTime / msPerFrame)

      let newLastState = {}
      let newLastVelocity = {}
      let newCurrentState = {}
      let newCurrentVelocity = {}

      for (let key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) {
          continue
        }

        const stateValue = data[key]
        if (!isSpring(stateValue)) {
          newCurrentState[key] = stateValue
          newCurrentVelocity[key] = 0
          newLastState[key] = stateValue
          newLastVelocity[key] = 0
        } else {
          let newLastStateValue = this.state.lastState[key]
          let newLastVelocityValue = this.state.lastVelocity[key]
          for (let i = 0; i < framesToCatchUp; i++) {
            [newLastStateValue, newLastVelocityValue] = stepper(
              msPerFrame / 1000,
              newLastStateValue,
              newLastVelocityValue,
              stateValue.val,
              stateValue.stiffness,
              stateValue.damping,
              stateValue.precision,
            )
          }
          const [nextX, nextV] = stepper(
            msPerFrame / 1000,
            newLastStateValue,
            newLastVelocityValue,
            stateValue.val,
            stateValue.stiffness,
            stateValue.damping,
            stateValue.precision,
          )

          // This is the floating point stepped value
          // This will either be the exact value returned, or used to interpolate non-floats
          newCurrentState[key] = newLastStateValue + (nextX - newLastStateValue) * currentFrameCompletion
          // This is the new velocity
          newCurrentVelocity[key] = newLastVelocityValue + (nextV - newLastVelocityValue) * currentFrameCompletion
          // This is the last state value from the stepper
          newLastState[key] = newLastStateValue
          // This is the velocity value from the stepper
          newLastVelocity[key] = newLastVelocityValue

          if (this.interpolatedKeys[key]) {
            // percentage is progress (current - old) / length (destination - old)
            const percentage = (newCurrentState[key] - this.oldState[key]) / (stateValue.val - this.oldState[key])
            this.interpolatedState[key] = this.interpolators[key](percentage)
          }
        }
      }

      this.animationID = null
      // the amount we looped over above
      this.accumulatedTime -= framesToCatchUp * msPerFrame

      this.setState({
        currentState: newCurrentState,
        currentVelocity: newCurrentVelocity,
        lastState: newLastState,
        lastVelocity: newLastVelocity
      })

      // console.log(originInterpolatedState)

      this.unprocessedState = null

      this.animate()
    })
  },

  render () {
    const resolvedState = {...this.state.currentState}
    for (var key in resolvedState) {
      // console.log(this.interpolatedKeys[key], this.interpolatedState[key])
      if (this.interpolatedKeys[key]) {
        resolvedState[key] = this.interpolatedState[key]
      }
    }
    const renderedChildren = this.props.children(resolvedState)
    return renderedChildren && React.Children.only(renderedChildren)
  }
})

function mapToZero (obj) {
  let ret = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      ret[key] = 0
    }
  }
  return ret
}

function stripState (state) {
  let ret = {}
  for (const key in state) {
    if (!Object.prototype.hasOwnProperty.call(state, key)) {
      continue
    }
    ret[key] = !isSpring(state[key]) ? state[key] : state[key].val
  }
  return ret
}

function stripNonFloats (state) {
  let ret = {}
  for (const key in state) {
    if (!Object.prototype.hasOwnProperty.call(state, key)) {
      continue
    }
    ret[key] = isSpring(state[key]) ? (typeof state[key].val !== 'number' ? 0 : state[key].val) : state[key]
  }
  return ret
}

function shouldStopAnimation (
  currentState,
  state,
  currentVelocity,
) {
  for (let key in state) {
    if (!Object.prototype.hasOwnProperty.call(state, key)) {
      continue
    }

    if (currentVelocity[key] !== 0) {
      return false
    }

    const stateValue = !isSpring(state[key]) ? state[key] : state[key].val
    // stepper will have already taken care of rounding precision errors, so
    // won't have such thing as 0.9999 !=== 1
    if (currentState[key] !== stateValue) {
      return false
    }
  }

  return true
}

function isSpring (obj) {
  return typeof obj === 'object' &&
    typeof obj.damping !== 'undefined'
}

let reusedTuple = [0, 0]

function stepper (
  secondPerFrame, // msPerFrame / 1000,
  x, // newLastStateValue,
  v, // newLastVelocityValue,
  destX, // stateValue.val,
  k, // stateValue.stiffness,
  b, // stateValue.damping,
  precision // stateValue.precision
) {
  // Spring stiffness, in kg / s^2

  // for animations, destX is really spring length (spring at rest). initial
  // position is considered as the stretched/compressed position of a spring
  const Fspring = -k * (x - destX)

  // Damping, in kg / s
  const Fdamper = -b * v

  // usually we put mass here, but for animation purposes, specifying mass is a
  // bit redundant. you could simply adjust k and b accordingly
  // let a = (Fspring + Fdamper) / mass
  const a = Fspring + Fdamper

  const newV = v + a * secondPerFrame
  const newX = x + newV * secondPerFrame

  if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
    reusedTuple[0] = destX
    reusedTuple[1] = 0
    return reusedTuple
  }

  reusedTuple[0] = newX
  reusedTuple[1] = newV
  return reusedTuple
}
