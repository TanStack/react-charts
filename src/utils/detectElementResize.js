/**
 * Detect Element Resize
 * Reworked from https://github.com/sdecima/javascript-detect-element-resize
 * */

// eslint-disable-next-line
let onResize = () => {
  console.warn('onResize is not available without the DOM!')
}

export default function detectElemenResize (...args) {
  return onResize(...args)
}

// Only init if in the DOM
if (typeof document !== 'undefined') {
  const attachEvent = document.attachEvent

  // If attachEvent is available, use it instead.
  if (attachEvent) {
    onResize = (element, fn) => {
      element.attachEvent('onresize', fn)
      return () => element.detachEvent('onresize', fn)
    }
  } else {
    // Otherwise, get on with it!

    // Keep track of whether the styles have been created or not
    let stylesCreated = false

    // Make sure we have a RAF
    const requestFrame = (() => {
      const raf =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        (fn => window.setTimeout(fn, 20))
      return fn => raf(fn)
    })()

    // And a way to cancel the RAF
    const cancelFrame = (() => {
      const cancel =
        window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.clearTimeout
      return id => cancel(id)
    })()

    /* Detect CSS Animations support to detect element display/re-attach */
    let animation = false
    let keyframeprefix = ''
    let animationstartevent = 'animationstart'
    const domPrefixes = 'Webkit Moz O ms'.split(' ')
    const startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(
      ' '
    )
    let pfx = ''
    const elm = document.createElement('fakeelement')
    if (elm.style.animationName !== undefined) {
      animation = true
    }
    if (animation === false) {
      for (let i = 0; i < domPrefixes.length; i++) {
        if (elm.style[`${domPrefixes[i]}AnimationName`] !== undefined) {
          pfx = domPrefixes[i]
          keyframeprefix = `-${pfx.toLowerCase()}-`
          animationstartevent = startEvents[i]
          animation = true
          break
        }
      }
    }
    const animationName = 'resizeanim'
    const animationKeyframes = `@${keyframeprefix}keyframes ${animationName} { from { opacity: 0; } to { opacity: 0; } } `
    const animationStyle = `${keyframeprefix}animation: 1ms ${animationName}; `

    const resetTriggers = element => {
      const triggers = element.__resizeTriggers__
      const expand = triggers.firstElementChild
      const contract = triggers.lastElementChild
      const expandChild = expand.firstElementChild
      contract.scrollLeft = contract.scrollWidth
      contract.scrollTop = contract.scrollHeight
      expandChild.style.width = `${expand.offsetWidth + 1}px`
      expandChild.style.height = `${expand.offsetHeight + 1}px`
      expand.scrollLeft = expand.scrollWidth
      expand.scrollTop = expand.scrollHeight
    }

    const checkTriggers = element =>
      element.offsetWidth !== element.__resizeLast__.width ||
      element.offsetHeight !== element.__resizeLast__.height

    // eslint-disable-next-line
    function scrollListener(e) {
      const element = this
      resetTriggers(this)
      if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__)
      this.__resizeRAF__ = requestFrame(() => {
        if (checkTriggers(element)) {
          element.__resizeLast__.width = element.offsetWidth
          element.__resizeLast__.height = element.offsetHeight
          element.__resizeListeners__.forEach(fn => {
            fn.call(element, e)
          })
        }
      })
    }

    const createStyles = () => {
      if (!stylesCreated) {
        // opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
        const css =
          `${animationKeyframes || ''}.resize-triggers { ${animationStyle ||
            ''}visibility: hidden; opacity: 0; } ` +
          '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }'
        const head = document.head || document.getElementsByTagName('head')[0]
        const style = document.createElement('style')

        style.type = 'text/css'
        if (style.styleSheet) {
          style.styleSheet.cssText = css
        } else {
          style.appendChild(document.createTextNode(css))
        }

        head.appendChild(style)
        stylesCreated = true
      }
    }

    onResize = (element, fn) => {
      if (!element.__resizeTriggers__) {
        if (getComputedStyle(element).position === 'static') element.style.position = 'relative'
        createStyles()
        element.__resizeLast__ = {}
        element.__resizeListeners__ = [];
        (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers'
        element.__resizeTriggers__.innerHTML =
          '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>'
        element.appendChild(element.__resizeTriggers__)
        resetTriggers(element)
        element.addEventListener('scroll', scrollListener, true)

        /* Listen for a css animation to detect element display/re-attach */
        if (animationstartevent) {
          element.__resizeTriggers__.addEventListener(animationstartevent, e => {
            if (e.animationName === animationName) resetTriggers(element)
          })
        }
      }
      element.__resizeListeners__.push(fn)

      return () => {
        element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
        if (!element.__resizeListeners__.length) {
          element.removeEventListener('scroll', scrollListener)
          element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__)
        }
      }
    }
  }
}
