/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import tg from '@styled-system/theme-get'
import Box from '@/helpers/Box'
import theme from 'src/styles/theme'

const Text = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  padding: 3px 4px;
  background: ${tg('colors.brand.accent-1')};
  color: ${tg('colors.neural.white')};
  font-weight: 400;
  font-size: 0.5rem;
  line-height: 1;
  border-radius: 10px;
  letter-spacing: ${tg('letterSpacings.sm')};

  @media (max-width: ${theme.breakpoints[3]}) {
    font-size: 0.4rem;
    padding: 3px;
    border-radius: 5px;
  }

  @media (max-width: ${theme.breakpoints[2]}) {
    font-size: 0.3rem;
    padding: 2px;
    border-radius: 5px;
  }
`

const BetaWrapper = ({ children, color = 'neural.white', text = 'alpha' }) => {
  return (
    <Box position="relative" color={color} width="fit-content" as="span">
      {children}
      <Box
        position="absolute"
        top="0"
        right="0"
        css={{ transform: 'translateX(100%)' }}
      >
        <Text>{text}</Text>
      </Box>
    </Box>
  )
}

export default BetaWrapper
