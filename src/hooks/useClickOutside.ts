// provided an element's ref, this hook can tell whether
// a user clicks outside that element, and calls the onClickOutside
// callback function

/**
 * @typedef {Object} useClickOutsideObject
 * @property {ref} element
 * @property {function} onClickOutside
 * */

import { useEffect, useRef, MutableRefObject, MouseEvent } from 'react'

type Props = {
  element: MutableRefObject<HTMLElement>
  onClickOutside: (event: any) => void
}

export const useClickOutside = <T = HTMLDivElement>({
  element,
  onClickOutside = () => {}
}: Props) => {
  const callback = useRef<Props['onClickOutside']>()
  callback.current = onClickOutside

  useEffect(() => {
    const handleClick = (event) => {
      const clickedEl = event.target as Node
      if (element?.current && !element?.current?.contains(clickedEl)) {
        onClickOutside?.(event)
      }
    }

    document.addEventListener<'click'>('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [element, onClickOutside])
}
