import supabase from '@/lambda/helpers/supabase'
import { mapWidgetAccessTokenToType } from '@/lambda/helpers/supabase/mapDbToType'

const validateWidgetAuth = async (req, res, rest) => {
  const token = rest.bearerToken
  if (!token) res.status(401).json({ error: 'Unauthorized acccess' })

  try {
    const { data: widget } = await supabase
      .from('widget_access_tokens')
      .select('user_id')
      .eq('token', token)
      .maybeSingle()

    const mapWidgetToType = mapWidgetAccessTokenToType(widget)

    rest.userId = mapWidgetToType.userId
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', rest.userId)
      .maybeSingle()

    res.status(200).json({
      data: {
        valid: true,
        user: {
          avatar_url: user?.avatar_url
        }
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Something went wrong when logging in',
      data: {
        valid: false
      }
    })
  }
}

export default validateWidgetAuth
