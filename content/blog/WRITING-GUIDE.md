# Blocs Blog Writing Guide

This guide covers everything specific to writing blog posts for Blocs. It assumes you already know general content writing skills (research, SEO, structure, etc.).

## About Blocs

Blocs is a suite of embeddable productivity widgets for Notion. Users embed them as iframes directly into their Notion pages. The site is at [blocs.me](https://blocs.me).

### Widgets We Offer

| Widget | Embed Path | Free? | Dedicated Page |
|--------|-----------|-------|----------------|
| Pomodoro Timer | `/pomodoro` | Yes (basic) | [/pomodoro-timer](https://blocs.me/pomodoro-timer) |
| Water Tracker | `/water-tracker` | Yes (basic) | [/water-tracker-widget](https://blocs.me/water-tracker-widget) |
| Habit Tracker | `/habit-tracker` | Yes (basic) | [/habit-tracker-widget](https://blocs.me/habit-tracker-widget) |
| Countdown Timer | `/countdown` | Pro only | [/countdown-timer](https://blocs.me/countdown-timer) |
| Progress Bar | `/progress-bar` | Pro only | [/progress-bar-widget](https://blocs.me/progress-bar-widget) |

### Free vs. Pro

- **Free tier:** Pomodoro Timer, Water Tracker, and Habit Tracker with default settings. No sign-up required.
- **Blocs Pro:** $17 one-time payment (not a subscription). Lifetime access to all widgets plus:
  - Countdown Timer and Progress Bar (Pro-exclusive widgets)
  - Custom durations and goals
  - Unlimited habits
  - Daily/weekly/monthly analytics and streaks
  - Theme customization
  - No Blocs branding
  - Cloud sync across devices

Always position the $17 price as a one-time payment, not a subscription. This is a key differentiator.

### Important Links

- **Pricing:** [blocs.me/pricing](https://blocs.me/pricing)
- **Sign in:** [blocs.me/sign-in](https://blocs.me/sign-in)
- **FAQs:** [blocs.me/faqs](https://blocs.me/faqs)
- **Blog:** [blocs.me/blog](https://blocs.me/blog)
- **Support email:** support@blocs.me

---

## Embedding Widgets in Blog Posts

Our blog supports a custom `<WidgetEmbed>` component that renders an interactive widget inline in the post. Use it to show off the actual product — this is one of our biggest content advantages.

### Basic usage

```mdx
<WidgetEmbed src="/water-tracker" title="Blocs Water Tracker" />
```

### Props

| Prop | Required | Default | Description |
|------|----------|---------|-------------|
| `src` | Yes | — | Widget embed path (see table above) |
| `title` | No | `"Blocs Widget"` | Accessible title for the iframe |
| `aspectRatio` | No | `"0.85"` | CSS aspect ratio. Good for tall widgets (Water Tracker, Pomodoro, Habit Tracker) |
| `height` | No | — | Fixed height. Use instead of aspectRatio for compact widgets. Overrides aspectRatio when set |
| `maxWidth` | No | `"420px"` | Maximum width of the embed container |

### Recommended settings per widget

```mdx
<!-- Tall widgets — use aspectRatio (default) -->
<WidgetEmbed src="/water-tracker" title="Blocs Water Tracker" />
<WidgetEmbed src="/pomodoro" title="Blocs Pomodoro Timer" />
<WidgetEmbed src="/habit-tracker" title="Blocs Habit Tracker" />

<!-- Compact widgets — use height -->
<WidgetEmbed src="/countdown" title="Blocs Countdown Timer" height="200px" maxWidth="500px" />
<WidgetEmbed src="/progress-bar" title="Blocs Progress Bar" height="150px" maxWidth="500px" />
```

---

## Branding and Tone

- **Primary brand color:** `#E00079` (magenta/pink). Reference this when describing the brand visually, but you won't need to use it in posts — the site handles styling.
- **Tone:** Direct, practical, no fluff. Write like you're explaining something to a smart friend. Avoid corporate jargon and marketing buzzwords.
- **Product positioning:** Blocs widgets live *inside* Notion. Emphasize that users don't need to leave their workspace or install another app. The embed-in-Notion angle is our core value prop.
- **Competitor framing:** Don't name-drop competitors. Instead, describe the pain points of alternatives (manual Notion databases, separate mobile apps, complex template setups) and show how Blocs solves them.

## Blog Post Structure

Every post should include:

1. **Key Takeaways** — a bulleted summary near the top so skimmers get the main points immediately.
2. **At least one embedded widget** — use `<WidgetEmbed>` to let readers interact with the actual product. This is our biggest differentiator vs. text-only blogs.
3. **A free vs. Pro comparison** where relevant — be honest about what's free and what requires Pro. Don't oversell.
4. **FAQs** — include 4-6 questions relevant to the post's topic. These help with SEO (FAQ schema may be added later).
5. **A soft CTA at the end** — point readers to the relevant widget URL or to the pricing page. Keep it low-pressure ("Copy the URL and try it" not "BUY NOW").

---

## Publishing Instructions

Blog posts are MDX files in `content/blog/`. The filename becomes the URL slug (e.g., `notion-widget-for-water-tracking.mdx` becomes `/blog/notion-widget-for-water-tracking`). Each file needs frontmatter at the top with exactly three fields: `title`, `date` (YYYY-MM-DD format), and `description` (keep under 160 characters for SEO). MDX is Markdown with JSX support — you can use standard Markdown (headings, bold, links, lists, tables) plus our custom `<WidgetEmbed>` component. One critical gotcha: **never write bare angle brackets next to text** like `<2` or `>4` — MDX interprets these as JSX tags and the build will fail. Write `less than 2` or `fewer than 4` instead, or wrap in backticks if you need the symbol in a code context. Similarly, make sure all HTML/JSX tags are properly closed (use `<br />` not `<br>`). New posts are automatically picked up at build time — no config changes needed. They'll appear on the blog index page sorted by date (newest first) and will be included in the sitemap automatically.
