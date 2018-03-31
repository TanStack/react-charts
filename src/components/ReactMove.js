import React from 'react'
import { NodeGroup as RMNodeGroup, Animate as RMAnimate } from 'react-move'
import { easeCubicOut } from 'd3-ease'

const timing = {
  duration: 300,
  ease: easeCubicOut,
}

export const NodeGroup = props => <RMNodeGroup timing={timing} {...props} />
export const Animate = props => <RMAnimate timing={timing} {...props} />
