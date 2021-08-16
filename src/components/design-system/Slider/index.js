/** @jsxImportSource @emotion/react */
import { useRef, useState, useEffect, forwardRef } from "react"
import themeGet from "@styled-system/theme-get"
import styled from "@emotion/styled"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import { useDebouncedFn } from "beautiful-react-hooks"

const Track = styled.div`
  --translateX: -100%;
  width: 100%;
  height: 5px;
  background: ${themeGet("colors.primary.accent-4")};
  transform: translateX(var(--translateX));
  transition: transform 0.1s ease;
  position: absolute;
  left: 0;
  pointer-events: none;
`

const Thumb = styled.div`
  --translateX: 0px;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: ${themeGet("colors.primary.accent-4")};
  position: absolute;
  left: 0;
  pointer-events: none;
  transition: transform 0.1s ease;
  transform: translateX(var(--translateX));
`

/* eslint-disable react/display-name */

const Slider = forwardRef(
  (
    {
      width = 100,
      name,
      onChange,
      onCancel,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      ariaLabel,
      required = false,
      minValue = 0,
      maxValue = 100,
      setValue,
      defaultValue,
    },
    ref
  ) => {
    const input = useRef(null)
    const thumbRef = useRef(null)
    const trackRef = useRef(null)
    const pointerDown = useRef(false)
    const [inputValue, setInputValue] = useState(defaultValue)

    const handleChange = useDebouncedFn((translatePercent) => {
      const inputEl = document.querySelector(`${Thumb} + input`)
      const val = maxValue - Math.round(maxValue * (translatePercent / 100))

      setValue(name, val, { required })
      setInputValue(inputValue)
      inputEl.value = val
      onChange?.(val)
    })

    const getTranslateX = (e) => {
      const clientLeft = e.clientX
      const { left: elementLeft } = e.target.getBoundingClientRect()
      const translateX =
        100 - Math.round(((clientLeft - elementLeft) / width) * 100)
      return translateX
    }

    const setTrackTranslateX = (translateX) => {
      if (translateX >= 0 && translateX <= 100) {
        thumbRef.current.style.setProperty(
          "--translateX",
          `${width * ((width - 10 - translateX) / 100)}px`
        )
        trackRef.current.style.setProperty("--translateX", `-${translateX}%`)
      }
    }

    const handlePointerUp = (e) => {
      pointerDown.current = false
      // const xPos = getTranslateX(e)
      // setTrackTranslateX(xPos)
      // handleChange(xPos)
      onMouseUp?.(e)
    }
    const handlerPointerLeave = (e) => {
      pointerDown.current = false
      onMouseLeave?.(e)
    }
    const handlePointerDown = (e) => {
      pointerDown.current = true
      const xPos = getTranslateX(e)
      setTrackTranslateX(xPos)
      handleChange(xPos)
      onMouseDown?.(e)
    }
    const handlePointerMove = (e) => {
      if (pointerDown.current) {
        const translateX = getTranslateX(e)
        setTrackTranslateX(translateX)
        handleChange(translateX)
      }
    }

    const handlePointerCancel = (e) => {
      onCancel?.(e)
    }

    useEffect(() => {
      if (defaultValue) {
        console.log("defaultvalue")
        const valuePercent = 100 - Math.round((defaultValue / maxValue) * 100)
        setTrackTranslateX(valuePercent)
      }

      const inputEl = document.querySelector(`${Thumb} + input`)
    }, [defaultValue, maxValue]) // eslint-disable-line

    return (
      <Flex
        width={`${width}px`}
        height="30px"
        aria-label={ariaLabel}
        position="relative"
        alignItems="center"
        css={{ cursor: "pointer" }}
        onPointerUp={(e) => handlePointerUp(e)}
        onPointerMove={(e) => handlePointerMove(e)}
        onPointerDown={(e) => handlePointerDown(e)}
        onPointerLeave={(e) => handlerPointerLeave(e)}
        onPointerCancel={(e) => handlePointerCancel?.(e)}
      >
        <Box
          height="5px"
          width="100%"
          borderRadius="999px"
          position="relative"
          bg="primary.accent-1"
          overflow="hidden"
        >
          <Track ref={trackRef} />
        </Box>
        <Thumb ref={thumbRef} />
        <input
          value={inputValue}
          type="hidden"
          css={{
            width: "100%",
            position: "absolute",
            height: 0,
            left: -10,
            bottom: 0,
          }}
        />
      </Flex>
    )
  }
)

export default Slider
