# WorkWise Quiz

Quizzes and a searchable knowledge hub on Vietnamese labor law for people entering the workforce.

## Files
- `index.html` — public page
- `style.css` — styles, colors, dark mode
- `data.js` — all quiz and knowledge content (the file you edit)
- `app.js` — quiz logic, scoring, search, sends anonymous statistics
- `config.js` — Supabase URL and key
- `admin.html` + `admin.js` — private developer dashboard (login required)
- `supabase.sql` — database setup, run once in Supabase

## Run locally
Open `index.html` in a browser, or use the VS Code **Live Server** extension.

## Update content
Edit `data.js`: add an object to `quizzes` for a new quiz, or to `knowledge` for a new entry.

## Statistics setup (Supabase)
1. Create a free project at supabase.com.
2. SQL Editor → paste `supabase.sql` (change the email) → Run.
3. Authentication → Users → Add user → create the developer account (email + password).
   Authentication → Sign In / Providers → turn OFF "Allow new users to sign up".
4. Project Settings → API: copy the Project URL and the anon / publishable key into `config.js`.
5. Push to GitHub, then open `/admin.html` and log in.

## Deploy with GitHub Pages
All files must sit at the **root** of the repo (not inside a subfolder).
Settings → Pages → Deploy from a branch → `main` / `(root)`.
