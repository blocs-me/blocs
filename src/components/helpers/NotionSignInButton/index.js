/** @jsxImportSource @emotion/react */
import Button from "@/design-system/Button"
import { NOTION_OAUTH_URL_REDIRECT_URL } from "@/utils/endpoints"
import notionOAuthData from "@/utils/notionOAuthData"
import Box from "../Box"

const getStateParam = ({ state }) => (state ? `&state=${state}` : "")
const { CLIENT_ID, REDIRECT_URL } = notionOAuthData

const NotionSignInButton = (props) => {
  return (
    <Button
      as="a"
      href={encodeURI(
        `${NOTION_OAUTH_URL_REDIRECT_URL}${getStateParam(props)}`
      )}
      fontSize={["xs", "xs", "sm"]}
      bg="primary.accent-4"
      color="primary.accent-1"
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
      aria-label="sign up to blocs with notion"
      rel="noopener"
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
