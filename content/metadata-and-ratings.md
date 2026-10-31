# Metadata and ratings

Choose where Plozz gets descriptions, artwork, and ratings, or correct information that does not match a title.

For regional dates and watch offers, see [Release & Availability](/media-requests/#read-release-and-availability-information).

## Choose information sources

Open **Settings > Metadata Providers**, or follow **Metadata Providers (TMDB, TheTVDB…)** from Artwork settings.

These choices are **shared by all profiles**, unlike [artwork preferences](/appearance/).

- **Recommended**: lets Plozz choose sources for each kind of information.
- **Custom**: reorder sources; move one below **Disabled** to disable it.

Switching back to Recommended keeps your custom order saved. Results depend on correct title matching and available sources.

## Use your own TMDB token

Under **Your Own TMDB Key**, enter a **TMDB v4 API Read Access Token**, choose **Save Key**, then **Verify Key**. It stays on this device.

This optional token uses your TMDB rate limit. It is not a server credential; never post it publicly.

## Use local metadata for network shares

For movie/TV shares, NFO files alongside videos and images such as `poster.jpg`/`fanart.jpg` can supply descriptions and artwork. Match filenames (`Movie.mkv`/`Movie.nfo`), or use `tvshow.nfo` at the show's root.

[Rescan](/network-shares/#find-files-and-refresh) after changes. Invalid or ambiguous NFO files may be ignored; artwork preferences still determine which images appear.

## Understand scores and age information

Scores vary by provider. AniList anime scores need no key; TMDB needs a usable token, and OMDb needs a key configured in the app build.

Set review-score counts and Common Sense age display in [Home/detail settings](/home-and-navigation/). For eligible Plex movies/shows, open the Common Sense tile under **Ratings**; detailed guidance needs the viewing account's Plex Pass. This informs viewing choices, not access restrictions. [Spoiler settings](/spoiler-protection/) can hide scores until watched.

### Read Jellyfin plugin ratings

With Jellyfin's **MDBList Ratings plugin** installed and its cache populated, details can show its scores in server order. No extra Plozz key or switch is needed. Plozz reads cached results; it cannot refresh the plugin. Missing or unusable results leave ordinary ratings in place. This does not apply to Emby.

## Hide classification badges

Under **Settings > Screens & Navigation > All screens**, turn off **Show content ratings** to hide classifications across Home, details, and Apple TV Top Shelf. This profile preference defaults on; it neither hides review scores nor replaces Common Sense guidance or access restrictions.

## Wrong or missing information

Check the title, year, episode, and source. Correct server mismatches on the server. **Refresh Metadata**, when offered, asks the provider to refresh.

For shares, check [content type and scanning](/network-shares/). Metadata Providers' **Diagnostics** shows provider health and cached data. **Artwork** and **Lookups** set cache budgets, not video storage limits. **Clear Cache** rebuilds saved lookups and artwork as you browse; it cannot repair incorrect matches or remove downloads.
