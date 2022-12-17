import { interpolate } from 'popmotion'

type Props = {
  progress: number
  radius: number
}

export const useSvgTimer = ({ progress, radius }: Props) => {
  const circumference = Math.PI * 2 * radius
  const getTimerDashoffset = interpolate([0, 100], [circumference, 0])

  return [getTimerDashoffset(progress), circumference]
}
