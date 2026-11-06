# The contract

Two projects share this system: the doctoral portfolio and
Angela Tosi, ceramica creativa. They look nothing alike and they
run the same rules. What follows is the whole agreement.

## Two layers, and the split is the point

**BRAND** is six colours, one type stack and one scale. It is the
only block a new project rewrites.

**SEMANTICS** is everything else. No component ever names a
colour, a pixel size or a font. It reads the four names below and
stays out of the argument.

```
--ground       the surface this element sits on
--ink          the reading colour
--ink-strong   headings, wordmark, anything that must win
--mark         the accent, used for marks rather than for text
```

A section changes all four by setting one attribute:

```html
<section data-theme="deep"> … </section>
```

`<body>` carries the default theme, so an element outside every
section still has a ground. Forgetting this is the one mistake
that breaks the system silently: the colour resolves to
`canvastext` and you get white on white.

## The brand blocks, side by side

```
                     portfolio            ceramica
--brand-page         #ffffff              #714c35
--brand-ink          #5c666e              #b18e79
--brand-accent       #7de894              #9ceedf
--brand-deep         #454e55              #5a3c2a
--brand-black        #0a0b0c              #2e1f16
--brand-reverse      #e8ebec              #d4c9c2
--font               system grotesque     Times New Roman
```

Note that `--brand-page` is dark in one project and white in the
other. The name says where it sits, not how bright it is, which
is why the same themes work in both.

## Rules the components keep

**Type is a rem clamp, never a pixel.** A reader who enlarged
their browser text gets a bigger site. Pixel type ignores them.
Both projects use four steps and nothing between.

**The dot is drawn, never typed.** A bullet glyph changes size,
weight and baseline with whatever font resolves. A `::before`
with a border-radius does not. It marks every section label in
both projects.

**Selection flips.** The accent is the highlight everywhere it
can be read. Where the text or the ground is already the accent,
it flips to the reverse colour so the words survive.

**Hairlines follow the ink.** `color-mix(in srgb, var(--ink) 50%,
transparent)` tracks a theme change. A hardcoded `rgba()` does
not.

**Motion is opt-out.** Every transition sits above a
`prefers-reduced-motion` block that turns it off.

**Focus is visible.** Always, in the accent, with an offset.

## Porting to a third project

1. Copy the token block. Replace the six brand colours and the
   font stack. Touch nothing below it.
2. Set the four type steps so they land on the sizes the project
   already uses at a default root, then let the clamp scale them.
3. Put the default theme on `<body>`.
4. Check the accent against both the lightest and the darkest
   ground. If it fails on one, that ground needs its own theme
   entry rather than a patched component.
5. Read the page with the browser text size at 24px. If nothing
   moves, the type is still in pixels somewhere.

---

# Across four media

The same system now has to survive Word, PowerPoint and Figma,
where there are no custom properties, no clamps and no cascade.
What carries is the list below. `tokens.json` holds the values.

## What travels

**The six colours, unchanged.** Hex is hex everywhere. Word and
PowerPoint get them as theme colours so a later edit stays on
system; Figma gets them as variables.

**One neo-grotesque, two names.** The site runs on whatever the
reader's system provides. A document cannot negotiate, so Word
and PowerPoint name **Arial**: always installed, same skeleton.
Figma does not ship Arial at all, so the Figma file uses
**Inter**, which is the skeleton the web stack was chosen for in
the first place. Both are correct; neither is a compromise. Do
not add a third.

**Four type steps, never more.** Hierarchy comes from weight and
colour, not from size. The table below is the whole scale.

| step | web | CV | slide |
|---|---|---|---|
| display | 40–104px | 28pt | 54pt |
| lead | 22–34px | 13pt | 28pt |
| base | 16–19px | 10.5pt | 18pt |
| small | 14–16px | 8.5pt | 13pt |

**The accent dot before every section label.** Drawn, never
typed. In Word it is a 5pt table cell or a shape, not a bullet
character: a typed bullet changes size and baseline with the
font and breaks the alignment the moment the reader edits.

**The meta column.** Dates and labels left in a narrow column,
content right. One grid, used by the publication rows on the
site, the entries in the CV and the body of a slide.

**The spine.** A hairline down the left with a marker per step,
and only the current step filled with the accent. The career
timeline on the site, the experience section of the CV, the
roadmap slide.

**One loud colour, spent once per view.** The accent marks the
live item and nothing else. A page with three accents has none.

**An inverted plate among light ones.** The near-black section
is the system's punctuation. One per document, at the turn.

## What does not travel, and what replaces it

| on the site | in a document |
|---|---|
| fluid clamps | fixed pt, set for the page size |
| scroll-driven animation | position on the page, the reverse of it |
| hover fill on tags | the filled state, printed |
| sticky headings | a repeated header row |
| `color-mix` hairlines | a flat 40% tint of the ink |

## Rebuilding any of the three

1. Load the six colours as theme colours or variables. Never
   pick a colour outside them.
2. Set the four type steps as named styles. Never type a size.
3. Build the section label as one object: dot, gap, label. Reuse
   it; do not redraw it.
4. Set dates and figures in tabular numerals so columns line up.
5. Check it in greyscale. If the hierarchy survives without the
   accent, the accent is doing its job rather than the work.

