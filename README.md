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

- **1kb!** (minified)

## [Demo](https://react-charts.js.org/?selectedKind=2.%20Demos&selectedStory=Kitchen%20Sink&full=0&down=0&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)

## Table of Contents
- [Installation](#installation)
- [Example](#example)

## Installation
```bash
$ yarn add react-charts
```

## Example
```javascript
import React from 'react'
import { Line } from 'react-charts'

const myChart = (
  <Line
    data={[...]}
  />
)
```

```javascript
import React from 'react'
import { Chart, Axis, Scale, Series, Toltip } from 'react-charts'

const myCustomChart = (
  <Chart>
    <Axis>
      <Scale>
        <Series />
        <Series />
        <Series />
      </Scale>
    </Axis>
    <Tooltip />
  </Chart>
)
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
