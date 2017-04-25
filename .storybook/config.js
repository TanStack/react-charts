import React from 'react'
import { configure, storiesOf } from '@kadira/storybook'
import Perf from 'react-addons-perf'

window.Perf = Perf

import '../stories/utils/prism.css'
import 'react-resizable/css/styles.css'
import 'github-markdown-css/github-markdown.css'
import './reset.css'
import './fonts.css'
import './layout.css'
//
import Readme from '../README.md'
//
import LineChart from '../stories/LineChart.js'
import AreaChart from '../stories/AreaChart.js'
import BarChart from '../stories/BarChart.js'
import ColumnChart from '../stories/ColumnChart.js'
import CustomStyles from '../stories/CustomStyles.js'
import CustomTooltip from '../stories/CustomTooltip.js'
import Cursors from '../stories/Cursors.js'
import CustomCursors from '../stories/CustomCursors.js'
import InteractionModes from '../stories/InteractionModes.js'
import DynamicParent from '../stories/DynamicParent.js'
import Sparklines from '../stories/Sparklines.js'
import MixedTypes from '../stories/MixedTypes.js'
//
configure(() => {
  storiesOf('1. Docs')
    .add('Readme', () => {
      const ReadmeCmp = React.createClass({
        render () {
          return <span className='markdown-body' dangerouslySetInnerHTML={{__html: Readme}} />
        },
        componentDidMount () {
          global.Prism && global.Prism.highlightAll()
        }
      })
      return <ReadmeCmp />
    })
  storiesOf('2. Demos')
    .add('Line Chart', LineChart)
    .add('Area Chart', AreaChart)
    .add('Bar Chart', BarChart)
    .add('Column Chart', ColumnChart)
    .add('Custom Styles', CustomStyles)
    .add('Custom Tooltip', CustomTooltip)
    .add('Cursors', Cursors)
    .add('Custom Cursors', CustomCursors)
    .add('Interaction Modes', InteractionModes)
    .add('Dynamic Parent', DynamicParent)
    .add('Sparklines', Sparklines)
    .add('Mixed Element Types', MixedTypes)
}, module)
