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
  isSelected?: boolean
  text: string
  id: string
  onChange: (val: string) => void
  onSelect?: (val: string) => void
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

const CheckboxWithText = ({ isChecked, isSelected, onChange, onSelect, id, text }: Props) => {
  const { role } = useUrlHash<UrlHash>()
  const handleCheckbox = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    role === 'blocs-user' && onChange(id)
  }

  const handleTextClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onSelect?.(id)
  }

  return (
    <Stack
      display="flex"
      mr="xs"
      css={{ cursor: 'pointer' }}
      alignItems="center"
    >
      <Box onClick={handleCheckbox}>
        <Checkbox size="28px" isChecked={isChecked} />
      </Box>
      <Box ml="xxs" />
      <Box
        onClick={handleTextClick}
        hoverColor="primary.accent-4"
        data-mask="habit-checkbox"
        css={{
          borderRadius: '4px',
          padding: '0 4px',
          backgroundColor: isSelected ? 'var(--colors-brand-accent-5, rgba(224,0,121,0.08))' : 'transparent',
          transition: 'background-color 0.15s ease'
        }}
      >
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
