# Metadata and ratings

Plozz combines information from your libraries with configured online sources. A metadata preference changes descriptions or images; it does not grant access to a missing movie.

## Choose information sources

Open **Settings > Metadata Providers**, or follow **Metadata Providers (TMDB, TheTVDB…)** from Artwork settings.

These controls are **shared by all profiles**, unlike each profile's [artwork presentation](/appearance/).

- **Recommended** lets Plozz choose sources for individual fields.
- **Custom** lets you reorder sources by priority. Move a source below **Disabled** to turn it off.
- Returning to Recommended uses the recommended policy without requiring you to manually rebuild the list.

Enabled does not guarantee a result: source coverage, matching identifiers, credentials, and temporary outages still matter.

## Use your own TMDB token

**Your Own TMDB Key** accepts a **TMDB v4 API Read Access Token**, saved on this device. Save it, then use **Verify Key** to check authentication. You can replace or remove it later.

This is optional and puts TMDB lookups under your account's rate limit. It is not a Jellyfin, Plex, or Seerr credential. Never include it in a public problem report.

## Understand scores and age information

Ratings can come from the media server and configured external providers. AniList anime scores are keyless; TMDB ratings need a usable TMDB token, while OMDb enrichment depends on an OMDb key supplied by the build. There is no general promise that every title has every rating source.

Review-score counts and Common Sense age display can be configured in Home/detail settings. Common Sense guidance comes from eligible Plex movie/show details: open its tile under **Ratings** for topic-by-topic information. Detailed guidance requires Plex Pass access for the account viewing the title. Age guidance is informational, not a content restriction. [Spoiler settings](/spoiler-protection/) can hide scores until watched.

## Wrong or missing information

First check the title, year, episode identity, and owning source. For a server's incorrect match, correct it on that server; do not expect clearing Plozz's cache to change the server catalogue. **Refresh Metadata**, when the title's menu offers it, asks the provider to refresh.

For shares, verify the folder's [content type and scan](/network-shares/). In Metadata Providers, **Diagnostics** shows provider health and caches. **Artwork** and **Lookups** set cache budgets, not offline-video storage limits. **Clear Cache** removes cached lookup data and derived artwork so they can rebuild while browsing; it does not repair an incorrect match or remove downloaded videos.
