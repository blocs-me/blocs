import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import Nav from '@/design-system/Nav'
import Footer from '@/design-system/Footer'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Button from '@/design-system/Button'
import { NextSeo } from 'next-seo'
import nextSeoConfig from '@/constants/next-seo.config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { postReq } from '@/utils/fetchingUtils'
import { isEmail } from 'validator'

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const WelcomeContent = () => {
  const router = useRouter()
  const sessionId = router.query.session_id as string

  const [showEmailChange, setShowEmailChange] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailChanged, setEmailChanged] = useState(false)
  const [changedTo, setChangedTo] = useState('')

  const handleEmailChange = async () => {
    if (!newEmail || !isEmail(newEmail)) {
      setEmailError('Please enter a valid email')
      return
    }
    if (!sessionId) {
      setEmailError('Missing session info. Please contact support.')
      return
    }

    setEmailError('')
    setEmailLoading(true)

    try {
      await postReq('/api/users/email-change-post-checkout', {
        body: { sessionId, newEmail }
      })
      setEmailChanged(true)
      setChangedTo(newEmail)
    } catch (err: any) {
      const msg = err?.message || 'Something went wrong. Please try again.'
      setEmailError(msg)
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <Flex
      flexDirection="column"
      minHeight="100vh"
      bg="background"
    >
      <NextSeo
        {...nextSeoConfig}
        title="Welcome to Blocs Pro"
        noindex
      />
      <Nav />
      <Flex
        width="100%"
        css={{ minHeight: 'calc(100vh - 80px)' }}
        py="md"
        pt="xl"
        px="md"
        justifyContent="center"
      >
        <Flex flexDirection="column" width="420px" alignItems="center">
          <Box color="brand.accent-1" mb="xs">
            <EmailIcon />
          </Box>

          <Text
            as="h1"
            fontSize="xl"
            fontWeight="bold"
            color="foreground"
            textAlign="center"
            mb="xxs"
          >
            You&apos;re in!
          </Text>

          <Text
            fontSize="md"
            color="primary.accent-4"
            textAlign="center"
            m={0}
            lineHeight={1.6}
          >
            Check your email for a magic link to access your Pro dashboard.
          </Text>

          <Box
            mt="sm"
            p="sm"
            borderRadius="md"
            bg="primary.accent-2"
            width="100%"
          >
            <Text fontSize="sm" color="foreground" textAlign="center" m={0} lineHeight={1.6}>
              We created an account with your checkout email and sent a sign-in link. Click it to get started.
            </Text>
          </Box>

          <Text fontSize="sm" color="primary.accent-4" textAlign="center" mt="sm" lineHeight={1.6}>
            Didn&apos;t get it?{' '}
            <Link href="/sign-in">
              <Text
                as="span"
                fontSize="sm"
                color="brand.accent-1"
                css={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                Request another link
              </Text>
            </Link>
          </Text>

          {!emailChanged ? (
            <Box mt="sm" width="100%">
              <Text
                as="button"
                fontSize="sm"
                color="brand.accent-1"
                m={0}
                css={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  display: 'block',
                  width: '100%',
                  textAlign: 'center'
                }}
                onClick={() => setShowEmailChange(!showEmailChange)}
              >
                Want to use a different email?
              </Text>

              {showEmailChange && (
                <Box mt="xs" p="sm" borderRadius="md" border="1px solid" borderColor="primary.accent-2" width="100%">
                  <Text fontSize="xs" color="primary.accent-4" m={0} mb="xs">
                    Enter a new email for your dashboard account. We&apos;ll update it and send a fresh magic link.
                  </Text>
                  <Flex css={{ gap: '8px' }}>
                    <input
                      type="email"
                      placeholder="new@email.com"
                      value={newEmail}
                      onChange={(e) => {
                        setNewEmail(e.target.value)
                        setEmailError('')
                      }}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #999',
                        fontSize: '14px',
                        background: 'transparent',
                        color: 'var(--colors-foreground)',
                        outline: 'none'
                      }}
                    />
                    <Button
                      py="xxs"
                      px="sm"
                      borderRadius="md"
                      fontSize="xs"
                      bg="brand.accent-1"
                      color="neutral.white"
                      onClick={handleEmailChange}
                      loading={emailLoading}
                      disabled={emailLoading}
                      css={{ flexShrink: 0 }}
                    >
                      Update
                    </Button>
                  </Flex>
                  {emailError && (
                    <Text fontSize="xs" color="error.medium" m={0} mt="xxs">
                      {emailError}
                    </Text>
                  )}
                </Box>
              )}
            </Box>
          ) : (
            <Box mt="sm" p="sm" borderRadius="md" bg="brand.accent-5" width="100%">
              <Text fontSize="sm" fontWeight={600} color="brand.accent-1" m={0} textAlign="center">
                Email updated to {changedTo}
              </Text>
              <Text fontSize="xs" color="primary.accent-4" m={0} mt="xxs" textAlign="center">
                Check your new inbox for a magic link.
              </Text>
            </Box>
          )}
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  )
}

const Welcome = () => (
  <BlocsThemeProvider>
    <WelcomeContent />
  </BlocsThemeProvider>
)

export default Welcome
