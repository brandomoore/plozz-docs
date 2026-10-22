# Metadata and ratings

Plozz combines library and online metadata, without granting media access.

For regional release dates and watch offers, see [Release & Availability](/media-requests/#read-release-and-availability-information).

## Choose information sources

Open **Settings > Metadata Providers**, or follow **Metadata Providers (TMDB, TheTVDB…)** from Artwork settings.

These controls are **shared by all profiles**, unlike each profile's [artwork presentation](/appearance/).

- **Recommended** lets Plozz choose sources for individual fields.
- **Custom** lets you reorder sources by priority. Move a source below **Disabled** to turn it off.
- Returning to Recommended restores its policy without rebuilding the list.

Enabled does not guarantee a result: source coverage, matching identifiers, credentials, and temporary outages still matter.

## Use your own TMDB token

**Your Own TMDB Key** accepts a **TMDB v4 API Read Access Token**, saved on this device. Save it, then use **Verify Key** to check authentication. You can replace or remove it later.

This optional token uses your TMDB rate limit. It is not a media-server credential; never post it publicly.

## Use local metadata for network shares

For movie/TV shares, keep each movie/show in an unambiguous folder. Supported NFO sidecars and named images such as `poster.jpg` and `fanart.jpg` can supply local details and artwork. Match the video's filename (`Movie.mkv`/`Movie.nfo`), or use `tvshow.nfo` at the show's root.

[Rescan](/network-shares/#find-files-and-refresh) after changes and let metadata work finish. Malformed or ambiguous sidecars may be ignored; artwork preferences still control which images win.

## Understand scores and age information

Ratings can come from the media server and configured external providers. AniList anime scores are keyless; TMDB ratings need a usable TMDB token, while OMDb enrichment depends on an OMDb key supplied by the build. There is no general promise that every title has every rating source.

Review-score counts and Common Sense age display can be configured in Home/detail settings. Common Sense guidance comes from eligible Plex movie/show details: open its tile under **Ratings** for topic-by-topic information. Detailed guidance requires Plex Pass access for the account viewing the title. Age guidance is informational, not a content restriction. [Spoiler settings](/spoiler-protection/) can hide scores until watched.

## Wrong or missing information

First check the title, year, episode identity, and owning source. For a server's incorrect match, correct it on that server; do not expect clearing Plozz's cache to change the server catalogue. **Refresh Metadata**, when the title's menu offers it, asks the provider to refresh.

For shares, verify the folder's [content type and scan](/network-shares/). In Metadata Providers, **Diagnostics** shows provider health and caches. **Artwork** and **Lookups** set cache budgets, not offline-video storage limits. **Clear Cache** removes cached lookup data and derived artwork so they can rebuild while browsing; it does not repair an incorrect match or remove downloaded videos.
