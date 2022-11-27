const { forwardRef } = require('react')
import Input from '../Input'
import InputWrapper from '../Input/InputWrapper'

const NumberInput = forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      ariaLabel,
      placeholder,
      htmlFor,
      label,
      className,
      min = 0,
      max = 10,
      error = ''
    },
    ref
  ) => {
    return (
      <InputWrapper
        css={{ width: '100%' }}
        htmlFor={htmlFor}
        label={label}
        error={error}
      >
        <Input
          min={min}
          max={max}
          type="number"
          className={className}
          id={name}
          aria-label={ariaLabel}
          name={name}
          onChange={(v) => onChange?.(v)}
          onBlur={(v) => onBlur?.(v)}
          ref={ref}
          placeholder={placeholder}
        />
      </InputWrapper>
    )
  }
)

export default NumberInput
