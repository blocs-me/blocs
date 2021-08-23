/** @jsxImportSource @emotion/react */
import { useState } from "react"
import { useTheme } from "@emotion/react"
import Calendar from "../../../icons/calendar.svg"
import Plus from "../../../icons/plus.svg"
import Button from "@/design-system/Button"
import Text from "@/design-system/Text"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import WidgetLayout from "@/helpers/WidgetLayout"
import Icon from "@/helpers/Icon"

const Checkbox = ({ checked = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
  >
    <g id="Group_371" transform="translate(-3258 856)">
      {checked && (
        <g id="checkbox" transform="translate(3258 -856)">
          <rect
            id="Rectangle_43"
            width="17"
            height="17"
            rx="5"
            fill="#0070e0"
          />
          <path
            id="Path_120"
            d="M3668-548.333l2.667,2.667L3676-551"
            transform="translate(-3663.5 556.833)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      )}
      {!checked && (
        <g id="checkbox-2" transform="translate(3258 -856)">
          <g id="Rectangle_43-2" fill="none" stroke="#292929" strokeWidth="1">
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
          checked
            ? theme.colors.primary["accent-2"]
            : theme.colors.primary["accent-3"]
        }
        css={{ textDecoration: checked ? "line-through" : "none" }}
      >
        {todo.description}
        <Text
          as="span"
          color={checked ? "primary.accent-2" : "success"}
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
              color="primary.accent-3"
              mb="0"
              pl="sm"
            >
              {" "}
              {date.split(" ").slice(1).join(" ")}{" "}
            </Text>
          </Flex>
        </Box>
        <Flex flex="1" flexDirection="column" pl="sm">
          {todos.map((todo, i) => (
            <ToDoItem todo={todo} key={i} />
          ))}
        </Flex>
        <Box px="sm">
          <Box
            height="1px"
            width="100%"
            px="sm"
            bg="primary.accent-1"
            my="sm"
          />
          <Button
            ariaLabel="add a new habit"
            bg="primary.accent-4"
            color="primary.accent-1"
            fontSize="xs"
            fontWeight="300"
            px="sm"
            py="xs"
            css={{
              borderRadius: "50px",
              textAlign: "left",
            }}
          >
            <Icon
              as="span"
              size="20px"
              stroke="primary.accent-1"
              display="inline-block"
              mr="xs"
              css={{ verticalAlign: 'middle'}}
            >
              <Plus />
            </Icon>
            new habit
          </Button>
        </Box>
      </Flex>
    </WidgetLayout>
  )
}

export default HabitTracker
