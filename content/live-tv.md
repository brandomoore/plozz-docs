# IPTV and Live TV

Watch your channels together in one guide, or build scheduled channels from your libraries.

## Add IPTV

1. Choose **IPTV** during first-run setup, or open **Sources > IPTV provider** in Live TV.
2. Choose **Playlist URL** for an M3U address, or **Xtream account** for your server, username, and password.
3. Enter your provider's XMLTV address in **EPG URL (optional)**. Playlist-declared guides or Xtream listings can load automatically. **Advanced options** adds guide URLs, playlist authentication, and separate playlist/stream and guide headers. Guide headers apply only to the first guide URL's server; leave them empty to use playlist credentials.
4. Choose **Connect**, wait for import, then open **Live TV**.

On iPhone/iPad, IPTV sign-in's **Playlist file** imports an M3U from Files. This catalogue stays local; reimport to update it. [Live TV source sync](/profiles-and-sync/#sync-live-tv-deliberately) differs.

Channels work without listings. Plozz supplies no channels or subscription.

For import errors, use the provider's direct M3U link, not a web page. Put XMLTV in EPG. Prefer HTTPS.

## Find on-demand titles

If supplied by your IPTV provider, **Movies** and **TV Shows** libraries appear separately from channels. Enable them under **Settings > Libraries**, then [browse normally](/library/). Channel access does not guarantee an on-demand catalogue.

## Use a connected server

In **Sources > Media server**, select a connected Jellyfin, Emby, or Plex server enabled for this Plozz profile. Let Plozz check access, then choose **Add channels** when offered. **Add guide only** means listings are available but playback is unavailable for that connection.

Server configuration, account permissions, and subscription requirements still apply. Native Silo Live TV is not offered.

## Search the guide

Open Live TV's **Search**, choose **Channels** or **Programs**, and enter a name. Results cover retained listings, not an archive. **Watch channel** tunes live, not from the selected program's beginning.

## Approve playlist sources for Kids

First set a [Parental PIN](/parental-controls/), then switch to the Kids profile and open **Sources**. Enter the PIN when prompted; select **Unlock TV sources** first if offered. Select an enabled playlist, choose **Approve this source**, and enter the PIN again to save approval.

Approval allows every channel in that source, not age-filtered programs. It stays on this device; choose **Revoke source approval** to undo it. Source or profile-identity changes can require approval again.

## Watch several channels

Start a channel, open **Multiview**, add channels, then choose **Watch**. The limit is **four pictures**, with one audible pane. On Apple TV, focus a pane for sound; on iPhone/iPad, choose **Audio**. Provider stream/tuner limits may be lower.

Use **Favorite** to save channels/layout; reopen from **Favorite Multiviews**. This reserves no capacity.

## Organize channels and listings

Hold a channel for favorites or hiding actions. Open **Manage channels** for category, country/language, and hidden-channel choices. Follow [Organize channels and fix listings](/live-tv-channels/) for visibility rules, persistent guide corrections, and saved-channel identity checks.

Use **Refresh sources** after changes or **Retry** for errors.

On mobile, **Stop without Wi-Fi or Ethernet** in **Settings > Live TV** stops playback after detected network changes; brief cellular use remains possible. Low Data Mode pauses Live TV even on Wi-Fi; use an unrestricted connection.

## Add movies and shows to a playlist connection

If you connected a simple playlist source but now need authentication or its on-demand catalogue, open **Sources**, select it, then choose **Connect as IPTV account** when offered. Finish account setup; your existing source and channel preferences remain saved. Disable the old source afterward to avoid duplicate channels.

## Check unavailable channel links

Under a playlist in **Sources**, **Check channel availability** offers optional reachability checks. See [check unavailable links](/live-tv-channels/#check-unavailable-links) before scanning: unavailable channels are hidden, but you can restore them.

## Stop unexpected channel previews

On Apple TV, **Settings > Live TV > Guide preferences > Auto preview** plays the focused channel as you browse. **Keep watching while browsing** keeps the watched channel instead of changing previews; it requires Auto preview.

On both platforms, **Preview after watching** keeps a channel behind the guide after leaving full screen. These controls are separate from [Home trailers](/home-and-navigation/#choose-the-hero).

## Make channels from your libraries

Open **Sources > Plozz channels**. Turn on **Auto-create channels from your libraries** for an automatic lineup, or choose **Create custom channel** to design your own. Both use accessible **Plex, Jellyfin, or Emby** libraries, not IPTV or Silo.

Automatic-lineup errors offer **Retry Plozz channels**; **Refresh Plozz channels** rebuilds prepared channels. Automatic channels are not editable.

1. Name your custom channel and set its **Order**. Enable **Movies**, **Episodes**, or both; movie-only ordering disables Episodes.
2. Select **Source libraries**, then add any title, genre, or rating rules. Separate multiple entries with semicolons. Empty rules allow all accessible matches.
3. Choose **Preview schedule** and check the programs, then **Save channel**. Titles with missing or invalid durations are excluded.

Changes take effect after programs already on the schedule. Let the library catalogue [finish syncing](/profiles-and-sync/#sync-live-tv-deliberately) before expecting the same schedule on another device.

**Update watch history** defaults off for this profile on this device. Turn it on to mark programs watched after viewing 90%; it does not save resume positions. [Cross-server history](/profiles-and-sync/#keep-watch-history-separate) and eligible [connected trackers](/trackers/) can receive completions. Channels play original files.

Live TV is experimental; see [controls and buffering](/platform-controls/#live-tv-remote-controls-and-rewind) or [Troubleshooting](/troubleshooting/).
