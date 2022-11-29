import getRandomNum from '../../../utils/math/getRandomNum'
import { useEffect, useMemo, useRef, useState } from 'react'
import Box from '@/helpers/Box'
import { animate } from '@motionone/dom'
import { interpolate } from 'popmotion'
import useColorMode from '@/hooks/useColorMode'
import Flex from '@/helpers/Flex'

const Bubble = ({ index, fill }: { index: number; fill: string }) => {
  const cx = useMemo(() => getRandomNum(50, 350), [])
  const duration = useMemo(() => getRandomNum(2, 3), [])
  const radius = useMemo(() => getRandomNum(5, 13), [])

  const ref = useRef<SVGCircleElement>()

  useEffect(() => {
    animate(
      ref.current,
      {
        transform: [
          `
          translateX(${cx}px) translateY(0px)
        `,
          `
          translateX(${cx + 5}px) translateY(-102.5px)
        `,
          `
        translateX(${cx - 5}px) translateY(-205px)
      `,
          `
      translateX(${cx}px) translateY(-400px)
    `
        ]
      },
      {
        duration,
        delay: index * 0.4,
        repeat: Infinity
      }
    )
  }, [cx, duration, ref.current]) // eslint-disable-line

  return <circle ref={ref} cx={cx} cy={410} r={radius} fill={fill} />
}

const darkTheme = {
  bowl: {
    fill: 'white',
    stroke: '#737272',
    detail: 'white'
  },
  waveOne: '#0242E6',
  waveTwo: '#0337BB',
  bubblesOne: '#1451F2',
  bubblesTwo: '#002e8a71'
}

const lightTheme = {
  bowl: {
    fill: 'black',
    stroke: '#CFCECE',
    detail: 'black'
  },
  waveOne: '#5E8BFF',
  waveTwo: '#4A78F0',
  bubblesOne: '#6f98ff',
  bubblesTwo: '#3F6CE2'
}

const NUM_OF_BUBBLES = 12

const Bowl = ({ progress, goal }: { progress: number; goal: number }) => {
  const getWaveYPos = interpolate([goal, 0], [-160, 100])
  const { colorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'
  const theme = isDarkMode ? darkTheme : lightTheme

  const waveOne = useRef()
  const waveOneMaskPath = useRef()
  const waveOneMask = useRef()

  const waveTwo = useRef()
  const waveTwoMaskPath = useRef()
  const waveTwoMask = useRef()

  useEffect(() => {
    animate(
      '.waveOne',
      {
        x: [-200, -600]
      },
      {
        repeat: Infinity,
        duration: 0.6,
        easing: 'linear'
      }
    )

    animate(
      '.waveTwo',
      { x: -400 },
      {
        repeat: Infinity,
        duration: 0.9,
        easing: 'linear'
      }
    )
  }, [])

  useEffect(() => {
    animate(
      [waveOne.current, waveOneMask.current, waveOneMaskPath.current],
      { transform: `translateY(${getWaveYPos(progress)}px)` },
      {
        duration: 1
      }
    )

    animate(
      [waveTwo.current, waveTwoMask.current, waveTwoMaskPath.current],
      { transform: `translateY(${getWaveYPos(progress) - 20}px)` },
      {
        duration: 1
      }
    )
  }, [progress, goal, getWaveYPos])

  return (
    <Flex width="100%" alignItems="center" flex="1">
      <svg viewBox="0 0 405 405" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g mask="url(#mask0_753_520)">
          <g className="waveTwo">
            <path
              d="M302.299 256.442C257.772 256.442 202.299 230.069 202.299 230.069C202.299 230.069 146.826 203.696 102.299 203.696C57.7717 203.696 2.29883 230.069 2.29883 230.069V563.682H802.299V230.069C802.299 230.069 746.826 256.442 702.299 256.442C657.772 256.442 602.299 230.069 602.299 230.069C602.299 230.069 546.826 203.696 502.299 203.696C457.772 203.696 402.299 230.069 402.299 230.069C402.299 230.069 346.826 256.442 302.299 256.442Z"
              fill={theme.waveTwo}
              ref={waveTwo}
            />
          </g>

          <g mask="url(#wave-2)">
            {Array(NUM_OF_BUBBLES)
              .fill('')
              .map((_, i) => (
                <Bubble key={i} index={i} fill={theme.bubblesTwo} />
              ))}
          </g>

          <g className="waveOne">
            <path
              d="M305.299 258.26C260.326 258.26 204.299 231.623 204.299 231.623C204.299 231.623 148.271 204.987 103.299 204.987C58.3264 204.987 2.29883 231.623 2.29883 231.623V568.573H1618.3V231.623C1618.3 231.623 1562.27 258.26 1517.3 258.26C1472.33 258.26 1416.3 231.623 1416.3 231.623C1416.3 231.623 1360.27 204.987 1315.3 204.987C1270.33 204.987 1214.3 231.623 1214.3 231.623C1214.3 231.623 1158.27 258.26 1113.3 258.26C1068.33 258.26 1012.3 231.623 1012.3 231.623C1012.3 231.623 956.271 204.987 911.299 204.987C866.326 204.987 810.299 231.623 810.299 231.623C810.299 231.623 754.271 258.26 709.299 258.26C664.326 258.26 608.299 231.623 608.299 231.623C608.299 231.623 552.271 204.987 507.299 204.987C462.326 204.987 406.299 231.623 406.299 231.623C406.299 231.623 350.271 258.26 305.299 258.26Z"
              fill={theme.waveOne}
              ref={waveOne}
            />
          </g>
          <g mask="url(#wave-1)">
            {Array(NUM_OF_BUBBLES)
              .fill('')
              .map((_, i) => (
                <Bubble key={i} index={i} fill={theme.bubblesOne} />
              ))}
          </g>
        </g>

        <g filter="url(#filter0_d_753_520)">
          <circle
            cx="202.299"
            cy="202.987"
            r="200"
            fill={theme.bowl.fill}
            fillOpacity="0.05"
            shapeRendering="crispEdges"
          />
          <circle
            cx="202.299"
            cy="202.987"
            r="199"
            stroke={theme.bowl.stroke}
            strokeOpacity="0.25"
            strokeWidth="2"
            shapeRendering="crispEdges"
          />
          <path
            d="M275.729 51.8989C279.721 50.6465 288.21 50.5116 290.221 59.9916"
            stroke={theme.bowl.detail}
            strokeOpacity="0.03"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>

        <defs>
          <mask
            id="mask0_753_520"
            maskUnits="userSpaceOnUse"
            x="2"
            y="2"
            width="401"
            height="401"
          >
            <circle cx="202.299" cy="202.987" r="200" fill="#D9D9D9" />
          </mask>

          <mask id="wave-1" className="waveOne" ref={waveOneMask}>
            <g ref={waveOneMaskPath}>
              <path
                d="M305.299 258.26C260.326 258.26 204.299 231.623 204.299 231.623C204.299 231.623 148.271 204.987 103.299 204.987C58.3264 204.987 2.29883 231.623 2.29883 231.623V568.573H1618.3V231.623C1618.3 231.623 1562.27 258.26 1517.3 258.26C1472.33 258.26 1416.3 231.623 1416.3 231.623C1416.3 231.623 1360.27 204.987 1315.3 204.987C1270.33 204.987 1214.3 231.623 1214.3 231.623C1214.3 231.623 1158.27 258.26 1113.3 258.26C1068.33 258.26 1012.3 231.623 1012.3 231.623C1012.3 231.623 956.271 204.987 911.299 204.987C866.326 204.987 810.299 231.623 810.299 231.623C810.299 231.623 754.271 258.26 709.299 258.26C664.326 258.26 608.299 231.623 608.299 231.623C608.299 231.623 552.271 204.987 507.299 204.987C462.326 204.987 406.299 231.623 406.299 231.623C406.299 231.623 350.271 258.26 305.299 258.26Z"
                fill="#fff"
                stroke="#000"
                className="waveOne"
              />
            </g>
          </mask>

          <mask id="wave-2" className="waveTwo" ref={waveTwoMask}>
            <g ref={waveTwoMaskPath}>
              <path
                fill="#ffffff"
                className="waveTwo"
                d="M302.299 256.442C257.772 256.442 202.299 230.069 202.299 230.069C202.299 230.069 146.826 203.696 102.299 203.696C57.7717 203.696 2.29883 230.069 2.29883 230.069V563.682H802.299V230.069C802.299 230.069 746.826 256.442 702.299 256.442C657.772 256.442 602.299 230.069 602.299 230.069C602.299 230.069 546.826 203.696 502.299 203.696C457.772 203.696 402.299 230.069 402.299 230.069C402.299 230.069 346.826 256.442 302.299 256.442Z"
              />
            </g>
          </mask>
          <filter
            id="filter0_d_753_520"
            x="0.298828"
            y="0.986816"
            width="404"
            height="404"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_753_520"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_753_520"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </Flex>
  )
}

export default Bowl
