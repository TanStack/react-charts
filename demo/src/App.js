import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import styled from 'styled-components'
//

import 'react-resizable/css/styles.css'

import LineChart from './stories/LineChart.js'
import BubbleChart from './stories/BubbleChart.js'
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

const stories = [
  { name: 'Line Chart', slug: 'line', component: LineChart },
  { name: 'Bubble Chart', slug: 'bubble', component: BubbleChart },
  { name: 'Area Chart', slug: 'area', component: AreaChart },
  { name: 'Bar Chart', slug: 'bar', component: BarChart },
  { name: 'Column Chart', slug: 'column', component: ColumnChart },
  { name: 'Custom Styles', slug: 'custom-styles', component: CustomStyles },
  { name: 'Custom Tooltip', slug: 'custom-tooltip', component: CustomTooltip },
  { name: 'Cursors', slug: 'cursors', component: Cursors },
  { name: 'Brushing', slug: 'brushing', component: Brushing },
  { name: 'Custom Cursors', slug: 'custom-cursors', component: CustomCursors },
  { name: 'Interaction Modes', slug: 'interaction-modes', component: InteractionModes },
  { name: 'Dynamic Parent', slug: 'dynamic-parent', component: DynamicParent },
  { name: 'Sparkline', slug: 'sparkline', component: Sparklines },
  { name: 'Mixed Element Types', slug: 'mixed-element-types', component: MixedTypes },
  { name: 'Doughnut Chart', slug: 'doughnut', component: DoughnutChart },
]

const Styles = styled.div`
  display: flex;
  align-items: top;
  height: 100%;

  a {
    text-decoration: none;
    color: rgb(0%, 48.4%, 74%);
    padding: 1rem 0;
  }

  .sidebar {
    flex: 0 0 220px;
    border-right: 2px solid grey;
    display: flex;
    flex-direction: column;
    align-items: center;

    > a {
      width: 100%;
      border-bottom: 3px solid rgba(0, 0, 0, 0.2);
      text-align: center;
    }

    ul {
      margin: 0;
      padding: 0;
      align-self: stretch;
      list-style-type: none;

      li {
        list-style-type: none;

        a {
          display: block;
          padding: 0.4rem 0.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);

          :hover {
            background: rgba(0, 0, 0, 0.05);
          }
        }
      }
    }
  }

  .content {
    flex: 1;
    padding: 1rem;
  }
`

export default class App extends React.Component {
  render () {
    return (
      <Router>
        <Styles>
          <div className="sidebar">
            <a href="https://github.com/react-tools/react-charts">React-Charts</a>
            <ul>
              {stories.map(story => (
                <li key={story.slug}>
                  <Link to={`/${story.slug}`}>{story.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="content">
            {stories.map(story => (
              <Route key={story.slug} path={`/${story.slug}`} exact component={story.component} />
            ))}
          </div>
        </Styles>
      </Router>
    )
  }
}
