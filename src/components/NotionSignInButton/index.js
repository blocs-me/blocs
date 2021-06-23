/** @jsxImportSource @emotion/react */
import { DASHBOARD_SIGN_IN_REDIRECT_URL } from "../../utils/paths"
import Box from "../Box"
import Button from "../Button"

const getStateParam = ({ state }) => (state ? `&state=${state}` : "")

const NotionSignInButton = (props) => {
  return (
    <Button
      as="a"
      href={encodeURI(
        `https://api.notion.com/v1/oauth/authorize?client_id=ef982612-81f0-46ef-ad49-8f9d4af75f3d&redirect_uri=${DASHBOARD_SIGN_IN_REDIRECT_URL}&response_type=code${getStateParam(
          props
        )}`
      )}
      fontSize={["xs", "xs", "sm"]}
      bg="primary.dark"
      color="primary.lightest"
      borderRadius="sm"
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
      }}
      px="md"
      py="xs"
      variant="primary"
      width="fit-content"
      {...props}
      ariaLabel="sign up to blocs with notion"
    >
      <Box
        as="img"
        mr={["xs", "xs", "sm"]}
        src="/notion-logo.png"
        size={["40px"]}
        alt=""
      />
      {props.text || "sign up with notion"}
    </Button>
  )
}

export default NotionSignInButton
