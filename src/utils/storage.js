const LS = global.window?.localStorage

const setItem = (key, value) => LS?.setItem(key, value)
const getItem = (key) => LS?.getItem(key)
const clear = () => LS?.clear()

const storage = {
  setItem,
  getItem,
  clear,
}

export default storage
