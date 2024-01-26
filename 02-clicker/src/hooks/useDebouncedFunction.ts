import { useRef, useEffect } from "react"

export default function useDebouncedFunction<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
  cleanUp: boolean = false
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>()

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp])

  return (...args: Parameters<T>): void => {
    clearTimer()
    timeoutRef.current = setTimeout(() => callback(...args), delay)
  }
}
