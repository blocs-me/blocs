import { useState } from 'react'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import type { DateMarker } from './calendarConfig'

const inputStyle: React.CSSProperties = {
  padding: '6px 10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '13px',
  background: 'transparent',
  color: 'var(--colors-foreground)',
  outline: 'none'
}

type Props = {
  markers: DateMarker[]
  onChange: (markers: DateMarker[]) => void
}

const MarkerEditor = ({ markers, onChange }: Props) => {
  const [newDate, setNewDate] = useState('')
  const [newColor, setNewColor] = useState('#4A7AFF')
  const [newLabel, setNewLabel] = useState('')

  const addMarker = () => {
    if (!newDate) return
    const exists = markers.some(m => m.date === newDate)
    if (exists) return
    onChange([...markers, { date: newDate, color: newColor, label: newLabel }])
    setNewDate('')
    setNewLabel('')
  }

  const removeMarker = (date: string) => {
    onChange(markers.filter(m => m.date !== date))
  }

  return (
    <Flex flexDirection="column" css={{ gap: '4px' }}>
      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Date Markers
      </Text>

      {/* Existing markers */}
      {markers.map(m => (
        <Flex key={m.date} alignItems="center" css={{ gap: '6px' }} py="2px">
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: m.color || '#4A7AFF',
            flexShrink: 0
          }} />
          <Text fontSize="xxs" color="foreground" m={0} css={{ flex: 1 }}>
            {m.date}{m.label ? ` — ${m.label}` : ''}
          </Text>
          <Box
            as="button"
            css={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'var(--colors-primary-accent-4)',
              padding: '0 2px',
              lineHeight: 1,
              '&:hover': { color: 'var(--colors-foreground)' }
            }}
            onClick={() => removeMarker(m.date)}
          >
            ×
          </Box>
        </Flex>
      ))}

      {/* Add new marker */}
      <Flex css={{ gap: '4px' }} mt="xxs">
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        />
        <input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          style={{ width: '32px', height: '32px', border: 'none', cursor: 'pointer', background: 'transparent', flexShrink: 0 }}
        />
      </Flex>
      <input
        type="text"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        placeholder="Label (optional)"
        style={{ ...inputStyle, width: '100%' }}
      />
      <Box
        as="button"
        py="4px"
        borderRadius="sm"
        bg="brand.accent-1"
        color="neutral.white"
        css={{
          border: 'none',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 600,
          opacity: newDate ? 1 : 0.5
        }}
        onClick={addMarker}
      >
        Add Marker
      </Box>
    </Flex>
  )
}

export default MarkerEditor
