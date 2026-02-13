# Portfolio Update - JSON-Driven System

## What Changed

Your portfolio is now powered by JSON files! This means you can update your publications and projects by simply editing JSON files instead of HTML.

## Files Created

### 1. `data/publications.json`
- Contains all 10 publications
- **NEW:** "Sopravvivere alla transizione digitale" (2025)
- **NEW:** "E[arth]rosion" with ResearchGate link (2024)
- Easy to add new publications - just copy-paste a block

### 2. `data/projects.json`
- Contains all 32 projects
- **NEW:** "3km Deep - Aerial footage" (2025) - Design Academy Eindhoven project with Emma Zerial
- **NEW:** "Unaforesta" (2025) - Leonardo Plebani collaboration
- Filter tags automatically work with the `categories` array

### 3. `js/render-data.js`
- Automatically loads and renders both JSON files
- Maintains all your styling and hover effects
- Preserves the filter functionality

### 4. `style.css` (Updated)
- Fixed horizontal overflow on images
- Fixed table overflow on mobile
- Added responsive image grid

## How to Update Your Portfolio

### Adding a New Publication

1. Open `data/publications.json` on GitHub
2. Add a new entry at the top (after the `[`):

```json
{
  "year": 2026,
  "authors": "Your Name, Co-author Name",
  "title": "Your Publication Title",
  "venue": "Conference or Journal Name",
  "url": "https://link-to-paper.com",
  "status": "published"
},
```

3. Commit the file
4. Done! Your site updates automatically

### Adding a New Project

1. Open `data/projects.json` on GitHub
2. Add a new entry at the top:

```json
{
  "year": 2026,
  "title": "Project Name",
  "url": "https://project-link.com",
  "discipline": "Type of work",
  "collaboration": "Who you worked with",
  "categories": ["Digital", "Photography"]
},
```

3. Commit the file
4. Done!

### Available Categories for Filtering

- `"Digital"`
- `"Editorial"`
- `"Photography"`
- `"Outdoor"`
- `"Workshop"`
- `"Service"`

You can combine multiple categories: `"categories": ["Digital", "Photography"]`

## Alternative: Paste to Me, I'll Upload

If you prefer, you can simply paste new entries to me in chat and I'll:
1. Format them correctly
2. Update the JSON files
3. Push to your GitHub

Just send me the details and say "add this to my portfolio"!

## What's Next

The updated `index.html` will be deployed shortly. Your portfolio structure remains exactly the same - it just loads content from JSON now.

---

**Last Updated:** February 13, 2026
**System Version:** JSON-driven v1.0