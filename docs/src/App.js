import React from 'react'
//
import ReactStory, { defaultProps } from 'react-story'

import 'react-resizable/css/styles.css'
import './stories/utils/prism.css'
import bannerImg from '../../media/banner.png'

import Readme from './stories/Readme.js'
import LineChart from './stories/LineChart.js'
import AreaChart from './stories/AreaChart.js'
import BarChart from './stories/BarChart.js'
import ColumnChart from './stories/ColumnChart.js'
import CustomStyles from './stories/CustomStyles.js'
import CustomTooltip from './stories/CustomTooltip.js'
import Cursors from './stories/Cursors.js'
import CustomCursors from './stories/CustomCursors.js'
import InteractionModes from './stories/InteractionModes.js'
import DynamicParent from './stories/DynamicParent.js'
import Sparklines from './stories/Sparklines.js'
import MixedTypes from './stories/MixedTypes.js'
import DoughnutChart from './stories/DoughnutChart.js'

export default class App extends React.Component {
  render() {
    return (
      <ReactStory
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
        pathPrefix='story/'
        StoryWrapper={props =>
          <defaultProps.StoryWrapper
            css={{
              padding: 0
            }}
          >
            <a
              href='//github.com/tannerlinsley/react-charts'
              style={{
                display: 'block',
                textAlign: 'center',
                borderBottom: 'solid 3px #cccccc'
              }}
            >
              <img
                src={bannerImg}
                alt='React Charts Logo'
                style={{
                  width: '100px'
                }}
              />
            </a>
            <div
              {...props}
              style={{
                padding: '10px'
              }}
            />
          </defaultProps.StoryWrapper>}
        stories={[
          { name: 'Readme & Documentation', component: Readme },
          { name: 'Line Chart', component: LineChart },
          { name: 'Area Chart', component: AreaChart },
          { name: 'Bar Chart', component: BarChart },
          { name: 'Column Chart', component: ColumnChart },
          { name: 'Custom Styles', component: CustomStyles },
          { name: 'Custom Tooltip', component: CustomTooltip },
          { name: 'Cursors', component: Cursors },
          { name: 'Custom Cursors', component: CustomCursors },
          { name: 'Interaction Modes', component: InteractionModes },
          { name: 'Dynamic Parent', component: DynamicParent },
          { name: 'Sparklines', component: Sparklines },
          { name: 'Mixed Element Types', component: MixedTypes },
          { name: 'Doughnut Chart', component: DoughnutChart }
        ]}
      />
    )
  }
}
