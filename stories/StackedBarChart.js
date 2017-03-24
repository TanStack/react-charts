import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
import { Chart, Scale, Axis, Data } from '../src'
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
          <ResizableBox
            key={i}
            width={500}
            height={300}
          >
            <Chart
              data={data}
              getSeries={d => d.data}
              getX={d => d.x}
              getY='nested.y'
              getR={['nested', 'r']}
            >
              {/* Axes */}
              <Axis
                primary
                type='linear'
                position='bottom'
                centerTicks
                stackPadding={0.1}
              />
              <Axis
                type='linear'
                position='left'
                stacked
              />

              {/* Simple config */}
              <Data
                type='bar'
                seriesKey={(s, i) => s.label}
              />

              {/* Per series */}
              {/* <Data>
                {data => (
                  <Series />
                )}
              </Data> */}

              {/* Per series, per group */}
              {/* <Data>
                {data => (
                  <Group>
                    {series => (
                      <Series />
                    )}
                  </Group>
                )}
              </Data> */}

            </Chart>
          </ResizableBox>
        ))}

        <br />
        <br />
      </div>
    )
  }
}

export default () => <Line />

function makeData () {
  return _.map(_.range(Math.max(Math.round((Math.random() * 4)), 2)), makeSeries)
}

function makeSeries (d, i) {
  // const length = Math.round(Math.random() * 30)
  const length = 30
  const max = 100
  // const max = Math.random() > 0.5 ? 100000 : 10
  const multiplier = 1
  // const multiplier = Math.round((Math.random() * 10) + Math.round(Math.random() * 50))
  return {
    label: 'Dataset ' + i + 1,
    data: _.map(_.range(length), d => ({
      x: d * multiplier,
      nested: {
        y: Math.round(Math.random() * (max) + Math.round(Math.random() * 50)),
        r: Math.round(Math.random() * 10)
      }
    }))
  }
}
