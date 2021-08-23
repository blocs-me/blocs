import styled from "@emotion/styled"
import themeGet from "@styled-system/theme-get"

const Container = styled.div`
  width: 36px;
  height: 20px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`

const Circle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: ${themeGet("colors.bg.default")};
  position: absolute;
  left: 4px;
  top: 3px;
  transition: transform 0.2s ease;
`
const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: background 0.2s ease;
`

const Input = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: red;
  cursor: pointer;

  & ~ ${Bg} {
    background: ${themeGet("colors.primary.accent-1")};
  }

  &:checked ~ ${Circle} {
    transform: translateX(14px);
  }

  &:checked ~ ${Bg} {
    background: ${themeGet("colors.secondary")} !important;
  }
`

const Switch = ({ register, id, ariaLabel, checked }) => (
  <Container>
    <Input
      type="checkbox"
      aria-label={ariaLabel}
      id={id}
      checked={checked}
      {...register}
    />
    <Bg />
    <Circle />
  </Container>
)

export default Switch
