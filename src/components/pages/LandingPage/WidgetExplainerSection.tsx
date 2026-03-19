import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import { ReactNode } from 'react'

const WidgetExplainerSection = ({
  header,
  paraOne,
  paraTwo,
  children,
  reverse
}: {
  header?: string
  paraOne: string
  paraTwo?: ReactNode
  children?: () => JSX.Element
  reverse?: boolean
}) => {
  return (
    <Flex
      width="100%"
      py={['md', , , , 'lg']}
      flexDirection={['column', , , , , reverse ? 'row-reverse' : 'row']}
      overflow="hidden"
      alignItems={['center', , , , 'start']}
      justifyContent={['center', , , , 'space-between']}
      gap={'lg'}
    >
      <Box css={{ flex: 1 }}>
        <Flex
          flexDirection={'column'}
          width="min(100%, 500px)"
          m={['0 auto', , , , 0]}
        >
          <Text
            as="h2"
            fontSize="1.728rem"
            color="foreground"
            fontWeight="bold"
            mt={0}
            mb="md"
            letterSpacing="sm"
            textAlign={['center', , , , 'left']}
          >
            {header}
          </Text>
          <Text variant="p" textAlign={['center', , , , 'left']}>
            {paraOne}
          </Text>
          {paraTwo && (
            <Box mt="xs" textAlign={['center', , , , 'left']}>
              {paraTwo}
            </Box>
          )}
        </Flex>
      </Box>

      <Box
        borderRadius="md"
        bg="primary.accent-2"
        boxShadow="insetDefault"
        py="sm"
        width="100%"
        css={{ flex: 1 }}
      >
        <Flex
          gap="sm"
          css={{ transform: 'scale(0.8)' }}
          center
          flexDirection={['column', , , , 'row']}
        >
          {children()}
        </Flex>
      </Box>
    </Flex>
  )
}

export default WidgetExplainerSection
