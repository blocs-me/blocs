import styled from '@emotion/styled'

const Rect = styled.rect`
  transition: transform 0.3s ease, x 0.3s ease, y 0.3s ease;
  transform-origin: center;
`

const Hamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect
        x={0}
        y={isOpen ? 4.5 : 2.5}
        width={10}
        height={1.2}
        stroke="none"
        rx={0.5}
        css={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}
      />
      <Rect
        x={0}
        y={isOpen ? 4.5 : 6.5}
        width={10}
        height={1.2}
        stroke="none"
        rx={0.5}
        css={{ transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)' }}
      />
    </svg>
  )
}

export default Hamburger
