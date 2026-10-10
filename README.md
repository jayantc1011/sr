# Shalini Rathod | Introvert to Influencer Academy

## FRONTEND ONLY — No backend or real user accounts

The project includes the existing Shalini homepage/Services website and a new, consistent, responsive LMS frontend. The academy catalog, course detail, login/signup interface, and portrait-lesson UI work directly from extracted HTML files in Chrome, Edge or Safari. No server, Node.js, database, payment processor, account creation, or external course API is needed.

### Open and follow the journey

1. Unzip the full archive and double-click **index.html**.
2. Choose **LMS Courses** in the top navbar to open `lms.html`.
3. Browse, filter, or search courses. Each card opens **its own** `lms-course.html?course=…`.
4. See the offer, two demo video previews (9:16), resources, curriculum and bonuses. Choose **Explore enrollment** to open `lms-auth.html?course=…`.
5. Switch between **Login** and **Sign Up** for a frontend-only preview. Any locally valid form example opens the sample player. This is NOT real authentication and no credentials are stored or submitted. Do not enter real passwords.
6. Explore `lms-learn.html?course=…`: play/pause/seek the sample 9:16 video, navigate lessons, mark them Done/Now/Next and see the percentage update. Lesson states live only in page memory and reset after refresh.

### New LMS pages

- `lms.html`: Academy intro, photo, categories, real client-side filtering and search, unique course cards, featured course and classroom teaser.
- `lms-auth.html`: accessible keyboard-friendly Login/Register tabs with form validation, password show/hide, remember-me checkbox, primary goal dropdown, and explicit demo-mode labels.
- `lms-course.html`: dynamic course-specific public detail page (speakathon, power-dressing or power-bundle); price labels are marked sample and outcomes/bonuses are contextual. Expandable syllabus with Expand All/Collapse All.
- `lms-learn.html`: interactive student learning dashboard (sample video player, current lesson, focus prompts, module sidebar, status labels, temporary completion states).
- `lms.js`: all new frontend functionality, no backend calls; `courses-data.js` contains the local example course outlines.
- `style.css`: one shared stylesheet with scoped `.lms-shell` rules. Original `script.js` and site styling remain intact.
- `1.0.mp4`: a **generated nine-second static branded sample video** (540×960), NOT a lesson recording from Shalini. Video uses native HTML5 controls and `object-fit:contain` in normal and fullscreen modes. Two preview cards intentionally share this temporary video until two real course previews are available.
- `assets/lms/demo-poster.jpg`: matching generated sample poster.

### What is demonstrable vs. NOT implemented

**Working frontend:** category filter, course search, responsive navbar, tabs and arrow-key tab controls, local form validity checks, show/hide password, course-specific routes, expandable curriculum, video playback/seek/mute/fullscreen, lesson switching, Done/Now/Next, Mark complete/undo, dynamically updated **temporary** percentage.

**NOT available:** real accounts, authentication, password recovery, social sign-in, secure enrollment, payments, confirmation emails, real lesson content, uploads, downloadable PDFs, permanent or cross-device progress, real certificates or admin panel. Existing booking/contact flows prepare email drafts rather than sending requests.

**Verification before launch:** Course prices, learning resources, claims, ratings, reviews, coaching guarantees and availability must be confirmed. All supplied Canva designs remain unchanged. Canva embeds require internet and appropriate sharing permissions. Bricolage Grotesque is loaded through Google Fonts when online; a sans-serif fallback is supplied for offline use.

### Site pages retained

`index.html`, `services.html`, `about.html`, `programs.html`, `contact.html`, `package.html`, `course.html`, `courses.html`, `communication-course.html`, `enrollment.html`, `login.html`, `dashboard.html` plus four new LMS pages. Legacy landing pages are retained for continuity; the main website navigation points to the new Academy. Corporate and Resources *standalone pages* remain removed as previously requested.
