import { reloadRoutes, normalizeRoutes } from 'react-static/node'
import fs from 'fs-extra'
import nodePath from 'path'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import chokidar from 'chokidar'

//

// TODO: What is the name of your project?
const repoName = 'React Charts'
// TODO: Point this to your repo
const repo = 'react-tools/react-charts'
// TODO: Point this to your package.json
const packagePath = '../package.json' // will probably be '../package.json'
// TODO: Point this to your README.md
const readmePath = '../README.md' // will probably be '../README.md'
// TODO: Point this to your docs folder
const docsPath = '../docs' // will probably be '../docs'

const menu = [
  {
    path: '/',
    title: 'Home',
    component: 'src/containers/Home',
  },
  {
    path: 'docs',
    title: 'Readme',
    markdownSrc: readmePath,
  },
  {
    path: 'examples',
    title: 'Examples',
    children: [
      {
        path: 'line',
        title: 'Line Chart',
        component: 'src/examples/LineChart',
      },
      {
        path: 'bubble',
        title: 'Bubble Chart',
        component: 'src/examples/BubbleChart',
      },
      {
        path: 'area',
        title: 'Area Chart',
        component: 'src/examples/AreaChart',
      },
      {
        path: 'bar',
        title: 'Bar Chart',
        component: 'src/examples/BarChart',
      },
      {
        path: 'column',
        title: 'Column Chart',
        component: 'src/examples/ColumnChart',
      },
      {
        path: 'axis-options',
        title: 'Axis Options',
        component: 'src/examples/AxisOptions',
      },
      {
        path: 'custom-styles',
        title: 'Custom Styles',
        component: 'src/examples/CustomStyles',
      },
      {
        path: 'custom-tooltip',
        title: 'Custom Tooltip',
        component: 'src/examples/CustomTooltip',
      },
      {
        path: 'cursors',
        title: 'Cursors',
        component: 'src/examples/Cursors',
      },
      {
        path: 'synced-cursors',
        title: 'Synced Cursors',
        component: 'src/examples/SyncedCursors',
      },
      {
        path: 'brushing',
        title: 'Brushing',
        component: 'src/examples/Brushing',
      },
      {
        path: 'custom-cursors',
        title: 'Custom Cursors',
        component: 'src/examples/CustomCursors',
      },
      {
        path: 'interaction-modes',
        title: 'Interaction Modes',
        component: 'src/examples/InteractionModes',
      },
      {
        path: 'dynamic-parent',
        title: 'Dynamic Parent',
        component: 'src/examples/DynamicParent',
      },
      {
        path: 'sparkline',
        title: 'Sparkline',
        component: 'src/examples/Sparklines',
      },
      {
        path: 'mixed-element-types',
        title: 'Mixed Element Types',
        component: 'src/examples/MixedTypes',
      },
      {
        path: 'multiple-axes',
        title: 'Multiple Axes',
        component: 'src/examples/MultipleAxes',
      },
      {
        path: 'doughnut',
        title: 'Doughnut Chart',
        component: 'src/examples/DoughnutChart',
      },
    ],
  },
]

// Watch markdown files you use and hot-load the changes
chokidar.watch(readmePath).on('all', () => reloadRoutes())
chokidar.watch(docsPath).on('all', () => reloadRoutes())
// Form the full repoURL
const repoURL = `https://github.com/${repo}`
// Set the version
// eslint-disable-next-line
process.env.REPO_VERSION = require(nodePath.resolve(packagePath)).version

export default {
  disableDuplicateRoutesWarning: true,
  // bundleAnalyzer: true,
  getSiteData: () => ({
    // This is the sidebar menu on docs pages
    pages: menuToRoutes(menu),
    repo,
    repoURL,
    repoName,
  }),
  getRoutes: () => [
    ...menuToRoutes(menu),
    {
      is404: true,
      component: 'src/containers/404',
    },
  ],
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i"
              rel="stylesheet"
            />
            {renderMeta.styleTags}
            <title>{repoName}</title>
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}

function menuToRoutes (items) {
  // Normalize the routes with react-static's normalizer. Make sure it still returns
  // a tree, so we can use it as the sidebar structure. This will also
  // give us routes with full paths at each nesting level we can use in the menu
  const normalizedRoutes = normalizeRoutes(items, {
    tree: true,
    force404: false,
    disableDuplicateRoutesWarning: true,
  })

  // console.log(normalizedRoutes)

  // Now we need to use the title, markdown and component info to set up the right
  // components and routeData
  const mapWithComponentsAndData = items =>
    items.map(({
      path, originalPath, component, markdownSrc, title, children = [], ...rest
    }) => ({
      ...rest,
      fullPath: path,
      title,
      path: originalPath,
      component:
        component || // Use the defined component if it exists
        (markdownSrc && 'src/containers/Doc'), // Use the Doc template for markdown files
      getData: () => ({
        // Pass the page title
        title,
        // Parse the markdown
        markdown: markdownSrc && readFileContents(markdownSrc),
        // Construct the edit path
        editPath: nodePath.join(
          repoURL,
          'blob/master',
          __dirname.split('/').pop(),
          component || markdownSrc || ''
        ),
      }),
      children: mapWithComponentsAndData(children),
    }))

  return mapWithComponentsAndData(normalizedRoutes)
}

function readFileContents (src) {
  return fs.readFileSync(nodePath.resolve(src), 'utf8')
}
