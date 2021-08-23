import Box from "@/helpers/Box"
import styled from "@emotion/styled"
import { useDebouncedFn } from "beautiful-react-hooks"
import { forwardRef, useEffect, useRef, useState } from "react"
import Input from "../Input"
import InputWrapper from "../Input/InputWrapper"

/* eslint-disable react/display-name */

const StyledInput = styled(Input)``

const ColorInput = forwardRef(
  (
    { onChange, onBlur, name, ariaLabel, htmlFor, label, defaultValue },
    ref
  ) => {
    const colorBg = useRef()

    const setColorBg = (e) => {
      const input = colorBg.current

      if (input) {
        input.style.setProperty("--bg", e?.target?.value)
      }
    }

    useEffect(() => {
      const input = colorBg.current

      if (input) {
        input.style.setProperty("--bg", defaultValue)
      }
    }, [])

    return (
      <InputWrapper htmlFor={htmlFor} label={label} css={{ width: "100%" }}>
        <Box
          zIndex="0"
          width="calc(100% - 1rem)"
          height="20px"
          borderRadius="sm"
          position="absolute"
          top="50%"
          left="50%"
          css={{ transform: "translate(-50%, -50%)", background: "var(--bg)" }}
          ref={colorBg}
        />
        <Box
          onChange={(v) => {
            setColorBg(v)
            onChange?.(v)
          }}
          onBlur={(v) => onBlur?.(v)}
          aria-label={ariaLabel}
          name={name}
          as="input"
          type="color"
          width="100%"
          height="100%"
          position="absolute"
          top="0"
          left="0"
          ref={ref}
          css={{ opacity: 0 }}
          zIndex="1"
        />
        <StyledInput as="div" />
      </InputWrapper>
    )
  }
)

export default ColorInput
