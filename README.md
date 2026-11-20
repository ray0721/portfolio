# Md Rayhan Hossain: portfolio (Next.js)

## Run locally
1. Install Node.js 20+ from nodejs.org.
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill it in (the site runs without it; only the contact form needs it).
4. `npm run dev`, then open http://localhost:3000

## Update content (no programming needed)
- **`src/content/data.ts`**: email, profile links, publications, projects and project details, dashboards, credentials, CV files, articles. Follow the comments and copy an existing entry.
- **`src/content/body.html`**: page text (research statement, experience, education, community). Edit the words between the tags.
- **CV and images**: drop files in `public/` and reference them as `/cv/your-file.pdf`.
- Hidden items stay hidden: empty links, empty email, and empty metrics are not shown.

## Deploy
1. Create a GitHub repository, then in this folder: `git init`, `git add .`, `git commit -m "first version"`, push to the repo.
2. On vercel.com choose Add New, Project, import the repository, and deploy.
3. In Vercel, Settings, Environment Variables: add `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, then redeploy.
4. Custom domain: Vercel, Settings, Domains, add your domain, and create the DNS records Vercel shows you at your registrar. Update `NEXT_PUBLIC_SITE_URL` to match.
5. Every push to GitHub redeploys the site automatically.

## Production checklist
- `npm run build` passes locally.
- Contact form sends a test message to you; the email address on the page is the one you want public.
- Every link opens the right page; Tableau embeds load on the live domain.
- Publication authors, DOI, and date match the Frontiers page.
- The research statement was reviewed with your attorney.
- Lighthouse (Chrome DevTools) scores checked on mobile.

## Ask Rayhan AI (optional)
- Turn on: set `AI_ENABLED=true` and `ANTHROPIC_API_KEY` (from console.anthropic.com) in `.env.local` and in Vercel. Leave `AI_ENABLED=false` and the button disappears; nothing else changes.
- It answers only from your own content (`data.ts` and `body.html`), so keep those accurate. Anything not in them gets a "not in the portfolio" reply without calling the AI at all.
- Cost control: each visitor can ask 10 questions per 10 minutes, and `AI_DAILY_LIMIT` caps total questions per day. Set a monthly spend limit in the Anthropic console too.
- The key stays on the server (`src/app/api/chat/route.ts`) and never reaches the browser.
- `AI_MODEL` defaults to a small, low-cost model. Change it there if you want a stronger one.
- Answers are not streamed; they appear when complete.
