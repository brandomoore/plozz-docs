# Metadata and ratings

Plozz combines library and online metadata without granting media access.

For regional release dates and watch offers, see [Release & Availability](/media-requests/#read-release-and-availability-information).

## Choose information sources

Open **Settings > Metadata Providers**, or follow **Metadata Providers (TMDB, TheTVDB…)** from Artwork settings.

Controls are **shared by all profiles**, unlike [artwork presentation](/appearance/).

- **Recommended:** Plozz chooses sources for individual fields.
- **Custom:** reorder sources; move one below **Disabled** to disable it.
- Recommended restores its policy without rebuilding the list.

Results depend on coverage, matching identifiers, credentials, and outages.

## Use your own TMDB token

**Your Own TMDB Key** accepts a **TMDB v4 API Read Access Token**, saved on this device. Save it, then **Verify Key**. Replace or remove it later.

This optional token uses your TMDB rate limit. It is not a media-server credential; never post it publicly.

## Use local metadata for network shares

For movie/TV shares, keep each movie/show in an unambiguous folder. Supported NFO sidecars and images such as `poster.jpg`/`fanart.jpg` supply local details/artwork. Match the video filename (`Movie.mkv`/`Movie.nfo`), or use `tvshow.nfo` at the show's root.

[Rescan](/network-shares/#find-files-and-refresh) after changes and let metadata work finish. Malformed or ambiguous sidecars may be ignored; artwork preferences still control which images win.

## Understand scores and age information

Ratings can come from the media server and configured external providers. AniList anime scores are keyless; TMDB ratings need a usable TMDB token, while OMDb enrichment depends on an OMDb key supplied by the build. There is no general promise that every title has every rating source.

Configure review-score counts and Common Sense age display in Home/detail settings. For eligible Plex movies/shows, open the Common Sense tile under **Ratings**. Detailed guidance requires Plex Pass access for the viewing account. This is information, not a restriction. [Spoiler settings](/spoiler-protection/) can hide scores until watched.

## Hide classification badges

In **Settings > Screens & Navigation**, under **All screens**, turn off **Show content ratings** to hide classifications such as PG-13 across Home, details, and Apple TV Top Shelf. This profile preference defaults on. It does not hide review scores, replace Common Sense guidance, or restrict access.

## Wrong or missing information

Check title, year, episode identity, and source. Correct server mismatches on the server; clearing Plozz's cache cannot change its catalogue. **Refresh Metadata**, when offered, asks the provider to refresh.

For shares, verify the folder's [content type and scan](/network-shares/). In Metadata Providers, **Diagnostics** shows provider health and caches. **Artwork** and **Lookups** set cache budgets, not offline-video storage limits. **Clear Cache** removes cached lookup data and derived artwork so they can rebuild while browsing; it does not repair an incorrect match or remove downloaded videos.
