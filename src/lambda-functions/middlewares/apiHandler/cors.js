import Cors from 'cors'

const cors = async (req, res) => {
  const env = process.env.VERCEL_ENV
  const local = { origin: 'http://localhost:3000' }
  const production = {
    origin: 'https://blocs.me'
  }
  const preview = {
    origin: 'https://blocs-dev.vercel.app'
  }

  const configs = {
    local,
    production,
    preview
  }

  const corsConfig = configs[env?.toLowerCase()]

  return Cors(corsConfig)(req, res, (result) => {
    if (result instanceof Error) {
      res.status(401).json({ error: 'Unauthorized' })
      return nulll
    }

    return result
  })
}

export default cors
