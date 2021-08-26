import Box from "@/helpers/Box"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { themeGet } from "@styled-system/theme-get"
import { forwardRef } from "react"
import Text from "@/design-system/Text"
import InputWrapper from "../Input/InputWrapper"
import Input from "../Input"

/* eslint-disable react/display-name */

const TextInput = forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      ariaLabel,
      placeholder,
      htmlFor,
      label,
      type = "text",
      className,
      error = "",
    },
    ref
  ) => {
    return (
      <InputWrapper htmlFor={htmlFor} label={label} error={error}>
        <Input
          className={className}
          id={name}
          aria-label={ariaLabel}
          name={name}
          onChange={(v) => onChange?.(v)}
          onBlur={(v) => onBlur?.(v)}
          ref={ref}
          placeholder={placeholder}
          type={type}
        />
      </InputWrapper>
    )
  }
)

export default TextInput
