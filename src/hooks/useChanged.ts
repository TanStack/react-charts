import usePrevious from './usePrevious'

export default function useChanged(val: any) {
  const previous = usePrevious(val)
  return val !== previous
}
