# IPTV and Live TV

Use Live TV to watch channels from your own IPTV provider or an authorized media server.

## Add IPTV

1. Choose **IPTV** during first-run setup, or open **Sources > IPTV provider** in Live TV.
2. Choose **Playlist URL** for an M3U address, or **Xtream account** for your server, username, and password.
3. Open **Advanced options** to add an XMLTV **Guide URL** if your provider supplies one. Playlist-declared guides can load automatically; Xtream can supply its own listings.
4. Choose **Connect**, wait for the import to finish, and open **Live TV**.

On iPhone and iPad, **Playlist file** can import an M3U from Files. That catalogue stays on the importing device; import a replacement to update it. Use a playlist URL for other devices.

A guide is optional: channels can play without programme listings. Plozz supplies neither channels nor an IPTV subscription.

## Find on-demand titles

If your IPTV provider supplies on-demand movies or shows, available **Movies** and **TV Shows** libraries appear separately from its live channels. Enable them under **Settings > Libraries**, then [browse them normally](/library/). A working channel guide does not guarantee that the provider also supplies an on-demand catalogue.

## Use a connected server

In **Sources > Media server**, select a connected Jellyfin, Emby, or Plex server enabled for this Plozz profile. Let Plozz check access, then choose **Add channels** when offered. **Add guide only** means listings are available but playback is unavailable for that connection.

Server configuration, account permissions, and subscription requirements still apply. Native Silo Live TV is not offered.

## Watch several channels

Start a channel, open **Multiview**, and add channels. The limit is **four pictures**, with sound from one pane at a time. Your provider’s simultaneous-stream allowance or available tuners may impose a lower limit.

Use **Favorite** in Multiview to save its channels and layout, then reopen it from **Favorite Multiviews** in the guide. Saving a layout does not reserve streams or tuners.

## Organize channels and listings

Press and hold a channel to **Add to Favorites**, **Remove from Favorites**, or **Hide channel**. Favorites and hidden-channel choices belong to the active profile.

In **Manage channels**, review categories, countries/languages, and **Hidden channels**. Category **Show** overrides regional filtering; **Automatic** follows your country/language choices. Regional filtering uses playlist tags, not guesses from channel names. A country OR language match is sufficient; untagged channels can move to Hidden.

Use **Show channel** for an individual exception. Resetting category/region visibility does not undo individually hidden channels or scan exclusions. If channels vanish, also check **Favorites only**, **With guide listings**, and the selected source.

Under **Sources**, open a playlist's **Guide options**. For wrong listings, choose **Correct guide mapping** when offered, find the channel, select its guide source, then choose the correct station and regional feed. Corrections survive guide refreshes; **Use automatic matching** removes an override.

The guide-day range retains what the provider supplies; increasing it cannot create missing listings. Use **Refresh sources** after a source changes, or **Retry** for its displayed error.

On mobile, **Stop without Wi-Fi or Ethernet** stops Live TV after a network change is detected; brief cellular use can still occur during the transition.

## Check unavailable channel links

In **Sources**, select a playlist, open **Check channel availability**, then choose **Scan channels**. Scanning is optional and checks reachability, not playback-format support.

Open **Scan results** to review reachable, unavailable, and uncertain links. Unavailable channels are hidden by the scan; uncertain results need another check. Use **Restore channel** or **Restore hidden channels** to undo scan exclusions. Other category, regional, or individual hiding rules still apply.

## Stop unexpected channel previews

On Apple TV, **Settings > Live TV > Guide > Auto preview** plays the focused channel as you browse. **Keep watching while browsing** keeps the watched channel instead of changing previews; it requires Auto preview.

On both platforms, **Preview after watching** keeps a channel playing behind the guide after leaving full screen. Turn it off if you do not want that behavior. These controls are separate from [Home trailers](/home-and-navigation/#choose-the-hero).

## Make channels from your libraries

Open **Sources > Plozz channels** for the automatic lineup and optional custom channels. Custom channels use accessible **Plex, Jellyfin, or Emby** libraries, not arbitrary IPTV URLs or Silo libraries.

Choose the libraries, movies/episodes, ordering, and optional matching rules. Select **Preview schedule**, inspect matches, then **Save channel**. Invalid or missing durations can exclude titles. Empty title, genre, or rating rules allow all accessible matches; review the preview carefully.

Changes begin after already-published programs. Schedules remain device-local until shared with their catalogue snapshot; do not assume that saving a recipe immediately reproduces the same schedule elsewhere.

**Update watch history** can mark a library-channel program watched after 90% viewing. It does not write resume progress, and these channels use original files only.

Live TV is experimental. For setup or playback failures, start with [Troubleshooting](/troubleshooting/) rather than removing all sources.
