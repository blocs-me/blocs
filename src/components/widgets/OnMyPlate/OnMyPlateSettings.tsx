import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Switch from '@/design-system/Switch'
import { OnMyPlateConfig, PlateStyle } from './onMyPlateConfig'

const PLATE_STYLES: { key: PlateStyle; label: string }[] = [
  { key: 'ceramic', label: 'Ceramic' },
  { key: 'matte', label: 'Matte' },
  { key: 'minimal', label: 'Minimal' }
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '13px',
  background: 'transparent',
  color: 'var(--colors-foreground)',
  outline: 'none'
}

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

type Props = {
  config: OnMyPlateConfig
  onChange: (updates: Partial<OnMyPlateConfig>) => void
}

const OnMyPlateSettings = ({ config, onChange }: Props) => {
  const updateItem = (index: number, value: string) => {
    const items = [...config.items]
    items[index] = value
    onChange({ items })
  }

  const removeItem = (index: number) => {
    onChange({ items: config.items.filter((_, i) => i !== index) })
  }

  const addItem = () => {
    onChange({ items: [...config.items, ''] })
  }

  return (
    <Flex flexDirection="column" css={{ gap: '2px' }}>
      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Settings
      </Text>

      <Row>
        <Label>Title</Label>
      </Row>
      <input
        type="text"
        value={config.title}
        onChange={(e) => onChange({ title: e.target.value })}
        style={{ ...inputStyle, marginBottom: '4px' }}
      />

      <Row>
        <Label>Show Title</Label>
        <Switch
          id="plate-show-title"
          ariaLabel="show title"
          checked={config.showTitle}
          onChange={() => onChange({ showTitle: !config.showTitle })}
        />
      </Row>

      <Row>
        <Label>Show Count</Label>
        <Switch
          id="plate-show-count"
          ariaLabel="show count"
          checked={config.showCount}
          onChange={() => onChange({ showCount: !config.showCount })}
        />
      </Row>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xxs" mt="xxs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        On Your Plate
      </Text>
      {config.items.map((item, i) => (
        <Flex key={i} alignItems="center" css={{ gap: '6px' }} py="3px">
          <input
            type="text"
            value={item}
            placeholder="Add an item…"
            onChange={(e) => updateItem(i, e.target.value)}
            style={inputStyle}
          />
          <Box
            as="button"
            aria-label="remove item"
            onClick={() => removeItem(i)}
            css={{
              flexShrink: 0,
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              background: 'var(--colors-primary-accent-2)',
              color: 'var(--colors-primary-accent-4)',
              fontSize: '14px',
              lineHeight: 1
            }}
          >
            ×
          </Box>
        </Flex>
      ))}
      <Box
        as="button"
        onClick={addItem}
        mt="xxs"
        py="6px"
        borderRadius="sm"
        bg="primary.accent-2"
        color="foreground"
        css={{ border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600, width: '100%' }}
      >
        + Add item
      </Box>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      <Row>
        <Label>Theme</Label>
      </Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {(['light', 'dark'] as const).map((t) => (
          <Box
            key={t}
            as="button"
            flex="1"
            py="4px"
            borderRadius="sm"
            bg={config.theme === t ? 'brand.accent-1' : 'primary.accent-2'}
            color={config.theme === t ? 'neutral.white' : 'foreground'}
            css={{ border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: config.theme === t ? 600 : 400, textTransform: 'capitalize' }}
            onClick={() => onChange({ theme: t })}
          >
            {t}
          </Box>
        ))}
      </Flex>

      <Row>
        <Label>Plate Style</Label>
      </Row>
      <Flex css={{ gap: '4px' }} mb="xxs">
        {PLATE_STYLES.map(({ key, label }) => (
          <Box
            key={key}
            as="button"
            flex="1"
            py="4px"
            borderRadius="sm"
            bg={config.plateStyle === key ? 'brand.accent-1' : 'primary.accent-2'}
            color={config.plateStyle === key ? 'neutral.white' : 'foreground'}
            css={{ border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: config.plateStyle === key ? 600 : 400 }}
            onClick={() => onChange({ plateStyle: key })}
          >
            {label}
          </Box>
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xxs" />

      <Row>
        <Label>Plate Color</Label>
        <input
          type="color"
          value={config.plateColor}
          onChange={(e) => onChange({ plateColor: e.target.value })}
          style={{ width: '32px', height: '24px', border: 'none', cursor: 'pointer', background: 'transparent' }}
        />
      </Row>
      <Row>
        <Label>Item Color</Label>
        <input
          type="color"
          value={config.itemColor}
          onChange={(e) => onChange({ itemColor: e.target.value })}
          style={{ width: '32px', height: '24px', border: 'none', cursor: 'pointer', background: 'transparent' }}
        />
      </Row>
    </Flex>
  )
}

export default OnMyPlateSettings
