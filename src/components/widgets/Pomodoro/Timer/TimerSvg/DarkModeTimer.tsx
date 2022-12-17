import { useSvgTimer } from './useSvgTimer'
const DarkModeTimer = ({ progress }: { progress: number }) => {
  const radius = 163.53
  const [strokeDashoffset, strokeDasharray] = useSvgTimer({ progress, radius })

  return (
    <svg viewBox="0 0 358 358" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="179.178" cy="176.588" r="163.529" fill="#2B2B2B" />
      <g filter="url(#filter0_iiiii_996_505)">
        <circle
          cx="179.176"
          cy="179.295"
          r="163.529"
          stroke="#222222"
          strokeWidth="30"
        />
      </g>
      <circle
        cx="179.176"
        cy="179.294"
        r="163.53"
        stroke="url(#paint0_angular_996_505)"
        strokeWidth="30"
        css={{
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
          transition: 'stroke-dashoffset 0.3s linear'
        }}
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
        strokeDashoffset={strokeDashoffset}
      />
      <defs>
        <filter
          id="filter0_iiiii_996_505"
          x="-7.35352"
          y="-7.23486"
          width="367.059"
          height="367.059"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.27 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_996_505"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-4" dy="-4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_996_505"
            result="effect2_innerShadow_996_505"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-2" dy="-2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.754167 0 0 0 0 0.754167 0 0 0 0 0.754167 0 0 0 0.13 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_996_505"
            result="effect3_innerShadow_996_505"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_innerShadow_996_505"
            result="effect4_innerShadow_996_505"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-8" dy="-8" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.570833 0 0 0 0 0.570833 0 0 0 0 0.570833 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_innerShadow_996_505"
            result="effect5_innerShadow_996_505"
          />
        </filter>
        <radialGradient
          id="paint0_angular_996_505"
          cx="180"
          cy="180"
          r="800"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(189.765 179.294) rotate(-90)"
          spreadMethod="pad"
        >
          <stop offset="0.125565" stopColor="#27B1BA" />
          <stop offset="0.37875" stopColor="#1680E2" />
          <stop offset="0.621158" stopColor="#3D6CE6" />
          <stop offset="0.794879" stopColor="#0CCFDC" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default DarkModeTimer
