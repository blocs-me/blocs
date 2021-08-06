import Flex from "@/helpers/Flex"
import MenuHeader from "../Typography/MenuHeader"
import Label from "../../../../icons/label.svg"
import ScrollProvider from "@/design-system/ScrollProvider"
import useSWR from "swr"
import { SETTINGS_PATH } from "@/utils/endpoints"
import fetcher from "@/utils/fetcher"
import { useMemo } from "react"
import Stack from "@/helpers/Stack"
import Skeleton from "@/helpers/Skeleton"
import Box from "@/helpers/Box"
import LabelItem from "./LabelItem"
import { usePomodoroStore } from "../usePomodoroStore"

const PomodoroLabels = () => {
  const { data: settings, error } = useSWR(SETTINGS_PATH, fetcher)
  const { sessionSettings } = usePomodoroStore()

  if (!settings) {
    return (
      <Flex
        flexDirection="column"
        width="100%"
        height="100%"
        position="relative"
      >
        <MenuHeader icon={<Label />} title="labels" />

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
      <MenuHeader icon={<Label />} title="labels" />
      <ScrollProvider px="sm">
        <Stack mt="sm">
          {settings?.data.map((setting) => (
            <LabelItem
              {...setting}
              key={setting.id}
              selected={sessionSettings.id === setting.label[1]}
            />
          ))}
        </Stack>
      </ScrollProvider>
    </Flex>
  )
}

export default PomodoroLabels
