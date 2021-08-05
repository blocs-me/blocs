import { useState } from "react"
import { useTheme } from "@emotion/react"
import themeGet from "@styled-system/theme-get"
import styled from "@emotion/styled"
import Flex from "@/helpers/Flex"
import Box from "@/helpers/Box"
import Text from "@/design-system/Text"

const Input = styled.input`
  border: solid 1px ${themeGet("colors.primary.accent-3")};
  border-radius: ${themeGet("radii.sm")};
  border-bottom: solid 3px;
  padding: ${themeGet("spaces.xl")};
  width: 100%;
  height: 100%;
  font-size: ${themeGet("fontSizes.xs")};
  font-weight: 500;
  text-align: center;
  background-color: ${themeGet("colors.bg.light")};

  &:focus-visible,
  &:focus {
    outline: none;
    border: 0px 0px 0 2px ${themeGet("colors.secondary")};
  }
`

const TinyInput = ({
  register,
  required,
  label = "",
  name = "",
  pattern = null,
  id,
  type = "text",
  width = "50px",
  height = "30px",
}) => {
  return (
    <Flex alignItems="center">
      <Box width={width} height={height} mr="xs">
        <Input {...register(name, { required, pattern })} id={id} type={type} />
      </Box>
      <Text fontWeight={600} fontSize="xs" m={0} htmlFor={id}>
        {label}
      </Text>
    </Flex>
  )
}

export default TinyInput
