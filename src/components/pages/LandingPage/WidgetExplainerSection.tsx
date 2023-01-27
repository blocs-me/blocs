import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import float from '@/keyframes/float'
import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import DummyPomodoro from '@/widgets/Pomodoro/DummyPomodoro'
import { useRef, useEffect, useState, ReactNode } from 'react'
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
        threshold: 1.0
      }
    )

    observer.observe(ref.current)
  }, [])

  return (
    <Flex
      ref={ref}
      width="100%"
      py="lg"
      justifyContent="space-between"
      flexDirection={['column', , , reverse ? 'row-reverse' : 'row']}
      gap="md"
      overflow="hidden"
    >
      <SlideIn pause={!reveal}>
        <Flex flexDirection="column" width="min(100%, 500px)">
          <Text
            fontSize={['md', , 'lg']}
            fontWeight={'bold'}
            color="foreground"
            mb="md"
            letterSpacing="sm"
          >
            {header}
          </Text>
          <Text variant="p">{paraOne}</Text>
          <Text variant="p">{paraTwo}</Text>
        </Flex>
      </SlideIn>

      <Box borderRadius="md" bg="primary.accent-2" boxShadow="insetDefault">
        <Flex gap="md" css={{ transform: 'scale(0.8)' }} p="sm">
          {children(reveal)}
        </Flex>
      </Box>
    </Flex>
  )
}

export default WidgetExplainerSection
