import { useSvgTimer } from './useSvgTimer'

const LightModeTimer = ({ progress }: { progress: number }) => {
  const radius = 163.53
  const [strokeDashoffset, strokeDasharray] = useSvgTimer({ progress, radius })

  return (
    <svg viewBox="0 0 358 358" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_iiii_1012_514)">
        <circle
          cx="179.178"
          cy="178.795"
          r="163.529"
          stroke="#F9F9F9"
          strokeWidth="30"
        />
      </g>
      <circle
        cx="179.176"
        cy="178.794"
        r="163.53"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90)"
        css={{
          transformOrigin: 'center',
          transition: 'stroke-dashoffset 0.2s linear'
        }}
        stroke="url(#paint0_angular_1012_514)"
        strokeWidth="30"
      />
      <defs>
        <filter
          id="filter0_iiii_1012_514"
          x="0.648438"
          y="0.265137"
          width="372.059"
          height="372.059"
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
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_1012_514"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect2_innerShadow_1012_514"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_1012_514"
            result="effect2_innerShadow_1012_514"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="10" dy="10" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_1012_514"
            result="effect3_innerShadow_1012_514"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="15" dy="15" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.283333 0 0 0 0 0.283333 0 0 0 0 0.283333 0 0 0 0.02 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_innerShadow_1012_514"
            result="effect4_innerShadow_1012_514"
          />
        </filter>
        <radialGradient
          id="paint0_angular_1012_514"
          cx="180"
          cy="180"
          r="1000"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(189.765 178.794) rotate(0.5474)"
          spreadMethod="pad"
        >
          <stop offset="0.125565" stopColor="#76D9DF" />
          <stop offset="0.37875" stopColor="#71B2EF" />
          <stop offset="0.621158" stopColor="#638BF2" />
          <stop offset="0.794879" stopColor="#61F0F9" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default LightModeTimer
