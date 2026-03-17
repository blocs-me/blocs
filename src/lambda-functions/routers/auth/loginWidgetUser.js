const loginWidgetUser = async (req, res) => {
  res.status(401).json({ error: 'unauthorized' })
}

export default loginWidgetUser
