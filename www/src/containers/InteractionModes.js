import React, { Component } from 'react'
import Tree from 'react-json-tree'
//
import ChartConfig from 'components/ChartConfig'

import { Chart } from '../../../dist'

class Story extends Component {
  state = {
    clicked: null,
    focused: null,
    hovered: null,
  }
  render () {
    const { clicked, focused, hovered } = this.state
    return (
      <div>
        <ChartConfig show={['elementType', 'groupMode']} useR>
          {({ elementType, groupMode, data }) => (
            <Chart
              data={data}
              groupMode={groupMode}
              type={elementType}
              axes={[
                { primary: true, position: 'bottom', type: 'time' },
                { position: 'left', type: 'linear' },
              ]}
              primaryCursor
              secondaryCursor
              tooltip
              onClick={datum => this.setState({ clicked: datum })}
              onFocus={datum => this.setState({ focused: datum })}
              onHover={pointer => this.setState({ hovered: pointer })}
            />
          )}
        </ChartConfig>
        <div>Clicked:</div>
        <Tree hideRoot data={clicked} />
        <div>Hovered:</div>
        <Tree hideRoot data={hovered} />
        <div>Focused:</div>
        <Tree hideRoot data={focused} />
      </div>
    )
  }
}

export default () => <Story />
