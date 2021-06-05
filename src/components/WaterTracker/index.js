/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import Wave from "react-wavify"
import Box from "../Box"
import Flex from "../Flex"
import Icon from "../Icon"
import WidgetLayout from "../WidgetLayout"
import Drop from "../../icons/droplet.svg"
import Text from "../Text"
import useWaterPath from "./useWaterPath"
import RoundedLine from "./line.svg"
import { scale } from "style-value-types"

const WaterIndicatorBubble = styled(Flex)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transform: ${({ selected }) => (selected ? "scale(1.3)" : "scale(0.85)")};
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

const WaterIndicator = ({
  selected = false,
  children,
  setSelectedVolumeIndex,
  index,
}) => {
  const container = useRef()
  const handleClick = () => setSelectedVolumeIndex(index)

  return (
    <Flex
      alignItems="center"
      ref={container}
      onClick={() => handleClick()}
      pl="sm"
    >
      <RoundedLine />
      <Box pr="sm" as="span" />
      <WaterIndicatorBubble
        bg="primary.default"
        color="primary.lightest"
        alignItems="center"
        justifyContent="center"
        selected={selected}
        boxShadow={selected ? "lg" : "default"}
      >
        <Text as="span" fontSize="xs" letterSpacing="sm">
          {children}
        </Text>
      </WaterIndicatorBubble>
    </Flex>
  )
}

const WaterTracker = () => {
  const [pause, setPause] = useState(true)
  const [waterlinePos, setWaterlinePos] = useState(0)
  const [selectedVolumeIndex, setSelectedVolumeIndex] = useState(null)
  const water = useRef(null)

  useEffect(() => {}, [selectedVolumeIndex])

  return (
    <WidgetLayout>
      <Box pt="calc(25px + 1rem)" />
      <Flex
        width="100%"
        px="sm"
        justifyContent="space-between"
        alignItems="center"
      >
        <div>
          <Text
            fontSize="sm"
            fontWeight="bold"
            lineHeight={1}
            color="primary.default"
            pb="0"
            mb="0"
          >
            <Icon
              as="span"
              display="inline-block"
              width="0.5rem"
              mr="xs"
              mb="-2px"
            >
              <Drop />
            </Icon>
            water tracker
          </Text>
          <Text fontSize="xs" color="primary.light" fontWeight="300">
            {Math.round((selectedVolumeIndex + 1 || 0) * 33.33)}%
          </Text>
        </div>
      </Flex>
      <Box height="70%" width="100%" position="relative" bottom="0" left="0">
        <Box
          position="absolute"
          top="0%"
          left="0"
          height="100%"
          width="calc(350px * 5)"
          style={{
            transform: `
            translateX(-${10 * selectedVolumeIndex}%)
            translateY(${
              100 -
              (selectedVolumeIndex !== null ? selectedVolumeIndex + 2 : 0) * 25
            }%) translateZ(0)`,
            transition: "transform cubic-bezier(.62,0,.37,.84) 0.5s",
          }}
        >
          <Wave
            css={{ height: "350px" }}
            fill="#7EB6EF"
            paused={false}
            options={{
              width: "500%",
              amplitude: 10,
              speed: 0.2,
              points: 30,
            }}
          />
          <Wave
            css={{ height: "400px", marginTop: "-2rem" }}
            fill="deepskyblue"
            options={{
              width: "500%",
              amplitude: 25,
              speed: 0.2,
              points: 30,
            }}
          />
        </Box>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          position="absolute"
          top="0"
          left="0"
          pb="lg"
        >
          <WaterIndicator
            setWaterlinePos={setWaterlinePos}
            setSelectedVolumeIndex={setSelectedVolumeIndex}
            index={2}
            selected={selectedVolumeIndex === 2}
          >
            3L
          </WaterIndicator>
          <WaterIndicator
            setWaterlinePos={setWaterlinePos}
            setSelectedVolumeIndex={setSelectedVolumeIndex}
            index={1}
            selected={selectedVolumeIndex === 1}
          >
            2L
          </WaterIndicator>
          <WaterIndicator
            setWaterlinePos={setWaterlinePos}
            setSelectedVolumeIndex={setSelectedVolumeIndex}
            index={0}
            selected={selectedVolumeIndex === 0}
          >
            1L
          </WaterIndicator>
        </Flex>
      </Box>
    </WidgetLayout>
  )
}

export default WaterTracker
