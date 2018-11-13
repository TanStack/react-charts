import { useState, useRef, useEffect } from 'react'
//
import onResize from './detectElementResize'

export default function useHyperResponsive() {
  const [{ width, height }, setState] = useState({
    width: 0,
    height: 0
  })

  const elRef = useRef()
  const resize = useRef()

  resize.current = () => {
    if (!elRef.current) {
      return
    }

    const computed = window.getComputedStyle(elRef.current.parentElement)

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

  useEffect(() => {
    const stopListening = onResize(elRef.current.parentElement, resize.current)
    return () => {
      stopListening()
    }
  }, [])

  return [
    { width, height },
    el => {
      elRef.current = el
    }
  ]
}
