import { forwardRef, useState } from 'react'
import { useTheme } from '@emotion/react'
import themeGet from '@styled-system/theme-get'
import styled from '@emotion/styled'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'

const Input = styled.input`
  border: solid 1px ${themeGet('colors.primary.accent-3')};
  border-radius: ${themeGet('radii.sm')};
  /* border-bottom: solid 3px ${themeGet('colors.primary.accent-2')}; */
  padding: ${themeGet('spaces.xl')};
  width: 100%;
  height: 100%;
  font-size: ${themeGet('fontSizes.xs')};
  font-weight: 500;
  text-align: center;
  background-color: ${themeGet('colors.primary.accent-2')};
  color: ${themeGet('colors.foreground')};

  appearance: none;

  &:focus-visible,
  &:focus {
    outline: none;
    border: 0px 0px 0 2px ${themeGet('colors.secondary')};
  }
`

/* eslint-disable  react/display-name */

const TinyInput = forwardRef(
  (
    {
      label = '',
      name = '',
      pattern = null,
      id,
      type = 'text',
      width = '50px',
      height = '30px',
      placeholder = '',
      min,
      max,
      onChange,
      onBlur = () => {}
    },
    ref
  ) => {
    const dynamicProps = (() => {
      switch (type) {
        case 'number':
          return {
            min,
            max
          }
        default:
          return {}
      }
    })()

    return (
      <Flex alignItems="center">
        <Box width={width} height={height} mr="xs">
          <Input
            ref={ref}
            onChange={(value) => onChange(value)}
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            onBlur={onBlur}
            {...dynamicProps}
          />
        </Box>
        <Text
          fontWeight={400}
          fontSize="xs"
          m={0}
          htmlFor={id}
          color="primary.accent-4"
        >
          {label}
        </Text>
      </Flex>
    )
  }
)

export default TinyInput
