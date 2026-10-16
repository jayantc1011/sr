# LMS Based Sitewide Visual System

## Goal

Make the LMS page the visual source of truth for typography and shared interface styling across the website, so Home, About, Services, Contact, course pages, and the student learning experience feel like one site.

## User intent and constraints

- Use the existing LMS page styling as the source for font family, typography, colors, buttons, cards, and other shared UI elements.
- Apply that visual system across every page and section, including the student LMS.
- Keep the implementation local for the user to review; do not push changes to GitHub.
- Preserve page content, images, links, page-specific structure, responsive behavior, and interactive behavior.

## Current state

- The LMS catalog and related pages use Bricolage Grotesque, a forest-green palette, and shared LMS button and card treatments scoped under `.lms-shell` in `style.css`.
- The home page has older global typography and a local card override. About and Services have independent stylesheets, and the learning player imports `academy-learn.css` and `academy-workspace.css`; the player currently sets DM Sans.
- As a result, pages can use different heading families, accent colors, weights, and button treatments even though they share navigation and footer markup.

## Design

### Shared foundation

Promote the LMS design values into reusable academy-level tokens while preserving the LMS page's current rendered appearance. The shared foundation covers:

- Bricolage Grotesque as the site font family for headings, body text, buttons, labels, and navigation.
- LMS heading weight, line height, letter spacing, and responsive type sizes, applied consistently by role (page title, section title, card title, body, supporting text, and eyebrow).
- The existing LMS forest/leaf green palette, paper surfaces, borders, and shadows.
- The LMS button, card, panel, badge, form-control, navigation, and footer treatments.

Equivalent text roles will share type styles; responsive sizes may still scale with viewport and page hierarchy. Deliberate serif and coral/gold treatments on other pages will be aligned to the LMS system so they do not introduce a competing visual language.

### Page application

- Home: replace legacy typography and service-card overrides with the shared foundation.
- About and Services: adapt their page-specific styles to use the shared typography and components while preserving their layouts and content.
- Contact: align its heading, body, form, buttons, and panels to the LMS system.
- LMS catalog, course detail, and authentication: retain the current LMS appearance as the baseline and use the shared tokens where useful without changing content or behavior.
- Student learning/player page: replace the separate DM Sans typography and align shared controls and panels while retaining the lesson player's layout and function.
- Shared site header and footer: keep their existing structure and make their typography, colors, and controls consistent with the LMS system.

### Compatibility and limits

- Keep page-specific layout rules and components where they serve a distinct function; shared styling should not force every section into the same geometry.
- Do not change copy, pricing, destinations, video/PDF behavior, course data, or JavaScript behavior.
- Do not add dependencies or modify third-party assets.
- Keep page selectors scoped to avoid changing LMS rendering while adapting the other page styles.

## Acceptance criteria

1. Every listed page uses Bricolage Grotesque for visible text and the LMS typography hierarchy for equivalent roles.
2. Colors, buttons, cards, forms, borders, and surfaces across the non-LMS pages use the LMS visual system; no competing legacy serif or coral/gold treatment remains.
3. The LMS pages retain their current layout and content while continuing to serve as the reference appearance.
4. Responsive layouts, links, forms, menus, and lesson-player interactions remain intact.
5. All changes remain local and unpushed for user review.

## Files in scope

- `style.css`
- `about.css`
- `academy-learn.css`
- `academy-workspace.css`
- `index.html`, `about.html`, `services.html`, `contact.html`
- `lms.html`, `lms-course.html`, `lms-auth.html`, `lms-learn.html` (only if font imports or body-level foundation need alignment)

