import Flex from '@/helpers/Flex'

import useColorMode from '@/hooks/useColorMode'
import { BlocsLogo } from 'src/icons/blocs-logo'
import Moon from 'src/icons/moon'
import Sun from 'src/icons/sun'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'
import Button from '@/design-system/Button'
import Link from 'next/link'
import Avatar from '@/design-system/Avatar'
import Text from '@/design-system/Text'
import { ReactNode, forwardRef } from 'react'
import { useRouter } from 'next/router'
import useBlocsUser from '@/hooks/useBlocsUser'

const LinkText = forwardRef(({ children }: { children: ReactNode }, ref) => (
    <Text
        as="div"
        color="foreground"
        fontSize="sm"
        css={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
    >
        {children}
    </Text>
))

const FeedbackNav = () => {
    const blocsUser = useBlocsUser()
    const router = useRouter()

    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            height="80px"
            bg="background"
            px="md"
            borderBottom="solid 1px"
            borderColor="primary.accent-2"
        >
            <Flex
                size="50px"
                onClick={() => router.push('/')}
                css={{ cursor: 'pointer' }}
            >
                <BlocsLogo />
            </Flex>

            <Flex css={{ gap: '2rem' }} alignItems="center">
                <Link href="/dashboard/pomodoro">
                    <a>
                        <LinkText>Dashboard</LinkText>
                    </a>
                </Link>
                <Avatar
                    variant="sm"
                    alt="profile picture"
                    loading={!blocsUser.user}
                    src={blocsUser.user?.avatar_url}
                />
            </Flex>
        </Flex>
    )
}

export default FeedbackNav
