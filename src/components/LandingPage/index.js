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
import NotionSignInButton from "../NotionSignInButton"
import { useMediaQuery } from "beautiful-react-hooks"
import FadeIn from "../FadeIn"

const SocialIcon = styled.a`
  &:hover {
    transform: scale(1.1);
  }
  transition: transform 0.5s ease;
`

const SlideInWrapper = styled.div`
  opacity: 0;
  transform: translate3d(0, 50px, 0);
  transition: transform 1s ease, opacity 1s ease;
  transition-delay: ${({ delay }) => `${delay}s`};
`

const QuoteWrapper = styled.div`
  position: relative;
  &::after {
    @media (max-width: 500px) {
      width: 30px;
      height: 30px;
      background-position: center;
    }

    @media (max-width: 992px) {
      width: 50px;
      height: 50px;
      background-position: center;
    }

    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    transform: translateX(-50%);
    background-repeat: no-repeat;
    background-position: left;
    background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 70' width='100%25' height='100%25'%3E%3Ctext transform='translate(0 55)' fill='%23292929' font-size='60' font-family='Karla-Bold, Karla' font-weight='700' letter-spacing='0.06em'%3E%3Ctspan x='0' y='0'%3E“%3C/tspan%3E%3C/text%3E%3C/svg%3E");
  }
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
      flexDirection={["column-reverse", "column-reverse", , , "row"]}
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      my="xl"
      mx="auto"
    >
      <SlideIn>
        <Box width="min(100%, 400px)" m={["0 auto", "0 auto", , , 0]}>
          <Text
            as="h2"
            fontWeight="bold"
            fontSize="lg"
            color="primary.default"
            mt={["sm", "sm", , , 0]}
            textAlign={["center", "center", , , "left"]}
          >
            {title}
          </Text>
          <Text as="div" textAlign={["center", "center", , , "left"]}>
            {children}
          </Text>
        </Box>
      </SlideIn>
      <Box width={["50%", "100%", "60%", , "50%"]}>
        <SlideIn>{art}</SlideIn>
      </Box>
    </Flex>
  </section>
)

const LandingPage = () => {
  const isLandscape = useMediaQuery("(orientation: landscape)")

  const howItWorks = () =>
    isLandscape &&
    animate({
      from: window.scrollY,
      to: window.innerHeight,
      onUpdate: (yPos) => window.scrollTo(0, yPos),
    })

  return (
    <PageLayout>
      <Flex
        pt="80px"
        mt={["md", "lg", , , 0]}
        width="100%"
        minHeight="100vh"
        alignItems="center"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="primary.lightest"
        flexDirection={["column", "column", , , "row"]}
      >
        <Flex flex="1" flexDirection="column" mb={["lg", "lg", , , 0]}>
          <FadeIn duration="2s" index={0}>
            <Flex maxWidth="500px" position="relative">
              <QuoteWrapper>
                <Text
                  fontWeight="bold"
                  fontSize={["md", "lg", "xl"]}
                  as="h1"
                  mb="sm"
                  color="primary.default"
                  lineHeight="1.15"
                  letterSpacing="sm"
                  textAlign={["center", "center", , , "left"]}
                >
                  build better habits on notion with our beautiful{" "}
                  <BetaWrapper color="secondary">widgets</BetaWrapper>
                  <br />
                </Text>
              </QuoteWrapper>
            </Flex>
          </FadeIn>
          <FadeIn index={1}>
            <Flex
              alignItems="center"
              flexDirection={["column", "column", , , "row"]}
            >
              <Avatar src="/moniet.jpg" />
              <Box pl={[0, 0, , , "sm"]} mt={["sm", "sm", , , 0]}>
                <Text
                  lineHeight={1}
                  fontWeight="bold"
                  fontSize="sm"
                  letterSpacing="sm"
                  color="primary.default"
                  mb={0}
                  textAlign={["center", "center", , , "left"]}
                >
                  Moniet Sawhney
                </Text>
                <Text
                  fontSize="xxs"
                  color="primary.light"
                  fontWeight="300"
                  letterSpacing="sm"
                  mb={0}
                  textAlign={["center", "center", , , "left"]}
                >
                  founder of blocs.me
                </Text>

                <Flex
                  display="flex"
                  justifyContent={["center", "center", , , "flex-start"]}
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
          </FadeIn>
          <FadeIn index={2}>
            <Flex
              flexDirection="column"
              alignItems={["center", "center", , , "flex-start"]}
              mt={["md", "lg", "lg"]}
            >
              <NotionSignInButton />

              <Text
                fontSize="xxs"
                mt={["xs", "xs", , , "sm"]}
                color="primary.light"
                letterSpacing="sm"
              >
                get started for{" "}
                <Box as="span" color="secondary">
                  free !
                </Box>
              </Text>
            </Flex>
          </FadeIn>
        </Flex>
        <Box
          display={["none", "none", , , "block"]}
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
          width="100%"
          flexDirection="column"
          pl={[0, 0, , , "lg", "xl"]}
        >
          <Showcase />

          <FadeIn delay="2s">
            <Text
              as="button"
              p={0}
              fontSize="md"
              fontWeight="bold"
              mt="md"
              mb={["lg", "lg", , , 0]}
              onClick={() => howItWorks()}
            >
              HOW IT WORKS 👇
            </Text>
          </FadeIn>
        </Flex>
      </Flex>

      <DetailSection title="POMODORO" art={<PomodoroIntro />}>
        <Text fontSize="md" lineHeight="1.5" variant="p" fontWeight="300">
          blocs is bringing pomodoros to notion with{" "}
          <Text as="b" color="primary.default">
            so much more !
          </Text>
        </Text>
        <Text fontSize="md" lineHeight="1.5" variant="p" fontWeight="300">
          time-box any activity and gain insights about how you’re spending time
        </Text>
        <Text as="div" textAlign={["center", "center", , , "left"]}>
          <Link
            href="https://www.notion.so/widgets-demo-cdf30a30ba704d5b8a55dc7a196d3e7b"
            underline
            passHref
            inline
          >
            check it out
          </Link>
        </Text>
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
          <Text fontSize="md" lineHeight="1.5" variant="p" fontWeight="300">
            motivate yourself by keeping your streaks going for as long as you
            can !
          </Text>
          <Text fontSize="md" lineHeight="1.5" variant="p" fontWeight="300">
            track and view your habits right on your{" "}
            <Text as="b" color="primary.default">
              notion
            </Text>{" "}
            dashboard
          </Text>
          <Text as="div" textAlign={["center", "center", , , "left"]}>
            <Link
              href="https://www.notion.so/widgets-demo-cdf30a30ba704d5b8a55dc7a196d3e7b"
              underline
              passHref
              inline
            >
              check it out
            </Link>
          </Text>
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
        <Text fontSize="md" lineHeight="1.5" variant="p" fontWeight="300">
          at blocs we’ve created a super fun &amp; interactive way to keep
          yourself hydrated 💧
        </Text>
        <Text fontSize="md" lineHeight="1.5" variant="p" fontWeight="300">
          like with all our products you can track exactly how you’re consuming
          water over time
        </Text>
        <Text as="div" textAlign={["center", "center", , , "left"]}>
          <Link
            href="https://www.notion.so/widgets-demo-cdf30a30ba704d5b8a55dc7a196d3e7b"
            passHref
            underline
            inline
          >
            check it out
          </Link>
        </Text>
      </DetailSection>
      <DetailSection title="AND TONS MORE ...">
        <Text fontSize="md" lineHeight="1.5" variant="p" fontWeight="300">
          from sleep trackers to goal setters, we have a bunch ideas to take
          notion widgets to a whole new level
        </Text>
        <Text fontSize="md" lineHeight="1.5" variant="p" fontWeight="300">
          take a look at our{" "}
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
          <Box maxWidth="600px" m={["0 auto", "0 auto", , , "0"]}>
            <Text as="div" textAlign={["center", "center", , , "left"]}>
              <Text fontWeight="bold" fontSize="lg" color="primary.default">
                WHY BLOCS ?
              </Text>
              <Text fontWeight="300" fontSize="md" variant="p">
                Hi there 👋 <br />
                I’m Moniet, the founder of blocs
              </Text>
              <Text fontWeight="300" fontSize="md" variant="p">
                The whole idea of blocs came to me because I wanted to cut down
                the digital noise in my life
              </Text>
              <Text tfontWeight="300" fontSize="md" variant="p">
                I thought it would be so cool if I could have my habit tracker,
                pomodoros, and water tracker apps all inside notion
              </Text>
              <Text tfontWeight="300" fontSize="md" variant="p">
                Voila ! blocs was born
              </Text>
              <Text tfontSize="md" variant="p">
                And now we’re working hard to expand its horizons to tons of
                productivity widgets
              </Text>
            </Text>
          </Box>
        </SlideIn>
      </Box>
    </PageLayout>
  )
}

export default LandingPage
