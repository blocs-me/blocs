import Button from '@/design-system/Button'
import Text from '@/design-system/Text'
import TextInput from '@/design-system/TextInput'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import LinkIcon from 'src/icons/link-icon'
import Checkbox from '@/widgets/HabitTracker/Checkbox'
import { Camera } from 'src/icons/camera'
import { isEmail } from 'validator'
import { useEffect, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import useBlocsUser from '@/hooks/useBlocsUser'
import useNotifications from '@/design-system/Notifications/useNotifications'
import { postReq, putReq, deleteReq } from '../../../../utils/fetchingUtils'
import {
  useDebouncedCallback,
  useThrottledCallback
} from 'beautiful-react-hooks'
import { useRouter } from 'next/router'
import Modal from '@/design-system/Modal'
import UserSettingsPaymentSection from './UserSettingsPaymentSection'

const Label = ({ children }) => {
  return (
    <Text as="label" fontSize="xs" color="primary.accent-4">
      {children}
    </Text>
  )
}

interface CheckboxItemProps {
  onClick: (val: string) => void
  isChecked: boolean
  desc: string
  text: string
}

const CheckboxItem = ({
  text,
  desc,
  onClick,
  isChecked
}: CheckboxItemProps) => {
  return (
    <Flex
      role="input"
      alignItems="start"
      css={{ cursor: 'pointer' }}
      onClick={(e) => {
        onClick(e)
      }}
    >
      <Checkbox size="25px" isChecked={isChecked} />
      <Flex flexDirection="column" ml="sm">
        <Text fontSize={'sm'} color="foreground" lineHeight={1} mb="xs">
          {text}
        </Text>
        <Text fontSize="xs" fontWeight={200} color="primary.accent-4">
          {desc}
        </Text>
      </Flex>
    </Flex>
  )
}

const UserSettings = () => {
  const user = useUser()
  const blocsUser = useBlocsUser()
  const notif = useNotifications()
  const router = useRouter()

  const [avatarUrl, setAvatarUrl] = useState(blocsUser?.user?.data?.avatar_url)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState(false)
  const [savingEmail, setSavingEmail] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [isDeletingUser, setIsDeletingUser] = useState(false)

  useEffect(() => {
    if (blocsUser?.user) {
      setName(blocsUser?.user?.data?.name)
      setEmail(blocsUser?.user?.data?.email)
      setIsSubscribed(blocsUser?.user?.data?.isSubscribed)
      setAvatarUrl(blocsUser?.user?.data?.avatar_url)
    }
  }, [blocsUser?.user]) // eslint-disable-line

  const [isSubscribed, setIsSubscribed] = useState(
    blocsUser?.user?.data?.isSubscribed
  )
  const isLoading = !user || !blocsUser?.user || !blocsUser?.isValidating

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)

    putReq('/api/users/newsletter', {
      body: {
        subscriptionType: 'blocs_updates',
        status: !isSubscribed ? 'subscribe' : 'unsubscribe'
      }
    })
      .then((res) => {
        setConfirmEmail(false)
        notif.createSuccess('Successfully saved your newsletter settings')
      })
      .catch(() => {
        setIsSubscribed(!isSubscribed)
        notif.createError(
          'Something went wrong when trying to update your newsletter settings'
        )
      })
  }

  const saveAvatarUrl = useDebouncedCallback(
    useThrottledCallback(
      (newUrl: string) => {
        if (!newUrl) return null

        putReq('/api/users/avatar', {
          body: {
            avatar_url: newUrl
          }
        })
          .then(() => {
            blocsUser.mutate()
          })
          .catch(() => {
            notif.createError(
              'Uh oh! Something went wrong while trying to save the profile picture'
            )
          })
      },
      [],
      800
    ),
    [],
    25
  )

  const saveName = useDebouncedCallback(
    useThrottledCallback(
      (newName: string) => {
        putReq('/api/users/name', {
          body: {
            name: newName?.trim()
          }
        }).catch(() =>
          notif.createInfo('Uh oh! something went wrong when saving your name')
        )
      },
      [],
      800
    ),
    [],
    25
  )

  const saveNewEmail = () => {
    if (isEmail(email)) {
      setSavingEmail(true)
      postReq('/api/users/email-change', {
        body: {
          email: email
        }
      })
        .then(() => {
          notif.createInfo(
            "We've sent an email to both the new and old email ids. Please open them to confirm the email change.",
            10000
          )
        })
        .catch(() => {
          notif.createError("We weren't able to change your email address")
        })
        .finally(() => setSavingEmail(false))
    }
  }

  const deleteUser = () => {
    setIsDeletingUser(true)

    deleteReq('/api/users')
      .then(() => router.push('/account-deletion'))
      .catch((err) => err?.error && notif.createError(err?.error?.message))
  }

  return (
    <>
      <Flex
        size="100%"
        p="md"
        gap={['lg', , , , , , '8rem']}
        flexDirection={['column-reverse', , , , 'row']}
      >
        <Flex flex={['auto', , , , '1']} flexDirection="column">
          <Text
            as="h2"
            fontSize="md"
            fontWeight={600}
            color="foreground"
            m={0}
            mb="xs"
          >
            User Information
          </Text>
          <Text as="p" color="primary.accent-4" fontWeight={200} fontSize="sm">
            Once place for payment, personal info. & settings
          </Text>
          <Label>Email</Label>
          <Box mt="xs" />

          <TextInput
            ariaLabel="Email Input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (isEmail(e.target.value)) {
                setConfirmEmail(true)
              } else {
                setConfirmEmail(false)
              }
            }}
            error={
              !isEmail(email || '') && !isLoading
                ? 'Please enter a valid email'
                : ''
            }
          />
          {confirmEmail && (
            <Button
              variant="success"
              mt="sm"
              onClick={saveNewEmail}
              disabled={savingEmail}
            >
              Confirm Email Change
            </Button>
          )}
          <Box mt="sm" />
          <Label>Full Name</Label>
          <Box mt="xs" />
          <TextInput
            ariaLabel="Full Name Input"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              saveName(e.target.value)
            }}
          />
          <Text
            as="h3"
            fontSize="sm"
            fontWeight={600}
            color="foreground"
            m={0}
            mb="sm"
            mt="lg"
          >
            Manage your account
          </Text>
          <UserSettingsPaymentSection />
          <Button
            px="sm"
            py="xs"
            width="100%"
            borderRadius="md"
            color="danger.medium"
            border="solid 1px"
            borderColor="danger.dark"
            hoverColor="neutral.white"
            hoverBg="danger.medium"
            onClick={(e) => {
              e?.stopPropagation()
              e?.preventDefault()
              setDeleteModal(true)
            }}
          >
            Delete Account
          </Button>
        </Flex>
        <Flex flex={1} flexDirection="column">
          <Text
            as="h3"
            fontSize="sm"
            fontWeight={600}
            color="foreground"
            m={0}
            mb="md"
            mt="0"
          >
            Profile Photo
          </Text>

          <Box
            position="relative"
            css={{ alignSelf: 'center' }}
            height="fit-content"
            mb="md"
          >
            <Box
              as="img"
              src={blocsUser.user?.data?.avatar_url || '/profile.svg'}
              alt="Change profile photo"
              borderRadius="50%"
              size="100px"
              border="solid 1px"
              borderColor="primary.accent-1"
              p="xs"
            />

            <Flex
              size="30px"
              bg="brand.accent-1"
              borderRadius="50%"
              position="absolute"
              bottom="0"
              right="0"
              boxShadow="default"
            >
              <Icon fill="background" width="15px" m="auto" display="flex">
                <Camera />
              </Icon>
            </Flex>
          </Box>
          <Box position="relative" width="100%">
            <TextInput
              onChange={(v) => {
                setAvatarUrl(v.target.value)
                saveAvatarUrl(v.target.value.trim())
              }}
              value={avatarUrl}
              ariaLabel="Profile Picture URL"
              placeholder="User profile link"
              css={{ width: '100%' }}
            />

            <Icon
              width="30px"
              display="flex"
              p="5px"
              bg="background"
              css={{
                position: 'absolute',
                transform: 'translateY(-50%)',
                top: '50%',
                right: '0.5rem'
              }}
              fill="foreground"
            >
              <LinkIcon />
            </Icon>
          </Box>
          <Text fontSize="sm" fontWeight="bold" mt="lg" color="foreground">
            Newsletter
          </Text>
          <Flex flexDirection="column">
            <CheckboxItem
              text="Product updates"
              desc="Updates about new features and widgets"
              onClick={() => handleSubscribe()}
              isChecked={isSubscribed}
            />
            <Box mt="sm" />
          </Flex>
        </Flex>
      </Flex>

      <Modal hideModal={() => setDeleteModal(false)} visible={deleteModal}>
        <Box p="sm">
          <Text variant="mediumBold" textAlign={'center'}>
            Are you sure you want to delete your account ?
          </Text>
          <Text
            fontSize={'sm'}
            fontWeight={200}
            textAlign="center"
            color="danger.medium"
          >
            Warning : All purchase history and associated data will be lost
          </Text>
          <Box pt="md" />
          <Flex>
            <Button
              mr="md"
              variant="danger"
              onClick={() => deleteUser()}
              css={{ flex: 1 }}
              hoverBg="danger.light"
              disabled={isDeletingUser}
              loading={isDeletingUser}
            >
              Yes, delete my account
            </Button>
            <Button
              disabled={isDeletingUser}
              variant="outlined"
              borderRadius="md"
              css={{ flex: 1 }}
              hoverBg="primary.accent-2"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </Button>
          </Flex>
        </Box>
      </Modal>
    </>
  )
}

export default UserSettings
