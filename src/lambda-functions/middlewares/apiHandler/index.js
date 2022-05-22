const apiGuard = async (routeHandler) => (req, res) => {
  return routeHandler(req, res)
}

export default apiGuard
