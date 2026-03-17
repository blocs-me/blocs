const getPomdoroSettings = async (req, res) => {
  try {

    res.status(400).json({
      error: 'This endpoint is deprecated'
    })
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: {} })
  }
}

export default getPomdoroSettings
