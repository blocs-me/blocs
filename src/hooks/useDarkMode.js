import useMediaQuery from "./useMediaQuery"

const useDarkMode = () => {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  return isDarkMode
}

export default useDarkMode
