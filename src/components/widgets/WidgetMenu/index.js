/** @jsxImportSource @emotion/react */
import Link from 'next/link'
import Icon from '@/helpers/Icon'
import Stack from '@/helpers/Stack'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import ButtonGroup, { ButtonGroupButton } from '@/design-system/ButtonGroup'

const WidgetMenuItem = ({ href, itemIcon, title, iconProps = {} }) => {
  return (
    <ButtonGroupButton as="li" css={{ cursor: ' pointer' }}>
      <Link href={href}>
        <a css={{ display: 'flex', alignItems: 'center' }}>
          <Icon
            size="20px"
            stroke="foreground"
            mr="sm"
            display="flex"
            {...iconProps}
          >
            {itemIcon}
          </Icon>
          <Text
            fontSize="md"
            fontWeight="400"
            color="foreground"
            lineHeight={1.5}
            mb={0}
          >
            {title}
          </Text>
        </a>
      </Link>
    </ButtonGroupButton>
  )
}

const WidgetMenu = ({ menuItems = [], gap = 'sm' }) => {
  return (
    <ButtonGroup gap={gap}>
      {menuItems.map((item, id) => (
        <WidgetMenuItem key={id} {...item} />
      ))}
    </ButtonGroup>
  )
}

export default WidgetMenu
