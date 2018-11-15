import React from 'react'
import { Router } from '@reach/router'
//
import Sidebar from 'components/Sidebar'

import LineChart from 'containers/LineChart'
import BubbleChart from 'containers/BubbleChart'
import AreaChart from 'containers/AreaChart'
import BarChart from 'containers/BarChart'
import ColumnChart from 'containers/ColumnChart'
import AxisOptions from 'containers/AxisOptions'
import CustomStyles from 'containers/CustomStyles'
import CustomTooltip from 'containers/CustomTooltip'
import Cursors from 'containers/Cursors'
import SyncedCursors from 'containers/SyncedCursors'
import Brushing from 'containers/Brushing'
import CustomCursors from 'containers/CustomCursors'
import InteractionModes from 'containers/InteractionModes'
import TooltipAnchor from 'containers/TooltipAnchor'
import DynamicParent from 'containers/DynamicParent'
import Sparklines from 'containers/Sparklines'
import MixedTypes from 'containers/MixedTypes'
import MultipleAxes from 'containers/MultipleAxes'
// import DoughnutChart from 'containers/DoughnutChart'
import DarkMode from 'containers/DarkMode'

const sidebarItems = [
  { title: 'Line Chart', link: './line' },
  { title: 'Bubble Chart', link: './bubble' },
  { title: 'Area Chart', link: './area' },
  { title: 'Bar Chart', link: './bar' },
  { title: 'Column Chart', link: './column' },
  { title: 'Axis Options', link: './axis-options' },
  { title: 'Custom Styles', link: './custom-styles' },
  { title: 'Custom Tooltip', link: './custom-tooltip' },
  { title: 'Cursors', link: './cursors' },
  { title: 'Synced Cursors', link: './synced-cursors' },
  { title: 'Brushing', link: './brushing' },
  { title: 'Custom Cursors', link: './custom-cursors' },
  { title: 'Interaction Modes', link: './interaction-modes' },
  { title: 'Tooltip Anchor', link: './tooltip-anchor' },
  { title: 'Dynamic Parent', link: './dynamic-parent' },
  { title: 'Sparklines', link: './sparkline' },
  { title: 'Mixed Types', link: './mixed-element-types' },
  { title: 'Multiple Axes', link: './multiple-axes' },
  // { title: 'Doughnut Chart', link: './doughnut' },
  { title: 'Dark Mode', link: './dark' },
]

export default function () {
  return (
    <Sidebar items={sidebarItems}>
      <Router>
        <LineChart path="/line" />
        <BubbleChart path="/bubble" />
        <AreaChart path="/area" />
        <BarChart path="/bar" />
        <ColumnChart path="/column" />
        <AxisOptions path="/axis-options" />
        <CustomStyles path="/custom-styles" />
        <CustomTooltip path="/custom-tooltip" />
        <Cursors path="/cursors" />
        <SyncedCursors path="/synced-cursors" />
        <Brushing path="/brushing" />
        <CustomCursors path="/custom-cursors" />
        <InteractionModes path="/interaction-modes" />
        <TooltipAnchor path="/tooltip-anchor" />
        <DynamicParent path="/dynamic-parent" />
        <Sparklines path="/sparkline" />
        <MixedTypes path="/mixed-element-types" />
        <MultipleAxes path="/multiple-axes" />
        {/* <DoughnutChart path="/doughnut" /> */}
        <DarkMode path="/dark" />
      </Router>
    </Sidebar>
  )
}
