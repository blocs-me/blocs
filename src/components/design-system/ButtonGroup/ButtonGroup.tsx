import Stack from '@/helpers/Stack'
import { WithChildren } from '@/utils/tsUtils'
import { MouseEvent, useEffect, useRef } from 'react'
import ButtonHighlighter from './ButtonHightlighter'
import { animate } from 'motion'
import Flex from '@/helpers/Flex'
import {
  useDebouncedCallback,
  useMediaQuery,
  useWindowResize
} from 'beautiful-react-hooks'

type Props = {
  gap?: string | string[]
  className?: string
}

type Dims = {
  top: number
  left: number
}

const ButtonGroup = ({
  gap = 'sm',
  children,
  className
}: WithChildren<Props>) => {
  const btnHighligher = useRef<HTMLDivElement>()
  const container = useRef<HTMLDivElement>()
  const cachedContainerSizes = useRef<Dims>({} as Dims)
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const cacheContaineDims = useDebouncedCallback(() => {
    const { top, left } = container.current.getBoundingClientRect()
    cachedContainerSizes.current = {
      top,
      left
    }
  })

  useWindowResize(() => cacheContaineDims())

  useEffect(() => {
    cacheContaineDims()
  }, [])

  const handleMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement
    if (!['button', 'a'].includes(element.nodeName.toLowerCase())) return null

    const containerDims = cachedContainerSizes.current

    const setCssVar = (key: string, value: string) =>
      btnHighligher.current.style.setProperty(`--active-btn-${key}`, value)

    const { width, height, left, top } = element.getBoundingClientRect()

    animate(
      btnHighligher.current,
      {
        width: width + 'px',
        height: height + 'px',
        x: left - containerDims.left,
        y: top - containerDims.top
      },
      {
        duration: 0.3
      }
    )

    setCssVar('opacity', '1')
  }

  const handleMouseLeave = () => {
    btnHighligher.current.style.setProperty(`--active-btn-opacity`, '0')
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flex="1"
      className={className}
    >
      <Stack
        ref={container}
        display="flex"
        flexDirection="column"
        alignItems="center"
        css={{
          position: 'relative'
        }}
        mb={gap}
        onMouseOver={(e: MouseEvent<HTMLDivElement>) =>
          !reduceMotion && handleMouseOver(e)
        }
        onMouseLeave={(e: MouseEvent<HTMLDivElement>) =>
          !reduceMotion && handleMouseLeave()
        }
      >
        <ButtonHighlighter ref={btnHighligher} />
        {children}
      </Stack>
    </Flex>
  )
}

export default ButtonGroup
