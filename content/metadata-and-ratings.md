# Metadata and ratings

Plozz combines library and online metadata without granting media access.

For regional dates and watch offers, see [Release & Availability](/media-requests/#read-release-and-availability-information).

## Choose information sources

Open **Settings > Metadata Providers**, or follow **Metadata Providers (TMDB, TheTVDB…)** from Artwork settings.

Controls are **shared by all profiles**, unlike [artwork presentation](/appearance/).

- **Recommended:** chooses sources per field.
- **Custom:** reorder sources; move one below **Disabled** to disable it.

Recommended restores policy without rebuilding the list.

Results depend on coverage, matching identifiers, credentials, and outages.

## Use your own TMDB token

**Your Own TMDB Key** accepts a **TMDB v4 API Read Access Token**, saved on this device. Save it, then **Verify Key**. Replace or remove it later.

This optional token uses your TMDB rate limit. It is not a server credential; never post it publicly.

## Use local metadata for network shares

For movie/TV shares, use unambiguous folders. Supported NFO sidecars and images such as `poster.jpg`/`fanart.jpg` supply details/artwork. Match filenames (`Movie.mkv`/`Movie.nfo`), or use `tvshow.nfo` at the show's root.

[Rescan](/network-shares/#find-files-and-refresh) after changes and let metadata work finish. Malformed or ambiguous sidecars may be ignored; artwork preferences still control which images win.

## Understand scores and age information

Ratings come from servers or external providers. AniList anime scores are keyless; TMDB needs a usable token, and OMDb needs a build-supplied key. Coverage varies.

Set review-score counts and Common Sense age display in Home/detail settings. For eligible Plex movies/shows, open the Common Sense tile under **Ratings**; detailed guidance needs the viewing account's Plex Pass. This is information, not restrictions. [Spoiler settings](/spoiler-protection/) can hide scores until watched.

### Read Jellyfin plugin ratings

With Jellyfin's **MDBList Ratings plugin** installed and its cache populated, opening details can show server-provided scores in server order instead of Plozz's external enrichment. No extra Plozz key or switch is needed. Plozz reads cached results, never refreshes the plugin's services. Missing/unusable results retain ordinary ratings. This integration does not apply to Emby.

## Hide classification badges

Under **Settings > Screens & Navigation > All screens**, turn off **Show content ratings** to hide classifications across Home, details, and Apple TV Top Shelf. This profile preference defaults on; it neither hides review scores nor replaces Common Sense guidance or access restrictions.

## Wrong or missing information

Check title, year, episode identity, and source. Correct server mismatches on the server; clearing Plozz's cache cannot change its catalogue. **Refresh Metadata**, when offered, asks the provider to refresh.

For shares, check [content type and scanning](/network-shares/). Metadata Providers' **Diagnostics** shows provider health/caches. **Artwork** and **Lookups** set cache budgets, not video storage limits. **Clear Cache** removes cached lookups and derived artwork to rebuild while browsing. It cannot repair incorrect matches or remove downloaded videos.
