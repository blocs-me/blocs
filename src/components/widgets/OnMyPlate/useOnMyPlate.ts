import { useMemo } from 'react'

export type PlateBubble = {
  label: string
  x: number // 0..1 horizontal position within the plate box
  y: number // 0..1 vertical position within the plate box
  size: number // diameter as a fraction of the plate box
  color: string
  textColor: string
}

export type PlateLayout = {
  bubbles: PlateBubble[]
  count: number
  fullness: number // 0..1, how full the plate reads
  statusText: string
}

// Roughly how many items make the plate feel "full". Not a hard limit — items
// beyond this keep getting added, they just cluster near the rim.
export const PLATE_CAPACITY = 12

// Golden angle produces an even, organic phyllotaxis (sunflower) spread so
// bubbles fan out from the centre as more are added.
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
// How far (as a fraction of the plate box, measured from the centre) the
// outer edge of a bubble is allowed to reach. Leaves a margin inside the rim.
const PLATE_USABLE = 0.46
// Bubble radius as a fraction of the spiral spacing constant. Keeping this at
// ~half the spacing means neighbouring bubbles touch at most, never overlap.
const PACK_RADIUS = 0.46
const MIN_DIAMETER = 0.11
const MAX_DIAMETER = 0.3

function clamp(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

// Lighten (percent > 0) or darken (percent < 0) a hex colour. percent is -1..1.
export function shadeColor(hex: string, percent: number): string {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  const num = parseInt(full, 16)
  if (Number.isNaN(num)) return hex

  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff

  const target = percent < 0 ? 0 : 255
  const p = Math.abs(percent)
  r = Math.round((target - r) * p) + r
  g = Math.round((target - g) * p) + g
  b = Math.round((target - b) * p) + b

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

// Pick a legible text colour (dark or light) for a given bubble colour.
export function readableTextColor(hex: string): string {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  const num = parseInt(full, 16)
  if (Number.isNaN(num)) return '#ffffff'

  const r = (num >> 16) & 0xff
  const g = (num >> 8) & 0xff
  const b = num & 0xff
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#2a2a2a' : '#ffffff'
}

export function getStatusText(count: number): string {
  if (count === 0) return 'Your plate is clear'
  const noun = count === 1 ? 'thing' : 'things'
  if (count >= PLATE_CAPACITY) return `Your plate is full — ${count} ${noun}`
  return `${count} ${noun} on your plate`
}

export function computePlateLayout(items: string[], itemColor: string): PlateLayout {
  const labels = items.filter((item) => item.trim().length > 0)
  const count = labels.length

  // Spiral spacing constant, chosen so the outermost bubble's edge lands just
  // inside the plate. Bubble size is then derived from this spacing so bubbles
  // never overlap (up to capacity) and the plate fills evenly as items grow.
  const spacing = count <= 1 ? PLATE_USABLE : PLATE_USABLE / (Math.sqrt(count - 1) + PACK_RADIUS)
  const size = clamp(MIN_DIAMETER, 2 * PACK_RADIUS * spacing, MAX_DIAMETER)

  const bubbles: PlateBubble[] = labels.map((label, i) => {
    const radius = spacing * Math.sqrt(i)
    const theta = i * GOLDEN_ANGLE
    const x = 0.5 + Math.cos(theta) * radius
    const y = 0.5 + Math.sin(theta) * radius
    const color = shadeColor(itemColor, ((i % 5) - 2) * 0.08)

    return { label, x, y, size, color, textColor: readableTextColor(color) }
  })

  return {
    bubbles,
    count,
    fullness: Math.min(1, count / PLATE_CAPACITY),
    statusText: getStatusText(count)
  }
}

export function useOnMyPlate(items: string[], itemColor: string): PlateLayout {
  return useMemo(() => computePlateLayout(items, itemColor), [items, itemColor])
}
