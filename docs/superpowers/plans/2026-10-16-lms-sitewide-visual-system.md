# LMS Based Sitewide Visual System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align every non-LMS page and the student lesson player to the LMS page's shared visual system while preserving page content and functionality.

**Architecture:** Promote the LMS typography and visual values into shared academy tokens in `style.css`, then adapt the existing page-scoped styles to consume those tokens. Keep the LMS page as the reference and preserve each page's layout and unique components.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Google Fonts.

**Spec:** `docs/superpowers/specs/2026-10-16-lms-sitewide-visual-system-design.md`

## Global Constraints

- Use the LMS page's Bricolage Grotesque font family, responsive role-based type scale, green palette, surfaces, borders, and control styling.
- Preserve page copy, pricing, assets, URLs, JavaScript, and responsive layout behavior.
- Keep layouts and distinct page components intact; align shared visual language rather than copying LMS geometry onto every page.
- Do not add dependencies or modify third-party assets.
- Keep all work local; do not push to GitHub.
- Do not add or run automated tests; the user will review the local site.

## Review Focus

- Font loading: pages without a Bricolage stylesheet link still need to load the same font, with existing system fallbacks when Google Fonts is unavailable.
- CSS cascade: academy base rules must not change the reference appearance of `.lms-shell` pages.
- Legacy declarations: page-specific serif, DM Sans, coral, gold, and brown rules must not override the shared system.
- Responsive styles: mobile and tablet font sizes must retain readable wrapping and avoid overflow.
- Student player: typography and shared controls must align without affecting video, worksheet, navigation, or progress behavior.

---

### Task 1: Establish shared LMS based academy tokens

**Files:**
- Modify: `style.css`

**Interfaces:**
- Produces: shared `--academy-*` tokens for font family, typography roles, colors, borders, surfaces, shadows, and controls.
- Consumes: current LMS values from the `.lms-shell` base and its shared headings and buttons.

- [ ] **Step 1: Extract stable visual values from the LMS base rules**

Record the existing Bricolage Grotesque stack, `15px` body size, `1.55` body line-height, heading weight/letter spacing/line-height, and LMS forest, deep green, leaf, paper, muted, border, and shadow values.

- [ ] **Step 2: Define shared academy tokens and base typography in `style.css`**

Promote those values to reusable academy-level custom properties and apply Bricolage Grotesque to academy body text, headings, navigation, and form controls. Preserve role-based responsive heading sizes and the LMS page's current appearance.

- [ ] **Step 3: Retarget shared header, footer, button, and form styles to the LMS tokens**

Use the LMS green treatments and typography for the existing shared site header/footer, buttons, form controls, surfaces, and borders without changing their DOM structure or dimensions unnecessarily.

- [ ] **Step 4: Inspect the CSS diff for accidental LMS reference changes**

Confirm `.lms-shell` rules continue to resolve to the same LMS values and no page layout selectors were broadened unintentionally.

### Task 2: Align the home page to the shared visual system

**Files:**
- Modify: `index.html`
- Modify: `style.css`

**Interfaces:**
- Consumes: shared academy tokens from Task 1.
- Produces: home page typography and shared components styled with the LMS font, hierarchy, and palette.

- [ ] **Step 1: Load Bricolage Grotesque on the home page**

Use the same Google Fonts weights already loaded by `lms.html`.

- [ ] **Step 2: Replace legacy home typography and accent rules**

Update hero, section, card, statistic, services, inquiry form, and footer typography/colors to use the academy tokens. Remove one-off legacy serif and brown/gold declarations where they conflict with the LMS design system.

- [ ] **Step 3: Keep the current home layout and recent Speakathon card sizing**

Preserve the existing section layouts, service card grid, responsive breakpoints, and three-column desktop width for the Speakathon card grid.

### Task 3: Align About, Services, and Contact pages

**Files:**
- Modify: `about.html`
- Modify: `about.css`
- Modify: `services.html`
- Modify: `contact.html`
- Modify: `style.css`

**Interfaces:**
- Consumes: shared academy tokens and controls from Task 1.
- Produces: consistent typography, palette, buttons, cards, panels, and forms across static pages.

- [ ] **Step 1: Load Bricolage Grotesque on About, Services, and Contact**

Add the same Google Fonts connection and family link used by the LMS pages where not already present.

- [ ] **Step 2: Adapt About page styles in `about.css`**

Replace bespoke typography and coral accents with shared font roles, green colors, and LMS button/panel treatments while preserving About page structure and imagery.

- [ ] **Step 3: Adapt Services and Contact page rules in `style.css`**

Update their page-scoped hero headings, descriptions, service cards, labels, forms, buttons, and supporting text to use shared academy tokens. Keep their existing grid and form behavior.

- [ ] **Step 4: Inspect page-scoped selectors**

Confirm changes target About, Services, and Contact only and do not alter the LMS layout.

### Task 4: Align course utilities and the student lesson player

**Files:**
- Modify: `lms-learn.html`
- Modify: `academy-learn.css`
- Modify: `academy-workspace.css`
- Modify: `style.css`
- Modify only as needed: `lms-course.html`, `lms-auth.html`

**Interfaces:**
- Consumes: shared academy tokens and controls from Task 1.
- Produces: consistent font and common controls for course utility pages and the student lesson player.

- [ ] **Step 1: Replace the lesson player's separate DM Sans font**

Load Bricolage Grotesque and have `.fresh-learn` inherit the shared academy font and typography tokens.

- [ ] **Step 2: Align shared lesson-player controls and panels**

Use LMS colors, buttons, borders, and text roles for headers, navigation, worksheet links, progress labels, and panels while retaining the player layout and interactive states.

- [ ] **Step 3: Remove conflicting utility-page typography overrides**

Update only legacy font and accent declarations that conflict with the shared system; retain page-specific sizing needed for the lesson-player hierarchy and mobile fit.

- [ ] **Step 4: Keep the user-facing review local**

Package the updated site source as a ZIP for local review. Do not push or deploy.

