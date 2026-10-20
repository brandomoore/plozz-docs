# Plozz docs

Concise, source-checked end-user guides at **https://docs.plozz.app**.
The app repository is read-only input. This project never builds, tests,
installs or releases Plozz and never adds a gate to app commits.

## Local checks

```sh
npm ci
npm run check
npm test
npm run build
```

Guides live in `content/`, with navigation, distinct search metadata and exact
app-source citations in `content/pages.json`. `EDITORIAL.md` defines the
reader-task baseline and when to use a page, section, external link or omission.
Guides stay concise; focused reference can be longer when it is genuinely useful.
`content/coverage.json` maps the required areas and live product surfaces to
useful answers rather than treating article count as completeness.

`source-state.json` records the immutable app revision, verified source-snapshot
hash, coverage/policy hashes, and independent review provenance. Per-article
content hashes track real modification dates separately from source checks.

Before editing drafts, run `npm run source:plan` to freeze source evidence.
Use `npm run check:content` to validate both draft pages and the coverage ledger
against that inventory. Full checks/builds reject unreviewed changes until the
trusted pipeline finalizes their source state.
The site generates article-update dates; don't hardcode dates or source
revisions in guides.

The site tracks app `main`, not a promise that every installed TestFlight build
has identical features. Readers see a simple "Last updated" date in the footer,
based on the article's meaningful changes rather than its latest source audit.
Source revisions and verification details remain in publishing metadata. The
freshness endpoint remains available for maintenance; reader pages do not poll
it or display technical source-status banners.

## Daily cloud maintenance

`.github/workflows/update-docs.yml` runs **once daily at 08:17 UTC**, on
GitHub-hosted Ubuntu runners. It also supports a manual full review. No Mac,
desktop Copilot app, personal token or Cloudflare deployment secret is needed.

1. Read current app `main` from GitHub and freeze its commit. Compare it with
   the documented revision and the editorial coverage policy.
2. If source and deployment are unchanged, stop without calling a model.
3. Download and fingerprint the complete product-source snapshot—not only the
   files cited by existing guides. Include product Swift code, relevant
   documentation/configuration, Apple entitlements, app metadata, Top Shelf
   extension entry points, pinned dependencies and an English UI-label
   projection. No app build is performed.
4. Inventory product modules, settings surfaces, profile-settings categories
   and system integrations. Require a source-backed answer section for each
   named capability question, not only a mention of its broad topic.
   For identical product inputs, metadata-only updates need no rewrite.
   New/unmapped surfaces, missing coverage or policy changes require a baseline
   review, including features that existed before the previous docs run.
5. A fresh Copilot CLI writer updates useful guides and the coverage ledger.
   A separate fresh reviewer checks factual accuracy, UI reachability,
   applicability, completeness against the baseline and editorial/SEO quality.
6. A non-AI job validates content, citations, word counts and scope, refuses a
   moved docs base, and commits only approved guides/state to this repo's `main`.
7. The Pages workflow rebuilds that exact commit, refuses an outdated deployment,
   publishes it, and verifies the source revision, content hash and check date
   at both the origin and `docs.plozz.app`.

If deployment fails after the docs commit, the next run detects that Git and
the live site differ and retries deployment without another rewrite. Runs are
serialized only with other docs runs; app development is never locked.

A full independent coverage audit runs at least every 30 days, including when
app source is unchanged. Its separate `baselineReviewedAt` clock is not reset
by incremental source checks. This catches older omissions instead of simply
refreshing metadata; unchanged articles still retain their modification dates.

## Reader experience and search

The dark, Manrope-based shell has a grouped sidebar, an icon-led guide
directory and a desktop "On this page" rail that follows the reader's position.
Narrow screens use a navigation drawer and an inline section list. Category
cards link to real guides, not additional thin category pages.

Header search opens with `/` or Command/Ctrl+K. Full-text results include
article sections and link directly to an answer; arrow keys move through
results, Enter opens one, and Escape closes the native dialog. Search loads
on demand and checks the page's content revision before showing results.
If the index is unavailable or updating, the dialog explains the problem and
shows title-only matches. Navigation and the guide directory work without
JavaScript. Stable heading anchors make reference material useful without
creating a thin page for every setting.

Each page has unique titles/descriptions, canonical and social metadata, and
appropriate article/breadcrumb data. Sitemap and article dates change only
when meaningful article content or metadata changes, not on every source audit.
This helps discovery without promising rankings or manufacturing freshness.

The writer and reviewer use **`gpt-6.1-sol` at `high` effort**, the newest
available Sol model when configured. The workflow selects it explicitly and
does not fall back to another model/provider. The CLI is pinned to
`@github/copilot@1.0.98`. Update the explicit model when a newer Sol is approved.

### Managed authentication

Writing/review jobs declare `copilot-requests: write` and pass the ephemeral
`${{ github.token }}` as the CLI's `COPILOT_GITHUB_TOKEN` environment variable.
This is **not a repository secret**. The model jobs have read-only repository
access; tokens are hidden from their shell/MCP tools, and delegation is disabled.

Only the non-AI commit job gets `contents: write`. Pages deployment uses
`pages: write` and GitHub's OIDC identity. Checkouts never persist credentials.
Don't export a personal GitHub token or desktop Cloudflare OAuth login into CI.

If organization/account policies later disable managed inference or the chosen
model, the job must fail rather than change models or reuse personal credentials.
The manual **Check managed Copilot access** workflow performs an inference-only
check with the configured Sol model and no file-editing tools.

Run a complete refresh manually:

```sh
gh workflow run update-docs.yml --repo brandomoore/plozz-docs -f force=true
```

GitHub schedules can be delayed or disabled by repository/account policy.
Monitor Actions failures.

## Hosting and recovery

GitHub Pages hosts the built files at
`https://brandomoore.github.io/plozz-docs/`, deployed by
`.github/workflows/publish-site.yml`. That workflow runs on main pushes, manual
dispatch, and after a daily update. Daily bot commits don't themselves trigger
push workflows, so the updater explicitly calls the reusable deployment.

The small `plozz-docs` Cloudflare Worker owns `docs.plozz.app`. It serves the
public Pages files, applies security headers, and implements `/freshness.json`.
It forwards neither incoming cookies nor authorization headers to the origin.
The normal docs pipeline never needs a Cloudflare API token and never touches
`plozz.app`, its OAuth relay, or the pairing/community-link Worker.

Only changes to the front-door Worker need an authorized local deployment:

```sh
npm run deploy:upload
npm run deploy:activate -- <staged-version>@100 --yes
```

Inspect the staged version and retain the previous version for rollback.
Version activation doesn't synchronize routes or DNS. To recover a failed
content deployment, rerun **Publish documentation** on current main. To restore
older content, revert the intended docs change and publish that main commit.
The footer date and publishing metadata will accurately describe the restored content.

## Brand assets

The logo is the canonical Plozz mark also used by plozz.app. Manrope is bundled
under the SIL Open Font License in `public/font-license.txt`. Reader pages make
no third-party font or analytics requests.

Social previews reuse the website's content-versioned image URL. When that
artwork changes, update `socialImage` in `tools/build.mjs` to match the live
website's `og:image`; both Open Graph and Twitter use it. Never use the bare
`/og-image.png` URL: chat services can retain its older artwork even after the
image is replaced. Existing messages may retain their cached preview.
