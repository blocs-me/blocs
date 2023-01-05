import Button from '@/design-system/Button'
import Text from '@/design-system/Text'
import TextInput from '@/design-system/TextInput'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import { useForm } from 'react-hook-form'
import { Past } from '../../../../icons/Past'
import useUser from '@/hooks/useUser'
import LinkIcon from 'src/icons/link-icon'
import Checkbox from '@/widgets/HabitTracker/Checkbox'
import { Camera } from 'src/icons/camera'
import { isEmail } from 'validator'

const Label = ({ children }) => {
  return (
    <Text as="label" fontSize="xs" color="primary.accent-4">
      {children}
    </Text>
  )
}

const FreeTrailStatus = () => {
  return (
    <Box
      borderRadius="md"
      bg="brand.accent-5"
      p="sm"
      mb="sm"
      position="relative"
    >
      <Text
        color="foreground"
        fontSize="sm"
        fontWeight={'bold'}
        lineHeight={1}
        mb={0}
      >
        Free
      </Text>
      <Text color="primary.accent-4" fontSize="xs" mb={0}>
        Includes access to basic features
      </Text>

      <Box position="absolute" top="0" right="0" p="sm">
        <Box
          fontSize="xs"
          as="div"
          fontWeight={'bold'}
          color="primary.accent-4"
          display="flex"
          css={{ alignItems: 'center' }}
        >
          <Icon
            as="span"
            fill="primary.accent-4"
            width="15px"
            mr="xs"
            display="flex"
          >
            <Past />
          </Icon>
          <Text fontSize="xs" as="span">
            7 days
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

const PremiumStatus = () => {
  return (
    <Box
      borderRadius="md"
      bg="brand.accent-5"
      p="sm"
      mb="sm"
      position="relative"
    >
      <Text
        color="foreground"
        fontSize="sm"
        fontWeight={'bold'}
        lineHeight={1}
        mb={0}
      >
        Premium User
      </Text>
      <Text color="primary.accent-4" fontSize="xs" mb={0}>
        Includes access to widget(s), analytics and extras
      </Text>

      <Box position="absolute" top="0" right="0" p="sm">
        <Box
          fontSize="xs"
          as="div"
          fontWeight={'bold'}
          color="primary.accent-4"
          display="flex"
          css={{ alignItems: 'center' }}
        >
          <Icon
            as="span"
            fill="primary.accent-4"
            width="15px"
            mr="xs"
            display="flex"
          >
            <Past />
          </Icon>
          <Text fontSize="xs" as="span">
            7 days
          </Text>
        </Box>
      </Box>
    </Box>
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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    reValidateMode: 'onChange'
  })
  const { user } = useUser()

  const onSubmit = ({ email, fullName }) => {}

  return (
    <Flex size="100%" p="md" css={{ gap: '8rem' }}>
      <Flex flex="1" flexDirection="column">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            You can edit your information here
          </Text>
          <Label>Email</Label>
          <Box mt="xs" />
          <TextInput
            ariaLabel="Email Input"
            type="email"
            {...register('email', {
              required: 'true',
              validate: (val) => isEmail(val)
            })}
            error={errors?.email ? 'Please enter a valid email' : ''}
          />
          <Box mt="sm" />
          <Label>Full Name</Label>
          <Box mt="xs" />
          <TextInput
            ariaLabel="Full Name Input"
            {...register('fullName', {
              required: 'true'
            })}
            error={errors?.fullName ? 'This field cannot be empty' : ''}
          />
          <Box mt="md" />
          <Button variant="success" width="100%">
            Save Personal Information
          </Button>
        </form>
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
        {user.isPremium ? <PremiumStatus /> : <FreeTrailStatus />}
        <Button
          px="sm"
          py="xs"
          width="100%"
          borderRadius="md"
          color="danger.light"
          border="solid 1px"
          borderColor="danger.light"
          hoverColor="neutral.white"
          hoverBg="danger.light"
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
            src={user?.avatar_url || '/profile.svg'}
            alt="Change profile photo"
            borderRadius="50%"
            size="100px"
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
            ariaLabel="Profile Picture URL"
            {...register('profilePicture')}
            placeholder="User profile link"
            css={{ width: '100%' }}
          />

          <Icon
            width="20px"
            display="flex"
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
            onClick={() => {}}
            isChecked
          />
          <Box mt="sm" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default UserSettings
