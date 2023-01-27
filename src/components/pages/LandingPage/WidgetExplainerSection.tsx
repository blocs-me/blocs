import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import float from '@/keyframes/float'
import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import DummyPomodoro from '@/widgets/Pomodoro/DummyPomodoro'
import { useRef, useEffect, useState, ReactNode } from 'react'
import Stopwatch from 'src/icons/stopwatch'
import SlideIn from './LandingDemo/SlideIn'

const WidgetExplainerSection = ({
  header,
  paraOne,
  paraTwo,
  children,
  reverse
}: {
  header?: string
  paraOne: string
  paraTwo?: string
  children?: (reveal: boolean) => JSX.Element
  reverse?: boolean
}) => {
  const ref = useRef()

  const [reveal, setReveal] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (args) => {
        args.forEach((entry) => {
          if (entry.isIntersecting) {
            setReveal(true)
          }
        })
      },
      {
        // root: document.querySelector('#landing'),
        threshold: 0.5
      }
    )

    observer.observe(ref.current)
  }, [])

  return (
    <Flex
      ref={ref}
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
          <SlideIn delay={0.1} pause={!reveal}>
            <Text
              as="h3"
              color="foreground"
              fontWeight="bold"
              mt={0}
              mb="md"
              letterSpacing="sm"
              textAlign={['center', , , , 'left']}
            >
              {header}
            </Text>
          </SlideIn>
          <SlideIn delay={0.2} pause={!reveal}>
            <Text variant="p" textAlign={['center', , , , 'left']}>
              {paraOne}
            </Text>
          </SlideIn>
          <SlideIn delay={0.3} pause={!reveal}>
            <Text variant="p" textAlign={['center', , , , 'left']}>
              {paraTwo}
            </Text>
          </SlideIn>
        </Flex>
      </Box>

      <Box
        borderRadius="md"
        bg="primary.accent-2"
        boxShadow="insetDefault"
        py="sm"
        width="100%"
        css={{
          transition: 'opacity 0.2s ease',
          opacity: 'var(--opacity, 0)',
          flex: 1
        }}
        style={{ '--opacity': reveal ? 1 : 0 }}
        // width="min(100%, 700px)""
      >
        <Flex
          gap="sm"
          css={{ transform: 'scale(0.8)' }}
          center
          flexDirection={['column', , , , 'row']}
        >
          {children(reveal)}
        </Flex>
      </Box>
    </Flex>
  )
}

export default WidgetExplainerSection
