import React from 'react'
//
import onResize from '../utils/detectElementResize'

export default function useHyperResponsive(ref) {
  const [{ width, height }, setState] = React.useState({
    width: 0,
    height: 0
  })

  const resize = React.useRef()

  resize.current = () => {
    if (!ref.current) {
      return
    }

    const computed = window.getComputedStyle(ref.current.parentElement)

    const {
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      boxSizing,
      borderTopWidth,
      borderLeftWidth,
      borderRightWidth,
      borderBottomWidth
    } = computed

    let { width: newWidth, height: newHeight } = computed

    newWidth = parseInt(newWidth)
    newHeight = parseInt(newHeight)

    if (boxSizing === 'border-box') {
      newWidth -= parseInt(paddingLeft)
      newWidth -= parseInt(paddingRight)
      newHeight -= parseInt(paddingTop)
      newHeight -= parseInt(paddingBottom)

      newWidth -= parseInt(borderLeftWidth)
      newWidth -= parseInt(borderRightWidth)
      newHeight -= parseInt(borderTopWidth)
      newHeight -= parseInt(borderBottomWidth)
    }

    if (newWidth !== width || newHeight !== height) {
      setState(() => ({
        width: newWidth,
        height: newHeight
      }))
    }
  }

  React.useEffect(() => {
    const stopListening = onResize(ref.current.parentElement, resize.current)
    return () => {
      stopListening()
    }
  }, [ref])

  return [{ width, height }]
}
