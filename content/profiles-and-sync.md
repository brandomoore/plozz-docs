# Profiles and sync

Bring your preferences to another device with iCloud Sync, or use nearby setup to help it sign in. Your viewing progress follows separate rules.

## Use the right profile

Use the profile header in **Settings** to switch before changing libraries or preferences. Open **Settings > Profiles** to manage profiles.

For server users, Kids profiles, locks, and automatic sign-in, see [Profiles, kids, and locks](/profiles-and-locks/).

## Sync settings

1. Use the same iCloud account on each device, then open **Settings > iCloud Sync** and enable sync.
2. Use **Sync Now** to request an update.
3. Review servers marked **Needs sign-in** on that page and complete their setup.

iCloud Sync carries profiles, preferences, server details, watchlist state, supported Live TV configuration, and tracker sign-ins. It does not copy downloaded videos or sign you into every media server.

On Apple TV, open Plozz to receive changes; it checks iCloud when you return to the app.

[Library tabs and Recommended rows](/customize-libraries/), plus [Watchlist filters and sorting](/watchlist/#filter-and-sort-the-page), follow the profile too. They do not grant access to libraries on another device.

With sync and iCloud Keychain available, iPhone/iPad can automatically adopt supported Jellyfin, Plex, Emby, share, and Seerr credentials. Apple TV does not use this iCloud Keychain path; use nearby setup or sign in there. **Silo requires approval on each device**, regardless of sync.

## Keep device-specific choices local

For each profile, **Display Size**, navigation style, shortcut order and ordinary shortcut names stay local, as does Apple TV's **Prevent Accidental Exit**. They neither sync nor transfer. Home-row names do sync, including the shared Watchlist row/shortcut name.

Downloads, [Offline Mode](/downloads/#browse-only-your-downloads), automatic sign-in, [Video buffer](/streaming-quality/), [Live TV buffer](/platform-controls/#live-tv-remote-controls-and-rewind), and [Top Shelf preferences](/platform-controls/#launch-from-apple-tv-top-shelf) also stay local. So do the device-wide [external-player choice](/external-players/) and [diagnostics consent](/feedback-and-bugs/#choose-diagnostics-sharing).

[Prefer lossless audio](/audio/#choose-output-compatibility) applies across profiles on this device, matching its audio equipment.

## Sync Live TV deliberately

For the same profile, Live TV source addresses, channel settings, guide mappings, and library schedules can sync. Playlist/guide addresses and supported imported source copies use encrypted iCloud storage. Library channels also need their catalogue synced to reproduce the same schedule.

The **Playlist file** option in IPTV account sign-in is different: those account-imported M3U files stay on the importing device. Use a playlist URL or import again elsewhere.

Grant Kids-profile [standalone playlist approvals](/live-tv/#approve-playlist-sources-for-kids) on each device; they do not cover IPTV accounts. For **Set up IPTV source**, enter its address or update the older sending app. Synced details alone may not connect.

## Set up another device

Keep both devices on the same local network and allow Plozz Local Network access. During setup, choose **Set up from another device** on Apple TV or **Set Up from Another Device** on iPhone/iPad. On a configured iPhone/iPad, use **Settings > iCloud Sync > This Device > Set Up From Another Device**.

On the configured device, open **Settings > iCloud Sync**. On Apple TV, also choose **Set Up Another Device**.

Select the nearby receiver or enter its code. On iPhone/iPad, choose **Enter Code** or **Scan QR Code**; scanning needs Camera permission. Alternatively, scan the configured Apple TV's QR code with a new iPhone/iPad.

Approve only matching verification codes. Same-iCloud-account pairing can verify the device without this comparison. Only supported sign-ins transfer; check **Needs sign-in** afterward.

## Keep watch history separate

Media servers store progress for the selected server user, not simply the Plozz profile name.

On Apple TV, open **Settings > Trackers > Sync across all my servers**; you can change it when multiple servers are connected. On iPhone/iPad, use **Settings > Playback > Sync watch state across servers**. This defaults on and updates matching accessible copies when you watch, resume, mark watched/unwatched, or remove a title from Continue Watching. Turn it off before making changes you want kept on one server.

Updates wait while offline or a source is unreachable. On iPhone/iPad, turn **Offline Mode** off. Reconnect and reopen the original authorized profile and server user to retry; a changed card is not confirmation from every server.

[Network-share history](/network-shares/#keep-your-place) and Plex's saved fallback progress for extras stay on this device. iCloud Sync does not copy them. [Tracker scrobbling](/trackers/) sends activity to external accounts instead of copying your configuration.

## Understand sync data sizes

Open **Settings > iCloud Sync > Troubleshooting** and inspect **Sync Data on This Device**. **Refresh Breakdown** updates the snapshot; if it fails, retry without resetting your setup.

Counts include pending uploads, not pending deletions. Sizes describe this device's prepared sync data, not iCloud storage usage or downloaded videos. Plozz Channels includes its library catalogue; downloaded IPTV guides, iCloud Keychain logins, and separately stored Trakt sign-ins are excluded.

## Recover sync without erasing your setup

Check the iCloud account and **Needs sign-in** entries first. Use **Sync Now** before destructive actions.

On Apple TV, iPhone, or iPad, open **Settings > iCloud Sync > Troubleshooting**. **Reload From iCloud** retries loading shared settings. **Reset Sync** replaces iCloud data with this device's copy; choose the device with the setup you intend to keep.

> [!WARNING]
> **Erase Sync Data** removes synced profiles, settings, servers, watchlist, Live TV sources, and tracker sign-ins from iCloud, and clears the listed local setup while leaving sync off. Turn off sync on other devices first to prevent re-upload. On iPhone/iPad it also removes Plozz's iCloud Keychain server logins; Apple TV's erase screen warns that this additional step requires iPhone/iPad. Read the confirmation rather than using erase as a connection repair.
