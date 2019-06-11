import observeRect from '@reach/observe-rect'

export default function onResize(element, fn) {
  const observer = observeRect(element, fn)
  observer.observe()
  return observer.unobserve
}
