# Troubleshooting

Check the affected source before reporting a problem.

## Cannot connect or sign in

1. Check that the server is reachable from this device’s network and that its saved address is correct.
2. For custom ports or reverse-proxy paths, enter the full server address.
3. If Jellyfin Quick Connect is unavailable, choose username-and-password sign-in.
4. For Silo, use its browser address and complete device approval and any profile PIN.

After [syncing another device](/profiles-and-sync/), check **Settings > iCloud Sync** for **Needs sign-in** servers. A synced server entry is not proof that this device is signed in.

## Channels or listings are missing

Open Live TV's **Sources**, inspect the affected source's error, and choose **Retry**. Refresh sources after your provider changes a playlist.

Check source selection, favorites/guide-only filters, and **Manage channels > Hidden channels**. Missing guide listings do not necessarily prevent playback; a connection added as **guide only** cannot play its channels. See [Live TV](/live-tv/) for guide mapping and Multiview stream limits.

## A library, title, or picture is wrong

Check the active profile, selected server user, enabled libraries, and browse filters. A hidden navigation shortcut does not disable the library. For shares, confirm files are readable and [scan the selected folder](/network-shares/).

For incorrect matches or missing scores, check [Metadata and ratings](/metadata-and-ratings/). If the whole picture is warm or dark, compare with [Circadian Mode](/circadian-mode/) disabled before changing HDR settings.

## Playback or downloads fail

Compare another title from that source. On iPhone/iPad, try lower [streaming quality](/streaming-quality/) on an eligible server; if Original works but conversion fails, check server conversion capability or permission.

For track-specific stutter on Apple TV, check [height-audio conversion](/audio/). For missing or mistimed captions, check the [selected track, style limits, and timing](/subtitles/).

For downloads, inspect completion, storage, and network-policy status before removing anything; [Watch offline](/downloads/) explains pauses and version-specific copies.

## Sync or tracker settings keep changing

Confirm the profile and account first. [Tracker Retry](/trackers/) is safer than repeatedly reconnecting. Read [sync recovery and reset effects](/profiles-and-sync/) before replacing or erasing cloud data.

## Report a problem

Open **Settings > Help & Diagnostics**. Choose **Report a Problem** on iPhone/iPad; on Apple TV, scan the displayed code or follow its GitHub link. You can also ask in the [Plozz community](https://plozz.app/discord).

Include your app version/build from Settings, device and OS, provider, exact error, and steps to reproduce.

On iPhone/iPad, open **Recent Activity**, choose **Refresh**, then **Copy** to include logs in your report.

Sending diagnostics requires a configured reporting endpoint and **Share Crash Reports** enabled. Choose **Send to Developer** on iPhone/iPad, or **Send Recent Activity to Developer** on Apple TV. An unavailable reporting control can be a build limitation. Never post passwords, API tokens, pairing codes, or private playlist URLs.
