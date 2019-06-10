import React from 'react'
import { Router } from '@reach/router'
//
import Sidebar from 'components/Sidebar'

const sidebarItems = [
  {
    title: 'Line Chart',
    path: 'line',
    component: require('containers/LineChart').default
  },
  {
    title: 'Bubble Chart',
    path: 'bubble',
    component: require('containers/BubbleChart').default
  },
  {
    title: 'Area Chart',
    path: 'area',
    component: require('containers/AreaChart').default
  },
  {
    title: 'Bar Chart',
    path: 'bar',
    component: require('containers/BarChart').default
  },
  {
    title: 'Column Chart',
    path: 'column',
    component: require('containers/ColumnChart').default
  },
  {
    title: 'Axis Options',
    path: 'axis-options',
    component: require('containers/AxisOptions').default
  },
  {
    title: 'Custom Styles',
    path: 'custom-styles',
    component: require('containers/CustomStyles').default
  },
  {
    title: 'Custom Tooltip',
    path: 'custom-tooltip',
    component: require('containers/CustomTooltip').default
  },
  {
    title: 'Cursors',
    path: 'cursors',
    component: require('containers/Cursors').default
  },
  {
    title: 'Synced Cursors',
    path: 'synced-cursors',
    component: require('containers/SyncedCursors').default
  },
  {
    title: 'Brushing',
    path: 'brushing',
    component: require('containers/Brushing').default
  },
  {
    title: 'Custom Cursors',
    path: 'custom-cursors',
    component: require('containers/CustomCursors').default
  },
  {
    title: 'Grouping Modes',
    path: 'grouping-modes',
    component: require('containers/GroupingModes').default
  },
  {
    title: 'Tooltip Options',
    path: 'tooltip-options',
    component: require('containers/TooltipOptions').default
  },
  {
    title: 'Dynamic Parent',
    path: 'dynamic-parent',
    component: require('containers/DynamicParent').default
  },
  {
    title: 'Sparklines',
    path: 'sparkline',
    component: require('containers/Sparklines').default
  },
  {
    title: 'Mixed Types',
    path: 'mixed-element-types',
    component: require('containers/MixedTypes').default
  },
  {
    title: 'Multiple Axes',
    path: 'multiple-axes',
    component: require('containers/MultipleAxes').default
  },
  // { title: 'Doughnut Chart', path: 'doughnut', component: require('containers/DoughnutChart') /.default* },
  {
    title: 'Dark Mode',
    path: 'dark',
    component: require('containers/DarkMode').default
  },
  {
    title: 'Stress Test',
    path: 'stress-test',
    component: require('containers/StressTest').default
  }
]

export default function() {
  return (
    <Sidebar items={sidebarItems}>
      <Router>
        {sidebarItems.map(d => (
          <d.component key={d.path} path={d.path} />
        ))}
      </Router>
    </Sidebar>
  )
}
