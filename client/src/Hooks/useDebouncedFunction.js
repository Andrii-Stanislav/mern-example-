import { useRef } from 'react'

// now it's hook dont use.
// for debounced input onChange
export default function useDebouncedFunction(func, delay) {
  const ref = useRef(null)

  return (...args) => {
    clearTimeout(ref.current)
    ref.current = setTimeout(() => func(...args), delay)
  }
}
