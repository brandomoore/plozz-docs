# Profiles and sync

Bring profiles, preferences, and supported sign-ins to another device with iCloud Sync or nearby setup. Viewing progress follows separate rules.

## Use the right profile

Use the **Settings** header to switch profiles; **Settings > Profiles** manages [profiles and authorization](/profiles-and-locks/).

## Sync settings

1. Use the same iCloud account on each device. Choose **Enable iCloud Sync** during setup, or open **Settings > iCloud Sync** later. Turn on **Sync With iCloud** on Apple TV, or **iCloud Sync** on iPhone/iPad. **Not now** leaves an existing cloud setup untouched.
2. Choose **Sync Now**, then complete setup for servers marked **Needs sign-in**.

iCloud Sync carries profiles, preferences, server details, watchlist state, supported Live TV configuration, and tracker sign-ins—not downloaded videos.

Synced sign-ins use encrypted iCloud storage. Your server must still be reachable and allow access.

A compatible Silo server can approve this device automatically for a PIN-free Silo profile. Otherwise, sign in and obtain approval; saved PIN authorization is not copied.

[Library arrangements](/customize-libraries/) and [Watchlist browse choices](/watchlist/#filter-and-sort-the-page) follow the profile. Open Plozz on Apple TV to receive changes. Turning sync off stops updates without erasing cloud data.

## Decide which sign-ins to save

With sync on, **Save Sign-ins to iCloud?** can appear for existing sign-ins after setup. Review the servers and users:

- **Keep on This Device** declines that upload; profiles and settings still sync.
- **Save to iCloud** lets your other devices restore these sign-ins.

New sign-ins can sync without prompting after Plozz verifies the iCloud account. Changing iCloud accounts does not upload existing sign-ins. To share one there, or reconsider a declined upload, [sign in again](/servers/#restore-a-saved-sign-in) with sync on.

## Restore an existing setup

After enabling sync during first setup, **Restoring setup from iCloud…** shows progress through profiles, servers, and supported sign-ins.

For **Couldn't restore your setup**, check internet and iCloud sign-in, then **Retry**. If restoration stalls or fails, **Set up manually** pauses restoration while you finish setup yourself. Sync stays on; this does not reset cloud data.

## Keep device-specific choices local

**Display Size**, navigation style, shortcut order and names, and Apple TV's **Prevent Accidental Exit** neither sync nor transfer. Home-row names do, including Watchlist's shortcut name.

Downloads, [Offline Mode](/downloads/#browse-only-your-downloads), automatic sign-in, [video](/streaming-quality/#adjust-the-video-buffer)/[Live TV buffers](/platform-controls/#live-tv-remote-controls-and-rewind), [Top Shelf](/platform-controls/#launch-from-apple-tv-top-shelf), [external-player choice](/external-players/), and [diagnostics consent](/feedback-and-bugs/#choose-diagnostics-sharing) stay local too.

[Prefer lossless audio](/audio/#choose-output-compatibility) is shared locally to match this device's equipment.

## Sync Live TV deliberately

Source addresses, channel settings, guide mappings, and library schedules can sync per profile. Playlist/guide addresses and supported imported playlists use encrypted storage. Library channels need their catalogue synced to reproduce schedules.

IPTV account sign-in's **Playlist file** stays on this device. Use a URL or import the M3U elsewhere.

Grant Kids-profile [playlist approvals](/live-tv/#approve-playlist-sources-for-kids) on each device; these do not cover IPTV accounts. For **Set up IPTV source**, enter its address or update the older sending app.

## Set up another device

Use the same local network and allow Local Network access. The receiver offers **Set up from another device** on Apple TV or **Set Up from Another Device** on iPhone/iPad. After mobile setup, use **Settings > iCloud Sync > This Device > Set Up From Another Device**.

On the configured device, open **Settings > iCloud Sync**. On Apple TV, also choose **Set Up Another Device**.

Select the receiver, use **Enter Code**, or **Scan QR Code** on mobile; scanning needs Camera permission. A configured Apple TV can show a code for a new iPhone/iPad.

Approve only matching verification codes; same-iCloud pairing can verify without comparison. Only supported sign-ins transfer. Silo needs separate approval through this route. Check **Needs sign-in** afterward.

## Keep watch history separate

Servers store progress for the server user, not the Plozz profile name.

Apple TV offers **Settings > Trackers > Sync across all my servers** with multiple servers. On iPhone/iPad, use **Settings > Playback > Sync watch state across servers**. It defaults on: watching, resuming, marking watched/unwatched, or removing from Continue Watching updates matching accessible copies. Turn it off before changes you want kept on one server.

Updates wait while offline or a source is unreachable. On iPhone/iPad, turn **Offline Mode** off. Reconnect using the original authorized profile and server user to retry. A changed card is not confirmation from every server.

[Share history](/network-shares/#keep-your-place) and Plex's saved fallback progress for extras stay local. [Tracker scrobbling](/trackers/) sends activity to external accounts, separately from configuration sync.

## Understand sync data sizes

Under **Settings > iCloud Sync > Troubleshooting**, **Sync Data on This Device** shows prepared data; **Refresh Breakdown** updates it.

Counts include pending uploads, not deletions. Sizes aren't iCloud storage usage or downloads. Plozz Channels includes its catalogue; downloaded guides, iCloud Keychain logins, and separate Trakt sign-ins are excluded.

## Recover sync without erasing your setup

Check the iCloud account and **Needs sign-in**, then try **Sync Now**. If iCloud is temporarily unavailable, wait and retry rather than reset. A local-data preparation error does not mean your saved data was removed.

Under **Settings > iCloud Sync > Troubleshooting**, **Reload From iCloud** retries shared settings. **Reset Sync** replaces iCloud data with this device's copy; choose the setup you intend to keep.

> [!WARNING]
> **Erase Sync Data** removes synced profiles, settings, servers, watchlist, Live TV sources, and tracker sign-ins from iCloud and the listed local setup, leaving sync off. Turn sync off elsewhere first to prevent re-upload. It also erases Plozz's iCloud Keychain logins on iPhone/iPad; Apple TV requires an iPhone/iPad for that step. Read the confirmation before erasing.
