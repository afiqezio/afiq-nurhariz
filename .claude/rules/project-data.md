---
paths:
  - "src/data/**"
  - "src/pages/View.tsx"
  - "public/assets/projects/**"
  - "public/assets/videos/**"
---

# Project and case-study data

## Shape

- A project has two entries that share one `id`: its homepage card in `src/data/projectList.ts`, and its case study in `src/data/projects/`, registered in `src/data/projectData.ts`.
- Case studies are typed by `ProjectDetails` in `src/data/projectTypes.ts`. Change the type and every project file together.
- The card's `tech` is the short three-item list. The full stack goes in the case study's `tech`.

## Content

- Fields marked "rich" in `projectTypes.ts` may contain only `<em>`, `<strong>`, `<small>` and `<br/>`, and need `&amp;` for a literal ampersand. Every other field is plain text with no markup.
- Do not invent or alter facts. Metrics, dates, roles, durations, tech lists and results come from the owner. When a value is missing, ask instead of filling in a plausible one.

## Adding or reordering a project

1. Add the card to `projectList.ts` with the next `num`.
2. Create the case-study file in `src/data/projects/` and register it in `projectData.ts` under the same id.
3. Update `numLabel` (for example `"07 / 07"`) in every project file, because each one hardcodes the total.
4. Update the `next` chain so each project points to the following one and the last points back to the first.
5. Put gallery images in `public/assets/projects/<Name>/` and reference them root-absolute, the way existing entries do (`/assets/projects/<Name>/file.ext`). A relative path breaks under `/work/<id>/`.
6. Add the summary film as `public/assets/videos/NN.mp4`, where `NN` matches the project's `num`.
7. Add `https://harizafiq.com/work/<id>/` to `public/sitemap.xml`. Pre-rendering picks the new route up from `projectList.ts` automatically.
