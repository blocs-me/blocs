# Quote of the Day Widget — Implementation Plan

## Overview

A daily rotating quote widget embeddable in Notion. Ships with a curated static collection of ~400 quotes. Rotates by date so every user sees the same quote each day. Optionally, Pro users can supply their own custom quotes.

**Architecture:** Same as countdown/clock/calendar — pure client-side, URL query params for config, no DB, no auth tokens. Pro-only widget. Quote data is a static JSON bundled with the widget — no external API.

---

## Modes

### 1. Daily Quote (default)
Displays one quote per day from the built-in collection. Quote selection: `quotes[dayOfYear % quotes.length]`. Every user with the same category filter sees the same quote on the same day.

### 2. Random
Displays a random quote on each page load. Optional refresh button to cycle to another.

### 3. Custom
User supplies their own quotes in the dashboard. Stored in URL params (compact encoding). Rotates daily or randomly, same as above. If no custom quotes are set, falls back to built-in collection.

---

## Quote Data

### Source
Static JSON file: `src/components/widgets/Quote/quotes.json`

~400 curated quotes from public domain sources. Each entry:
```json
{ "text": "The only way to do great work is to love what you do.", "author": "Steve Jobs", "category": "motivation" }
```

### Categories
- `motivation` — drive, ambition, perseverance
- `productivity` — focus, time management, work habits
- `wisdom` — life lessons, philosophy
- `creativity` — art, innovation, thinking differently
- `mindfulness` — presence, calm, balance

Users can filter to one or more categories in settings. Default: all categories.

### Curation criteria
- Well-known, widely attributed quotes (avoid misattributions)
- Concise — ideally under 150 characters (looks good in a compact embed)
- Positive or neutral tone — no downer quotes
- Public domain / fair use (short quotes are not copyrightable)

---

## Config Type

```ts
type QuoteMode = 'daily' | 'random' | 'custom'

type QuoteWidgetConfig = {
  mode: QuoteMode
  theme: 'light' | 'dark'
  showAuthor: boolean
  categories: string[]       // empty = all
  fontSize: 'sm' | 'md' | 'lg'
  textAlign: 'left' | 'center'
  quoteColor: string
  authorColor: string
  customQuotes: { text: string; author: string }[]  // for custom mode
}
```

---

## URL Param Encoding

```
/quote?mode=daily&theme=dark&cat=motivation,productivity&fontSize=lg
/quote?mode=custom&quotes=VGhlIG9ubHk...(base64)&theme=light
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| mode | daily/random/custom | daily | Quote selection mode |
| theme | light/dark | light | Color scheme |
| showAuthor | 0/1 | 1 | Show quote attribution |
| cat | csv | (all) | Category filter |
| fontSize | sm/md/lg | md | Quote text size |
| align | left/center | center | Text alignment |
| quoteColor | hex | theme default | Quote text color |
| authorColor | hex | theme default | Author text color |
| quotes | base64 | — | Custom quotes (base64-encoded JSON) |

Custom quotes use base64 encoding to keep arbitrary text safe in URLs. This limits to roughly 20-30 custom quotes before URL length becomes an issue — acceptable for the use case.

---

## Display

Simple and elegant. The widget shows:
- Quote text (with optional quotation marks styling — large opening quote mark as a decorative element)
- Author name below (optional)
- Category label (optional, small, muted)

No buttons or interactivity in daily mode. In random mode, a small refresh icon to cycle.

Visual style is intentionally minimal — the quote should be the focus. Think: centered text, generous whitespace, clean typography.

---

## File Structure

```
src/components/widgets/Quote/
  quotes.json                 — static quote collection (~400 entries)
  quoteConfig.ts              — types, defaults, URL param encode/decode
  quoteConfig.test.ts         — config roundtrip tests
  useQuote.ts                 — hook: selects quote based on mode + date + categories
  useQuote.test.ts            — quote selection tests
  QuoteDisplay.tsx            — pure display component
  QuoteSettings.tsx           — dashboard settings panel
  DummyQuotePreview.tsx       — marketing preview component

src/components/pages/Dashboard/QuoteDashboard/
  QuoteDashboard.tsx          — dashboard tab with live preview + settings
  index.ts

src/pages/
  quote/index.tsx             — widget iframe page
  quote-widget.tsx            — marketing/dedicated page
```

---

## Implementation Order

### Phase 1: Quote data + core logic (TDD)

1. **`quotes.json`** — curate ~400 quotes across 5 categories. Can start with ~100 and expand.

2. **`quoteConfig.ts`** — types, `getDefaultConfig()`, `configFromParams()`, `configToParams()`, `configToEmbedUrl()`. Base64 encode/decode for custom quotes.

3. **`useQuote.ts`** — hook that returns the current quote
   - Daily: deterministic selection based on day of year + category filter
   - Random: random selection, re-rolls on refresh
   - Custom: same daily/random logic but over user's custom list
   - Exported pure function `selectQuote(quotes, mode, date)` for testing

4. **Tests first** for:
   - Config encode/decode roundtrip (including base64 custom quotes)
   - Daily mode returns same quote for same date
   - Daily mode returns different quote for different dates
   - Category filtering works
   - Random mode returns a valid quote
   - Custom mode falls back to built-in when empty

### Phase 2: Display component

5. **`QuoteDisplay.tsx`** — pure component
   - Props: `{ text, author, showAuthor, fontSize, textAlign, quoteColor, authorColor, theme }`
   - Decorative opening quotation mark (large, faded, positioned behind text)
   - Clean typography with configurable size

### Phase 3: Widget iframe page

6. **`src/pages/quote/index.tsx`** — reads URL params, renders QuoteDisplay. Refresh button in random mode. Gear icon popover with dashboard link.

### Phase 4: Dashboard

7. **`QuoteSettings.tsx`** — mode picker, category toggles, font size, alignment, color pickers, custom quote editor (textarea for adding quotes)

8. **`QuoteDashboard.tsx`** — live preview + settings panel, copy link button

### Phase 5: Integration + marketing

9. Add "Quote" tab to DashboardNav (quote/speech-bubble icon)
10. Add to Dashboard routing (lazy import, validPaths, ProGate)
11. Add to pricing table features list
12. Create `DummyQuotePreview.tsx` for marketing pages
13. Landing page section with Pro badge
14. Dedicated marketing page `/quote-widget`
15. Footer link

---

## Key Decisions

- **Static JSON, no API** — zero external dependencies. The widget works offline, loads instantly, and never breaks due to API changes. The trade-off (finite quote set, not "fresh" content) is acceptable — 400 quotes means users won't see a repeat for over a year.
- **Deterministic daily selection** — `quotes[dayOfYear % quotes.length]` ensures everyone sees the same quote on the same day. This feels intentional ("today's quote") vs. random-per-user which feels arbitrary.
- **Base64 for custom quotes** — keeps the URL-param architecture intact. Practical limit of ~20-30 custom quotes before URL gets too long. If users need more, that's a case for server-side config (same future work as other widgets).
- **Pro-only** — gated like all new widgets.
- **Categories are a filter, not a mode** — users select which categories to include. The mode (daily/random/custom) is separate from the category filter.
- **No "favorite" or "share" buttons** — keep it minimal. The widget shows a quote, that's it.
