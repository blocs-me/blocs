import { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/lambda/helpers/supabase'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { widgetToken, role, days = '30' } = req.query as {
    widgetToken: string
    role: 'friend' | 'blocs-user'
    days?: string
  }

  if (!widgetToken || !role) {
    return res.status(400).json({ error: 'Missing widgetToken or role' })
  }

  const widgetIndexKey = role === 'blocs-user' ? 'token' : 'shareable_token'

  const { data: widget } = await supabase
    .from('widget_access_tokens')
    .select('id')
    .eq(widgetIndexKey, widgetToken)
    .maybeSingle()

  if (!widget) {
    return res.status(404).json({ error: 'Widget not found' })
  }

  const daysAgo = new Date()
  daysAgo.setDate(daysAgo.getDate() - parseInt(days))

  const { data: history } = await supabase
    .from('habit_tracker_analytics')
    .select('iso_date_string, habits_done')
    .eq('widget_id', widget.id)
    .gte('iso_date_string', daysAgo.toISOString().slice(0, 10))
    .order('iso_date_string', { ascending: true })

  res.status(200).json({
    data: (history || []).map((row) => ({
      date: row.iso_date_string,
      habitsDone: row.habits_done || []
    }))
  })
}

export default handler
