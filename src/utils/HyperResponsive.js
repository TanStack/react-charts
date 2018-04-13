import React, { Component } from 'react'
//
import Utils from '../utils/Utils'

if (typeof document !== 'undefined') {
  require('javascript-detect-element-resize')
}

export default class HyperResponsive extends Component {
  constructor () {
    super()
    this.state = {
      width: 0,
      height: 0,
    }
  }
  componentDidMount () {
    if (!this.resizeListener && this.el) {
      this.resizeListener = window.addResizeListener(this.el.parentElement, this.resize)
    }
    this.resize()
  }
  componentWillUnmount () {
    if (this.resizeListener) {
      window.removeResizeListener(this.el.parentElement, this.resize)
    }
  }
  resize = Utils.throttle(() => {
    const computed = window.getComputedStyle(this.el.parentElement)

    const {
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      boxSizing,
      borderTopWidth,
      borderLeftWidth,
    } = computed

    let { width, height } = computed

    width = parseInt(width)
    height = parseInt(height)

    if (boxSizing === 'border-box') {
      width -= parseInt(paddingLeft)
      width -= parseInt(paddingRight)

      height -= parseInt(paddingTop)
      height -= parseInt(paddingBottom)

      width -= parseInt(borderLeftWidth)
      height -= parseInt(borderTopWidth)
    }

    this.setState({
      width,
      height,
    })
  })
  handleRef = el => {
    this.el = el
  }
  render () {
    const { render, children } = this.props
    const { width, height } = this.state
    const { handleRef } = this

    return (render || children)({
      handleRef,
      width,
      height,
    })
  }
}
