import Box from '@/helpers/Box'
import React from 'react'
import Text from '../Text'

const MaintenanceMessage = () => {
  return (
    <Box
      maxWidth="500px"
      minWidth="250px"
      borderRadius="md"
      borderLeft="solid 5px"
      borderColor="success.dark"
      px={['1rem', , '2rem']}
      py="1rem"
      bg="primary.accent-2"
      color="success.medium"
      boxShadow="default"
      mx={['1rem', , '2rem']}
    >
      <Box as="span" css={{ fontSize: '30px' }}>
        🚧
      </Box>{' '}
      <Text
        letterSpacing={'2px'}
        fontSize={['1rem', , '1.4rem']}
        lineHeight={1.25}
        mt="1rem"
      >
        <strong css={{ fontWeight: 300 }}>
          Blocs is down for maintenance, we&#39;ll be back in a few hours
        </strong>
      </Text>
    </Box>
  )
}

export default MaintenanceMessage
