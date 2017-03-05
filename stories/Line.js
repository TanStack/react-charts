import React, { Component } from 'react'
import _ from 'lodash'
import { LineChart } from '../src'
//
// import CodeHighlight from './components/codeHighlight.js'

class Line extends Component {
  constructor () {
    super()
    this.state = {
      data: makeData()
    }
  }
  render () {
    const {
      data
    } = this.state
    return (
      <div>
        <button
          onClick={() => this.setState({
            data: makeData()
          })}
        >
          Randomize Data
        </button>

        <br />
        <br />

        {_.range(1).map((d, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              height: '400px'
            }}
          >
            <LineChart
              data={data}
            />
          </div>
        ))}
        
        <br />
        <br />
      </div>
    )
  }
}

export default () => <Line />

function makeData () {
  return _.map(_.range(5), d => makeSeries())
}

function makeSeries () {
  // const length = Math.round(Math.random() * 30)
  const length = 10
  // const multiplier = 10
  const multiplier = Math.round((Math.random() * 10) + 3)
  return _.map(_.range(length), d => ({
    x: d * multiplier,
    y: Math.round(Math.random() * 100)
  }))
}
