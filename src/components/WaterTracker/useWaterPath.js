import { useState } from "react"

const useWaterPath = () => {
  const [path, setPath] = useState("")

  const generateWaterPath = () => {
    const numberOfPoints = 8

    const getRandomYPoint = () => Math.max(Math.floor(Math.random() * 95), 75)
    const getRandomXPoint = () => Math.max(Math.floor(Math.random() * 100), 30)
    const xPoints = Array(9)
      .fill("")
      .map((_, i) => i * 10)

    const curvedPathCoords = Array(numberOfPoints)
      .fill("")
      .map((_m, i) => {
        const [x, y] = [xPoints[i], getRandomYPoint()]

        return `${x} ${y}`
      })

    return curvedPathCoords.join(" ")
  }

  return `M 0 0 0 80 ${generateWaterPath()} 100 80 100 0`
}

export default useWaterPath
