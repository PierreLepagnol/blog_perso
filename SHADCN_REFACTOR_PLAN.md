# shadcn/ui Refactor Plan

## Goal

Refactor the blog UI to use shadcn/ui source components as the default building blocks while preserving the current editorial identity: newsprint background, serif article typography, restrained borders, red accent, and compact personal-site layout.

The refactor should avoid a visual rewrite for its own sake. The main outcome is a smaller set of reusable UI primitives, fewer one-off Tailwind patterns, better accessibility defaults, and easier future changes.

## Current State

- Framework: Next.js App Router with React 19.
- Styling: Tailwind CSS v4 in `app/globals.css`.
- Imports: `@/*` path alias is already configured.
- Existing utility: `lib/utils.ts` already exposes `cn()` with `clsx` and `tailwind-merge`.
- shadcn status: no `components.json` or `components/ui` directory is present yet.
- UI is mostly custom markup and Tailwind classes in:
  - `app/page.tsx`
  - `app/posts/page.tsx`
  - `app/posts/[slug]/page.tsx`
  - `components/Header.tsx`
  - `components/Footer.tsx`
  - `components/Navbar.tsx`
  - `components/mdx_components.tsx`
  - `components/callout.tsx`
  - `components/mdx-card.tsx`
  - `components/code-head.tsx`

## shadcn Setup

1. Initialize shadcn/ui for the existing Next project.
   - Use the project runner. This repo has `bun.lock`, so prefer `bunx --bun shadcn@latest init`.
   - Configure aliases to match the repo:
     - components: `@/components`
     - utils: `@/lib/utils`
     - ui: `@/components/ui`
   - Keep Tailwind v4 integration in `app/globals.css`.

2. Add only the components needed for the first migration pass.
   - Required immediately:
     - `button`
     - `card`
     - `badge`
     - `separator`
     - `alert`
     - `table`
     - `avatar`
     - `tooltip`
     - `navigation-menu` or `menubar`
   - Likely useful:
     - `scroll-area`
     - `skeleton`
     - `breadcrumb`

3. Decide icon strategy before implementation.
   - shadcn commonly uses `lucide-react`.
   - The current repo uses `react-icons` and has unused Font Awesome packages.
   - Preferred migration: use `lucide-react` for interface icons and keep brand icons only where needed, or replace brand icons with text links if the design remains minimal.

## Design Token Migration

Map the existing editorial colors to shadcn semantic tokens instead of continuing to style each component with raw neutral classes.

- `--background`: current `--color-newsprint`
- `--foreground`: current `--color-ink`
- `--primary`: current `--color-ink`
- `--primary-foreground`: current `--color-newsprint`
- `--accent`: a subtle neutral surface
- `--destructive`: current `--color-editorial-red`
- `--border`: current `--color-neutral-200`
- `--muted`: current neutral surface
- `--muted-foreground`: current `--color-neutral-500`
- Keep custom editorial tokens for article-only details:
  - `--color-editorial-red`
  - `--color-editor-bg`
  - code window dots
  - serif/body/font tokens

Rules for the implementation phase:

- Prefer shadcn variants over custom border/color classes.
- Use semantic classes like `bg-background`, `text-muted-foreground`, `border-border`, and `text-destructive`.
- Replace `space-y-*` with `flex flex-col gap-*`.
- Use `Separator` instead of border-only dividers where it represents a divider.
- Use `Badge` instead of custom tag spans.
- Use `Button` for CV download, social icon actions, and article navigation actions.

## Component Refactor Map

### `app/page.tsx`

Current local primitives:

- Local `Card`
- Local `Eyebrow`
- `ProfileLink`
- Custom links styled as buttons
- Manual divided lists for projects and posts

Refactor target:

- Replace local `Card` with shadcn `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`.
- Replace action-like anchors with `Button` using `asChild`.
- Replace profile icon links with `Button variant="outline" size="icon"` and `Tooltip`.
- Replace metadata and small labels with a local `Eyebrow` component only if it carries editorial typography; otherwise use `CardDescription` or `Badge`.
- Replace project and article separators with `Separator`.
- Use `Badge variant="secondary"` for tags when tags are shown.
- Extract reusable `ArticleListItem` and `ProjectListItem` components after the first pass if duplication remains.

### `app/posts/page.tsx`

Current patterns:

- Custom empty state paragraph.
- Custom tag spans.
- Divided article list.

Refactor target:

- Use shadcn `Card` only if each article needs a framed repeated item; otherwise keep an unframed list with `Separator`.
- Use `Badge` for post tags.
- Use `Button asChild variant="link"` or a clean shadcn-compatible link style for article titles.
- Use shadcn `Empty` if added, or create a small local empty state built from shadcn `Card`/`CardContent`.

### `app/posts/[slug]/page.tsx`

Current patterns:

- Back links styled manually.
- Header separator via border classes.
- Footer separator via border classes.

Refactor target:

- Use `Button asChild variant="ghost"` or `variant="link"` for back/read-more links.
- Use `Separator` below the article header and above article footer.
- Keep article layout and prose typography custom; shadcn does not replace article typography.
- Consider `Breadcrumb` if post navigation grows beyond a single back link.

### `components/Header.tsx`

Current patterns:

- Custom header link and tagline.

Refactor target:

- Keep the header layout custom because it is brand/editorial chrome.
- Use semantic tokens for border and muted text.
- If navigation is reintroduced here, use `NavigationMenu`.
- Do not wrap the whole header in a `Card`.

### `components/Navbar.tsx`

Current patterns:

- Custom nav links with manual uppercase styling.
- Component is currently not used by `app/layout.tsx`.

Refactor target:

- Decide whether to remove it or mount it intentionally.
- If used, replace with `NavigationMenu` for desktop.
- For mobile, use compact horizontal scroll or a future `Sheet` only if navigation grows.
- Keep section anchors accessible and avoid hidden navigation labels.

### `components/Footer.tsx`

Current patterns:

- Plain social text links.

Refactor target:

- Use semantic token classes.
- Use `Button asChild variant="link"` for footer links only if the resulting spacing remains compact.
- Keep footer unframed.

### `components/callout.tsx`

Current patterns:

- Custom callout div with variants.

Refactor target:

- Replace with shadcn `Alert`, `AlertTitle` if a title is added, and `AlertDescription`.
- Map `type="default"` to default alert styling.
- Map `type="warning"` to a neutral or accent alert style.
- Map `type="danger"` to `variant="destructive"` or a local `data-type` variant if destructive is too strong.
- Replace string emoji icons with a typed icon slot where possible.

### `components/mdx-card.tsx`

Current patterns:

- Custom clickable card.

Refactor target:

- Use shadcn `Card`, `CardContent`, and optionally `CardHeader`.
- For clickable cards, use a normal `Link` inside the card unless the full-card overlay is required.
- If full-card overlay remains, ensure keyboard focus and disabled behavior are correct.
- Replace internal `space-y-2` with `flex flex-col gap-2`.

### `components/mdx_components.tsx`

Current patterns:

- Custom MDX rendering for headings, paragraphs, lists, blockquotes, image figures, tables, code, and inline code.

Refactor target:

- Keep typography mappings custom because MDX prose is content-specific.
- Replace `table` wrappers with shadcn `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell` if MDX table structure can be mapped cleanly.
- Replace `hr` with `Separator` if the decorative `mdx-hr` style is no longer required. If the ornamental separator is part of the editorial design, keep it custom.
- Replace inline custom callouts/cards with the refactored shadcn-backed `Callout` and `MdxCard`.
- Replace `space-y-*` list spacing with gap-based wrappers only where valid for list semantics.

### `components/code-head.tsx`

Current patterns:

- Custom terminal/code header.
- Uses `react-icons`.
- Uses manual status dots.

Refactor target:

- Keep as a custom component because shadcn has no direct code-window header primitive.
- Switch icon imports to the chosen icon system if possible.
- Use semantic tokens where applicable, while preserving the dark code header.
- Replace `h-* w-*` dot sizing with `size-*`.

## Recommended Implementation Phases

### Phase 1: Initialize and Tokenize

- Initialize shadcn/ui.
- Add the initial component set.
- Update `app/globals.css` with shadcn CSS variables while preserving editorial custom tokens.
- Verify `cn()` remains compatible and avoid duplicate utils.
- Run build after setup.

### Phase 2: Shared Layout and Actions

- Refactor `Header`, `Footer`, and optional `Navbar`.
- Convert action anchors to shadcn `Button asChild`.
- Introduce tooltips for icon-only profile links.
- Replace repeated border dividers with `Separator`.

### Phase 3: Homepage Composition

- Replace local homepage `Card` with shadcn `Card` composition.
- Convert projects and article previews to reusable list items.
- Use `Badge` for metadata where appropriate.
- Keep the profile image as an image surface, not a card-within-card.

### Phase 4: Posts and Article Pages

- Refactor `/posts` list with `Badge`, `Separator`, and possibly `Card`.
- Refactor post detail navigation and separators.
- Keep MDX typography custom and isolated.

### Phase 5: MDX Components

- Refactor `Callout` to shadcn `Alert`.
- Refactor `MdxCard` to shadcn `Card`.
- Evaluate MDX table mapping to shadcn `Table`.
- Keep `CodeHead` custom, but align icons and token usage.

### Phase 6: Cleanup

- Remove unused local primitives.
- Remove unused packages if replacement is complete:
  - `@fortawesome/fontawesome-svg-core`
  - `@fortawesome/free-brands-svg-icons`
  - `@fortawesome/free-solid-svg-icons`
  - `@fortawesome/react-fontawesome`
  - possibly `react-icons`, if no longer used
- Run lint and build.
- Review generated shadcn files for import paths and Tailwind v4 compatibility.

## Validation Checklist

- `bun run lint`
- `bun run build`
- Homepage visual review at mobile and desktop widths.
- `/posts` visual review at mobile and desktop widths.
- At least one post detail page visual review.
- MDX content review for:
  - headings
  - links
  - lists
  - blockquotes
  - images with captions
  - tables
  - inline code
  - code blocks with `CodeHead`
  - callouts
  - MDX cards

## Risks and Decisions Needed

- shadcn initialization may modify `app/globals.css`; preserve existing editorial fonts and custom article styles.
- shadcn component defaults may introduce rounded corners or spacing that feels less editorial. Prefer light customization through semantic tokens and component variants, not one-off class overrides.
- Full-card clickable overlays in MDX cards need careful accessibility handling.
- The current `Navbar` is unused. Decide whether to remove it or wire it into the layout before refactoring it.
- Decide whether the project should standardize on `lucide-react` for UI icons and keep brand icons separately.

## Proposed First Implementation Batch

If approved, start with a narrow first batch:

1. Initialize shadcn/ui and add `button`, `card`, `badge`, `separator`, `alert`, `table`, and `tooltip`.
2. Update tokens in `app/globals.css`.
3. Refactor `components/callout.tsx`, `components/mdx-card.tsx`, and homepage action buttons.
4. Run lint/build and review the diff before continuing to MDX tables and page-level layout.

This keeps the first change useful but reviewable before the whole site is migrated.
