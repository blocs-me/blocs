import {
  computePlateLayout,
  getStatusText,
  shadeColor,
  readableTextColor,
  PLATE_CAPACITY
} from './useOnMyPlate'

describe('computePlateLayout', () => {
  it('returns no bubbles for an empty plate', () => {
    const layout = computePlateLayout([], '#7c9c8b')
    expect(layout.count).toBe(0)
    expect(layout.bubbles).toHaveLength(0)
    expect(layout.fullness).toBe(0)
  })

  it('ignores blank items', () => {
    const layout = computePlateLayout(['Real task', '   ', ''], '#7c9c8b')
    expect(layout.count).toBe(1)
    expect(layout.bubbles).toHaveLength(1)
  })

  it('places the first bubble at the centre of the plate', () => {
    const layout = computePlateLayout(['Only thing'], '#7c9c8b')
    expect(layout.bubbles[0].x).toBeCloseTo(0.5)
    expect(layout.bubbles[0].y).toBeCloseTo(0.5)
  })

  it('keeps every bubble inside the plate bounds', () => {
    const items = Array.from({ length: 30 }, (_, i) => `Item ${i}`)
    const layout = computePlateLayout(items, '#7c9c8b')
    layout.bubbles.forEach((bubble) => {
      const distance = Math.hypot(bubble.x - 0.5, bubble.y - 0.5) + bubble.size / 2
      expect(distance).toBeLessThanOrEqual(0.5)
    })
  })

  it('shrinks bubbles as the plate fills up', () => {
    const few = computePlateLayout(['a', 'b'], '#7c9c8b')
    const many = computePlateLayout(Array.from({ length: 15 }, (_, i) => `i${i}`), '#7c9c8b')
    expect(many.bubbles[0].size).toBeLessThan(few.bubbles[0].size)
  })

  it('reports fullness relative to capacity and caps at 1', () => {
    const half = computePlateLayout(Array.from({ length: PLATE_CAPACITY / 2 }, (_, i) => `i${i}`), '#7c9c8b')
    expect(half.fullness).toBeCloseTo(0.5)

    const over = computePlateLayout(Array.from({ length: PLATE_CAPACITY + 8 }, (_, i) => `i${i}`), '#7c9c8b')
    expect(over.fullness).toBe(1)
  })

  it('gives each bubble a legible text colour', () => {
    const layout = computePlateLayout(['a', 'b', 'c'], '#222222')
    layout.bubbles.forEach((bubble) => {
      expect(['#2a2a2a', '#ffffff']).toContain(bubble.textColor)
    })
  })
})

describe('getStatusText', () => {
  it('says the plate is clear when empty', () => {
    expect(getStatusText(0)).toBe('Your plate is clear')
  })

  it('uses singular wording for one item', () => {
    expect(getStatusText(1)).toBe('1 thing on your plate')
  })

  it('uses plural wording for several items', () => {
    expect(getStatusText(4)).toBe('4 things on your plate')
  })

  it('announces a full plate at capacity', () => {
    expect(getStatusText(PLATE_CAPACITY)).toBe(`Your plate is full — ${PLATE_CAPACITY} things`)
  })
})

describe('shadeColor', () => {
  it('lightens toward white with a positive percent', () => {
    expect(shadeColor('#808080', 1)).toBe('#ffffff')
  })

  it('darkens toward black with a negative percent', () => {
    expect(shadeColor('#808080', -1)).toBe('#000000')
  })

  it('returns the input unchanged at zero', () => {
    expect(shadeColor('#7c9c8b', 0)).toBe('#7c9c8b')
  })
})

describe('readableTextColor', () => {
  it('uses dark text on light backgrounds', () => {
    expect(readableTextColor('#ffffff')).toBe('#2a2a2a')
  })

  it('uses light text on dark backgrounds', () => {
    expect(readableTextColor('#1a1a1a')).toBe('#ffffff')
  })
})
