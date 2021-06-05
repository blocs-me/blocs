/** @jsxImportSource @emotion/react */
import { useState } from "react"
import { useTheme } from "@emotion/react"
import Flex from "../Flex"
import WidgetLayout from "../WidgetLayout"
import Calendar from "../../icons/calendar.svg"
import Plus from "../../icons/plus.svg"
import Box from "../Box"
import Text from "../Text"
import Button from "../Button"

const Checkbox = ({ checked = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
  >
    <g id="Group_371" data-name="Group 371" transform="translate(-3258 856)">
      {checked && (
        <g id="checkbox" transform="translate(3258 -856)">
          <rect
            id="Rectangle_43"
            data-name="Rectangle 43"
            width="17"
            height="17"
            rx="5"
            fill="#0070e0"
          />
          <path
            id="Path_120"
            data-name="Path 120"
            d="M3668-548.333l2.667,2.667L3676-551"
            transform="translate(-3663.5 556.833)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </g>
      )}
      {!checked && (
        <g
          id="checkbox-2"
          data-name="checkbox"
          transform="translate(3258 -856)"
        >
          <g
            id="Rectangle_43-2"
            data-name="Rectangle 43"
            fill="none"
            stroke="#292929"
            stroke-width="1"
          >
            <rect width="17" height="17" rx="5" stroke="none" />
            <rect x="0.5" y="0.5" width="16" height="16" rx="4.5" fill="none" />
          </g>
        </g>
      )}
    </g>
  </svg>
)

const ToDoItem = ({ todo }) => {
  const [checked, setChecked] = useState(false)
  const theme = useTheme()

  const toggleCheck = () => setChecked(!checked)

  return (
    <Flex
      alignItems="center"
      onClick={() => toggleCheck()}
      mb="sm"
      css={{ cursor: "pointer" }}
    >
      <Checkbox checked={checked} />
      <Box pl="sm" />
      <Text
        mb={0}
        fontSize="xs"
        lineHeight="1"
        color={
          checked ? theme.colors.primary.light : theme.colors.primary.default
        }
        css={{ textDecoration: checked ? "line-through" : "none" }}
      >
        {todo.description}
        <Text
          as="span"
          color={checked ? "primary.light" : "success"}
          lineHeight="1"
          mb={0}
        >
          {" "}
          {todo.reminder || ""}
        </Text>
      </Text>
      <Box pl="sm" />
    </Flex>
  )
}

const HabitTracker = () => {
  const date = new Date().toDateString()
  const todos = [
    {
      description: "workout",
      reminder: "@7:00 AM",
    },
    {
      description: "floss",
      reminder: "@9:00 PM",
    },
    {
      description: "buy groceries",
    },
    {
      description: "study 30 mins",
      reminder: "@7:00 PM",
    },
  ]

  return (
    <WidgetLayout>
      <Flex flexDirection="column" height="100%" pb="md">
        <Box pb="sm">
          <Box pt="calc(25px + 1rem)" />
          <Flex alignItems="center" pl="sm">
            <Calendar />
            <Text
              fontWeight="bold"
              fontSize="sm"
              color="primary.default"
              mb="0"
              pl="sm"
            >
              {" "}
              {date.split(" ").slice(1).join(" ")}{" "}
            </Text>
          </Flex>
        </Box>
        <Flex flex="1" flexDirection="column" pl="sm">
          {todos.map((todo) => (
            <ToDoItem todo={todo} />
          ))}
        </Flex>
        <Box px="sm">
          <Box
            height="1px"
            width="100%"
            px="sm"
            bg="primary.lightest"
            my="sm"
          />
          <Button
            bg="primary.dark"
            color="primary.lightest"
            fontSize="xs"
            fontWeight="300"
            px="sm"
            py="xxs"
            css={{
              borderRadius: "50px",
              textAlign: "left",
            }}
          >
            <Box as="span" mr="xxs" css={{ verticalAlign: "middle" }}>
              <Plus />
            </Box>{" "}
            new habit
          </Button>
        </Box>
      </Flex>
    </WidgetLayout>
  )
}

export default HabitTracker
