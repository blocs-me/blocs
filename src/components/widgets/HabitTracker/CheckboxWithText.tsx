import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Stack from '@/helpers/Stack'
import styled from '@emotion/styled'
import { MouseEvent } from 'react'
import Checkbox from './Checkbox'
import themeGet from '@styled-system/theme-get'
import useUrlHash from '@/hooks/useUrlHash'
import { UrlHash } from '../WaterTracker/types'

type Props = {
  isChecked: boolean
  text: string
  id: string
  onChange: (val: string) => void
}

const StrikeThrough = styled.div`
  position: relative;
  overflow: hidden;

  [data-strike]::before {
    transition: transform 0.2s ease;
    content: '';
    position: absolute;
    bottom: calc(50% - 1px);
    left: 0;
    height: 1px;
    width: 100%;
    border-radius: 1px;
    background: ${themeGet('colors.primary.accent-4')};
    transform: scaleX(0);
  }

  [data-strike='true']::before {
    transform: scaleX(1);
  }
`

const CheckboxWithText = ({ isChecked, onChange, id, text }: Props) => {
  const { role } = useUrlHash<UrlHash>()
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    role === 'blocs-user' && onChange(id)
  }

  return (
    <Stack
      display="flex"
      mr="xs"
      onClick={(e: MouseEvent<HTMLDivElement>) => handleClick(e)}
      css={{ cursor: 'pointer' }}
      alignItems="center"
    >
      <Checkbox size="28px" isChecked={isChecked} />
      <Box ml="xxs" />
      <Box hoverColor="primary.accent-4">
        <Text
          fontSize={'sm'}
          color={isChecked ? 'primary.accent-4' : 'foreground'}
          fontWeight="200"
          data-strike={isChecked ? true : false}
          lineHeight={1.75}
          css={{ textDecoration: isChecked ? 'line-through' : 'none' }}
          m={0}
        >
          {text}
        </Text>
      </Box>
    </Stack>
  )
}

export default CheckboxWithText
