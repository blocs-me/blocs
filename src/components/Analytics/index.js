/** @jsxImportSource @emotion/react */
import { useEffect } from "react"
import Box from "../Box"
import Text from "../Text"
import Flex from "../Flex"
import WidgetLayout from "../WidgetLayout"
import BackArrow from "../../icons/back-arrow.svg"
import Arrow from "../../icons/arrow.svg"
import Icon from "../Icon"

const defaultAnalyticsData = [{}, {}, {}]

const Analytics = ({
  title = "work",
  data = defaultAnalyticsData,
  startDate,
  endDate,
  yAxis = ["0 hr", "1 hr", "2 hr", "3 hr", "4 hr"],
  total = "8 hrs",
}) => {
  const hidePaths = (paths) => {
    paths.forEach((path) => {
      path.style.transition = "opacity 1s ease, stroke-dashoffset 0.5s ease"
      path.style.strokeDasharray = "100%"
      path.style.strokeDashoffset = "-100%"
    })
  }

  const revealPaths = (paths) => {
    setTimeout(() => {
      paths.forEach((path) => {
        path.style.strokeDashoffset = "0%"
        path.style.opacity = "1"
      })
    }, 1000)
  }

  const handleClick = () => {
    const paths = Array.from(document.querySelectorAll(".bar"))
    hidePaths(paths)
    revealPaths(paths)
  }

  useEffect(() => {
    handleClick()
  }, [])

  return (
    <WidgetLayout icon={<BackArrow />}>
      <div>
        <Box pt="calc(25px + 1rem)" />
        <Flex
          width="100%"
          justifyContent="space-between"
          alignItems="flex-start"
          p="sm"
        >
          <Box>
            <Text
              fontSize="md"
              fontWeight="bold"
              mb={0}
              pb={0}
              lineHeight="0.9"
              color="primary.default"
            >
              {title}
              <Icon
                as="span"
                display="inline-block"
                width="0.35rem"
                ml="xs"
                css={{ transform: "rotate(90deg)" }}
              >
                <Arrow />
              </Icon>
            </Text>{" "}
            <Text
              fontWeight="300"
              fontSize="0.5rem"
              pt={0}
              mb={0}
              color="primary.light"
            >
              Jan 7th - Feb 7th 2021
            </Text>
          </Box>
          <Box>
            <Text
              fontWeight="400"
              fontSize="0.6rem"
              color="primary.default"
              lineHeight={"0.9"}
            >
              weekly
              <Icon
                as="span"
                display="inline-block"
                width="0.3rem"
                ml="xxs"
                css={{ transform: "rotate(90deg)" }}
              >
                <Arrow />
              </Icon>
            </Text>
          </Box>
        </Flex>

        <Flex width="100%" justifyContent="center">
          <svg width="237.5" height="154.871" viewBox="0 0 237.5 154.871">
            <g id="Group_231" transform="translate(-82 -202.129)">
              <g id="Group_230" transform="translate(82 202.129)">
                <path
                  d="M1610,1684.7h209.767"
                  transform="translate(-1582.767 -1586.301)"
                  fill="none"
                  stroke="#8b8b8b"
                  strokeLinecap="round"
                  strokeWidth="1"
                  strokeDasharray="0 6"
                />
                <path
                  d="M1610,1684.7h209.767"
                  transform="translate(-1582.767 -1556.739)"
                  fill="none"
                  stroke="#8b8b8b"
                  strokeLinecap="round"
                  strokeWidth="1"
                  strokeDasharray="0 6"
                />
                <path
                  d="M1610,1684.7h209.767"
                  transform="translate(-1582.767 -1617.635)"
                  fill="none"
                  stroke="#8b8b8b"
                  strokeLinecap="round"
                  strokeWidth="1"
                  strokeDasharray="0 6"
                />
                <path
                  d="M1610,1684.7h209.767"
                  transform="translate(-1582.767 -1647.986)"
                  fill="none"
                  stroke="#8b8b8b"
                  strokeLinecap="round"
                  strokeWidth="1"
                  strokeDasharray="0 6"
                />
                <path
                  d="M1610,1684.7h209.767"
                  transform="translate(-1582.767 -1676.863)"
                  fill="none"
                  stroke="#8b8b8b"
                  strokeLinecap="round"
                  strokeWidth="1"
                  strokeDasharray="0 6"
                />
                <path
                  className="bar"
                  d="M1661.981,1647.732V1708.1"
                  transform="translate(-1615.898 -1581.135)"
                  fill="none"
                  stroke="#1f1f1f"
                  strokeLinecap="round"
                  strokeWidth="4"
                  opacity="0"
                />
                <path
                  className="bar"
                  d="M1661.981,1647.732v28.562"
                  transform="translate(-1575.169 -1549.332)"
                  fill="none"
                  stroke="#1f1f1f"
                  strokeLinecap="round"
                  strokeWidth="4"
                  opacity="0"
                />
                <path
                  className="bar"
                  d="M1661.981,1647.732v90.247"
                  transform="translate(-1534.44 -1611.017)"
                  fill="none"
                  stroke="#1f1f1f"
                  strokeLinecap="round"
                  strokeWidth="4"
                  opacity="0"
                />
                <path
                  className="bar"
                  d="M1661.981,1647.732v45.658"
                  transform="translate(-1493.711 -1566.428)"
                  fill="none"
                  stroke="#1f1f1f"
                  strokeLinecap="round"
                  strokeWidth="4"
                  opacity="0"
                />
                <path
                  className="bar"
                  d="M1661.981,1647.732v16.329"
                  transform="translate(-1451.25 -1537.1)"
                  fill="none"
                  stroke="#1f1f1f"
                  strokeLinecap="round"
                  strokeWidth="4"
                  opacity="0"
                />
                <text
                  id="_1_hr"
                  transform="translate(0 99.896)"
                  fill="#646464"
                  fontSize="10"
                  fontFamily="Karla-Light, Karla"
                  fontWeight="300"
                >
                  <tspan x="0" y="0">
                    {yAxis[1]}
                  </tspan>
                </text>
                <text
                  id="_0_hr"
                  transform="translate(0 129.712)"
                  fill="#646464"
                  fontSize="10"
                  fontFamily="Karla-Light, Karla"
                  fontWeight="300"
                >
                  <tspan x="0" y="0">
                    {yAxis[0]}
                  </tspan>
                </text>
                <text
                  id="_2_hr"
                  transform="translate(0 69.597)"
                  fill="#646464"
                  fontSize="10"
                  fontFamily="Karla-Light, Karla"
                  fontWeight="300"
                >
                  <tspan x="0" y="0">
                    {yAxis[2]}
                  </tspan>
                </text>
                <text
                  id="_3_hr"
                  transform="translate(0 39.299)"
                  fill="#646464"
                  fontSize="10"
                  fontFamily="Karla-Light, Karla"
                  fontWeight="300"
                >
                  <tspan x="0" y="0">
                    {yAxis[3]}
                  </tspan>
                </text>
                <text
                  id="_4_hr"
                  transform="translate(0 9)"
                  fill="#646464"
                  fontSize="10"
                  fontFamily="Karla-Light, Karla"
                  fontWeight="300"
                >
                  <tspan x="0" y="0">
                    {yAxis[4]}
                  </tspan>
                </text>
              </g>
              <text
                id="mon"
                transform="translate(117 354)"
                fill="#646464"
                fontSize="10"
                fontFamily="Karla-Light, Karla"
                fontWeight="300"
              >
                <tspan x="0" y="0">
                  mon
                </tspan>
              </text>
              <text
                id="tue"
                transform="translate(161 354)"
                fill="#646464"
                fontSize="10"
                fontFamily="Karla-Light, Karla"
                fontWeight="300"
              >
                <tspan x="0" y="0">
                  tue
                </tspan>
              </text>
              <text
                id="wed"
                transform="translate(200 354)"
                fill="#646464"
                fontSize="10"
                fontFamily="Karla-Light, Karla"
                fontWeight="300"
              >
                <tspan x="0" y="0">
                  wed
                </tspan>
              </text>
              <text
                id="thu"
                transform="translate(242 354)"
                fill="#646464"
                fontSize="10"
                fontFamily="Karla-Light, Karla"
                fontWeight="300"
              >
                <tspan x="0" y="0">
                  thu
                </tspan>
              </text>
              <text
                id="fri"
                transform="translate(288 354)"
                fill="#646464"
                fontSize="10"
                fontFamily="Karla-Light, Karla"
                fontWeight="300"
              >
                <tspan x="0" y="0">
                  fri
                </tspan>
              </text>
            </g>
          </svg>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          pt="sm"
          px="sm"
        >
          <Box>
            <Text fontSize="0.55rem" fontWeight="bold" lineHeight={0.2} m={0}>
              total
            </Text>
            <Text fontSize="xs" fontWeight="bold" m={0}>
              {total}
            </Text>
          </Box>

          <Flex>
            <Box as="button" width="13px" mr="md" minWidth="13px" p={0}>
              <Icon as="span">
                <Arrow
                  css={{
                    transform: "rotate(-180deg)",
                  }}
                />
              </Icon>
            </Box>
            <Box as="button" width="13px" minWidth="13px" p={0}>
              <Icon as="span">
                <Arrow />
              </Icon>
            </Box>
          </Flex>
        </Flex>
      </div>
    </WidgetLayout>
  )
}

export default Analytics
