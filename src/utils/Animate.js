import React from 'react'
import { Motion, spring } from 'react-motion'
import { interpolate } from 'd3-interpolate'

export default React.createClass({
  componentWillMount () {
    this.currentValues = {}
    this.newValues = {}
    this.currentStepValues = {}
    this.stepValues = {}
    this.stepInterpolators = {}
  },
  render () {
    const {
      data,
      children,
      ...rest
    } = this.props

    const resolvedStyle = {
      ...data
    }
    for (let prop in resolvedStyle) {
      // Make sure the steps start at 0
      this.currentValues[prop] = this.currentValues[prop] || 0
      this.currentStepValues[prop] = this.currentStepValues[prop] || 0
      if (
        // If the value has changed
        resolvedStyle[prop] !== this.newValues[prop]
      ) {
        // Save the new value
        this.newValues[prop] = resolvedStyle[prop]

        // Increment the stepInterValue for this prop by 1
        this.stepValues[prop] = this.currentStepValues[prop] + 1

        // Set up the new interpolator
        this.stepInterpolators[prop] = interpolate(
          this.currentValues[prop],
          this.newValues[prop]
        )
      }
      // Return the spring with the destination stepValue and spring config
      resolvedStyle[prop] = spring(this.stepValues[prop], {
        stiffness: 1
      })
    }

    return (
      <Motion
        {...rest}
        style={resolvedStyle}
      >
        {values => {
          const convertedValues = {}
          for (let prop in values) {
            if (this.stepValues[prop]) {
              // Save the currentStepValue
              this.currentStepValues[prop] = values[prop]
              // Figure the percentage
              let percentage = this.currentStepValues[prop] - this.stepValues[prop] + 1
              // Save the current value and replace the value in the interpolated object
              this.currentValues[prop] = convertedValues[prop] = this.stepInterpolators[prop](percentage)
            }
          }
          return children({
            ...convertedValues
          })
        }}
      </Motion>
    )
  }
})
