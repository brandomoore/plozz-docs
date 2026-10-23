# Troubleshooting

Use narrow checks before resetting your setup.

## Cannot connect or sign in

1. For local sources, allow Local Network access in device settings. Test the address, including ports/paths; review [connection addresses](/servers/#add-local-or-remote-addresses).
2. If Jellyfin Quick Connect is unavailable, use username/password. For expired logins, use [Sign In Again](/servers/#restore-a-saved-sign-in), not account removal.
3. For Silo, complete browser approval and any profile PIN.

If a Plex Home check fails, choose **Try Again** or **Sign In Again** when offered. Relink the original Plex account, then retry the intended Home user; this does not reset its PIN.

After [device sync](/profiles-and-sync/), check **Settings > iCloud Sync** for **Needs sign-in** entries. A synced entry is not an authenticated connection.

## Channels or listings are missing

Open Live TV's **Sources**, inspect its error, and choose **Retry**. Refresh after playlist changes.

Check source selection, favorites/guide-only filters, and **Manage channels > Hidden channels**. Missing listings need not prevent playback; a **guide only** connection cannot play channels. See [Live TV](/live-tv/) for mapping, playlist errors, and stream limits.

## A library, title, or picture is wrong

Check profile, server user, enabled libraries, and browse filters. A hidden shortcut does not disable its library. For shares, confirm readability and [scan the folder](/network-shares/). Incomplete [library](/library/#browse-a-library) or Continue Watching results offer **Details** and **Try Again** where available.

For wrong matches or scores, check [Metadata and ratings](/metadata-and-ratings/). Compare a warm/dark picture with [Circadian Mode](/circadian-mode/) disabled before changing HDR settings.

## Playback or downloads fail

Compare another title. On iPhone/iPad, try lower [streaming quality](/streaming-quality/) where supported. If Maximum works but conversion fails, check server capability/permission.

Select **No streams found** on a title's details to recheck the source without starting playback, or choose another accessible copy.

For audio, check [track selection and timing](/audio/). For captions, check [track, style, and timing limits](/subtitles/).

Check download completion, storage, and network policy before removing files; [Watch offline](/downloads/) explains pauses and version-specific copies.

## Sync or tracker settings keep changing

Confirm the profile/account. Prefer [Tracker Retry](/trackers/) to repeated reconnects. Read [reset effects](/profiles-and-sync/#recover-sync-without-erasing-your-setup) before replacing or erasing cloud data.

## Report a problem

On a playback, library, or Live TV error, open **Details** when offered. On iPhone/iPad, **Share details** exports the report; Apple TV displays it onscreen. It excludes server addresses, credentials, account names, and media titles.

Open **Settings > Help & Diagnostics > Report a Problem**; on Apple TV, scan its code. See [Feedback and bug reports](/feedback-and-bugs/) for destinations and what to include.

Use [Playback Info or the diagnostics overlay](/platform-controls/#read-playback-information) to inspect engine, delivery, and measured stream/buffer facts.

In mobile **Recent Activity**, use **Refresh**, then **Copy** for logs.

Local error details do not require [diagnostics-sharing consent](/feedback-and-bugs/#choose-diagnostics-sharing); log uploads do. Never post passwords, tokens, pairing codes, or private playlist URLs.
