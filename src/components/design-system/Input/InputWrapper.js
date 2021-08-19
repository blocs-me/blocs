import Box from "@/helpers/Box"
import Text from "@/design-system/Text"
import { css } from "@emotion/react"

const InputWrapper = ({ htmlFor, label, children, className, error }) => (
  <>
    <Box
      position="relative"
      as="label"
      overflow="visible"
      htmlFor={htmlFor}
      className={className}
    >
      {children}

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
          letterSpacing="sm"
          fontWeight="600"
          fontSize="xs"
          color="primary.accent-4"
        >
          {label}
        </Text>
      </Box>
    </Box>
    {error && (
      <Text
        fontSize="xxs"
        color="danger"
        fontWeight="300"
        mb={0}
        lineHeight="1.25"
        mt="xxs"
      >
        {error}
      </Text>
    )}
  </>
)

export default InputWrapper
