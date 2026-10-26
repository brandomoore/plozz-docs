# IPTV and Live TV

## Add IPTV

1. Choose **IPTV** during first-run setup, or open **Sources > IPTV provider** in Live TV.
2. Choose **Playlist URL** for an M3U address, or **Xtream account** for your server, username, and password.
3. Enter your provider's XMLTV address in **EPG URL (optional)**. Playlist-declared guides or Xtream listings can load automatically. **Advanced options** adds guide URLs, playlist authentication, and separate playlist/stream and guide headers. Guide headers apply only to the first guide URL's server; leave them empty to use playlist credentials.
4. Choose **Connect**, wait for import, then open **Live TV**.

On iPhone/iPad, IPTV sign-in's **Playlist file** imports an M3U from Files. That account catalogue stays local; import a replacement to update it. [Live TV source sync](/profiles-and-sync/#sync-live-tv-deliberately) has a different scope.

Channels work without listings. Plozz supplies no channels or subscription.

For video-stream/web-page import errors, use the provider's direct M3U channel-list link. XMLTV belongs in EPG, not the playlist field. Prefer HTTPS.

## Find on-demand titles

If supplied by your IPTV provider, **Movies** and **TV Shows** libraries appear separately from channels. Enable them under **Settings > Libraries**, then [browse normally](/library/). Channel access does not guarantee an on-demand catalogue.

## Use a connected server

In **Sources > Media server**, select a connected Jellyfin, Emby, or Plex server enabled for this Plozz profile. Let Plozz check access, then choose **Add channels** when offered. **Add guide only** means listings are available but playback is unavailable for that connection.

Server configuration, account permissions, and subscription requirements still apply. Native Silo Live TV is not offered.

## Search the guide

Open Live TV's **Search**, choose **Channels** or **Programs**, and enter a name. Results cover retained listings, not an archive. **Watch channel** tunes live, not from the selected program's beginning.

## Approve playlist sources for Kids

For a Kids profile's playlist source, set a [Parental PIN](/parental-controls/), open **Sources**, select the playlist, and choose **Approve this source**. Approval allows every channel in that source, not age-filtered programs. It stays on this device; choose **Revoke source approval** there to undo it. Changed sources or profile identities can require approval again.

## Watch several channels

Start a channel, open **Multiview**, and add channels. The limit is **four pictures**, with sound from one pane at a time. Your provider’s simultaneous-stream allowance or available tuners may impose a lower limit.

Use **Favorite** to save channels/layout; reopen from **Favorite Multiviews**. This reserves no capacity.

## Organize channels and listings

Press and hold a channel to **Add to Favorites**, **Remove from Favorites**, or **Hide channel**. Favorites and hidden-channel choices belong to the active profile.

In **Manage channels**, review categories, countries/languages, and **Hidden channels**. Category **Show** overrides regional filtering; **Automatic** follows your country/language choices. Regional filtering uses playlist tags, not guesses from channel names. A country OR language match is sufficient; untagged channels can move to Hidden.

Use **Show channel** for an individual exception. Resetting category/region visibility does not undo individually hidden channels or scan exclusions. If channels vanish, also check **Favorites only**, **With guide listings**, and the selected source.

Under **Sources**, open a playlist's **Guide options**. For wrong listings, choose **Correct guide mapping** when offered, find the channel, select its guide source, then choose the correct station and regional feed. Corrections survive guide refreshes; **Use automatic matching** removes an override.

When **Review channel identities** appears in Guide options, select a saved channel and confirm **Restore saved identity** only for the same station/feed. This reuses favorites, hidden state, and guide corrections; otherwise leave the playable entry separate.

Use **Refresh sources** after changes or **Retry** for errors. Longer ranges cannot create listings.

On mobile, **Stop without Wi-Fi or Ethernet** in **Settings > Live TV** stops playback after detected network changes; brief cellular use remains possible. Low Data Mode pauses Live TV even on Wi-Fi; use an unrestricted connection.

## Check unavailable channel links

In **Sources**, select a playlist, open **Check channel availability**, then choose **Scan channels**. Scanning is optional and checks reachability, not playback-format support.

Open **Scan results** to review reachable, unavailable, and uncertain links. Unavailable channels are hidden by the scan; uncertain results need another check. Use **Restore channel** or **Restore hidden channels** to undo scan exclusions. Other category, regional, or individual hiding rules still apply.

## Stop unexpected channel previews

On Apple TV, **Settings > Live TV > Guide preferences > Auto preview** plays the focused channel as you browse. **Keep watching while browsing** keeps the watched channel instead of changing previews; it requires Auto preview.

On both platforms, **Preview after watching** keeps a channel behind the guide after leaving full screen. These controls are separate from [Home trailers](/home-and-navigation/#choose-the-hero).

## Make channels from your libraries

In **Sources > Plozz channels**, **Enable Plozz channels** manages the automatic lineup. **Create custom channel** uses accessible **Plex, Jellyfin, or Emby** libraries, not IPTV or Silo.

Automatic-lineup errors offer **Retry Plozz channels**; **Refresh Plozz channels** rebuilds prepared channels. Automatic channels are not editable.

Choose libraries, movies/episodes, ordering, and optional matching rules. Select **Preview schedule**, inspect matches, then **Save channel**. Invalid or missing durations can exclude titles. Empty title, genre, or rating rules allow all accessible matches; review the preview carefully.

Changes start after published programs. Sharing a schedule requires its catalogue snapshot, not just its recipe.

**Update watch history** defaults off for this profile/device. Enabling it can mark programs watched after 90% viewing, without resume writes. Channels use original files only.

Live TV is experimental; see [controls and buffering](/platform-controls/#live-tv-remote-controls-and-rewind) or [Troubleshooting](/troubleshooting/).
