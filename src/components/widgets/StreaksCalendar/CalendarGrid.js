import { useEffect, useMemo, useRef, useState } from "react"
import Text from "@/design-system/Text"
import {
  AnimatePresence,
  m,
  LazyMotion,
  domAnimation,
  motion,
} from "framer-motion"
import Box from "@/helpers/Box"
import Stack from "@/helpers/Stack"
import Flex from "@/helpers/Flex"
import { useResizeObserver } from "beautiful-react-hooks"
const { default: CalendarCell } = require("./CalendarCell")

const NUMBER_OF_ROWS = 6
const NUMBER_OF_COLUMNS = 7
const CELL_WIDTH = ["25px", , "40px"]

const fallback = Array(NUMBER_OF_COLUMNS * NUMBER_OF_ROWS)
  .fill("")
  .map((_, i) => i + 1)

const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const DayOfTheWeek = ({ day }) => (
  <Flex size={CELL_WIDTH} alignItems="center" justifyContent="center">
    <Text
      m={0}
      p={0}
      textAlign="center"
      fontSize={["10px", , "xxs"]}
      fontWeight={200}
      color="primary.accent-2"
    >
      {day}
    </Text>
  </Flex>
)

const GridAnimationWrapper = ({ currentDate, children }) => (
  <motion.div
    key={currentDate}
    initial={{
      x: 1000,
    }}
    animate={{
      x: 0,
    }}
    exit={{
      x: -1000,
    }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
)

const gridAnimation = {
  initial: { x: 1000, y: 0 },
  enter: { y: 0, x: 0 },
  exit: { y: 0, x: -1000 },
}

const CalendarGrid = ({ dates = [], currentDate }) => {
  const rows = useMemo(() => {
    const rows = []
    let skip = 0

    while (rows?.length < NUMBER_OF_ROWS) {
      rows.push(dates.slice(skip, skip + NUMBER_OF_COLUMNS))
      skip += 7
    }

    return rows
  }, [dates])

  return (
    <Box
      p="xs"
      borderRadius="md"
      height="100%"
      border="solid 1px"
      borderColor="primary.accent-1"
      overflow="hidden"
    >
      <Stack display="flex" justifyContent="space-between">
        {daysOfTheWeek.map((day) => (
          <DayOfTheWeek key={day} day={day} />
        ))}
      </Stack>

      <Stack mt="xxs">
        {rows.map((weeks, i) => (
          <Stack key={i} display="flex" ml="xs" justifyContent="space-between">
            {weeks.map((data = {}) => (
              <CalendarCell size={CELL_WIDTH} key={data.day} {...data} />
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

export default CalendarGrid
