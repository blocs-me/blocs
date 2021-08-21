// provided an element's ref, this hook can tell whether
// a user clicks outside that element, and calls the onClickOutside
// callback function

/**
 * @typedef {Object} useClickOutsideObject
 * @property {ref} element
 * @property {function} onClickOutside
 * */

import { useEffect, useRef } from "react"

export const useClickOutside = ({ element, onClickOutside = () => {} }) => {
  const callback = useRef()
  callback.current = onClickOutside

  useEffect(() => {
    const handleClick = (event) => {
      if (element?.current && !element?.current?.contains(event.target)) {
        onClickOutside?.(event)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [element, onClickOutside])
}
