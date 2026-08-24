# Stegehuis Design System

The design language for **Xander Stegehuis** — a Sydney-based design strategist and service
designer — and for the personal **productivity and financial planning tools** he is building.

Two surfaces live under one language:

1. **Plan** — the personal productivity + financial planning app (`ui_kits/app/`). Tasks, cashflow,
   budget envelopes, savings goals, weekly review.
2. **xanderstegehuis.co** — the personal / consulting website (`ui_kits/website/`), rebuilt
   full-bleed per the brief.

Plus **eight consulting-grade slide layouts** (`slides/`) for client-facing documents.

The brief in one line: *minimalist like Apple, credible like a top-tier consulting firm, and
playful enough to be enjoyable to use every day.* The system resolves that as **a deep navy
foundation, a serif for anything that matters, and exactly one teal and one coral accent.**

---

## THE SIX PRINCIPLES

These are Xander's own words for what the tools should feel like, drawn from his moodboard
(`assets/moodboard/`, 16 images — see the *Moodboard* and *Six principles* cards). Every decision
below traces back to one of them; if a design choice serves none of them, it does not belong.

**01 · Calm** — *being in nature, coffee and breakfast.*
Space before content. Generous `--section-y`, low-contrast neutrals, `--ease-out` deceleration, no
motion that competes for attention, no red badge unless something is genuinely wrong. A calm screen
tells you *nothing needs you right now* and means it.

**02 · Luxury**
Restraint is the whole mechanism. Hairline rules instead of boxes, a serif (Cardo) for anything that
matters, one accent per view, and whitespace that a cheaper design would have filled. `--brass-500`
(#B08A4F) exists for this: a 1px rule, a small numeral, a label — **never a fill, never a gradient.**

**03 · Possibility** — *the city.*
Wide horizons. Full-bleed bands, open left margins, images cropped to landscape and run edge to
edge. The layout should always look like there is more room ahead than behind — which is exactly why
there is no max-width container anywhere in this system.

**04 · Productivity**
Every screen answers *"what now?"* in its first line. One primary action, always — the single teal
button. Nothing decorative sits above the first useful thing. `TopBar` states where you are;
`StatCard` states where you stand; the rest is the work.

**05 · Knowledge**
Figures arrive with how they were measured: *"65% reduction — measured across 5 months, 42
initiatives."* Tabular figures, a stated source line, and a delta with a period attached. Nothing is
asserted without its evidence, in product or in a deck.

**06 · Self-development**
Progress must be visible. `ProgressMeter` on every goal, a streak on every habit, a delta against
last month on every figure. Movement is shown against a plan, never in isolation — and never
punitively: over-budget is amber-then-red with a number, not a scolding.

### The warm/cool split these create

The system runs **two temperatures**, and they never mix inside one component:

| | Cool — navy + teal | Warm — sand + brass |
| --- | --- | --- |
| Serves | Possibility, Productivity, Knowledge | Calm, Luxury, Self-development |
| Surfaces | `--paper-000`, `--paper-100`, `--ink-800` | `--sand-050`, `--sand-100` |
| Accent | `--teal-500` (interactive) | `--brass-500` (rules and marks only) |
| Where | App chrome, data, slides, case studies | Review screens, reflective moments, editorial bands, moodboard imagery |

A section is one temperature or the other. `--sand-050` replaces `--paper-100` as the alternating
band colour whenever the intent is reflective rather than analytical.

---

## Sources this system was built from

| Source | What was taken from it | Access |
| --- | --- | --- |
| `uploads/xs-logo-dark.jpg`, `uploads/xs-logo-light.jpg` | The XSt serif monogram; the canonical navy (#192730) and teal (#66C4D0), sampled pixel-for-pixel | In this project, `assets/logo-*.jpg` |
| `uploads/McKinsey Consulting Report Slides.pptx` | Cardo + Inter font binaries (extracted from the file's embedded fonts), the coral callout colour #ED7843, 35 outline icon PNGs, 5 stock photos, and the slide layout grammar | In this project |
| https://www.xanderstegehuis.co | Structure, real copy, tone of voice, information architecture, section rhythm | Public site; page text read live |

**What was *not* accessible:** the site's compiled CSS (Next.js bundle) and its photography.
Type and colour therefore come from the logo and the deck, not from the site's stylesheet — see
*Caveats* at the bottom.

---

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | **The entry point.** `@import` list only. Link this one file. |
| `tokens/` | `fonts`, `colors`, `typography`, `spacing`, `radius`, `elevation`, `motion`, `semantic`, `base` |
| `assets/logo-dark.jpg`, `assets/logo-light.jpg` | The XSt monogram, on navy and on white |
| `assets/fonts/` | Cardo (400/400i/700) and Inter (300/400/400i/700), self-hosted TTF |
| `assets/icons/` | 35 outline PNG glyphs |
| `assets/moodboard/` | **16 reference images from Xander** — the source of the six principles |
| `assets/imagery/` | 5 cool-toned stock photographs from the source deck (placeholders) |
| `components/` | 20 React primitives in five groups (below) |
| `ui_kits/app/` | The Plan app — 4 interactive screens + shell |
| `ui_kits/website/` | xanderstegehuis.co home page, full-bleed |
| `slides/` | 8 slide layouts, 1280×720 |
| `guidelines/` | 24 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `SKILL.md` | Agent-Skills front matter for using this system in Claude Code |

### Components

**core/** — `Button`, `IconButton`, `Icon`, `Card`, `Badge`, `Tag`
**forms/** — `Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `AmountInput`
**navigation/** — `Tabs`, `SegmentedControl`, `SidebarNav`, `TopBar`
**feedback/** — `Dialog`, `Toast`, `Tooltip`, `ProgressMeter`
**data/** — `StatCard`, `ListRow`

Each has a sibling `.d.ts` (props contract) and `.prompt.md` (what & when, usage, variants).

**Intentional additions** — components with no counterpart in the supplied sources, added because
the two products genuinely need them:

- `Icon` — a wrapper so the PNG glyph set can be tinted with tokens.
- `AmountInput` — money entry set in the display serif; a planning tool cannot ship without one.
- `SegmentedControl` — the Apple-style inset picker the brief's "minimal like Apple" calls for.
- `SidebarNav`, `TopBar` — the app shell; nothing else could hold four screens together.
- `ProgressMeter` — the budget/goal readout, the core primitive of the finance surfaces.
- `StatCard`, `ListRow` — the two data shapes every screen in Plan is built from.

---

## CONTENT FUNDAMENTALS

The voice is taken directly from xanderstegehuis.co and it is unusually consistent: **first person,
plain, warm, structured, and never salesy.**

**Person and stance.** "I" for Xander, "you" for the reader, "we" for work done with a client team.
The site opens *"Hi! My name is Xander."* — that exclamation mark is the entire playfulness budget
for the page, and it works because everything after it is measured.

**Casing.** Sentence case everywhere — headings, buttons, labels. The one exception is the
**eyebrow**: 12px Inter 700, uppercase, 0.12em tracking, sitting above almost every section
("HOW I HELP ORGANISATIONS", "PREVIOUS INDUSTRIES", "THIS MONTH"). It is the system's signature
small-type move. Title Case appears nowhere.

**Spelling.** Australian / British English: *organisation, prioritise, artefact, behaviour.*
Not *organization*. Dates are `18 August 2026` or `18/08/2026`. Currency is AUD, written `$2,180.00`.

**Sentence shape.** Short declaratives that name a mechanism, not a benefit.
- ✅ *"I facilitate structured conversations that build mutual understanding, empathy, and simple artefacts teams can move forward with."*
- ✅ *"Governance is not slow because people are careless. It is slow because four independent processes each ask for the same information at a different moment."*
- ❌ *"Unlock transformative synergies across your organisation."*

**Numbers carry the claim.** *"65% reduction in governance planning time"*, *"6+ years in service
design"*, *"5 months"*. Every impact statement has a figure attached, and the figure is always
bounded by how it was measured.

**In-product copy.** Same voice, shorter. Labels are nouns (*Cashflow*, *Goals*, *Runway*).
Buttons are verb phrases (*Add task*, *Move money*, *Log spend*) — never *Submit* or *OK*.
Empty and helper states are quietly reassuring: *"One line is enough. You can sort it later."*,
*"You can change this any time."* Errors state the fact, not the blame: *"That address doesn't look
right."* — not *"Invalid input"*.

**Emoji: never.** Not on the site, not in the deck, not in the app. Status is carried by a Badge,
a coloured 6px dot, or a ▲/▼ glyph — never by an emoji. Unicode arrows and the middot (·) are the
only decorative characters used, and · is the standard separator in metadata lines
(*"Housing · 1 Aug"*).

**Vibe.** A senior consultant who has done the reading and will not waste your afternoon. Curious,
structured, energetic — the three words Xander uses about himself — in that order.

---

## VISUAL FOUNDATIONS

### Colour
Navy is the ground, not black. `--ink-800` **#192730** is sampled from the logo lockup and is the
single most-used colour in the system: sidebars, slide fields, primary buttons, headings via
`--ink-900`. The ink ramp runs from #0B141B to #F1F5F7 and every neutral in the system comes from
it — there is **no pure grey and no pure black anywhere.** Even shadows are navy-tinted.

Teal `--teal-500` **#66C4D0** is the letterform colour, and it means *interactive or brand*:
focus rings, switch fills, the active-tab rule, progress fills, links (at `--teal-700` for
contrast on white; `--teal-400` #8FDFE0 on navy — that lighter step is also sampled from the logo).

Coral `--coral-500` **#ED7843** (inherited from the source deck) is the whole playfulness budget:
**one coral element per view, maximum.** A decision callout, the "you are here" marker on a
timeline. It never means danger — that is `--loss-500`.

Financial semantics are separate from brand: `--gain-*` green, `--loss-*` red, `--warn-*` amber.
They are **never used alone** — a figure gets a sign (+/−) and a ▲/▼ glyph as well as a colour.

Sand and brass carry the warm half of the system. `--sand-050` **#FBF8F4** is warm paper — the calm
alternative to `--paper-100`; `--sand-200` is its hairline. `--brass-500` **#B08A4F** is the luxury
mark: a 1px rule, a small serif numeral, an eyebrow in `--brass-700`. **Brass is never a fill and
never a gradient.**

Backgrounds: white `--paper-000` for content, #F5F8F9 `--paper-100` for analytical bands,
#FBF8F4 `--sand-050` for reflective ones, navy for emphasis. **Maximum two background colours per
artefact**, and never one cool plus one warm in the same component. No gradients as decoration —
the only gradients in the system are functional scrims over photography.

### Type
Two families, both from the source deck, both self-hosted.

**Cardo** (serif) is the display face: every heading, every hero money figure, the numerals on
slides, dialog titles. Tracking `-0.02em`, leading 1.02–1.2. It is what makes the system feel
considered rather than transactional, and it echoes the serif monogram.

**Inter** is the UI and body face, and **the default body weight is 300 (Light)** — a deliberate
inheritance from the deck's "BODY COPY: INTER LIGHT". 700 for emphasis, labels and figures in
tables. **Never 500 or 600**: the shipped files are 300/400/700 only, so those weights would be
browser-synthesised.

Scale: 1.25 ratio, whole pixels, 11 → 88. Body 16/1.65. Prose measure capped at 68ch.
Numbers are always tabular (`.xs-num`, or `fontVariantNumeric: 'tabular-nums'`).

### Spacing and layout
4px base. Component padding at 16/24/32; section rhythm at `--section-y` = `clamp(64px, 9vw, 160px)`.
Page gutter `--gutter` = `clamp(20px, 5vw, 80px)`.

**Layout is full-bleed.** This is the one explicit correction to the live site: sections span
`width:100%` with gutter padding, and there is **no max-width container**. Only the *text measure*
is capped, in ch, on the paragraph. Section headers sit in a sticky left column; content runs wide
beside them. In app surfaces the sidebar is a fixed 264px and the content column flexes.

### Corners, borders, shadows
Radii: 4 chips · 6 small controls · **10 buttons and fields** · **14 cards** · 20 modals · 28 large
panels · pill for tags, meters and marketing CTAs. Nothing is fully square except full-bleed bands
and slide fields.

Borders are **hairlines** — 1px `--ink-100` inside components, `--ink-200` where separation must
read. On navy, `rgba(255,255,255,.14)`. A 2px border appears only on the active tab rule.

Shadows are soft, wide, low-opacity and navy-tinted — never neutral black:
`--shadow-xs` on fields, `sm` on cards, `md` on hover, `lg` on popovers and toasts, `xl` on modals.
**Never stack two elevated surfaces.** Inner shadows appear in exactly one place: the switch track.

**A card** is white, 14px radius, 1px `--ink-100` border, `--shadow-sm`, 24px padding. That is the
whole recipe. Lists of rows live inside *one* card separated by hairlines — never one card per row.
There is no card with a coloured left border anywhere in this system.

### Transparency and blur
Blur is reserved for chrome that floats over scrolling content: the app `TopBar` and the site nav,
both `--blur-chrome` = `saturate(180%) blur(20px)` over `--glass-light`. Modals use a navy scrim
`rgba(16,28,37,.44)` with a 2px blur. Photography gets a **gradient scrim, not a flat overlay** —
left-weighted navy on the quote band, bottom-up on captioned images — so type stays legible without
flattening the image.

### Motion
Short and confident. 140ms for controls, 220ms for surfaces, 360ms for a meter filling, 640ms for a
scroll reveal. `--ease-out` `cubic-bezier(.16,1,.3,1)` is the default — an Apple-style deceleration.

`--ease-spring` `cubic-bezier(.34,1.42,.64,1)` is **the one playful curve** and it is allowed on
three things only: a button press, a switch knob, a radio dot. Nothing the user is *reading* ever
bounces. `prefers-reduced-motion` zeroes every duration.

### States
- **Hover:** primary buttons darken one ink step; ghost buttons take an `--ink-050` wash; cards lift
  2px and gain `--shadow-md`; fields move to `--ink-300` border. Never opacity fades.
- **Press:** `scale(0.972)` on buttons, `0.94` on icon buttons, plus the darkest ink step.
- **Focus:** `--ring-focus` = `0 0 0 3px rgba(102,196,208,.42)`. Always the teal ring. The browser
  outline is never left visible and never simply removed.
- **Selected:** navy fill (Tag, Checkbox) or teal fill (Switch, progress). **Active nav:** teal
  underline (Tabs), or a soft white wash plus a 3px teal tick (SidebarNav).
- **Disabled:** `--ink-100` fill, `--ink-400` text, no shadow, `not-allowed` cursor.

### Imagery
The moodboard settles this, and it is **warm, not cool** — golden-hour light is the single most
consistent quality across all 16 reference images. Four subjects recur:

1. **Nature at golden hour** — meadows, mountain ranges, a still lake, a butterfly on blossom. Low
   sun, long light, warm cast. This is *Calm*.
2. **Coffee, books, breakfast** — the small ritual, shot close, shallow depth of field. Also *Calm*,
   and the reason `--sand-050` exists.
3. **Quiet considered interiors** — library lounges, airport lounges, an attic studio, a planted
   open-plan office. Empty of people or nearly so. This is *Luxury*.
4. **The city and the harbour** — Sydney at dusk, planes through a lounge window. This is
   *Possibility*.

**Always:** natural light, warm cast, landscape crop, full-bleed. An image fills its column or band
edge to edge with `object-fit:cover` — never floated in a padded box.
**Never:** posed corporate stock, handshakes, cut-out people on white, flat studio lighting, duotone,
heavy grain, or illustration. No icon-in-a-circle hero art.

When type sits over a photo, use a **gradient scrim** (left-weighted or bottom-up) rather than a flat
overlay or a saturation filter — the warmth of the image is the point and should survive.

The five cool stock photographs in `assets/imagery/` are leftovers from the source deck and are
**placeholders only** — prefer `assets/moodboard/` for anything real, and replace them when Xander's
own photography arrives.

---

## ICONOGRAPHY

**The set.** 35 outline glyphs live in `assets/icons/` — extracted from the supplied deck, where
they were the "Design Elements" resource page. They are monochrome PNGs at ~2000px, roughly 2px
stroke weight, rounded joins, no fill: *pin, home, share, search, mail, comment, heart, bell, sun,
map, pencil, trophy, book, lightbulb, megaphone, document, clock, cloud, globe, flag, user,
thumbs-up, moon, gear, face-sad, face-happy, play, eye, star, rocket, phone, music, lock, gift,
pin-push.*

**How they are rendered.** Never as an `<img>`. The `Icon` component applies them as a CSS
`mask-image` over a `background-color`, so a single monochrome asset takes any token colour and
inherits `currentColor` by default. Sizes: 16 in dense UI, 18 in list rows, 20 default, 20–24 in
marketing. They scale down cleanly; **do not use them above 48px** (they are raster).

**Substitution, flagged.** This set is stock clipart from the deck template, not a bespoke brand
set, and 35 glyphs will not cover a real app. Where a glyph is missing, use **Lucide** from CDN at
`stroke-width: 1.75`, `stroke-linecap: round` — the nearest match in weight and finish to the PNGs:

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

Flag any Lucide glyph in a deliverable so it can be replaced when a real set exists.

**Not used as icons:** emoji (never), and unicode glyphs except three — ▲ ▼ for financial direction,
· as a metadata separator, and × as the dismiss affordance on Tag and Toast. The only hand-drawn
vector in the entire system is the 12×12 tick path inside `Checkbox`.

**Logo.** `assets/logo-dark.jpg` (teal on navy) and `assets/logo-light.jpg` (teal on white) — the
XSt serif monogram. Clear space equals the cap height of the X. Never recolour, outline, rotate or
set it on a busy photograph. Where the mark is impractical (sidebars, slide corners, footers), the
lockup is simply the letters **XSt** set in Cardo at `--teal-700` on light, `--teal-400` on navy.

---

## Using this system

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
<script>const { Button, Card, StatCard } = window.StegehuisDesignSystem_ba9b44;</script>
```

Author against the **semantic** tokens (`--text-body`, `--surface-card`, `--action-brand-bg`), not
the raw ramps. Add `class="xs-dark"` to any element to flip its whole subtree to the navy scheme.

---

## Caveats — please help fix these

1. **The logos are JPEGs, not vectors.** They carry a baked-in background, so they cannot sit on
   arbitrary colours or scale for print. **An SVG or the original vector file would fix this.**
2. **No photography of Xander or his work.** The moodboard in `assets/moodboard/` is reference,
   not shootable brand assets — it sets the temperature and subject matter, but the images are
   themselves stock. The site's own portraits could not be downloaded. **Real photography shot to
   these six principles would be the second biggest upgrade after the vector logo.**
3. **Fonts are the deck's embedded binaries.** Cardo and Inter TTFs were extracted from the PPTX,
   which means Inter ships at 300/400/700 only — no 500/600, and no variable axis. If you have
   the licensed families (or want the variable Inter), drop them in `assets/fonts/` and I will
   rewrite the `@font-face` block.
4. **The website recreation is structural, not pixel-exact.** The live site's CSS is a compiled
   Next.js bundle and was not readable, so spacing, exact type sizes and easing on
   xanderstegehuis.co are inferred from its rendered structure. A screenshot set, or the repo,
   would let me match it exactly.
5. **The icon set is stock clipart** from the deck template, and 35 glyphs is thin for an app.
6. **"Plan" is a placeholder product name.** No name was given for the productivity/finance tools.
