/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import Box from "../Box"
import Flex from "../Flex"
import PageLayout from "../PageLayout"
import Text from "../Text"
import Quote from "../../icons/quote.svg"
import Icon from "../Icon"
import Avatar from "../Avatar"
import Linkedin from "../../icons/linkedin.svg"
import Codepen from "../../icons/codepen.svg"
import Email from "../../icons/email.svg"
import Button from "../Button"
import Showcase from "./Showcase"
import PomodoroIntro from "./pomodoroIntro.svg"
import HabitTrackerIntro from "./habitTrackerIntro.svg"
import Link from "../Link"
import Plant from "../../icons/plant.svg"
import WaterTrackerIntro from "./WaterTrackerIntro"
import BetaWrapper from "../BetaWrapper"
import { animate } from "popmotion"
import { DASHBOARD_SIGN_IN_REDIRECT_URL } from "../../utils/paths"

const SocialIcon = styled.a`
  &:hover {
    transform: scale(1.1);
  }
  transition: transform 0.5s ease;
`
const fadeInAnim = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const FadeIn = ({ children, delay }) => (
  <div css={{ animation: `${fadeInAnim} 1s ${delay}` }}>{children}</div>
)

const SlideInWrapper = styled.div`
  opacity: 0;
  transform: translate3d(0, 50px, 0);
  transition: transform 1s ease, opacity 1s ease;
  transition-delay: ${({ delay }) => `${delay}s`};
`

const SlideIn = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const callback = (entries) => {
    const entry = entries[0]

    if (entry.isIntersecting) {
      ref.current.style.opacity = 1
      ref.current.style.transform = "translate3d(0, 0, 0)"
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, { threshold: 0.5 })
    observer.observe(ref.current)
  }, [])

  return (
    <SlideInWrapper delay={delay} ref={ref}>
      {children}
    </SlideInWrapper>
  )
}

const DetailSection = ({ title = "", children, art = <div />, kf }) => (
  <section>
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      my="xl"
      mx="auto"
    >
      <SlideIn>
        <Box width="400px">
          <Text
            as="h2"
            fontWeight="bold"
            fontSize="lg"
            color="primary.default"
            mt={0}
          >
            {title}
          </Text>
          {children}
        </Box>
      </SlideIn>
      <Box width={["50%", "100%", , "50%"]}>
        <SlideIn>{art}</SlideIn>
      </Box>
    </Flex>
  </section>
)

const LandingPage = () => {
  const howItWorks = () => {
    animate({
      from: window.scrollY,
      to: window.innerHeight,
      onUpdate: (yPos) => window.scrollTo(0, yPos),
    })
  }

  return (
    <PageLayout>
      <Flex
        pt="80px"
        width="100%"
        height="100vh"
        alignItems="center"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="primary.lightest"
      >
        <Flex flex="1" flexDirection="column">
          <Box ml={[0, 0, , "-37px"]} pr={[0, 0, , "30px"]}>
            <Flex>
              <Icon width="30px" mr="xxs" mt="-7px">
                <Quote />
              </Icon>

              <Text
                fontWeight="bold"
                fontSize="xl"
                as="h1"
                mb="sm"
                color="primary.default"
                lineHeight="1.15"
                letterSpacing="sm"
              >
                build better <br />
                habits on notion <br /> with our <br /> beautiful{" "}
                <BetaWrapper color="secondary">widgets</BetaWrapper>
              </Text>
            </Flex>
          </Box>
          <Flex alignItems="center">
            <Avatar src="/moniet.jpg" />
            <Box pl="sm">
              <Text
                lineHeight={1}
                fontWeight="bold"
                fontSize="sm"
                letterSpacing="sm"
                color="primary.default"
                mb={0}
              >
                Moniet Sawhney
              </Text>
              <Text
                fontSize="xxs"
                color="primary.light"
                letterSpacing="sm"
                mb={0}
              >
                founder of blocs.me
              </Text>

              <Flex
                display="flex"
                justifyContent="flex-start"
                ml="-12px"
                mb="-12px"
              >
                <SocialIcon
                  href="https://linkedin.com/in/moniet"
                  target="_blank"
                >
                  <Icon size="50px">
                    <Linkedin />
                  </Icon>
                </SocialIcon>
                <SocialIcon href="https://codepen.com/moniet" target="_blank">
                  <Icon size="50px">
                    <Codepen />
                  </Icon>
                </SocialIcon>
                <SocialIcon href="mailto:moniet@blocs.me">
                  <Icon size="50px">
                    <Email />
                  </Icon>
                </SocialIcon>
              </Flex>
            </Box>
          </Flex>
          <Box mt="lg">
            <Button
              as="a"
              href={encodeURI(
                `https://api.notion.com/v1/oauth/authorize?client_id=ef982612-81f0-46ef-ad49-8f9d4af75f3d&redirect_uri=${DASHBOARD_SIGN_IN_REDIRECT_URL}&response_type=code`
              )}
              bg="primary.dark"
              color="primary.lightest"
              borderRadius="sm"
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              px="md"
              py="xs"
              variant="primary"
              width="fit-content"
            >
              <Box as="img" mr="sm" src="/notion-logo.png" size={["40px"]} />
              sign up with notion
            </Button>

            <Text
              fontSize="xs"
              mt="sm"
              color="primary.light"
              letterSpacing="sm"
            >
              get started for{" "}
              <Box as="span" color="secondary">
                free !
              </Box>
            </Text>
          </Box>
        </Flex>
        <Box
          width="50vw"
          height="100vh"
          position="absolute"
          top="0"
          right="0"
          bg="#fcfcfc"
          zIndex={-1}
        />
        <Flex
          flex="1"
          alignItems="center"
          justifyContent="center"
          height="100%"
          flexDirection="column"
          pl="xl"
        >
          <Showcase />
          <Text
            as="button"
            p={0}
            fontSize="md"
            fontWeight="bold"
            mt="md"
            onClick={() => howItWorks()}
          >
            HOW IT WORKS 👇
          </Text>
        </Flex>
      </Flex>

      <DetailSection title="POMODORO" art={<PomodoroIntro />}>
        <Text
          fontSize="md"
          lineHeight="1.5"
          color="primary.light"
          fontWeight="300"
        >
          blocs is bringing pomodoros to notion with{" "}
          <Text as="b" color="primary.default">
            so much more !
          </Text>
        </Text>
        <Text
          fontSize="md"
          lineHeight="1.5"
          color="primary.light"
          fontWeight="300"
        >
          time-box any activity and gain insights about how you’re spending time
        </Text>
        <Link
          href="https://www.notion.so/widgets-demo-cdf30a30ba704d5b8a55dc7a196d3e7b"
          underline
          passHref
        >
          check it out
        </Link>
        <Box
          position="absolute"
          bottom="0"
          left="0"
          css={{ transform: "translate(calc(-200% - 1rem), 150%)" }}
        >
          <Icon width={"15px"}>
            <Plant />
          </Icon>
        </Box>
      </DetailSection>
      <Box position="relative">
        <DetailSection title="HABIT TRACKER" art={<HabitTrackerIntro />}>
          <Text
            fontSize="md"
            lineHeight="1.5"
            color="primary.light"
            fontWeight="300"
          >
            motivate yourself by keeping your streaks going for as long as you
            can !
          </Text>
          <Text
            fontSize="md"
            lineHeight="1.5"
            color="primary.light"
            fontWeight="300"
          >
            track and view your habits right on your{" "}
            <Text as="b" color="primary.default">
              notion
            </Text>{" "}
            dashboard
          </Text>
          <Link
            href="https://www.notion.so/widgets-demo-cdf30a30ba704d5b8a55dc7a196d3e7b"
            underline
            passHref
          >
            check it out
          </Link>
        </DetailSection>
        <Box
          position="absolute"
          bottom="0"
          right="0"
          css={{ transform: "translate(calc(100%), 150%)" }}
        >
          <Icon width="50px">
            <img src="/bottle@2x.png" />
          </Icon>
        </Box>
      </Box>
      <DetailSection title="WATER TRACKER" art={<WaterTrackerIntro />}>
        <Text
          fontSize="md"
          lineHeight="1.5"
          color="primary.light"
          fontWeight="300"
        >
          at blocs we’ve created a super fun &amp; interactive way to keep
          yourself hydrated 💧
        </Text>
        <Text
          fontSize="md"
          lineHeight="1.5"
          color="primary.light"
          fontWeight="300"
        >
          like with all our products you can track exactly how you’re consuming
          water over time
        </Text>
        <Link
          href="https://www.notion.so/widgets-demo-cdf30a30ba704d5b8a55dc7a196d3e7b"
          passHref
          underline
        >
          check it out
        </Link>
      </DetailSection>
      <DetailSection title="AND TONS MORE ...">
        <Text
          fontSize="md"
          lineHeight="1.5"
          color="primary.light"
          fontWeight="300"
        >
          from sleep trackers to goal setters, we have a bunch ideas to take
          notion widgets to a whole new level
        </Text>
        <Text
          fontSize="md"
          lineHeight="1.5"
          color="primary.light"
          fontWeight="300"
        >
          check out our{" "}
          <Link
            color="secondary"
            fontWeight="400"
            passHref
            inline
            underline
            href="https://www.notion.so/81a847e283ca4d3583651d7d0d55f692?v=eb4ecf38b53949a6b531e387e90df22a"
          >
            roadmap
          </Link>{" "}
          to see what we’re working on
        </Text>
      </DetailSection>
      <Box
        borderTopColor="primary.lightest"
        borderTopWidth="1px"
        borderTopStyle="solid"
        py="xl"
        id="why-blocs"
        mx="auto"
        width="100%"
      >
        <SlideIn>
          <Box maxWidth="600px">
            <Text
              textAlign="left"
              fontWeight="bold"
              fontSize="lg"
              color="primary.default"
            >
              WHY BLOCS ?
            </Text>
            <Text
              textAlign="left"
              fontWeight="300"
              fontSize="md"
              color="primary.light"
            >
              Hi there 👋 <br />
              I’m Moniet, the founder of blocs
            </Text>
            <Text
              textAlign="left"
              fontWeight="300"
              fontSize="md"
              color="primary.light"
            >
              The whole idea of blocs came to me because I wanted to cut down
              the digital noise in my life
            </Text>
            <Text
              textAlign="left"
              fontWeight="300"
              fontSize="md"
              color="primary.light"
            >
              I thought it would be so cool if I could have my habit tracker,
              pomodoros, and water tracker apps all inside notion
            </Text>
            <Text
              textAlign="left"
              fontWeight="300"
              fontSize="md"
              color="primary.light"
            >
              Voila ! blocs was born
            </Text>
            <Text
              textAlign="left"
              fontWeight="300"
              fontSize="md"
              color="primary.light"
            >
              And now we’re working hard to expand its horizons to tons of
              productivity widgets
            </Text>
          </Box>
        </SlideIn>
      </Box>
    </PageLayout>
  )
}

export default LandingPage
