import supabase from '@/lambda/helpers/supabase'

const getHabits = async (req, res) => {
  const { widgetToken, role } = req.query

  const widgetIndexKey = role === 'blocs-user' ? 'token' : 'shareable_token'

  const { data: widget } = await supabase
    .from('widget_access_tokens')
    .select('*')
    .eq(widgetIndexKey, widgetToken)
    .maybeSingle()

  if (!widget) {
    res.status(404).json({
      error: {
        message: 'Widget was not found'
      }
    })
    return null
  }

  res.status(200).json({
    status: 200,
    data: widget.habits
  })
}

export default getHabits
