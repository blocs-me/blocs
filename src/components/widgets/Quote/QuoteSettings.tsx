import { useState } from 'react'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Switch from '@/design-system/Switch'
import type { QuoteWidgetConfig, QuoteMode } from './quoteConfig'

const CATEGORIES = [
  { key: 'motivation', label: 'Motivation' },
  { key: 'productivity', label: 'Productivity' },
  { key: 'wisdom', label: 'Wisdom' },
  { key: 'creativity', label: 'Creativity' },
  { key: 'mindfulness', label: 'Mindfulness' }
]

const Label = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="xs" fontWeight={500} color="foreground" m={0}>
    {children}
  </Text>
)

const Row = ({ children }: { children: React.ReactNode }) => (
  <Flex justifyContent="space-between" alignItems="center" py="6px">
    {children}
  </Flex>
)

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '13px',
  background: 'transparent',
  color: 'var(--colors-foreground)',
  outline: 'none',
  marginBottom: '4px'
}

type Props = {
  config: QuoteWidgetConfig
  onChange: (updates: Partial<QuoteWidgetConfig>) => void
}

const QuoteSettings = ({ config, onChange }: Props) => {
  const [newQuoteText, setNewQuoteText] = useState('')
  const [newQuoteAuthor, setNewQuoteAuthor] = useState('')

  const toggleCategory = (cat: string) => {
    const current = [...config.categories]
    const idx = current.indexOf(cat)
    if (idx >= 0) {
      current.splice(idx, 1)
    } else {
      current.push(cat)
    }
    onChange({ categories: current })
  }

  const addCustomQuote = () => {
    if (!newQuoteText.trim()) return
    onChange({
      customQuotes: [...config.customQuotes, { text: newQuoteText.trim(), author: newQuoteAuthor.trim() || 'Unknown' }]
    })
    setNewQuoteText('')
    setNewQuoteAuthor('')
  }

  const removeCustomQuote = (idx: number) => {
    onChange({ customQuotes: config.customQuotes.filter((_, i) => i !== idx) })
  }

  return (
    <Flex flexDirection="column" css={{ gap: '2px' }}>
      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Settings
      </Text>

      {/* Mode */}
      <Row><Label>Mode</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['daily', 'random', 'custom'] as const).map(m => (
          <ToggleButton key={m} label={m} active={config.mode === m} onClick={() => onChange({ mode: m })} />
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Theme */}
      <Row><Label>Theme</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['light', 'dark'] as const).map(t => (
          <ToggleButton key={t} label={t} active={config.theme === t} onClick={() => onChange({ theme: t })} />
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Font size */}
      <Row><Label>Font Size</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['sm', 'md', 'lg'] as const).map(s => (
          <ToggleButton key={s} label={s === 'sm' ? 'Small' : s === 'md' ? 'Medium' : 'Large'} active={config.fontSize === s} onClick={() => onChange({ fontSize: s })} />
        ))}
      </Flex>

      {/* Alignment */}
      <Row><Label>Alignment</Label></Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['left', 'center'] as const).map(a => (
          <ToggleButton key={a} label={a} active={config.textAlign === a} onClick={() => onChange({ textAlign: a })} />
        ))}
      </Flex>

      <Row>
        <Label>Show Author</Label>
        <Switch
          id="quote-show-author"
          ariaLabel="show author"
          checked={config.showAuthor}
          onChange={() => onChange({ showAuthor: !config.showAuthor })}
        />
      </Row>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      {/* Categories (for daily/random modes) */}
      {config.mode !== 'custom' && (
        <>
          <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xxs" mt="xxs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
            Categories {config.categories.length === 0 && <span style={{ fontWeight: 400, textTransform: 'none' }}>(all)</span>}
          </Text>
          {CATEGORIES.map(cat => (
            <Row key={cat.key}>
              <Label>{cat.label}</Label>
              <Switch
                id={`quote-cat-${cat.key}`}
                ariaLabel={cat.label}
                checked={config.categories.length === 0 || config.categories.includes(cat.key)}
                onChange={() => toggleCategory(cat.key)}
              />
            </Row>
          ))}
          <Box height="1px" bg="primary.accent-1" my="xxs" />
        </>
      )}

      {/* Custom quotes editor */}
      {config.mode === 'custom' && (
        <>
          <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xxs" mt="xxs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
            Custom Quotes ({config.customQuotes.length})
          </Text>
          {config.customQuotes.map((q, i) => (
            <Flex key={i} alignItems="center" css={{ gap: '6px' }} py="2px">
              <Text fontSize="xxs" color="foreground" m={0} css={{ flex: 1, fontStyle: 'italic' }}>
                &ldquo;{q.text.slice(0, 40)}{q.text.length > 40 ? '...' : ''}&rdquo;
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
                onClick={() => removeCustomQuote(i)}
              >
                ×
              </Box>
            </Flex>
          ))}
          <textarea
            value={newQuoteText}
            onChange={(e) => setNewQuoteText(e.target.value)}
            placeholder="Enter a quote..."
            rows={2}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
          />
          <input
            type="text"
            value={newQuoteAuthor}
            onChange={(e) => setNewQuoteAuthor(e.target.value)}
            placeholder="Author"
            style={inputStyle}
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
              opacity: newQuoteText.trim() ? 1 : 0.5
            }}
            onClick={addCustomQuote}
          >
            Add Quote
          </Box>
          <Box height="1px" bg="primary.accent-1" my="xxs" />
        </>
      )}

      {/* Colors */}
      <Row>
        <Label>Quote Color</Label>
        <input
          type="color"
          value={config.quoteColor || (config.theme === 'dark' ? '#e0e0e0' : '#333333')}
          onChange={(e) => onChange({ quoteColor: e.target.value })}
          style={{ width: '32px', height: '24px', border: 'none', cursor: 'pointer', background: 'transparent' }}
        />
      </Row>
      <Row>
        <Label>Author Color</Label>
        <input
          type="color"
          value={config.authorColor || (config.theme === 'dark' ? '#888888' : '#999999')}
          onChange={(e) => onChange({ authorColor: e.target.value })}
          style={{ width: '32px', height: '24px', border: 'none', cursor: 'pointer', background: 'transparent' }}
        />
      </Row>
    </Flex>
  )
}

const ToggleButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <Box
    as="button"
    flex="1"
    py="4px"
    borderRadius="sm"
    bg={active ? 'brand.accent-1' : 'primary.accent-2'}
    color={active ? 'neutral.white' : 'foreground'}
    css={{
      border: 'none',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: active ? 600 : 400,
      textTransform: 'capitalize'
    }}
    onClick={onClick}
  >
    {label}
  </Box>
)

export default QuoteSettings
