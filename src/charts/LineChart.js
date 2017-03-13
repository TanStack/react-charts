import React from 'react'
//
import Chart from '../components/Chart'

const getX = d => Array.isArray(d) ? d[0] : d.x
const getY = d => Array.isArray(d) ? d[1] : d.y

export default (props) => {
  return (
    <Chart
      type='line'
      getX={getX}
      getY={getY}
      // padding={{
      //   left: 40,
      //   right: 10,
      //   top: 10,
      //   bottom: 20
      // }}
      {...props}
    />
  )
}
