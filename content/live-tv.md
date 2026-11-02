# IPTV and Live TV

Bring IPTV and server channels together, or make scheduled channels from your library.

## Add IPTV

1. Choose **IPTV** during setup. Later, use **TV Sources > IPTV provider** in Live TV, or **Settings > Live TV > Add TV Source > IPTV provider**.
2. Choose **Playlist URL** for an M3U address, or **Xtream account** for your server, username, and password.
3. Enter your provider's XMLTV address in **EPG URL (optional)**. Playlist-declared guides or Xtream listings can load automatically. **Advanced options** adds guide URLs, playlist authentication, and separate playlist/stream and guide headers. Guide headers apply only to the first guide URL's server; leave them empty to use playlist credentials.
4. Choose **Connect**, then **Live TV**. Channels may appear before listings; [check guide progress](/live-tv-channels/#wait-for-an-iptv-guide).

On iPhone/iPad, **Playlist file** imports a local M3U catalogue from Files; reimport to update it. [Live TV source sync](/profiles-and-sync/#sync-live-tv-deliberately) differs.

Plozz supplies no channels or subscriptions. Guide listings are optional.

If import fails, use a direct M3U link, not a web page. Prefer HTTPS.

## Find on-demand titles

Providers may supply separate **Movies** and **TV Shows** libraries. Enable them under **Settings > Libraries**, then [browse normally](/library/). Channel access does not guarantee an on-demand catalogue.

## Use a connected server

In **TV Sources > Media server**, select a connected Jellyfin, Emby, or Plex server enabled for this Plozz profile. Plozz checks access; choose **Add channels** when offered. **Add guide only** means listings are available but playback is unavailable for that connection.

Server configuration, account permissions, and subscription requirements still apply. Native Silo Live TV is not offered.

## Search the guide

Open Live TV's **Search**, choose **Channels** or **Programs**, and enter a name. Results cover retained listings, not an archive. **Watch channel** tunes live, not from the program's beginning.

## Approve playlist sources for Kids

These approvals protect standalone playlists, not IPTV accounts connected through **IPTV provider**. For accounts, [choose suitable sources for the Kids profile](/parental-controls/#choose-suitable-media-sources).

Set a [Parental PIN](/parental-controls/), switch to the Kids profile, and open **TV Sources**. Enter the PIN when prompted; choose **Unlock TV sources** first if offered. Select an enabled standalone playlist, choose **Approve this source**, and enter the PIN again.

Approval allows every channel in that source, not age-filtered programs. It stays on this device; choose **Revoke source approval** to undo it. Source or profile-identity changes can require approval again.

## Watch several channels

Start a channel, open **Multiview**, add channels, then choose **Watch**. The limit is **four pictures**, with one audible pane. On Apple TV, focus a pane for sound; on iPhone/iPad, choose **Audio**. Provider stream/tuner limits may be lower.

Use **Favorite** to save channels/layout; reopen from **Favorite Multiviews**. This reserves no capacity.

## Organize channels and listings

Hold a channel for favorites or hiding actions. **Manage channels** offers category, country/language, and hidden-channel choices. See [Organize channels and fix listings](/live-tv-channels/) for visibility rules and connection-specific guide tools.

Use **Refresh sources** after changes or **Retry** for errors.

On mobile, **Stop without Wi-Fi or Ethernet** in **Settings > Live TV** stops playback after detected network changes; brief cellular use remains possible. Low Data Mode pauses Live TV even on Wi-Fi; use an unrestricted connection.

## Add movies and shows to a playlist connection

Open **TV Sources**, select a standalone playlist, then **Connect as IPTV account** when offered for authentication or on-demand titles. The old source and its channel choices stay saved; disable it to avoid duplicates. The new account does not use [Kids playlist approvals](/parental-controls/#choose-suitable-media-sources).

## Check unavailable channel links

Standalone playlists offer **Check channel availability** under **TV Sources**. [Check unavailable links](/live-tv-channels/#check-unavailable-links) explains scanning and restoring channels hidden by a scan.

## Stop unexpected channel previews

On Apple TV, **Settings > Live TV > Guide preferences > Auto preview** plays the focused channel as you browse. **Keep watching while browsing** keeps the watched channel instead of changing previews; it requires Auto preview.

On both platforms, **Preview after watching** keeps a channel behind the guide after leaving full screen. These controls are separate from [Home trailers](/home-and-navigation/#choose-the-hero).

## Make channels from your libraries

Open **TV Sources > Plozz channels**. Turn on **Auto-create channels from your libraries**, or choose **Create custom channel**. Both use accessible Plex, Jellyfin, Emby, or Silo libraries, not IPTV or network shares. Silo needs a compatible server offering original-file playback.

Use **Retry Plozz channels** after an error, or **Refresh Plozz channels** to rebuild automatic channels. They are not editable.

1. Enter **Channel name** and set its **Order**. Enable **Movies**, **Episodes**, or both; movie-only ordering disables Episodes.
2. Select **Source libraries**, then add title, genre, or rating rules, separating entries with semicolons. Empty fields allow all accessible matches. **Allowed ratings** matches exact server classifications, not an age ceiling. **Include unrated titles** starts on; turn it off to exclude titles without a rating.
3. Choose **Preview schedule** and check the programs, then **Save channel**. Titles with missing or invalid durations are excluded.

Changes wait until already-scheduled programs finish. Let the library catalogue [finish syncing](/profiles-and-sync/#sync-live-tv-deliberately) before expecting the same schedule on another device.

Select a custom channel to edit it, or hold it for **Delete channel**. Your media files stay untouched.

**Update watch history** defaults off for this profile on this device. Turn it on to mark programs watched after viewing 90%; it does not save resume positions. [Cross-server history](/profiles-and-sync/#keep-watch-history-separate) and eligible [connected trackers](/trackers/) can receive completions. Channels play original files.

Live TV is experimental; see [controls and buffering](/platform-controls/#live-tv-remote-controls-and-rewind) or [Troubleshooting](/troubleshooting/).
