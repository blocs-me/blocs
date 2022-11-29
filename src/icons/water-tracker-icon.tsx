import { useTheme } from '@emotion/react'
const WaterTrackerIcon = () => {
  const theme = useTheme()

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_362_248"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="28"
        height="28"
      >
        <circle cx="14" cy="14" r="14" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_362_248)">
        <path
          d="M-3.01562 19.4697C-1.36434 16.4543 4.73822 7.6236 15.2921 16.0236C24.6362 23.4608 28.7736 16.1654 29.5075 13.9438V13.439C29.6654 13.202 29.6722 13.445 29.5075 13.9438V36.6041H1.29207L-3.01562 19.4697Z"
          fill="#777777"
        />
        <path
          d="M-4.73828 23.6923C-3.087 20.6769 3.01556 11.8462 13.5694 20.2462C22.9136 27.6833 27.0509 20.3879 27.7848 18.1664V17.6615C27.9428 17.4246 27.9496 17.6676 27.7848 18.1664V40.8266H-0.430589L-4.73828 23.6923Z"
          fill="#222222"
        />
      </g>
      <circle cx="14" cy="14" r="13.5" stroke="#222222" />
    </svg>
  )
}

export default WaterTrackerIcon
