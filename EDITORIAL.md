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

## Editorial scope

Do not document Dolby Vision, height-channel rendering, TrueHD Atmos, DTS:X, Apple Positional
Audio/APAC, Dolby MAT, or the related settings and availability. This applies
to prose, search metadata, diagrams, cross-links and coverage answers even
when app or engine source still contains the feature. Do not add explanations
or notices about this scope decision. Ordinary channel-based audio and
E-AC-3 JOC playback are separate and may be documented with verified limits.

This explicit scope takes precedence over general instructions to fill coverage
gaps. Writers and reviewers must not reintroduce an excluded topic or propose a
new capability obligation for it. Draft validation enforces this boundary.

## Useful answers

- Write for someone using Plozz, not someone implementing it. Begin with what
  the feature helps them do and when they might want it. Follow with where to
  find it, what to choose, and what they will see next.
- Be friendly, direct and natural, without sales language or forced enthusiasm.
  Prefer complete, short explanations to dense fragments, abstract technical
  summaries, repetitive qualifications, or a concluding recap.
- Use the app's words for controls and everyday words for explanations. For
  example, "This changes how your Continue Watching cards look. Your progress
  and the titles in the row stay the same" is clearer than "These profile
  presentation choices do not change watched state or row membership."
- Explain server/account/profile distinctions when they affect the task, not
  as boilerplate before every feature. Keep material privacy, access, quality
  and compatibility limits beside the relevant action. Move deeper technical
  diagnosis to troubleshooting; do not hide a limitation to simplify prose.
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

## UI-first audit contract

The source review follows what a person can navigate, see and change, not the
repository's module layout. Start at the app's UI entry points and walk pages,
nested editors, sheets, sections and controls in their visible order. Audit
Apple TV and iPhone/iPad paths separately where they differ. Trace shared
components, enum titles and English localization to their actual use.

The trusted source snapshot supplies `screenSurfaces` and `uiLabels` in
`.docs-work/discovery.json`. Screen candidates include settings sources and
SwiftUI presentation files, including sheets, overlays and reusable components
without a navigation title. Literal extraction ignores comments
and resolves English catalog values. It is evidence for exact wording, not
proof that a string is visible or a destination reachable: both agents must
trace the wiring, conditions and shared components. Dynamic names are not
invented constant UI labels. This process does not run the app or verify pixels.

For **every** discovered surface, add `content/coverage.json` → `screens` keyed
by its exact source path. A reader-facing screen record has:

- `sources`: its own path plus the exact source files defining its labels and behavior.
- `platforms`: applicable values from `Apple TV`, `iPhone`, `iPad`.
- `navigation`: how a person reaches it, using actual UI names.
- `experience`: what the person can do there and the visible result.
- `conditions`: provider, account, profile, permission, platform or feature
  conditions; say when there are no additional conditions.
- `controls`: an array of `{ "text": "Exact visible label", "source": "Sources/Feature/Example.swift" }`
  for its in-scope headings, switches, buttons and picker choices, in UI order.
  Follow shared label definitions rather than citing a caller that has no text.
- `documents`: guide/section links, shaped as `{ "slug": "...", "anchor": "..." }`.

An informational screen can have no controls, but a settings page full of
switches cannot. Account for conditional and self-explanatory controls in the
audit without manufacturing prose for each. Existing editorial exclusions
still apply; never introduce excluded topics into reader-facing material.

For non-reader surfaces, use `sources`, `omitKind` and a specific `omitReason`
instead. The allowed kinds are `implementation`, `shared-component`,
`editorial-scope` and `unreachable`. Identify the parent when excluding a shared
component, and inventory its controls on that parent's record. "Already
covered by a broad topic" or "too technical" is not a valid screen exclusion.
The reviewer checks these decisions rather than accepting a coverage count.

Each entry in `content/pages.json` also needs:

```json
"ui": {
  "references": [
    { "text": "Exact visible label", "source": "Sources/Feature/Example.swift" }
  ],
  "emphasis": ["A genuinely non-control phrase emphasized in the article"]
}
```

Every reference must match the exact English value in the immutable source
inventory, appear in the article and use a file in that page's `sources`.
Bold named controls and each segment of a bold `Settings > ...` path require
references. Capitalization and punctuation matter. `emphasis` is only for
non-control emphasis, such as a platform name, outcome or warning—not a way to
waive label verification. Do not remove bold styling or replace a named control
with vague directions to escape the check. Both arrays can be empty in a guide
that names no controls and has no bold emphasis.

Apple-generated labels are not app literals. `systemUiLabels` records the
small, verified framework contract catalogue from `tools/ui-audit.mjs`, with
Apple documentation and actual code-symbol evidence in the frozen file. For
these labels, add `system` to the same reference shape, for example
`{ "text": "Edit", "source": "Sources/AppShelliOS/PlozziOSSettingsView.swift", "system": "swiftui-edit" }`.
The current catalogue covers SwiftUI Edit/Done, UIKit's conditional More
interface and the system Now Playing interface. Cite the real framework wiring,
not an unrelated literal or a comment. Check platform, visibility and editing
state independently. System labels follow device language; this catalogue
records their English names. Unknown system labels still block validation
until their actual API contract is verified; do not guess or waive them.

The audit ledger is maintenance evidence, not the guide itself. Use friendly
task guides and focused, UI-ordered settings sections; do not publish a code
inventory, a wall of switches, or one SEO page per toggle. Each guide should
explain a feature's purpose, its useful choices and expected results.

Both passes must report concrete findings under `## UI accuracy` and
`## Reader experience`, as well as `## Visual quality`. The independent reviewer
checks the actual source and articles, fixes terminology and technical prose,
and withholds approval for unresolved navigation, coverage or usability gaps.
Only docs publication is blocked; app development remains independent.

## Search and discoverability

`/parental-controls/` is the stable, dedicated age-suitability entry point used
outside the docs. Keep its setup and material limitations source-checked through
the named parental-controls capability. Maintain the
`/profiles-and-locks/#set-up-a-kids-profile-safely` section as a link to it rather
than a second copy of the procedure. Do not hardcode an App Store age rating,
imply age verification, or promise universal content filtering.

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
  numbered only when order matters; ordinary top-level ordered lists receive
  the shared procedure treatment. Prefer short, bold action leads for longer
  steps. Keep secondary links quiet.
- **Context and consequences:** label a platform-specific guide with its
  verified `platforms` metadata. Use a Note for a relevant exception, a Tip
  for optional help, Important for an authorization/prerequisite decision,
  and Warning for destructive consequences. Do not put routine paragraphs
  in callouts or rely on color alone. Keep exact Settings paths in bold.
- **Useful imagery:** consider a real screenshot for a hard-to-find control,
  an annotated crop for a visual distinction, or a diagram for a relationship
  that prose makes difficult to follow. State what the image helps the reader
  do. No stock decoration, made-up app screenshots, AI-rendered controls or
  imagery added just to fill space. Do not add an image to every page.
  Approved `plozz-diagram` blocks explain relationships using readable text
  and decorative icons, not simulated app screens. Verify their labels and
  captions against the frozen source just like prose; include their required
  source references. Their text counts toward the guide's word budget.
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
The authoring syntax and approved diagram catalogue are described in
`README.md#guide-components`; do not invent new diagram identifiers or modify
the catalogue in a content-only pass.

Both passes include a short assessment under `## Visual quality` before any
approval line: components used, specific asset requests, or why more imagery
would not help. The runner rejects a missing or empty assessment. The independent
reviewer must check this against the guide and available shared components,
not simply repeat the writer's assessment. Preserve correct prose and article
dates when only the shared presentation changes.

## Benchmark

- [Webflow's Designer Extension tutorial](https://developers.webflow.com/apps/docs/designer-extensions/build-a-designer-extension):
  clear procedure hierarchy and explicit prerequisites.
- [Square's setup guide](https://developer.squareup.com/docs/get-started/create-account-and-application):
  purposeful illustrations and notes that separate exceptions from the task.
- [Vercel's getting-started guide](https://vercel.com/docs/getting-started-with-vercel):
  restrained secondary information and scannable steps. Borrow these structural
  lessons, not branding, copied artwork, promotional banners or developer-only
  controls that do not help a Plozz reader.
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
