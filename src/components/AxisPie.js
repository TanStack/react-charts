import { PureComponent } from 'react'
import { Connect } from 'react-state'
//
import Selectors from '../utils/Selectors'

// const fontSize = 10

export const positionTop = 'top'
export const positionRight = 'right'
export const positionBottom = 'bottom'
export const positionLeft = 'left'

class AxisPie extends PureComponent {
  static defaultProps = {
    tickArguments: [],
    tickValues: null,
    tickFormat: null,
    tickSizeInner: 6,
    tickSizeOuter: 6,
    tickPadding: 3,
    cutoutPercentage: 0.5,
    outerPadding: 10,
    cornerRadius: 1,
    arcPadding: 0.2,
    seriesPadding: 0.2,
  }
  // Lifecycle
  constructor () {
    super()
    // this.measure = measure.bind(this)
    this.updateScale = this.updateScale.bind(this)
  }
  componentWillReceiveProps (newProps) {
    const oldProps = this.props

    // If any of the following change,
    // we need to update the axis
    if (
      newProps.materializedData !== oldProps.materializedData ||
      newProps.height !== oldProps.height ||
      newProps.width !== oldProps.width
    ) {
      this.updateScale(newProps)
    }
  }
  componentDidMount () {
    this.updateScale(this.props)
    // this.measure()
  }
  shouldComponentUpdate (newProps) {
    if (newProps.axis !== this.props.axis) {
      return true
    }
    return false
  }
  componentDidUpdate () {
    // RAF(() => {
    //   if (!this.measure()) {
    //     window.setTimeout(() => this.componentDidUpdate(), 1)
    //   }
    // })
  }
  updateScale (props) {
    const {
      type,
      id,
      materializedData,
      cutoutPercentage,
      width,
      height,
      dispatch,
      outerPadding,
      cornerRadius,
      arcPadding,
      seriesPadding,
    } = props
    // We need the data to proceed
    if (!materializedData) {
      return
    }

    const radius = Math.min(width, height) / 2 - outerPadding

    // This arc is going to be used for label placement
    // const arc = Arc().outerRadius(radius).innerRadius(radius * cutoutPercentage)

    const scale = d => d

    const primaryAxis = {
      id,
      scale,
      cutoutPercentage,
      type,
      primary: true,
      width,
      height,
      radius,
      cornerRadius,
      arcPadding,
      seriesPadding,
    }

    const secondaryAxis = {
      id,
      scale,
      type,
    }

    dispatch(
      state => ({
        ...state,
        axes: {
          pie_primary: primaryAxis,
          pie_secondary: secondaryAxis,
        },
      }),
      {
        type: 'axisUpdateScale',
      }
    )
  }
  render () {
    // TODO: This is where permanent labels and lines will be drawn
    return null
  }
}

export default Connect(
  () => {
    const selectors = {
      gridWidth: Selectors.gridWidth(),
      gridHeight: Selectors.gridHeight(),
    }
    return (state, props) => {
      return {
        materializedData: state.materializedData,
        width: selectors.gridWidth(state),
        height: selectors.gridHeight(state),
      }
    }
  },
  {
    filter: (oldState, newState, meta) => {
      return meta.type !== 'cursor'
    },
  }
)(AxisPie)
