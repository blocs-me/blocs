/** @jsxImportSource @emotion/react */
import notionOAuthData from "../../utils/notionOAuthData"
import Box from "../Box"
import Button from "../Button"

const getStateParam = ({ state }) => (state ? `&state=${state}` : "")
const { CLIENT_ID, REDIRECT_URL } = notionOAuthData

const NotionSignInButton = (props) => {
  return (
    <Button
      as="a"
      href={encodeURI(
        `https://api.notion.com/v1/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code${getStateParam(
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
