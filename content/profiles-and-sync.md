# Profiles and sync

Bring your profiles, preferences, and supported sign-ins to another device with iCloud Sync, or use nearby setup. Viewing progress follows separate rules.

## Use the right profile

Use the profile header in **Settings** to switch before changing libraries or preferences. **Settings > Profiles** manages profiles; [Profiles, kids, and locks](/profiles-and-locks/) explains server identities and authorization.

## Sync settings

1. Use the same iCloud account on each device. During setup, choose **Enable iCloud Sync**. Later, open **Settings > iCloud Sync** and turn on **Sync With iCloud** on Apple TV, or **iCloud Sync** on iPhone/iPad. **Not now** starts locally without deleting an existing cloud setup.
2. Use **Sync Now** to request an update.
3. Open any server marked **Needs sign-in** and complete its setup.

iCloud Sync carries profiles, preferences, server details, watchlist state, supported Live TV configuration, and tracker sign-ins—not downloaded videos.

Supported server and share sign-ins restore through encrypted iCloud storage. Sources must be reachable and credentials valid; restoration cannot grant new permissions.

A compatible Silo server can approve this device automatically if the chosen Silo profile has no PIN. Otherwise, complete sign-in and approval; saved PIN authorization is not copied.

[Library arrangements](/customize-libraries/) and [Watchlist filters and sorting](/watchlist/#filter-and-sort-the-page) follow the profile. On Apple TV, open Plozz to receive changes. Turning sync off stops this device's automatic updates without erasing the cloud setup.

## Restore an existing setup

After enabling sync during first setup, **Restoring setup from iCloud…** shows progress through profiles, servers, and supported sign-ins.

For **Couldn't restore your setup**, check internet access and iCloud sign-in, then choose **Retry**. If restoration stalls or fails, **Set up manually** lets you continue connecting sources yourself. It pauses restoration until setup finishes; iCloud Sync stays on. It is not a cloud reset.

## Keep device-specific choices local

**Display Size**, navigation style, shortcut order and names, and Apple TV's **Prevent Accidental Exit** neither sync nor transfer. Home-row names do, including Watchlist's shared row/shortcut name.

Downloads, [Offline Mode](/downloads/#browse-only-your-downloads), automatic sign-in, [video](/streaming-quality/#adjust-the-video-buffer)/[Live TV buffers](/platform-controls/#live-tv-remote-controls-and-rewind), [Top Shelf](/platform-controls/#launch-from-apple-tv-top-shelf), [external-player choice](/external-players/), and [diagnostics consent](/feedback-and-bugs/#choose-diagnostics-sharing) also stay local.

[Prefer lossless audio](/audio/#choose-output-compatibility) applies across profiles on this device, matching its audio equipment.

## Sync Live TV deliberately

Live TV follows iCloud Sync for each profile. Source addresses, channel settings, guide mappings, and library schedules can sync. Playlist/guide addresses and supported imported playlists use encrypted iCloud storage. Library channels need their catalogue synced to reproduce the same schedule.

IPTV account sign-in's **Playlist file** is different: that imported M3U stays on this device. Use a URL or import it elsewhere.

Grant Kids-profile [playlist approvals](/live-tv/#approve-playlist-sources-for-kids) on each device; these do not cover IPTV accounts. For **Set up IPTV source**, enter its address or update the older sending app.

## Set up another device

Keep both devices on the same local network; allow Local Network access. On the receiver, choose **Set up from another device** on Apple TV or **Set Up from Another Device** on iPhone/iPad. After mobile setup, use **Settings > iCloud Sync > This Device > Set Up From Another Device**.

On the configured device, open **Settings > iCloud Sync**. On Apple TV, also choose **Set Up Another Device**.

Select the receiver or enter its code. Mobile offers **Enter Code** and **Scan QR Code**; scanning needs Camera permission. A configured Apple TV can also display a QR code for a new iPhone/iPad.

Approve only matching verification codes. Same-iCloud-account pairing can verify without this comparison. Only supported sign-ins transfer; Silo requires its own approval through this nearby route. Check **Needs sign-in** afterward.

## Keep watch history separate

Servers store progress for the selected server user, not the Plozz profile name.

Apple TV offers **Settings > Trackers > Sync across all my servers** with multiple servers. On iPhone/iPad, use **Settings > Playback > Sync watch state across servers**. It defaults on: watching, resuming, marking watched/unwatched, or removing from Continue Watching updates matching accessible copies. Turn it off before changes you want kept on one server.

Updates wait while offline or a source is unreachable. On iPhone/iPad, turn **Offline Mode** off. Reconnect and reopen the original authorized profile and server user to retry. A changed card is not confirmation from every server.

[Share history](/network-shares/#keep-your-place) and Plex's saved fallback progress for extras stay local. [Tracker scrobbling](/trackers/) sends activity to external accounts, separately from configuration sync.

## Understand sync data sizes

Open **Settings > iCloud Sync > Troubleshooting** and inspect **Sync Data on This Device**. **Refresh Breakdown** updates the snapshot; retry failures without resetting.

Counts include pending uploads, not deletions. Sizes describe prepared sync data, not iCloud storage usage or downloads. Plozz Channels includes its catalogue; downloaded guides, iCloud Keychain logins, and separately stored Trakt sign-ins are excluded.

## Recover sync without erasing your setup

Check the iCloud account and **Needs sign-in** first. Try **Sync Now** before destructive actions.

Under **Settings > iCloud Sync > Troubleshooting**, **Reload From iCloud** retries shared settings. **Reset Sync** replaces iCloud data with this device's copy; choose the setup you intend to keep.

> [!WARNING]
> **Erase Sync Data** removes synced profiles, settings, servers, watchlist, Live TV sources, and tracker sign-ins from iCloud, and clears the listed local setup while leaving sync off. Turn off sync on other devices first to prevent re-upload. On iPhone/iPad it also removes Plozz's iCloud Keychain server logins; Apple TV's erase screen warns that this additional step requires iPhone/iPad. Read the confirmation rather than using erase as a connection repair.
