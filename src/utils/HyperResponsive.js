import React from 'react'
import 'javascript-detect-element-resize'
//
import throttle from '../utils/throttle'

export default function HyperResponsive (WrappedComponent) {
  return React.createClass({
    getInitialState () {
      return {
        ready: false,
        width: 0,
        height: 0
      }
    },
    componentWillMount () {
      this.resize = throttle(this.resize, 16)
    },
    componentDidMount () {
      window.addResizeListener(this.el, this.resize)
      this.resize()
    },
    componentWillUnmount () {
      window.removeResizeListener(this.el, this.resize)
    },
    resize (e) {
      this.setState({
        ready: true,
        width: parseInt(window.getComputedStyle(this.el).width),
        height: parseInt(window.getComputedStyle(this.el).height)
      })
    },
    render () {
      const {
        style,
        ...rest
      } = this.props
      const {
        ready,
        width,
        height
      } = this.state
      return (
        <div
          className='ResponsiveWrapper'
          ref={el => { this.el = el }}
          style={{
            width: '100%',
            height: '100%',
            ...style
          }}
        >
          {ready && (
            <WrappedComponent
              width={width}
              height={height}
              {...rest}
            />
          )}
        </div>
      )
    }
  })
}
