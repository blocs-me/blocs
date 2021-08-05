import { useTheme } from "@emotion/react"
import useMediaQuery from "@/hooks/useMediaQuery"

const Hamburger = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50"
  >
    <g transform="translate(828 609)">
      <circle
        cx="25"
        cy="25"
        r="25"
        transform="translate(-828 -609)"
        fill={theme.colors.secondary}
      />
      <g transform="translate(-6961 -295)">
        <path
          d="M6148.044-285.764h10.249"
          fill="none"
          stroke={theme.colors.primary["accent-1"]}
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          d="M6148.044-285.764h10.249"
          transform="translate(0 7.046)"
          fill="none"
          stroke={theme.colors.primary["accent-1"]}
          strokeLinecap="round"
          strokeWidth="3"
        />
      </g>
    </g>
  </svg>
)
const BackArrow = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50"
  >
    <g id="Group_521" data-name="Group 521" transform="translate(908 616)">
      <circle
        id="Ellipse_83"
        data-name="Ellipse 83"
        cx="25"
        cy="25"
        r="25"
        transform="translate(-908 -616)"
        fill={theme.colors.secondary}
      />
      <g
        id="Group_161"
        data-name="Group 161"
        transform="translate(-896.654 -562.352)"
      >
        <path
          id="Path_82"
          data-name="Path 82"
          d="M1.25-14.05h12.4"
          transform="translate(0 -7.838)"
          fill="none"
          stroke={theme.colors.primary["accent-1"]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          id="Path_83"
          data-name="Path 83"
          d="M6.212-16.927,1.25-21.888,6.212-26.85"
          fill="none"
          stroke={theme.colors.primary["accent-1"]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </g>
    </g>
  </svg>
)

const getIcon = (iconType, props) => {
  switch (iconType) {
    case "hamburger":
      return <Hamburger {...props} />
    case "back-arrow":
      return <BackArrow {...props} />
    default:
      return <Hamburger {...props} />
  }
}

const MenuIcon = ({ iconType = "hamburger" }) => {
  const theme = useTheme()

  return getIcon(iconType, { theme })
}

export default MenuIcon
