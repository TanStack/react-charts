import React, { Component } from 'react'
import _ from 'lodash'
import { spring } from 'react-motion'
//
import Animate from '../src/utils/Animate'
//
import CodeHighlight from './components/codeHighlight.js'

class Line extends Component {
  constructor () {
    super()
    this.state = makeState()
  }
  render () {
    return (
      <div>
        <p>
          The "Animate" component, inspired by react-motion, can animate anything you throw at it.
        </p>

        <br />
        <br />

        <button
          onClick={() => this.setState(makeState())}
        >
          Randomize Data
        </button>

        <br />
        <br />

        <div
          style={{
            height: '500px'
          }}
        >
          <Animate
            default={{
              scale: 0,
              color: 'blue',
              rotate: 0
            }}
            data={this.state}
            duration={700}
          >
            {data => {
              return (
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    borderRadius: ((data.rotate / 360) * 100) + 'px',
                    transform: `translate(${data.scale * 50}%, ${data.scale * 50}%) scale(${data.scale}) rotate(${data.rotate}deg)`,
                    background: data.color
                  }}
                >
                  {Math.round(data.scale * 100) / 100}
                </div>
              )
            }}
          </Animate>
        </div>

        <br />
        <br />

        Code:
        <CodeHighlight>{() => `
TDB
        `}</CodeHighlight>

        <br />
        <br />
      </div>
    )
  }
}

export default () => <Line />

function makeState () {
  const colorNum = Math.random()
  const color = colorNum > 0.6 ? 'red' : colorNum > 0.3 ? 'gold' : 'blue'
  return {
    scale: spring(Math.random() * 5),
    color: spring(color),
    rotate: spring(Math.random() > 0.5 ? 360 : 0)
  }
}
