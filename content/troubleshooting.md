# Troubleshooting

Check the affected source before reporting a problem.

## Cannot connect or sign in

1. Test the saved address from this device's network, including custom ports/paths; review [connection addresses](/servers/#add-local-or-remote-addresses).
2. If Jellyfin Quick Connect is unavailable, choose username/password sign-in.
3. For Silo, use its browser address and complete approval and any profile PIN.

After [device sync](/profiles-and-sync/), check **Settings > iCloud Sync** for **Needs sign-in** entries. A synced entry is not an authenticated connection.

## Channels or listings are missing

Open Live TV's **Sources**, inspect its error, and choose **Retry**. Refresh after playlist changes.

Check source selection, favorites/guide-only filters, and **Manage channels > Hidden channels**. Missing listings need not prevent playback; a **guide only** connection cannot play channels. See [Live TV](/live-tv/) for mapping, playlist errors, and stream limits.

## A library, title, or picture is wrong

Check profile, server user, enabled libraries, and browse filters. A hidden shortcut does not disable its library. For shares, confirm readability and [scan the folder](/network-shares/). An interrupted [collection check](/library/#browse-a-library) can leave an incomplete list; choose **Try Again**.

For wrong matches or scores, check [Metadata and ratings](/metadata-and-ratings/). Compare a warm/dark picture with [Circadian Mode](/circadian-mode/) disabled before changing HDR settings.

## Playback or downloads fail

Compare another title. On iPhone/iPad, try lower [streaming quality](/streaming-quality/) where supported. If Maximum works but conversion fails, check server capability/permission.

For Apple TV audio stutter, check [height-audio conversion](/audio/). For captions, check [track, style, and timing limits](/subtitles/).

Check download completion, storage, and network policy before removing files; [Watch offline](/downloads/) explains pauses and version-specific copies.

## Sync or tracker settings keep changing

Confirm the profile/account. Prefer [Tracker Retry](/trackers/) to repeated reconnects. Read [reset effects](/profiles-and-sync/#recover-sync-without-erasing-your-setup) before replacing or erasing cloud data.

## Report a problem

On a playback, library, or Live TV error, open **Details** when offered. On iPhone/iPad, **Share details** exports the report; Apple TV displays it onscreen. It excludes server addresses, credentials, account names, and media titles.

Open **Settings > Help & Diagnostics > Report a Problem**; on Apple TV, scan its code or follow the GitHub link. Include version/build, device/OS, provider, error, and reproduction steps. The [community](https://plozz.app/discord) can also help.

**Playback Diagnostics Overlay**, or **Playback Info** in the player's Info card, shows codec, bitrate, buffer, and memory.

On iPhone/iPad, open **Recent Activity**, choose **Refresh**, then **Copy** to include logs in your report.

Log upload requires a configured reporting endpoint and **Share Crash Reports** enabled: choose **Send to Developer** on mobile or **Send Recent Activity to Developer** on Apple TV. This is separate from Share details. Never post passwords, tokens, pairing codes, or private playlist URLs.
