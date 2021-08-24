const useClipboard = () => {
  return (data) => {
    navigator.clipboard.writeText(data)
  }
}

export default useClipboard
