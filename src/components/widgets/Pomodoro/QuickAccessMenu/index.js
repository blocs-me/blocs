/** @jsxImportSource @emotion/react */
import { useEffect, forwardRef, useRef, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { animate } from 'popmotion'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import Stack from '@/helpers/Stack'
import Gear from '../../../../icons/gear.svg'
import Card from '@/design-system/Card'
import Text from '@/design-system/Text'
import BatteryHalf from '../../../../icons/battery-half-full.svg'
import BatteryFull from '../../../../icons/battery-full.svg'
import Cloud from '../../../../icons/cloud.svg'
import Clock from '../../../../icons/clock.svg'
import { useClickOutside } from '@/hooks/useClickOutside'
import Notch from '@/helpers/Notch'
import slideIn from 'src/styles/keyframes/slideIn'
import slideOut from 'src/styles/keyframes/slideOut'

const links = [
  {
    name: 'short break',
    I: BatteryHalf,
    onClick: () => {}
  },
  {
    name: 'long break',
    I: BatteryFull,
    onClick: () => {}
  },
  {
    name: 'deep focus',
    I: Cloud,
    onClick: () => {}
  },
  {
    name: 'main settings',
    I: Clock,
    onClick: (e) => {
      e.preventDefault()
    },
    props: { href: '/pomodoro/main-menu' },
    Component: Link
  }
]

const TinyMenu = forwardRef((props, ref) => {
  const { iconRef, menuDimensions } = props
  const container = global.window ? document.createElement('div') : null
  const [viewportSize, setViewPortSize] = useState(0)

  useEffect(() => {
    const body = document.querySelector('body')

    if (container) {
      const dimensions = iconRef.current?.getBoundingClientRect()
      const { left, top } = dimensions || {}
      container.style.position = 'absolute'
      container.style.top = `calc(${top}px)`
      container.style.left = `${left}px`
      container.style.transform = `translate(-25%, calc(-100% - 1.5rem))`

      body.appendChild(container)
    }

    return () => {
      container && body.removeChild(container)
    }
  }, [container, iconRef, viewportSize, ref, menuDimensions])

  useEffect(() => {
    let timer = null

    window.addEventListener('resize', () => {
      clearTimeout(timer)

      timer = setTimeout(() => {
        setViewPortSize(window.innerWidth)
      }, 100)
    })
  }, [])

  if (!container) return null

  return createPortal(
    <div ref={ref}>
      <Card width="fit-content" p="1.5rem">
        <Stack mt="sm">
          {links.map(({ name, I, onClick = () => {}, props = {} }, i) => (
            <Flex
              alignItems="center"
              as="button"
              onClick={(e) => onClick(e)}
              key={i}
              hoverColor="primary.accent-4"
            >
              <Icon display="flex" pr="sm" stroke="primary.accent-4">
                <I />
              </Icon>
              <Text
                color="primary.accent-2"
                fontSize="sm"
                whiteSpace="nowrap"
                mb={0}
              >
                {name}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Card>
      <Notch position="absolute" bottom="0" left="25%" />
    </div>,
    container
  )
})

const QuickAccessMenu = () => {
  const iconRef = useRef(null)
  const tinyMenuRef = useRef(null)
  const open = useRef(false)
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false)
  const [menuDimensions, setMenuDimensions] = useState({})

  const handleClickOutside = () => {
    animate({
      from: 1,
      to: 0,
      duration: 250,
      onUpdate: (opacity) => {
        tinyMenuRef.current && (tinyMenuRef.current.style.opacity = opacity)
      }
    })
    animate({
      from: 0,
      to: 10,
      duration: 250,
      onUpdate: (y) => {
        tinyMenuRef.current &&
          (tinyMenuRef.current.style.transform = `translateY(${y}px)`)
      },
      onComplete: () => {
        open.current = false
        setShouldRenderMenu(false)
      }
    })
  }

  useClickOutside({
    element: tinyMenuRef,
    onClickOutside: handleClickOutside
  })

  const toggleMenu = (e) => {
    e.stopPropagation()

    if (open.current) {
      open.current = false
      handleClickOutside()
    } else {
      open.current = true
      setShouldRenderMenu(true)
    }
  }

  useEffect(() => {
    if (shouldRenderMenu) {
      animate({
        from: 0,
        to: 1,
        duration: 250,
        onUpdate: (opacity) => {
          tinyMenuRef.current && (tinyMenuRef.current.style.opacity = opacity)
        }
      })

      animate({
        from: 10,
        to: 0,
        duration: 250,
        onUpdate: (y) => {
          tinyMenuRef.current &&
            (tinyMenuRef.current.style.transform = `translateY(${y}px)`)
        }
      })
    }
  }, [shouldRenderMenu, tinyMenuRef])

  useEffect(() => {
    if (!Object.keys(menuDimensions).length) {
      setMenuDimensions(tinyMenuRef.current?.getBoundingClientRect() || {})
    }
  }, [tinyMenuRef])

  return (
    <>
      <Flex
        as="button"
        justifyContent="center"
        position="relative"
        aria-label="Quick access menu"
        onClick={(e) => toggleMenu(e)}
      >
        <Icon size="22px" stroke="primary.accent-2" ref={iconRef}>
          <Gear />
        </Icon>
      </Flex>
      {shouldRenderMenu && (
        <TinyMenu
          menuDimensions={menuDimensions}
          ref={tinyMenuRef}
          open={open}
          iconRef={iconRef}
        />
      )}
    </>
  )
}

export default QuickAccessMenu
