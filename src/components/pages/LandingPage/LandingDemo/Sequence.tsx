import Box from '@/helpers/Box'
import { useState, useCallback, useEffect } from 'react'
import IntroText from './animations/IntroText'
import PomodoroAnim from './animations/PomodoroAnim'
import WaterTrackerAnim from './animations/WaterTrackerAnim/WaterTrackerAnim'
import HabitTrackerAnim from './animations/HabitTrackerAnim/HabitTrackerAnim'

import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import { Play } from 'src/icons/play'
import { Pause } from 'src/icons/pause'
import CaretLeft from 'src/icons/caret-left'
import CaretRight from 'src/icons/caret-right'
import FadeIn from '@/helpers/FadeIn'
import styled from '@emotion/styled'
import themeGet from '@styled-system/theme-get'
import { useMediaQuery } from 'beautiful-react-hooks'

const Controller = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${themeGet('space.sm')};
  padding: 10px;
  flex-direction: column;
  gap: ${themeGet('space.xs')};
  border-radius: 20px;
  /* background: ${themeGet('colors.success.medium')}; */
  /* box-shadow: ${themeGet('shadows.md')}; */

  @media (max-width: 992px) {
    padding: 5px;
    top: 100%;
    transform: translateY(1rem) translateX(-50%);
    left: 50%;
    flex-direction: row-reverse;
  }
`

const IconWrapper = ({ children, onClick }) => (
  <Box
    as="button"
    onClick={(e) => {
      e?.preventDefault()
      e?.stopPropagation()
      onClick(e)
    }}
    borderRadius="md"
    bg="brand.accent-2"
    p="8px"
    hoverBg="brand.accent-1"
  >
    <Icon
      size="15px"
      fill="primary.accent-1"
      stroke="primary.accent-1"
      display="flex"
    >
      {children}
    </Icon>
  </Box>
)

const Sequence = () => {
  const [pause, setPause] = useState(false)
  const [seq, setSeq] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const setNext = () => {
    seq === 3 ? setSeq(0) : setSeq(seq + 1)
  }
  const setPrev = () => {
    seq === 0 ? setSeq(3) : setSeq(seq - 1)
  }
  const togglePause = () => setPause(!pause)

  const isSmallScreen = useMediaQuery('(max-width: 992px)')

  return (
    <Flex
      borderRadius="md"
      border="solid 2px"
      borderColor="primary.accent-1"
      width={['300px', '300px', '400px', '600px', '700px']}
      height={['400px', '400px', '350px', '400px', '450px']}
      position="relative"
      alignItems="center"
      justifyContent="center"
      boxShadow="default"
      onMouseOver={() => !isSmallScreen && setShowControls(true)}
      onMouseLeave={() => !isSmallScreen && setShowControls(false)}
    >
      <Box overflow="hidden">
        {seq === 0 && <IntroText setNext={setNext} pause={pause} />}
        {seq === 1 && <PomodoroAnim setNext={setNext} pause={pause} />}
        {seq === 2 && <WaterTrackerAnim setNext={setNext} pause={pause} />}
        {seq === 3 && <HabitTrackerAnim setNext={setNext} pause={pause} />}
      </Box>
      {(showControls || isSmallScreen) && (
        <FadeIn>
          <Controller>
            <IconWrapper onClick={() => togglePause()}>
              {pause ? <Play /> : <Pause />}
            </IconWrapper>
            <IconWrapper onClick={() => setNext()}>
              <CaretRight />
            </IconWrapper>
            <IconWrapper onClick={() => setPrev()}>
              <CaretLeft />
            </IconWrapper>
          </Controller>
        </FadeIn>
      )}
    </Flex>
  )
}

export default Sequence
