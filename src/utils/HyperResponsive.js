import React from 'react'
//
import Utils from '../utils/Utils'
import onResize from './detectElementResize'

export default class HyperResponsive extends React.Component {
  constructor () {
    super()
    this.state = {
      width: 0,
      height: 0,
    }
  }
  componentDidMount () {
    if (!this.resizeListener && this.el && this.el.parentElement) {
      this.resizeListener = onResize(this.el.parentElement, this.resize)
    }
    this.resize()
  }
  componentWillUnmount () {
    if (this.resizeListener) {
      this.resizeListener()
    }
  }
  resize = Utils.throttle(() => {
    if (!this.el) {
      return
    }
    const computed = window.getComputedStyle(this.el.parentElement)

    const {
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      boxSizing,
      borderTopWidth,
      borderLeftWidth,
      borderRightWidth,
      borderBottomWidth,
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
      width -= parseInt(borderRightWidth)
      height -= parseInt(borderTopWidth)
      height -= parseInt(borderBottomWidth)
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
