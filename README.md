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
`content/pages.json`. Each guide is at most 350 words. `source-state.json`
records the immutable app revision, source fingerprints, content hash and
independent review provenance.

While editing drafts, use `npm run check:content`. Full checks/builds reject
unreviewed changes until the trusted pipeline finalizes their source state.
The site generates source revisions and dates; don't hardcode them in guides.

The site tracks app `main`, not a promise that every installed TestFlight build
has identical features. It displays the source revision and verification date.
The freshness endpoint checks GitHub, cached for five minutes: new app commits
produce a visible warning; unavailable or mismatched metadata never produces a
false "up to date" claim.

## Daily cloud maintenance

`.github/workflows/update-docs.yml` runs **once daily at 08:17 UTC**, on
GitHub-hosted Ubuntu runners. It also supports a manual full review. No Mac,
desktop Copilot app, personal token or Cloudflare deployment secret is needed.

1. Compare current app `main` with the documented revision.
2. If source and deployment are unchanged, stop without calling a model.
3. For unrelated source changes, update verification metadata without rewriting
   guides. Unassigned/new source areas and removed citations require review.
4. A fresh Copilot CLI writing job updates affected guides using frozen source.
5. A separate fresh review job checks the result against that same source.
6. A non-AI job validates content, citations, word counts and scope, refuses a
   moved docs base, and commits only approved guides/state to this repo's `main`.
7. The Pages workflow rebuilds that exact commit, refuses an outdated deployment,
   publishes it, and verifies the source revision, content hash and check date
   at both the origin and `docs.plozz.app`.

If deployment fails after the docs commit, the next run detects that Git and
the live site differ and retries deployment without another rewrite. Runs are
serialized only with other docs runs; app development is never locked.

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

GitHub schedules can be delayed, and scheduled workflows can be disabled after
prolonged inactivity in public repositories. Monitor Actions failures.

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
The source/freshness banner will accurately describe the restored content.

## Brand assets

The logo is the canonical Plozz mark also used by plozz.app. Manrope is bundled
under the SIL Open Font License in `public/font-license.txt`. Reader pages make
no third-party font or analytics requests.
