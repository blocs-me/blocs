import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'

import CheckedIcon from './CheckedIcon'
import CrossedIcon from './CrossedIcon'

import { IBox } from '../../../helpers/Box/Box.types'

const PricingCardCheckbox = ({
  text,
  isChecked = true,
  ...rest
}: {
  text: string
  isChecked?: boolean
} & IBox) => {
  const Icon = isChecked ? CheckedIcon : CrossedIcon

  return (
    <Flex data-type="checkbox" alignItems="center">
      <Icon {...rest} />
      <Text ml="xs" variant="pSmall" as="span">
        {text}
      </Text>
    </Flex>
  )
}

export default PricingCardCheckbox
