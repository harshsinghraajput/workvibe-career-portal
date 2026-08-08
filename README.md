# WorkVibe — Career Portal

Frontend Developer Assignment — Career Portal for candidates to browse jobs and apply online.

**Live demo:** Run locally with `npm run dev` → http://localhost:3000

---

## Tech Stack

| Technology | Usage |
|------------|--------|
| **Next.js** (App Router) | Routing, SSR/SSG, project structure |
| **React 19** | UI components |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling & responsive design |
| **Static mock data** | No backend required (local JSON in `src/data/jobs.ts`) |

> Angular was preferred in the brief; this submission uses **Next.js / React**, which is listed under *Other Accepted Frameworks*.

---

## Setup Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

### Production build

```bash
npm run build
npm start
```

---

## Features Implemented

### Functional requirements
- **Home page** — Hero, intro, featured jobs, why join us, footer  
- **Job listing** — All jobs with cards (title, company, experience, location, type, salary, posted date, apply)  
- **Search** — By title, company, skills, keywords  
- **Filters** — Location, experience, job type, remote/hybrid/office  
- **Sorting** — Latest, oldest, salary, experience  
- **Pagination**  
- **Job details** — Description, responsibilities, skills, benefits, company info, apply CTA  
- **Apply form** — All required fields + validations  
- **Thank you page** — Exact confirmation message from the assignment  
- **Loading / empty / 404 states**  
- **Responsive** — Mobile, tablet, desktop  

### Form validation
- Required fields  
- Valid email format  
- Mobile number validation (10-digit)  
- Resume file type (PDF / Word)  
- Max file size (5 MB)  

### Extra credit / bonus
- Reusable UI components (`Header`, `Footer`, `JobCard`, `ApplyButton`)  
- Advanced filtering + **URL-based filter persistence** (query params)  
- Excellent responsive design  
- Accessibility basics (labels, focus, semantic HTML, ARIA where needed)  
- **File upload preview** (file name shown after select)  
- **Form auto-save to localStorage** (draft restores on return)  
- Applied-job tracking (localStorage)  
- 3D-style card hover + click press animations  
- Auto-redirect home 20s after thank-you  

---

## Project Structure (Next.js equivalent)

```
src/
 ├── app/                          # Routes (App Router)
 │    ├── page.tsx                 # Home
 │    ├── layout.tsx
 │    ├── globals.css
 │    ├── not-found.tsx
 │    ├── jobs/
 │    │    ├── page.tsx            # Job listing
 │    │    └── [id]/page.tsx      # Job details
 │    ├── apply/
 │    │    └── [id]/page.tsx      # Application form
 │    └── thank-you/page.tsx
 ├── components/                   # Shared / reusable UI
 │    ├── Header.tsx
 │    ├── Footer.tsx
 │    ├── JobCard.tsx
 │    └── ApplyButton.tsx
 ├── data/                         # Mock API / static data
 │    └── jobs.ts
 ├── lib/                          # Services / utilities
 │    └── applied.ts               # Applied-job state (localStorage)
 └── types/                        # Models
      └── job.ts
```

Mapping to the recommended Angular-style layout:

| Angular-style folder | This project |
|----------------------|--------------|
| `features/home` | `app/page.tsx` |
| `features/jobs` | `app/jobs/page.tsx` |
| `features/job-details` | `app/jobs/[id]/page.tsx` |
| `features/apply` | `app/apply/[id]/page.tsx` |
| `shared` / components | `components/` |
| `services` | `lib/` + `data/` |
| `models` | `types/` |

---

## Thank You Message (after apply)

```
Thank you for applying.
Our recruitment team will contact you if your profile matches our requirements.
```

---

## Assumptions

- No real backend — jobs come from static mock data  
- Resume is validated client-side only (not uploaded to a server)  
- “Applied” status and form drafts stored in `localStorage`  
- Contact: **Reach us** → `mailto:iaamharshsinghrajput@gmail.com`  

---

## Known Limitations

- No authentication / user accounts  
- No real file upload API  
- Salary sort uses simple number parsing from salary strings  

---

## Future Improvements

- Real API / JSON Server  
- Dark/light theme toggle  
- Bookmark jobs  
- Unit tests (Jest / Vitest + React Testing Library)  
- Skeleton loaders  
- PWA support  

---

## Git

Meaningful commits were used during development (setup → features → filters → form → polish).

---

## Contact

**Reach us:** [iaamharshsinghrajput@gmail.com](mailto:iaamharshsinghrajput@gmail.com)
