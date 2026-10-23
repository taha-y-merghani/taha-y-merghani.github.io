# Job-search portfolio revamp

Prepared October 23, 2026 for taha-y-merghani.github.io.

## Changes
- New responsive homepage focused on applied AI / NLP engineering and NYC / remote opportunities.
- Rebuilt Work, Experience, About, and Contact pages with direct résumé and contact links.
- Project detail sections distinguish employer contributions, published research, and independent prototypes.
- Original homepage preserved at /archive/; writing URLs and articles preserved.
- Mobile writing navigation and no-JavaScript content visibility improved in generated pages and build templates.
- Apple internship date, Decooda dates, and publication workshop name corrected.

## Preview
Run `python3 -m http.server 8000` from this directory, then open http://localhost:8000/. Serve from the site root; opening index.html directly will not resolve root-relative links.

## Publish
Merge these changes into the repository branch used by the existing GitHub Pages deployment. No domain change or new hosting service is required. The site has not yet been published by this task.

## Validation
- Desktop homepage and 390px mobile homepage / project layouts visually reviewed.
- All local href/src targets checked: no missing files.
- One h1 per rebuilt page; all images have alternative text.
- git diff --check passed.

The existing résumé PDF is preserved unchanged. Google Fonts and the existing Google Analytics tag remain in use.
