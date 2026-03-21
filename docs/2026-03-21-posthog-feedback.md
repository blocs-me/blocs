# PostHog Session Feedback — 2026-03-21

Bugs and observations from watching real user sessions.

## Bugs (to fix)

1. **Water tracker hamburger icon broken** — clicking shows "Powered by Blocs" and icon disappears. Seems to switch to dummy/free widget on click.
2. **Dark mode: "Or explore all widgets" link invisible** — black text on dark background.
3. **Landing page slideshow (LandingDemo) broken** — left/right/pause buttons don't work, shows blank for some users. Consider removing.
4. **Pomodoro "link expired" card cut off in iframe** — the card with "go to dashboard" button flows below the widget boundary. Move it higher.
5. **Footer "Partner" links** — remove.

## UX Improvements (to discuss)

6. **Water tracker: users click the circle expecting it to increase intake** — current UX uses up/down buttons which aren't obvious. Could make the circle itself tappable.

7. **Habit tracker default embed crops content** — embeds as a wide rectangle where habits and streak boxes are packed/cropped. Not immediately clear user needs to resize iframe. Could set better default dimensions or make the layout more responsive.

8. **Free habit tracker has no editing** — shows 5 dummy habits with fake streak data ("40 day streak", "best streak is 60 days"). Free users can't edit habits or add their own. No CTA to sign in.
   - **Idea:** Allow free habit editing (add/remove/rename) without sign-in, stored in localStorage. Blur/padlock the streaks area with a "Sign in for streak analytics" CTA. This gives free users real value while creating a natural paywall trigger.
