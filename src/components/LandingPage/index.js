/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useRef, useState } from "react"
import Head from "next/head"
import styled from "@emotion/styled"
// import { useMediaQuery } from "beautiful-react-hooks"
import { animate } from "popmotion"
import Confetti from "react-dom-confetti"
import Box from "../Box"
import Flex from "../Flex"
import PageLayout from "../PageLayout"
import Text from "../Text"
import Icon from "../Icon"
import Avatar from "../Avatar"
import Linkedin from "../../icons/linkedin.svg"
import Codepen from "../../icons/codepen.svg"
import Email from "../../icons/email.svg"
import Showcase from "./Showcase"
import PomodoroIntro from "./pomodoroIntro.svg"
import HabitTrackerIntro from "./habitTrackerIntro.svg"
import Link from "../Link"
import Plant from "../../icons/plant.svg"
import WaterTrackerIntro from "./WaterTrackerIntro"
import BetaWrapper from "../BetaWrapper"
import NotionSignInButton from "../NotionSignInButton"
import FadeIn from "../FadeIn"
import useMediaQuery from "../../hooks/useMediaQuery"
import useAuth from "../../hooks/useAuth"
import globalContext from "../../contexts/GlobalContextProvider/globalContext"
import Button from "../Button"
import { LOADING, SUCCESS } from "../../constants/fetchStates"
import Loader from "../Loader"

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: "116",
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
}

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
    @media (max-width: 991px) {
      width: 65px;
      height: 65px;
      background-position: right;
    }

    @media (max-width: 650px) {
      width: 40px;
      height: 40px;
      transform: translateX(-90%);
    }

    @media (max-width: 550px) {
      display: none;
    }

    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 10px;
    width: 50px;
    height: 50px;
    transform: translateX(-100%);
    background-repeat: no-repeat;
    background-position: left;
    background-size: 70%;
    background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 70' width='100%25' height='100%25'%3E%3Ctext transform='translate(0 55)' fill='%23292929' font-size='60' font-family='Karla, sans-serif' font-weight='700' letter-spacing='0.06em'%3E%3Ctspan x='0' y='0'%3E“%3C/tspan%3E%3C/text%3E%3C/svg%3E");
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
      <Box width={["50%", "100%", "80%", , "60%", "50%"]}>
        <SlideIn>{art}</SlideIn>
      </Box>
    </Flex>
  </section>
)

const LandingPage = () => {
  const isLandscape = useMediaQuery("(orientation: landscape)")
  const [{ authValid, authState }] = useContext(globalContext)
  const [confetti, setConfetti] = useState(false)

  useAuth()

  const howItWorks = () =>
    isLandscape &&
    animate({
      from: window.scrollY,
      to: window.innerHeight,
      onUpdate: (yPos) => window.scrollTo(0, yPos),
    })

  useEffect(() => {
    if (authValid && authState === SUCCESS) {
      setTimeout(() => {
        setConfetti(true)
      }, 500)
    }
  }, [authValid, authState])

  return (
    <PageLayout>
      <Head>
        <title>blocs | notion widgets for habit building</title>
        <meta
          name="description"
          content="Blocs notion widgets help you build habits with amazing insights to understand yourself better. Track all your habits in one place !"
        />
        <link name="canonical" href="https://blocs.me" />

        <title>blocs | notion widgets for habit building</title>
        <meta
          name="title"
          content="blocs | notion widgets for habit building"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.blocs.me/" />
        <meta
          property="og:title"
          content="blocs | notion widgets for habit building"
        />
        <meta
          property="og:description"
          content="Blocs notion widgets help you build habits with amazing insights to understand yourself better. Track all your habits in one place !"
        />
        <meta
          property="og:image"
          content="https://www.blocs.me/blocs-social-banner.png"
        />
        <meta property="og:site_name" content="blocs" />

        {/* twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_moniet" />
        <meta name="twitter:creator" content="@_moniet" />
        <meta property="twitter:url" content="https://www.blocs.me/" />
        <meta
          property="twitter:title"
          content="blocs | notion widgets for habit building"
        />
        <meta
          property="twitter:description"
          content="Blocs notion widgets help you build habits with amazing insights to understand yourself better. Track all your habits in one place !"
        />
        <meta
          property="twitter:image"
          content="https://www.blocs.me/blocs-social-banner.png"
        />
      </Head>
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
          <FadeIn duration="0.5s" index={0}>
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
          <FadeIn delay="0.5s">
            <Flex
              alignItems="center"
              flexDirection={["column", "column", , , "row"]}
            >
              <Avatar
                src="/moniet.png"
                alt="Headshot of blocs founder moniet sawhney"
              />
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
                    rel="noopener"
                    target="_blank"
                    aria-label="Blocs founders Linkedin"
                  >
                    <Icon size="50px">
                      <Linkedin />
                    </Icon>
                  </SocialIcon>
                  <SocialIcon
                    href="https://codepen.com/moniet"
                    rel="noopener"
                    target="_blank"
                    aria-label="Blocs founders Codepen"
                  >
                    <Icon size="50px">
                      <Codepen />
                    </Icon>
                  </SocialIcon>
                  <SocialIcon
                    href="mailto:moniet@blocs.me"
                    rel="noopener"
                    aria-label="Blocs founders Email address"
                  >
                    <Icon size="50px">
                      <Email />
                    </Icon>
                  </SocialIcon>
                </Flex>
              </Box>
            </Flex>
          </FadeIn>
          <FadeIn delay="0.8s">
            <Flex
              flexDirection="column"
              alignItems={["center", "center", , , "flex-start"]}
              mt={["md", "lg", "lg"]}
            >
              {!authValid && authState === LOADING && (
                <Flex
                  as="div"
                  alignItems="center"
                  justifyContent="center"
                  width="min(100%, 300px)"
                  fontSize={["xs", "xs", "sm"]}
                  bg="primary.dark"
                  color="primary.lightest"
                  borderRadius="sm"
                  px="md"
                  py="xs"
                  letterSpacing="sm"
                >
                  <Loader />
                </Flex>
              )}
              {!authValid && authState !== LOADING && <NotionSignInButton />}
              {authValid && (
                <Flex flexDirection="column" alignItems="center">
                  <Confetti config={confettiConfig} active={confetti} />
                  <Button
                    bg="primary.dark"
                    borderRadius="sm"
                    p="sm"
                    minWidth="300px"
                    color="primary.lightest"
                    css={{ textAlign: "center" }}
                    fontSize="sm"
                    fontWeight="300"
                    onClick={() => {
                      setConfetti(false)
                      setTimeout(() => {
                        setConfetti(true)
                      }, 0)
                    }}
                  >
                    🎉 Thank you for signing up{" "}
                  </Button>
                </Flex>
              )}

              {!authValid && authState !== LOADING && (
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
              )}
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
          <FadeIn delay="1.3s">
            <Text
              as="button"
              p={0}
              fontSize="md"
              fontWeight="bold"
              mt="md"
              mb={["lg", "lg", , , 0]}
              onClick={() => howItWorks()}
            >
              LEARN MORE 👇
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
            rel="noopener"
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
              rel="noopener"
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
          display={["none", "none", , "block"]}
          css={{ transform: "translate(calc(100%), 150%)" }}
        >
          <img src="/bottle@2x.png" alt="" width="50px" height="60px" />
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
            rel="noopener"
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
            rel="noopener"
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
                on the digital noise in my life
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
