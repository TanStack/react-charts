import React from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { interpolate } from 'd3-interpolate'

export default React.createClass({
  componentWillMount () {
    this.currentValues = {}
    this.newInters = {}
    this.currentStepValues = {}
    this.stepValues = {}
    this.stepInterpolators = {}
  },
  getDefaultProps () {
    return {
      data: [],
      stagger: false
    }
  },
  render () {
    const {
      data,
      stagger,
      getKey,
      willEnter,
      willLeave,
      style,
      children
    } = this.props

    const MagicSpring = (value, config) => {
      // if (typeof value !== 'number') {
        return {
          value,
          config,
          interpolator: (config && config.interpolator) ? config.interpolator : interpolate
        }
      // }
      // return spring(value, config)
    }

    const resolvedStyles = data.map((d, i) => {
      const key = getKey(d, i)
      const resolvedStyle = style(d, i, MagicSpring)

      // Make sure the list of items is instantiated
      this.currentValues[key] = this.currentValues[key] || {}
      this.newInters[key] = this.newInters[key] || {}
      this.currentStepValues[key] = this.currentStepValues[key] || {}
      this.stepValues[key] = this.stepValues[key] || {}
      this.stepInterpolators[key] = this.stepInterpolators[key] || {}

      for (let prop in resolvedStyle) {
        if (
          // If key is a non-numeric interpolation
          resolvedStyle[prop] &&
          resolvedStyle[prop].interpolator
        ) {
          // Make sure the steps start at 0
          this.currentValues[key][prop] = this.currentValues[key][prop] || 0
          this.currentStepValues[key][prop] = this.currentStepValues[key][prop] || 0
          if (
            // If the value has changed
            typeof this.newInters[key] === 'undefined' ||
            typeof this.newInters[key][prop] === 'undefined' ||
            resolvedStyle[prop].value !== this.newInters[key][prop].value
          ) {
            // Save the new value
            this.newInters[key][prop] = resolvedStyle[prop]

            // Increment the stepInterValue for this prop by 1
            this.stepValues[key][prop] = this.currentStepValues[key][prop] + 1
            console.log('increment', key, prop)

            // Set up the new interpolator
            this.stepInterpolators[key][prop] = this.newInters[key][prop].interpolator(
              this.currentValues[key][prop],
              this.newInters[key][prop].value
            )
          }
          // Return the spring with the destination stepValue and spring config
          resolvedStyle[prop] = spring(this.stepValues[key][prop], this.newInters[key][prop].config)
        }
      }
      return {
        key,
        style: resolvedStyle,
        data: d
      }
    })

    const resolvedWillEnter = item => {
      // console.log(item)
      const key = item.key
      const resolvedStyle = willEnter(item.data, MagicSpring)

      // Make sure the list of items is instantiated
      this.currentValues[key] = this.currentValues[key] || {}
      this.newInters[key] = this.newInters[key] || {}
      this.currentStepValues[key] = this.currentStepValues[key] || {}
      this.stepValues[key] = this.stepValues[key] || {}
      this.stepInterpolators[key] = this.stepInterpolators[key] || {}

      for (let prop in resolvedStyle) {
        if (
          // If key is a non-numeric interpolation
          resolvedStyle[prop] &&
          resolvedStyle[prop].interpolator
        ) {

          this.currentValues[key][prop] = resolvedStyle[prop].value

          // Increment the stepInterValue for this prop by 1
          this.stepValues[key][prop] = this.currentStepValues[key][prop] + 1
          console.log('will enter', key, prop)

          // Set up the new interpolator
          this.stepInterpolators[key][prop] = this.newInters[key][prop].interpolator(
            this.currentValues[key][prop],
            this.newInters[key][prop].value
          )
          // Return the spring with the destination stepValue and spring config
          resolvedStyle[prop] = this.currentStepValues[key][prop]
        }
      }
      return resolvedStyle
    }

    const resolvedWillLeave = item => {
      const key = item.key
      const resolvedStyle = willLeave(item.data, MagicSpring)
      for (let prop in resolvedStyle) {
        if (
          // If prop is a non-numeric interpolation
          resolvedStyle[prop] &&
          resolvedStyle[prop].interpolator
        ) {
          // Make sure the steps start at 0
          this.currentValues[key][prop] = this.currentValues[key][prop] || 0
          this.currentStepValues[key][prop] = this.currentStepValues[key][prop] || 0
          if (
            // And the value has changed
            typeof this.newInters[key][prop] === 'undefined' ||
            resolvedStyle[prop].value !== this.newInters[key][prop].value
          ) {
            // Save the new value
            this.newInters[key][prop] = resolvedStyle[prop]

            // Increment the stepInterValue for this prop by 1
            this.stepValues[key][prop] = this.currentStepValues[key][prop] + 1
            console.log('will Leave', key, prop)

            // Set up the new interpolator
            this.stepInterpolators[key][prop] = this.newInters[key][prop].interpolator(
              this.currentValues[key][prop],
              this.newInters[key][prop].value
            )
          }
          // Return the spring with the destination stepValue and spring config
          resolvedStyle[prop] = spring(this.stepValues[key][prop], this.newInters[key][prop].config)
        }
      }
      return resolvedStyle
    }

    return (
      <TransitionMotion
        {...this.props}
        styles={resolvedStyles}
        willEnter={resolvedWillEnter}
        willLeave={resolvedWillLeave}
        // didLeave={item => {
        //   delete this.currentValues[item.key]
        //   delete this.newInters[item.key]
        //   delete this.currentStepValues[item.key]
        //   delete this.stepValues[item.key]
        //   delete this.stepInterpolators[item.key]
        // }}
      >
        {items => {
          const newItems = []
          items.forEach((item, i) => {
            const newValues = {}
            for (let prop in item.style) {
              if (this.stepValues[item.key][prop]) {
                // Save the currentStepValue
                this.currentStepValues[item.key][prop] = item.style[prop]
                // Figure the percentage
                let percentage = this.currentStepValues[item.key][prop] - this.stepValues[item.key][prop] + 1
                // Save the current value and replace the value in the interpolated object
                this.currentValues[item.key][prop] = newValues[prop] = this.stepInterpolators[item.key][prop](percentage)
              }
            }
            newItems[i] = {
              ...item,
              style: {
                ...item.style,
                ...newValues
              }
            }
          })
          return children(newItems)
        }}
      </TransitionMotion>
    )
  }
})
