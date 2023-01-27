import styled from '@emotion/styled'

const getPosition = ({ position }) => {
  if (position === 'top') return `top: 0; left: 0;`
  if (position === 'bottom') return `bottom: 0; left: 0;`
  return ''
}

const getGradient = ({ position, theme }) => {
  if (position === 'top')
    return `background-image: linear-gradient(to top, ${theme.colors.fade.from}, ${theme.colors.fade.to});`
  if (position === 'bottom')
    return `background-image: linear-gradient(to bottom, ${theme.colors.fade.from}, ${theme.colors.fade.to});`

  return ''
}

const FadeProvider = styled.div`
  position: absolute;
  width: 100%;
  height: 60px;
  pointer-events: none;
  ${getGradient};
  ${getPosition}
`

export default FadeProvider
