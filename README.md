# Portfolio

Static portfolio, hand-built with **HTML, CSS and vanilla JavaScript** (no frameworks). It has an "engineering console" design: a dark-first theme with a light mode, Geist / Geist Mono / Instrument Serif type, a hero code window that types itself, a git-log career timeline and a ⌘K / Ctrl+K command palette.

## Edit your content
Edit only **`assets/js/data.js`**. Every section is rendered from that file.

- Empty string `""` hides a field. An empty array `[]` hides a whole section (e.g. `testimonials: []`).
- Projects: `links.live` adds a Live Demo button, `links.details` adds a Case Study button, `links.source` adds a Source button.
- Project steps (`steps: [{ title, image, description }]`) appear in the details modal as an image slider with a numbered stepper.
- Each project has a deep link: `index.html#project=<id>`.
- `profile.stack` sets the list shown in the hero code window, and `profile.timezone` (e.g. `Asia/Dhaka`) shows your local time.
- Press `Ctrl+K` / `⌘K` (or `/`) to open the command palette, which lists sections, projects and actions.
- Contact form: set `contact.formEndpoint` (e.g. Formspree) to send messages. If it's empty, the form opens the visitor's email client.

## Structure
```
index.html              page skeleton
assets/js/data.js       ← all your content
assets/js/main.js       renderer (no need to edit)
assets/css/style.css    theme (change the accent colour in :root)
assets/images/          profile.svg, favicon.svg, projects/project-N/{cover,step-N}
```

## Run
Open `index.html` directly in a browser, or serve the folder:
`python3 -m http.server 8000`. Works on any static host (GitHub Pages, Netlify, Vercel).
