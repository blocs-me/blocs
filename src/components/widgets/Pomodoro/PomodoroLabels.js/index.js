import Flex from "@/helpers/Flex"
import MenuHeader from "../Typography/MenuHeader"
import Clock from "../../../../icons/clock.svg"
import ScrollProvider from "@/design-system/ScrollProvider"
import useSWR from "swr"
import { POMODORO_PRESETS_PATH, SETTINGS_PATH } from "@/utils/endpoints"
import fetcher from "@/utils/fetcher"
import Stack from "@/helpers/Stack"
import Skeleton from "@/helpers/Skeleton"
import Box from "@/helpers/Box"
import LabelItem from "./LabelItem"
import { usePomodoroStore } from "../usePomodoroStore"
import Text from "@/design-system/Text"
import Icon from "@/helpers/Icon"
import Plus from "../../../../icons/plus.svg"
import Button from "@/design-system/Button"

const PomodoroLabels = () => {
  const { data: settings, error } = useSWR(POMODORO_PRESETS_PATH, fetcher)
  const { currentPreset } = usePomodoroStore()

  if (!settings) {
    return (
      <Flex
        flexDirection="column"
        width="100%"
        height="100%"
        position="relative"
      >
        <MenuHeader icon={<Clock />} title="pomodoro" />

        <ScrollProvider height="100%">
          <Box px="sm" height="100%">
            <Stack mt="sm">
              {Array(6)
                .fill("")
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    width="100%"
                    height="40px"
                    borderRadius="md"
                  />
                ))}
            </Stack>
          </Box>
        </ScrollProvider>
      </Flex>
    )
  }

  return (
    <Flex flexDirection="column" width="100%" height="100%" position="relative">
      <MenuHeader icon={<Clock />} title="pomodoro" />
      <ScrollProvider px="sm" height="100%">
        <Stack mt="sm" flex="1">
          <Button
            as="button"
            alignItems="center"
            borderRadius="md"
            bg="primary.accent-1"
            width="calc(100% - 40px)"
            p="xs"
            css={{ display: "flex", alignItems: "center" }}
            variant="lightBg"
          >
            <Flex bg="primary.accent-4" borderRadius="sm" p="xxs" mr="xs">
              <Icon stroke="bg.default" width="20px" m="auto" display="flex">
                <Plus />
              </Icon>
            </Flex>
            <Text fontSize="xs" fontWeight="400" m={0}>
              new session
            </Text>
          </Button>
          {settings?.data?.map((setting) => (
            <LabelItem
              preset={setting}
              key={setting.id}
              selected={currentPreset.id === setting.id}
            />
          ))}
        </Stack>
        <Box height="50px" />
      </ScrollProvider>
    </Flex>
  )
}

export default PomodoroLabels
