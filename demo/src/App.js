import React from 'react'
//
import ReactStory from 'react-story'

import 'react-resizable/css/styles.css'
import './stories/utils/prism.css'

import LineChart from './stories/LineChart.js'
import AreaChart from './stories/AreaChart.js'
import BarChart from './stories/BarChart.js'
import ColumnChart from './stories/ColumnChart.js'
import CustomStyles from './stories/CustomStyles.js'
import CustomTooltip from './stories/CustomTooltip.js'
import Cursors from './stories/Cursors.js'
import Brushing from './stories/Brushing.js'
import CustomCursors from './stories/CustomCursors.js'
import InteractionModes from './stories/InteractionModes.js'
import DynamicParent from './stories/DynamicParent.js'
import Sparklines from './stories/Sparklines.js'
import MixedTypes from './stories/MixedTypes.js'
import DoughnutChart from './stories/DoughnutChart.js'

export default class App extends React.Component {
  render () {
    return (
      <ReactStory
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        pathPrefix="story/"
        stories={[
          { name: 'Line Chart', component: LineChart },
          { name: 'Area Chart', component: AreaChart },
          { name: 'Bar Chart', component: BarChart },
          { name: 'Column Chart', component: ColumnChart },
          { name: 'Custom Styles', component: CustomStyles },
          { name: 'Custom Tooltip', component: CustomTooltip },
          { name: 'Cursors', component: Cursors },
          { name: 'Brushing', component: Brushing },
          { name: 'Custom Cursors', component: CustomCursors },
          { name: 'Interaction Modes', component: InteractionModes },
          { name: 'Dynamic Parent', component: DynamicParent },
          { name: 'Sparklines', component: Sparklines },
          { name: 'Mixed Element Types', component: MixedTypes },
          { name: 'Doughnut Chart', component: DoughnutChart },
        ]}
      />
    )
  }
}
