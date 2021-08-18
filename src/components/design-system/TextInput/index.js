import Box from "@/helpers/Box"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { themeGet } from "@styled-system/theme-get"
import { forwardRef } from "react"
import Text from "@/design-system/Text"

const Input = styled.input`
  border-radius: ${themeGet("radii.md")};
  border: solid 1px ${themeGet("colors.primary.accent-4")};
  padding: ${themeGet("space.sm")};
  font-size: ${themeGet("fontSizes.sm")};
  font-weight: 400;
  color: ${themeGet("colors.primary.accent-4")};
  height: 45px;
  width: 100%;
  outline: none;

  &:focus,
  &:active {
    outline: none;
    border-color: ${themeGet("colors.highlight")};
    & ~ div > span {
      color: ${themeGet("colors.highlight")};
    }
  }

  &::placeholder {
    color: ${themeGet("colors.primary.accent-2")};
    font-weight: 300;
  }
`

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
    },
    ref
  ) => {
    return (
      <Box position="relative" as="label" overflow="visible" htmlFor={htmlFor}>
        <Input
          id={name}
          aria-Box={ariaLabel}
          name={name}
          onChange={(v) => onChange?.(v)}
          onBlur={(v) => onBlur?.(v)}
          ref={ref}
          placeholder={placeholder}
          type={type}
        />

        <Box
          as="div"
          position="absolute"
          top="0"
          left="xs"
          px="xs"
          bg="bg.default"
          overflow="visible"
          css={css`
            transform: translateY(-60%);
          `}
        >
          <Text
            as="span"
            letterSpacing="md"
            fontWeight="600"
            fontSize="xs"
            color="primary.accent-4"
          >
            {label}
          </Text>
        </Box>
      </Box>
    )
  }
)

export default TextInput
