import React from 'react'
import { Motion, spring } from 'react-motion'
import { interpolate } from 'd3-interpolate'

export default React.createClass({
  componentWillMount () {
    this.currentValues = {}
    this.newInters = {}
    this.currentStepValues = {}
    this.stepValues = {}
    this.stepInterpolators = {}
  },
  render () {
    const {
      style,
      children,
      ...rest
    } = this.props

    const MagicSpring = (value, config) => {
      if (typeof value !== 'number') {
        return {
          value,
          config,
          interpolator: (config && config.interpolator) ? config.interpolator : interpolate
        }
      }
      return spring(value, config)
    }

    const resolvedStyle = style(MagicSpring)
    for (let prop in resolvedStyle) {
      if (
        // If prop is a non-numeric interpolation
        resolvedStyle[prop] &&
        resolvedStyle[prop].interpolator
      ) {
        // Make sure the steps start at 0
        this.currentValues[prop] = this.currentValues[prop] || 0
        this.currentStepValues[prop] = this.currentStepValues[prop] || 0
        if (
          // If the value has changed
          typeof this.newInters[prop] === 'undefined' ||
          resolvedStyle[prop].value !== this.newInters[prop].value
        ) {
          // Save the new value
          this.newInters[prop] = resolvedStyle[prop]

          // Increment the stepInterValue for this prop by 1
          this.stepValues[prop] = this.currentStepValues[prop] + 1

          // Set up the new interpolator
          this.stepInterpolators[prop] = this.newInters[prop].interpolator(
            this.currentValues[prop],
            this.newInters[prop].value
          )
        }
        // Return the spring with the destination stepValue and spring config
        resolvedStyle[prop] = spring(this.stepValues[prop], this.newInters[prop].config)
      }
    }

    return (
      <Motion
        {...rest}
        style={resolvedStyle}
      >
        {values => {
          const newValues = {}
          for (let prop in values) {
            if (this.stepValues[prop]) {
              // Save the currentStepValue
              this.currentStepValues[prop] = values[prop]
              // Figure the percentage
              let percentage = this.currentStepValues[prop] - this.stepValues[prop] + 1
              // Save the current value and replace the value in the interpolated object
              this.currentValues[prop] = newValues[prop] = this.stepInterpolators[prop](percentage)
            }
          }
          return children({
            ...values,
            ...newValues
          })
        }}
      </Motion>
    )
  }
})
