import React, { Component } from 'react'
import _ from 'lodash'
//
import AnimatedGroup from '../src/components/AnimatedGroup'
//
// import CodeHighlight from './components/codeHighlight.js'

class Line extends Component {
  constructor () {
    super()
    this.state = {
      items: makeItems()
    }
  }
  render () {
    const {
      items
    } = this.state
    return (
      <div>
        <button
          onClick={() => this.setState({
            items: makeItems()
          })}
        >
          Randomize Data
        </button>

        <br />
        <br />

        <AnimatedGroup
          data={items}
          getKey={d => d.value}
        >
          {inter => (
            <ul>
              {inter.map(d => (
                <li key={d.key}>
                  {JSON.stringify(d, null, 2)}
                </li>
              ))}
            </ul>
          )}
        </AnimatedGroup>

        <br />
        <br />
      </div>
    )
  }
}

export default () => <Line />

function makeItems () {
  return _.filter(
    _.map(_.range(10), d => ({
      value: d
    })),
    (d, i) => i > Math.random() * 10
  )
}
