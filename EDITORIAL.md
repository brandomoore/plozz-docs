# Documentation baseline

Write a compact product manual, not a changelog, marketing catalog or dump of
every stored preference. The live Plozz implementation determines the facts;
other products' documentation only informs useful questions and organization.

## What deserves documentation

Use the smallest treatment that helps a reader finish a real task:

| Treatment | Use it when |
| --- | --- |
| A page | A distinct task or recurring problem needs steps, prerequisites, meaningful choices, consequences or a resolution path. It should work as an entry point from search. |
| A section | The answer belongs to an existing task or needs only a short explanation. Give it a useful heading and stable anchor. |
| A link | The authoritative answer already exists, especially server, NAS or operating-system administration. Explain the dependency briefly. |
| An intentional omission | A control is self-explanatory and low-risk, or the code is internal, unreachable or unsupported. Record the reason rather than inventing a guide. |

`config/documentation-baseline.json` defines the required reader-task areas.
These are coverage obligations, not one-page-per-area instructions. Several
areas can share a good guide, and one area may need distinct procedures.

`content/coverage.json` maps these areas, discovered product modules,
profile-settings categories and system integrations to guides or justified
internal-code exclusions. Entitlements and extension entry points are product
evidence too, not just build configuration.

The baseline's named capability questions require a specific answer section,
source evidence and a concise answer in the ledger. Mentioning "profiles" does
not document Apple TV user-specific sign-in; mentioning "library" does not
explain combined browsing or each platform's letter navigation. The reviewer
must read the linked section and verify the complete workflow, not just its
heading or the ledger's claim. These questions are a minimum: full audits must
also look for important unlisted workflows across modules and system features.
A passing freshness or structural coverage check does not prove useful content.
Review both independently.

A full independent coverage audit is due every 30 days even when app source
is unchanged. Incremental source checks do not reset that clock. Fix existing
omissions during that audit instead of only refreshing verification metadata.

## Useful answers

- Lead with the answer or the task, not introductory marketing.
- State platform, provider, permission and build requirements before affected steps.
- Use exact visible labels, but explain consequences rather than listing labels.
- Distinguish Plozz profiles, server users, shared settings and device-local state.
- Include the expected result and the safest useful recovery path.
- Prefer narrower checks to reset/reinstall advice. Explain destructive effects.
- Keep existing useful URLs. Consolidate related advice rather than multiplying
  nearly identical pages for every device/provider combination.
- Fill existing gaps even when the feature predates the last docs update.
- Do not infer reachable features from filenames or upstream engine support:
  check the UI entry point, wiring and relevant implementation.

Aim for roughly 150-300 words for a normal task. This is an editorial guide, not
an SEO word target. A focused reference can be longer when a table or explanation
actually helps. Hard limits are 450 words for a guide, 900 for a reference, and
350 for an overview. Do not pad to a limit or omit essential limitations to
stay short; reorganize the answer.

## Search and discoverability

Each page needs a distinct reader question, descriptive title and unique
description. Mention platforms and providers where they change the answer,
not as repeated keyword lists. Keep the marketing site responsible for
evaluating Plozz; docs should explain using, configuring and fixing it.

Group navigation by reader tasks. Link related procedures, reference sections
and symptoms. Search should find relevant article text, not only page titles.
Keep readable canonical URLs, crawlable links and an accurate sitemap.

Source verification and article modification are different dates. A source
recheck must not reset an unchanged article's sitemap or structured-data date.
Do not promise rankings, invent search volumes, fake expertise or copy another
product's instructions and present them as Plozz behavior.

## Visual quality

Visual polish is part of a useful manual, not an optional finishing pass.
Writers and independent reviewers must assess each changed guide for:

- **Recognition:** use recognizable service marks for named destinations such
  as Discord and GitHub, not a generic external-link arrow alone. Use the
  shared, approved icon set rather than emoji, guessed logos or inline SVG.
  Ordinary labeled Markdown links receive these marks automatically.
- **Hierarchy:** make choices easy to compare without turning every paragraph
  into a card. A short unordered list of distinct services, each introduced by
  a bold link naming the service, uses the shared option layout. Keep steps
  numbered only when order matters; keep secondary links quiet.
- **Useful imagery:** consider a real screenshot for a hard-to-find control,
  an annotated crop for a visual distinction, or a diagram for a relationship
  that prose makes difficult to follow. State what the image helps the reader
  do. No stock decoration, made-up app screenshots, AI-rendered controls or
  imagery added just to fill space. Do not add an image to every page.
- **Consistency and accessibility:** preserve the existing Plozz palette,
  typography, spacing and icon style. Keep visible text labels, useful alt
  text for meaningful images, decorative icons hidden from assistive
  technology, legible contrast, keyboard focus and narrow-screen layouts.
  Instructions must remain usable without an image.
- **Trust and maintenance:** new artwork needs a verified source, permission
  to use it, local delivery, dimensions and a clear owner. Screenshots must
  reflect the stated platform and current implementation and exclude account
  details, personal media, server addresses, tokens and pairing codes.

The automated writer's content-only boundary still applies. It cannot add
assets, change CSS, embed HTML/SVG/images in guides or fetch arbitrary artwork.
Use the existing shared components now. When useful imagery or a missing icon
needs new renderer support, include a concrete asset request in the final
report: guide and section, reader benefit, proposed visual, source/platform
evidence and privacy/rights checks needed. Do not silently skip the visual
assessment because an asset is unavailable. A maintainer reviews and adds
approved assets and shared rendering outside the automated content pass.

Both passes include a short assessment under `## Visual quality` before any
approval line: components used, specific asset requests, or why more imagery
would not help. The runner rejects a missing or empty assessment. The independent
reviewer must check this against the guide and available shared components,
not simply repeat the writer's assessment. Preserve correct prose and article
dates when only the shared presentation changes.

## Benchmark

- [Infuse server connections](https://support.firecore.com/hc/en-us/articles/360006462093-Streaming-from-Plex-Emby-and-Jellyfin)
  and [subtitles](https://support.firecore.com/hc/en-us/articles/215090967-Using-Subtitles):
  task-focused steps, platform differences, surrounding decisions and limitations.
- [Plex Apple TV settings](https://support.plex.tv/articles/settings-plex-for-apple-tv/)
  and [buffering](https://support.plex.tv/articles/201575036-why-is-my-video-stream-buffering/):
  complementary reference and symptom-led entry points. Validate advice against
  current Plozz code; first-party articles can still contain dated material.
- [Jellyfin networking](https://jellyfin.org/docs/general/post-install/networking/):
  concrete prerequisites and clear client/server ownership boundaries.
- [Kodi subtitles](https://kodi.wiki/view/Settings/Player/Subtitles):
  explain setting interactions without copying the scale of a settings encyclopedia.
- [Google's people-first guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content),
  [titles](https://developers.google.com/search/docs/appearance/title-link) and
  [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap):
  prioritize useful original answers, distinct descriptive titles and truthful dates.
