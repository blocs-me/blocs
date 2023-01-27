import BetaWrapper from '@/design-system/BetaWrapper'
import Sparkles from '@/design-system/Sparkles'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import ScaleIn from './LandingDemo/ScaleIn'
import SlideIn from './LandingDemo/SlideIn'

const SharingFeatureSection = () => {
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
        threshold: 0.5
      }
    )

    observer.observe(ref.current)
  }, [])

  return (
    <Flex
      width="100%"
      gap="lg"
      flexDirection={['column', , , , 'row']}
      py="lg"
      ref={ref}
    >
      <SlideIn pause={!reveal}>
        <Box
          p="sm"
          borderRadius="md"
          boxShadow="insetDefault"
          bg="primary.accent-2"
        >
          <Image
            src="/handshake-3d.png"
            width="600px"
            height="350px"
            alt="Handshake 3D Image"
            objectFit="cover"
            priority
          />
        </Box>
      </SlideIn>
      <Flex flexDirection={'column'}>
        <SlideIn delay={0.2} pause={!reveal}>
          <Box width="fit-content">
            <Sparkles>
              <BetaWrapper text="new" color="neutral.white">
                <Text
                  as="h3"
                  color="foreground"
                  fontWeight="bold"
                  mt={0}
                  width="fit-content"
                >
                  Sharing Feature
                </Text>
              </BetaWrapper>
            </Sparkles>
          </Box>
        </SlideIn>

        <SlideIn delay={0.3} pause={!reveal}>
          <Text variant="p" width={['100%', , , '400px', '500px', '600px']} >
            With this all new feature you can create a <b>special</b> link for
            friends and family where they can see your progress and be your{' '}
            <b>accountability partner.</b>
          </Text>
        </SlideIn>

        <SlideIn delay={0.4} pause={!reveal}>
          <Text variant="p" width={['100%', , , '400px', '500px', '600px']}>
            The shareable widget link can be embeded in your{' '}
            <b>friend&#39;s Notion workspace</b>, but it&#39;s only editable by
            you ensuring total control.
          </Text>
        </SlideIn>
      </Flex>
    </Flex>
  )
}

export default SharingFeatureSection
