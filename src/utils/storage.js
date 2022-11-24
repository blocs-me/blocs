const LS = global.window?.localStorage

const setItem = (key, value) => LS?.setItem(key, value)
const getItem = (key) => LS?.getItem(key)
const clear = () => LS?.clear()

/* 
  - a server-side compatible util for localStorage
  - this does not parse json out of the box
*/
const storage = {
  setItem,
  getItem,
  clear
}

export default storage
