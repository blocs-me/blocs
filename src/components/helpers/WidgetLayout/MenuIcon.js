import { useTheme } from "@emotion/react"
import useMediaQuery from "@/hooks/useMediaQuery"

const MenuIcon = () => {
  const theme = useTheme()

  return (
    <svg width="50" height="50" viewBox="0 0 50 50">
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
            stroke={theme.colors.primary["accent-0.5"]}
            strokeLinecap="round"
            strokeWidth="3"
          />
          <path
            d="M6148.044-285.764h10.249"
            transform="translate(0 7.046)"
            fill="none"
            stroke={theme.colors.primary["accent-0.5"]}
            strokeLinecap="round"
            strokeWidth="3"
          />
        </g>
      </g>
    </svg>
  )
}

export default MenuIcon
