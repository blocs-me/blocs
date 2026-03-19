import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import float from '@/keyframes/float'
import Link from 'next/link'
import CheckoboxesSkeleton from './CheckboxesSkeleton'

const EmptyHabitsScreen = () => {
  return (
    <>
      <Link href="/habit-tracker/menu">
        <Flex
          as="a"
          borderRadius="md"
          p="sm"
          bg="primary.accent-2"
          overflow="hidden"
          position="relative"
          boxShadow="default"
          width="200px"
          css={{
            animation: `${float} 1s ease-in-out alternate infinite`
          }}
        >
          <Text variant="pSmall">
            When you add new habits, they will show up here
          </Text>
          <Box
            width="5px"
            height="100%"
            position="absolute"
            bg="success.dark"
            left="0"
            top="0"
          />
        </Flex>
      </Link>
      <CheckoboxesSkeleton isLoading />
    </>
  );
}

export default EmptyHabitsScreen
