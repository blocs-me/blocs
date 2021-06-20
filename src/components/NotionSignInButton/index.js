/** @jsxImportSource @emotion/react */
import { DASHBOARD_SIGN_IN_REDIRECT_URL } from "../../utils/paths"
import Box from "../Box"
import Button from "../Button"

const NotionSignInButton = (props) => (
  <Button
    as="a"
    href={encodeURI(
      `https://api.notion.com/v1/oauth/authorize?client_id=ef982612-81f0-46ef-ad49-8f9d4af75f3d&redirect_uri=${DASHBOARD_SIGN_IN_REDIRECT_URL}&response_type=code`
    )}
    bg="primary.dark"
    color="primary.lightest"
    borderRadius="sm"
    css={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    px="md"
    py="xs"
    variant="primary"
    width="fit-content"
    {...props}
  >
    <Box as="img" mr="sm" src="/notion-logo.png" size={["40px"]} />
    sign up with notion
  </Button>
)

export default NotionSignInButton
