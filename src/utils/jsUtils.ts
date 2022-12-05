export const deleteKey = (key: string | number, ob: object) => {
  delete ob?.[key]
  return ob
}
