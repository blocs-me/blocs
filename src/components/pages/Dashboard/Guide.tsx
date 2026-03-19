import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Image from 'next/legacy/image'
import { Document } from 'src/icons/document'
import Drop from 'src/icons/drop-icon'

const WidgetsWarning = () => (
  <Flex
    m="sm"
    p="sm"
    borderRadius="md"
    bg="primary.accent-2"
    borderLeft="solid 5px"
    borderColor="danger.medium"
  >
    <Text as="span" role="img" fontSize="md">
      ⚠️
    </Text>
    <Para css={{ margin: 0 }}>
      <b>
        <i>
          All widgets on the dashboard are only for visual purposes and only
          work when embedded inside Notion.
        </i>
      </b>
    </Para>
  </Flex>
)

const Para = ({ children, className = undefined }) => {
  return (
    <Text
      className={className}
      color="foreground"
      fontSize="sm"
      fontWeight={200}
      mb="sm"
      px="sm"
    >
      {children}
    </Text>
  )
}

const Header = ({ children }) => {
  return (
    <Text variant="h4" color="foreground" mb="sm" mt="md" px="sm">
      {children}
    </Text>
  )
}

const Summary = ({ children }) => {
  return (
    <Text
      as="summary"
      color="foreground"
      fontWeight="400"
      letterSpacing="md"
      fontSize="md"
      bg="primary.accent-1"
      p="sm"
      css={{ borderRadius: '0.5rem', cursor: 'pointer' }}
    >
      {children}
    </Text>
  )
}

const Details = ({ children }) => {
  return (
    <Box
      mt="sm"
      border="solid 1px"
      borderColor="primary.accent-1"
      borderRadius="md"
      as="details"
    >
      {children}
    </Box>
  )
}

const Guide = () => {
  return (
    <Flex flexDirection="column" p="md" width={['100%', , , , , '70%']}>
      <div>
        <Text
          as="h2"
          color="foreground"
          fontWeight="bold"
          m={0}
          lineHeight={1}
          mt="lg"
        >
          Guide <br />
        </Text>
      </div>
      <Details>
        <Summary>How to embed the widgets</Summary>

        <WidgetsWarning />

        <Header>Step 1 : Copy The Link</Header>

        <Flex flexWrap="wrap" p="sm" borderRadius="sm" css={{ gap: '1rem' }}>
          <Box
            as="iframe"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/V_5VuSs-4VQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            css={{ borderRadius: '0.5rem' }}
          ></Box>
        </Flex>
        <Para>
          Once you sign up, you will automatically be redirected to the
          dashboard where you will see a list of widgets in the Sidebar
          underneath your profile picture.
        </Para>
        <Para>
          Simple click on <b>&#39;copy link&#39;</b>, and we&#39;ll auto copy
          the link . In some cases we have two links. A <b>public</b> link and a{' '}
          <b>private</b> link.
        </Para>
        <Para>
          Why two links ? <br />
          Glad you asked 😬. If you want to share your analytics or your widgets
          with friends, we will provide public link which you can share with
          them. They won&#39;t be able to make any changes when this link is
          given to them so your data will be safe.
        </Para>

        <Header>Step 2 : Embed The Copied Link In Notion</Header>
        <Para>Here&#39;s how :</Para>
        <Flex p="sm" borderRadius="md" overflow="hidden">
          <Box
            as="iframe"
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/RZbU2rPZXGw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            css={{ borderRadius: '0.5rem' }}
          />
        </Flex>
      </Details>

      <Details>
        <Summary>Widget Basics</Summary>
        <Header>Settings</Header>
        <WidgetsWarning />

        <Para>
          Every widget will have a menu icon where the settings are located. It
          looks something like this :
        </Para>

        <Flex p="sm">
          <Image
            src="/widget-settings-1.png"
            alt="Widget Settings Button Example"
            width="400"
            height="465"
          />
          <Box ml="xs" />
          <Image
            src="/widget-settings-2.png"
            alt="Widget Settings Menu Example"
            width="400"
            height="465"
          />
        </Flex>
        <Para>
          Every widget with exception of the pomodoro can be shared with
          friends. Inside the settings and on the blocs dashboard you&#39;ll
          find the option to copy a <b>public</b> link which you can share with
          a buddy.
        </Para>

        <Header>Theme</Header>
        <Para>
          You are also able to toggle between <b>light</b>, <b>dark</b> mode and{' '}
          <b>system</b> mode (more on this below) every widget. This can be
          found in the settings menu as mentioned above.
        </Para>
        <Para>
          <b>System mode</b> is when you want the widget to follow the theme of
          your OS. It makes sense to use this when both Notion and the Widget
          and set to the &#39;system&#39;system theme mode.
        </Para>
        <Para>
          In the example GIF below system mode turns the widget to dark mode
          since my laptop was set to dark mode.
        </Para>

        <Flex p="sm">
          <Image
            src="/theme-change.gif"
            alt="Example GIF of widget theme changing"
            width={400}
            height={412}
          />
        </Flex>

        <Header>Sharing With Friends / Accountability Partner</Header>
        <Para>
          Each blocs widget (with exception of the Pomodoro) can be shared with
          friends.
        </Para>
        <Para>
          With either the &#39;copy link&#39; option on the dashboard or the
          &#39;shareable link&#39; option in the widget settings menu (inside
          the widget) we will provide both a shareable link and a private link.
        </Para>
      </Details>

      {/* <Details>
        <Summary>ow to use : Templates And Ideas</Summary>

        <Header>Get things done : Notion Template</Header>
        <Para>
          Every widget will have a menu icon where the settings are located. It
          looks something like this :
        </Para>

        <Header>
          Accountability Partner :{' '}
          <span css={{ verticalAlign: 'center ' }}>
            <Document />
          </span>{' '}
          Habit Tracker Template
        </Header>
        <Header>
          Accountability Partner :{' '}
          <span css={{ verticalAlign: 'center ' }}>
            <Drop />
          </span>{' '}
          Water Tracker Template
        </Header>
      </Details> */}
    </Flex>
  )
}

export default Guide
