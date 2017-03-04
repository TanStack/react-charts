import React from 'react'

export default (children, props) => {
  return React.Children.map(children, child => {
    return React.cloneElement(child, typeof props === 'function' ? props(child) : props)
  })
}
