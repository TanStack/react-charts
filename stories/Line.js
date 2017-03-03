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

        {_.range(10).map((d, i) => (
          <LineChart
            key={d}
            data={data}
            width={500}
            height={70}
          />
        ))}

        <br />
        <br />
        {/* <pre><code>{JSON.stringify(data, null, 2)}</code></pre> */}
      </div>
    )
  }
}

export default () => <Line />

function makeData () {
  return _.map(_.range(4), d => makeSeries())
}

function makeSeries () {
  // const length = Math.round(Math.random() * 30)
  const length = 30
  const multiplier = Math.round(Math.random() * 10)
  return _.map(_.range(length), d => ({
    x: d * multiplier,
    y: Math.round(Math.random() * 100)
  }))
}
