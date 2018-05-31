import { positionTop, positionBottom } from './AxisLinear'

const fontSize = 10

const getPixel = d => d
const radiansToDegrees = r => r * (180 / Math.PI)

export default function measure () {
  // Measure finds the amount of overflow this axis produces and
  // updates the margins to ensure that the axis is visibility
  // Unfortunately, this currently happens after a render, but potentially
  // could happen pre-render if we could reliably predict the size of the
  // labels before they render. Considering that ticks could be anything,
  // even a react component, this could get very tough.
  const {
    axis,
    tickSizeInner,
    tickSizeOuter,
    tickPadding,
    maxLabelRotation,
    position,
    dispatch,
    id,
  } = this.props

  const { rotation } = this.state

  const { visibleLabelStep } = this

  if (!this.el) {
    // If the entire axis is hidden, then we need to remove the axis dimensions
    dispatch(
      state => {
        const newAxes = state.axisDimensions[position] || {}
        delete newAxes[id]
        return {
          ...state,
          axisDimensions: {
            ...state.axisDimensions,
            [position]: newAxes,
          },
        }
      },
      {
        type: 'axisDimensions',
      }
    )
    return
  }

  const isHorizontal = position === positionTop || position === positionBottom
  const labelDims = Array(...this.el.querySelectorAll('.tick text')).map(el => ({
    ...el.getBoundingClientRect().toJSON(),
  }))

  let smallestTickGap = 100000
  // This is just a ridiculously large tick spacing that would never happen (hopefully)
  // If the axis is horizontal, we need to determine any necessary rotation and tick skipping
  if (isHorizontal) {
    const tickDims = Array(...this.el.querySelectorAll('.tick')).map(el =>
      el.getBoundingClientRect()
    )
    // Determine the smallest gap in ticks on the axis
    tickDims.reduce((prev, current) => {
      if (prev) {
        const gap = current.left - prev.left
        smallestTickGap = gap < smallestTickGap ? gap : smallestTickGap
      }
      return current
    }, false)

    // Determine the largest label on the axis
    const largestLabel = labelDims.reduce(
      (prev, current) => {
        current._overflow = current.width - smallestTickGap
        if (current._overflow > 0 && current._overflow > prev._overflow) {
          return current
        }
        return prev
      },
      { ...labelDims[0], _overflow: 0 }
    )

    // Determine axis rotation before we measure
    let newRotation = Math.min(
      Math.max(
        Math.abs(radiansToDegrees(Math.acos(smallestTickGap / (largestLabel.width + fontSize)))),
        0
      ),
      maxLabelRotation
    )

    newRotation = Number.isNaN(newRotation) ? 0 : Math.round(newRotation)
    if (Math.abs(rotation - newRotation) > 10) {
      this.setState({
        rotation: axis.position === 'top' ? -newRotation : newRotation,
      })
    }
  }

  const newVisibleLabelStep = Math.ceil(fontSize / smallestTickGap)

  if (visibleLabelStep !== newVisibleLabelStep) {
    this.visibleLabelStep = newVisibleLabelStep
  }

  if (!labelDims.length || labelDims.length !== this.ticks.length) {
    return false
  }

  let width = 0
  let height = 0
  let top = 0
  let bottom = 0
  let left = 0
  let right = 0

  if (isHorizontal) {
    // Add width overflow from the first and last ticks
    left = Math.ceil(getPixel(labelDims[0].width) / 2)
    right = Math.ceil(getPixel(labelDims[labelDims.length - 1].width) / 2)
    height =
      Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
      tickPadding + // Add tick padding
      // Add the height of the largest label
      Math.max(...labelDims.map(d => Math.ceil(getPixel(d.height))))
  } else {
    // Add height overflow from the first and last ticks
    top = Math.ceil(getPixel(labelDims[0].height) / 2)
    bottom = Math.ceil(getPixel(labelDims[labelDims.length - 1].height) / 2)
    width =
      Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
      tickPadding + // Add tick padding
      // Add the width of the largest label
      Math.max(...labelDims.map(d => Math.ceil(getPixel(d.width))))
  }

  dispatch(
    state => {
      const newAxes = state.axisDimensions[position] || {}
      delete newAxes[id]
      return {
        ...state,
        axisDimensions: {
          ...state.axisDimensions,
          [position]: {
            ...newAxes,
            [id]: {
              width,
              height,
              top,
              bottom,
              left,
              right,
            },
          },
        },
      }
    },
    {
      type: 'axisDimensions',
    }
  )

  return true
}
