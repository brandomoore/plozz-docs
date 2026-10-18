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

Guides live in `content/`, with navigation and exact app-source citations in
`content/pages.json`. Each guide is at most 350 words. The validated
`source-state.json` records the immutable app revision, source fingerprints,
content hash and review provenance.

While editing drafts, use `npm run check:content`. Full checks/builds reject
unreviewed changes until the trusted pipeline finalizes their source state.

The site tracks app `main`, not a promise that every installed TestFlight build
has identical features. It displays the source revision and verification date.
A small read-only freshness endpoint checks GitHub, cached for five minutes:
new app commits produce a visible warning; network/rate-limit failures display
an unavailable status, never a false "up to date" claim.

## Daily cloud maintenance

`.github/workflows/update-docs.yml` runs **once daily at 08:17 UTC**, on
GitHub-hosted Ubuntu runners. It also supports a manual run with optional full
review. No Mac or desktop Copilot app needs to be running.

1. Compare current app `main` with the documented revision.
2. If source and deployment are unchanged, stop without calling a model.
3. For unrelated source changes, update verification metadata without rewriting
   guides. Unassigned/new source areas trigger a full content review.
4. A fresh Copilot CLI writing job updates affected guides using frozen source.
5. A separate fresh review job checks the result against that same source.
6. A non-AI publication job validates content, citations, word counts and scope,
   stages a Worker version, refuses a moved docs base, commits to this repo's
   `main`, activates the version and checks live source metadata.

If publication fails after the docs commit, the next run detects that Git and
the live site differ and retries deployment without another rewrite. Runs are
serialized only with other docs runs; app development is never locked.

The selected writer and reviewer model is **`gpt-6.1-sol` at `high` effort**,
the newest Sol model available when this pipeline was created. It is explicit
in the workflow and rejected if unavailable; there is no automatic fallback to
another provider or model. Update the workflow when a newer available Sol model
is approved. The CLI is pinned to `@github/copilot@1.0.98`.

### One-time cloud authentication

Add these in **Settings → Secrets and variables → Actions** for this repository:

| Secret | Purpose |
| --- | --- |
| `COPILOT_GITHUB_TOKEN` | A fine-grained GitHub PAT with **Copilot Requests** permission from an account entitled to the selected model. The default Actions token is not a Copilot subscription credential. |
| `CLOUDFLARE_API_TOKEN` | A Cloudflare token able to read/upload/deploy Worker scripts in the configured account. Routine updates need no DNS or route-edit permission. |

Create and enter these through the providers' own settings. Never commit them,
paste them into agent prompts, copy machine OAuth files, or print their values.
The writing/review jobs receive only the Copilot credential, hidden from their
shell/MCP tools. Cloudflare and repository-write credentials are available only
to the non-AI publication job. Checkouts never persist Git credentials.

Until these secrets are configured, the daily source check can run, but changed
content cannot be written/published unattended. Missing credentials cause an
explicit failed job, leaving the last verified docs intact.

After configuring secrets, run **Daily source-checked docs → Run workflow**
with **force** enabled once to verify both model passes and publication.
GitHub schedules can be delayed, and GitHub may disable scheduled workflows
after prolonged inactivity in a public repository; monitor Actions failures.

## Hosting and rollback

Only the `plozz-docs` Worker owns `docs.plozz.app`. It does not modify
`plozz.app`, its OAuth relay, or the separate pairing/community-link Worker.
Initial hostname provisioning uses `wrangler.toml`; routine updates use
`wrangler versions upload` then `wrangler versions deploy`, not route sync.

The publication job records the previous version in
`.docs-work/publication.json` and its retained publication artifact. To roll
back with an authorized credential:

```sh
npm run deploy:activate -- <previous-version>@100 --yes
```

This restores a previously deployed site; its visible source/freshness status
continues to reflect the older content.

## Brand assets

The logo is the canonical Plozz mark also used by plozz.app. Manrope is bundled
under the SIL Open Font License in `public/font-license.txt`. Reader pages make
no third-party font or analytics requests.
