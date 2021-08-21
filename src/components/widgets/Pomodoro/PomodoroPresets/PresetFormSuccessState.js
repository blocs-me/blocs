import Button from "@/design-system/Button"
import Text from "@/design-system/Text"
import Flex from "@/helpers/Flex"
import Icon from "@/helpers/Icon"
import Check from "../../../../icons/check-circle.svg"

const PresetFormSuccessState = ({ formAction, preset, hideForm }) => {
  const edit = formAction === "EDIT"
  const create = formAction === "CREATE"

  const handleClick = (e) => {
    hideForm()
  }

  return (
    <Flex
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      size="100%"
    >
      <Icon size="40px" stroke="success" mb="sm">
        <Check />
      </Icon>
      <Text
        textAlign="center"
        fontSize="sm"
        lineHeight={1.5}
        mb="xxs"
        fontWeight="400"
        color="primary.accent-3"
      >
        {create && `Awesome, ${preset?.label} was successfully created 🥳`}
        {edit && `Awesome, the edit was successful! `}
      </Text>
      <Button
        variant="default"
        bg="success"
        borderRadius="50px"
        mt="sm"
        onClick={(e) => handleClick(e)}
      >
        close
      </Button>
    </Flex>
  )
}

export default PresetFormSuccessState
