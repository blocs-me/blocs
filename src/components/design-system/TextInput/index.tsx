import Box from '@/helpers/Box'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
import { forwardRef, Ref } from 'react'
import Text from '@/design-system/Text'
import InputWrapper from '../Input/InputWrapper'
import Input from '../Input'

/* eslint-disable react/display-name */

type Props = {
  onChange?: (...args: any) => void
  onBlur?: (...args: any) => void
  ariaLabel: string
  name?: string
  placeholder?: string
  htmlFor?: string
  type?: string
  className?: string
  error?: string
  label?: string
} & JSX.IntrinsicElements['input']

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
      type = 'text',
      className,
      error = '',
      readOnly,
      value
    }: Props,
    ref: Ref<HTMLInputElement>
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
          value={value}
          placeholder={placeholder}
          type={type}
          readOnly={readOnly}
        />
      </InputWrapper>
    )
  }
)

export default TextInput
