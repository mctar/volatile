# Volatile

A research-informed flavour pairing workbench for chefs. Built with React, TypeScript and Vinext, with accessible Shadcn primitives and a responsive interactive pairing map.

## Run locally

```sh
npm ci
npm run dev
```

The default local URL is http://localhost:5173. To use port 3000, run `npm run dev -- --port 3000`.

```sh
npx tsc --noEmit
npm run check:catalog
npm run build:pages
```

## GitHub Pages

`npm run build:pages` exports the app into `dist/client`, including `CNAME` for `volatile.btrbot.com` and `.nojekyll`. Publish that directory as the root of the `gh-pages` branch in `mctar/volatile`, then configure Pages to deploy from that branch. The domain CNAME points to `mctar.github.io`. The build needs no server, API keys or login.

The source stays on the repository’s `main` branch. The original Sites remote and ordinary development build remain available.

## What works

- Search and select any of 57 ingredient profiles.
- Explore 243 authored two-ingredient combinations through map and list views.
- Rank by familiar, unexpected or exploratory culinary character.
- Filter for aroma bridges, sensory contrasts and plant ingredients.
- Open a pairing for its rationale and an actionable dish idea.
- Save pairings and tasting notes in a device-local notebook; export as plain text.
- Browse ingredients by category and aroma notes.
- Read the methodology and linked research.

The notebook uses browser localStorage. It is private to that browser and origin, is not account-synced, and can be lost if browser data is cleared. Export is provided to keep a copy. The GitHub Pages edition is public at https://volatile.btrbot.com. Notes from the original demo do not automatically transfer because the browser origins differ.

## Data and scientific limits

`lib/pairings.ts` contains the manually authored demonstration dataset. Shared-compound equality determines the displayed bridge label; all other pairs are described as contrasts. Novelty is an editorial rating, and ranking sorts by distance from the selected rating. It is not a trained model, measured compatibility, recipe-corpus novelty or an odour-activity calculation. A qualitative pairing idea is not a guarantee of taste compatibility.

Ingredient profiles are illustrative selections, not exhaustive or batch-specific chemical analyses. No FlavorDB, FooDB, Pyrfume, RecipeNLG or other restricted dataset has been imported. Licensing permissions must be resolved before production datasets are added. A production system should track source and licence per observation, normalize ingredient identities, combine concentrations with matrix-specific odour thresholds, evaluate perceptual mixtures, and validate predictions through chef tasting. The supplied research informed this architecture; production data integrations remain future work.

The plant-ingredient filter excludes dairy, meat, seafood and honey from the two featured ingredients, not every possible animal product in the authored preparation ideas. The UI explicitly explains this distinction.

## Validation

- TypeScript check passed.
- Data invariants checked: 57 profiles, 243 distinct pairs, at least four partners for every ingredient, type filters, plant exclusion and novelty ordering.
- Browser checks: ingredient selection, map/list switching, combined filters, keyboard novelty control, detail panels, save/update notes, persistence after reload, removal, library empty state and clear filters.
- Desktop (1440 px) and mobile (390 px) layouts inspected; no horizontal overflow at 390 px. Mobile navigation checked.
- No browser console warnings or errors during the checked flows.

## Image assets

The expanded edition adds three unedited 1254 × 1254 sprites, with sixteen cells each: `public/images/ingredients-fruit.png`, `ingredients-garden.png` and `ingredients-pantry.png`. See [the generation prompts](docs/ingredient-imagery.md).

### Original sprite

`public/images/ingredients.png` is the final 1254 × 1254 ingredient sprite, generated once using the built-in image generation tool. CSS positions its nine 418 × 418 cells; the delivered bitmap is unedited. The app identifies the photography as AI-generated.

Generation prompt:

> Use case: product-mockup. Asset type: single square ingredient-photography sprite texture for a molecular food pairing chef web app named Volatile. Create one final square image, approximately 1536 by 1536 pixels. Exact 3 by 3 grid of nine equal square cells sharing a seamless pure white background; the grid is invisible. Row 1, left to right: ripe red strawberry with green calyx, one whole plus one half; fresh basil sprig; small ripe red tomatoes, one whole plus one cut. Row 2: scattered mound of black peppercorns without a bowl; two broken dark chocolate chunks; tiny clear round glass dish of golden olive oil. Row 3: raw shiitake mushrooms, whole and half; yellow lemon, whole and half; wedge of hard Parmesan. Isolated editorial studio food photography, photorealistic macro texture, natural colours, consistent camera and scale. Centre each group at x and y coordinates 1/6, 1/2 or 5/6. Keep every subject and shadow inside the inner 70 percent of its cell with white clearance. Gentle elevated three-quarter camera angles, soft natural studio lighting, small contact shadows. Exactly nine groups. No text, labels, letters, logos, watermark, grid lines, seams, dividers, panels, coloured backgrounds, plates, bowls, props or utensils. The olive oil dish is the only allowed container. Pure white edge to edge.

## Research links

- [Ahn et al., Flavor network and the principles of food pairing (2011)](https://www.nature.com/articles/srep00196)
- [Schwieterman et al., Strawberry Flavor (2014)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3921181/)
- [Barbey et al., Genetic Analysis of Strawberry Flavor Compounds (2021)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8170412/)
