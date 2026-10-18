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

`content/coverage.json` maps these areas, discovered product modules and
profile-settings categories to guides or justified internal-code exclusions.
A passing freshness check does not prove coverage. Review both independently.

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
