/** @jsxImportSource @emotion/react */
import Box from "@/helpers/Box"
import L from "next/link"
import Text from "../Text"

const Link = ({
  children,
  href,
  passHref = false,
  underline,
  fontWeight = "400",
  inline = false,
  color = "secondary",
}) => (
  <Box
    borderBottomColor="secondary"
    borderBottomStyle="solid"
    borderBottomWidth={underline ? "1px" : 0}
    width="fit-content"
    css={{
      lineHeight: 1,
      cursor: "pointer",
      "&:hover": { opacity: 0.7, borderBottomWidth: "1px" },
    }}
    display={inline ? "inline-block" : "block"}
    as="span"
  >
    <L href={href} passHref={passHref}>
      <Text as="a" color={color} fontWeight={fontWeight}>
        {children}
      </Text>
    </L>
  </Box>
)

export default Link
