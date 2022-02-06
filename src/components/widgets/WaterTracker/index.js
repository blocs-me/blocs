import { useEffect, useRef, useState } from "react"
import { animate } from "popmotion"
import styled from "@emotion/styled"
import Wave from "react-wavify"
import Flex from "@/helpers/Flex"
import WidgetLayout from "@/helpers/WidgetLayout"
import Drop from "../../../icons/droplet.svg"
import RoundedLine from "./line.svg"
import Text from "@/design-system/Text"
import Box from "@/helpers/Box"
import Icon from "@/helpers/Icon"

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
        bg="primary.accent-3"
        color="primary.accent-1"
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

const WaterTracker = ({ startingVolume = -1 }) => {
  const [pause, setPause] = useState(true)
  const [selectedVolumeIndex, setSelectedVolumeIndex] = useState(startingVolume)
  const water = useRef(null)
  const previousVolumeIndex = useRef(-1)

  useEffect(() => {
    const translateX = -10 * selectedVolumeIndex
    const getYPos = (index) => 100 - (index + 2) * 25

    animate({
      from: getYPos(previousVolumeIndex.current),
      to: getYPos(selectedVolumeIndex),
      duration: 1000,
      type: "spring",
      bounce: 0.5,
      stiffness: 25,
      onUpdate: (yPos) =>
        water.current &&
        (water.current.style.transform = `translateY(${yPos}%) translateX(-${
          yPos / 4
        }%)`),
    })
  }, [selectedVolumeIndex])

  const handleIndexChange = (i) => {
    previousVolumeIndex.current = selectedVolumeIndex
    setSelectedVolumeIndex(i)
  }

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
            color="primary.accent-3"
            pb="0"
            mb="0"
          >
            <Icon
              as="span"
              display="inline-block"
              width="0.5rem"
              mr="xs"
              mb="-2px"
              fill="primary.accent-4"
            >
              <Drop />
            </Icon>
            water tracker
          </Text>
          <Text fontSize="xs" color="primary.accent-2" fontWeight="300">
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
          ref={water}
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
            setSelectedVolumeIndex={handleIndexChange}
            index={2}
            selected={selectedVolumeIndex === 2}
          >
            3L
          </WaterIndicator>
          <WaterIndicator
            setSelectedVolumeIndex={handleIndexChange}
            index={1}
            selected={selectedVolumeIndex === 1}
          >
            2L
          </WaterIndicator>
          <WaterIndicator
            setSelectedVolumeIndex={handleIndexChange}
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
