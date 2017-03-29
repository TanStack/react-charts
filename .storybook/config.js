import React from 'react'
import { configure, storiesOf } from '@kadira/storybook'

import './reset.css'
import './fonts.css'
import './layout.css'
import '../stories/utils/prism.css'
import 'react-resizable/css/styles.css'
import 'github-markdown-css/github-markdown.css'
//
import Readme from '../README.md'
//
import LineChart from '../stories/LineChart.js'
import AreaChart from '../stories/AreaChart.js'
import ColumnChart from '../stories/ColumnChart.js'
import BarChart from '../stories/BarChart.js'
import StackedColumnChart from '../stories/StackedColumnChart.js'
import CustomStyles from '../stories/CustomStyles.js'
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
    .add('Column Chart', ColumnChart)
    .add('Bar Chart', BarChart)
    .add('Stacked Column Chart', StackedColumnChart)
    .add('Custom Styles', CustomStyles)
}, module)
