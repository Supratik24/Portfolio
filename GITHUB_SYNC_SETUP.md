# GitHub Auto-Sync Setup Guide

This portfolio automatically syncs your GitHub repos to the Projects section
whenever you create a new repo, push to main, or once a day via cron.

## How It Works

```
You create a new repo on GitHub
       ↓
GitHub Actions workflow runs (daily cron or manual trigger)
       ↓
Fetches all your public non-fork repos via GitHub API
       ↓
POSTs them to /api/admin/github-sync with a shared secret
       ↓
Express server upserts repos into MongoDB as Project cards
       ↓
Your portfolio shows the new repo automatically ✅
```

## One-Time Setup (5 minutes)

### Step 1 — Generate a sync secret

Run this in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output. This is your `GITHUB_SYNC_SECRET`.

---

### Step 2 — Add the secret to your server environment

**Locally** — add to your `.env` file:
```
GITHUB_SYNC_SECRET=<your-generated-secret>
```

**On Vercel / Railway / etc.** — add it as an environment variable in your
deployment dashboard (same key: `GITHUB_SYNC_SECRET`).

---

### Step 3 — Add GitHub Secrets to this repo

Go to: **GitHub → Portfolio repo → Settings → Secrets and variables → Actions**

Add these two secrets:

| Secret name            | Value                                           |
|------------------------|-------------------------------------------------|
| `PORTFOLIO_API_URL`    | Your deployed portfolio URL, e.g. `https://your-portfolio.vercel.app` |
| `PORTFOLIO_SYNC_SECRET`| The same secret you generated in Step 1        |

> **Optional:** Add a `GH_TOKEN` secret (a Personal Access Token with `repo`
> scope) if you want the workflow to read private repos. For public repos only,
> the default `github.token` is sufficient.

---

### Step 4 — Push and test

Commit and push this repo to GitHub. Then:

1. Go to **Actions** tab in the Portfolio repo
2. Click **Sync GitHub Repos to Portfolio**
3. Click **Run workflow → Run workflow**
4. Watch the logs — it should end with `✅ Sync complete`
5. Visit your portfolio — your repos now appear in the Projects section!

---

## Controlling Which Repos Appear

By default, **all public non-fork repos** (except the Portfolio repo itself) are synced.

**To be more selective**, open `.github/workflows/sync-github-repos.yml` and
follow the comment to switch to the "portfolio topic" filter. Then just add the
`portfolio` topic to any repo you want shown, via:

> GitHub repo page → ⚙️ gear icon (top right of About section) → Topics → `portfolio`

---

## Notes

- **Manual enrichment is preserved.** If you add a case study or cover image
  via `/admin`, it stays even when the sync runs again.
- **Nothing is ever deleted.** The sync only adds or updates — it never removes.
- **The sync runs daily** at midnight UTC as a fallback, even if the webhook
  doesn't fire.
