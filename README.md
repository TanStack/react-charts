# react-charts

<a href="https://travis-ci.org/react-charts/react-charts" target="\_parent">
  <img alt="" src="https://travis-ci.org/react-charts/react-charts.svg?branch=master" />
</a>
<a href="https://npmjs.com/package/react-charts" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/react-charts.svg" />
</a>
<a href="https://react-chat-signup.herokuapp.com/" target="\_parent">
  <img alt="" src="https://img.shields.io/badge/slack-react--chat-blue.svg" />
</a>
<a href="https://github.com/react-charts/react-charts" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/react-charts/react-charts.svg?style=social&label=Star" />
</a>
<a href="https://twitter.com/tannerlinsley" target="\_parent">
  <img alt="" src="https://img.shields.io/twitter/follow/tannerlinsley.svg?style=social&label=Follow" />
</a>

Simple, immersive &amp; interactive charts for React

## Features

- Hyper Responsive
- Declarative & Deterministic
- Highly performant
- Built-in Animation (using React-Move)
- Flexible data model support
- Simple & powerful API

## [Demo](https://react-charts.js.org/#/story/line-chart)

## Table of Contents
- [Installation](#installation)
- [Quick Example](#quick-example)
- [Examples](https://react-charts.js.org)


## Installation
```bash
$ yarn add react-charts
```

## Quick Example
```javascript
import React from 'react'
import { Chart, Axis, Series, Tooltip, Cursor, Line } from 'react-charts'

const lineChart = (
  <Chart data={...}>
    <Axis
      primary
      type="time"
      position="bottom"
    />
    <Axis
      type="linear"
      position="left"
    />
    <Series type={Line} />
    <Tooltip />
    <Cursor primary />
    <Cursor />
  </Chart>
)
```

## Curve Types
All series types that support lines or curves can be configured to use any [curve function from `d3-shape`](https://github.com/d3/d3-shape#curves) by passing one of the following strings as the `curve` prop to a series component. You may also pass your own curve function directly from d3 or if you're feeling powerful, even create your own!

Note the following string correspond to their respective d3 curve functions but with the `curve` prefix removed.
- `basisClosed`
- `basisOpen`
- `basis`
- `bundle`
- `cardinalClosed`
- `cardinalOpen`
- `cardinal`
- `catmullRomClosed`
- `catmullRomOpen`
- `catmullRom`
- `linearClosed`
- `linear`
- `monotoneX` (default)
- `monotoneY`
- `natural`
- `step`
- `stepAfter`
- `stepBefore`

Example
```javascript
<Chart>
  ...
  <Series type={Line} curve='cardinal' />
</Chart>
```

## Contributing
To suggest a feature, create an issue if it does not already exist.
If you would like to help develop a suggested feature follow these steps:

- Fork this repo
- `$ yarn`
- `$ yarn run storybook`
- Implement your changes to files in the `src/` directory
- View changes as you code via our <a href="https://github.com/storybooks/react-storybook" target="\_parent">React Storybook</a> `localhost:8000`
- Make changes to stories in `/stories`, or create a new one if needed
- Submit PR for review

#### Scripts

- `$ yarn run storybook` Runs the storybook server
- `$ yarn run test` Runs the test suite
- `$ yarn run prepublish` Builds for NPM distribution
- `$ yarn run docs` Builds the website/docs from the storybook for github pages

<!-- ## Used By

<a href='https://nozzle.io' target="\_parent">
  <img src='https://nozzle.io/img/logo-blue.png' alt='Nozzle Logo' style='width:300px;'/>
</a> -->
