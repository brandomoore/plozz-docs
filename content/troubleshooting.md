# Troubleshooting

Try these checks before resetting.

## Cannot connect or sign in

1. Allow Local Network access for local sources, then check the [connection address](/servers/#add-local-or-remote-addresses).
2. If Jellyfin Quick Connect is unavailable, use username/password. Restore logins with [Sign In Again](/servers/#restore-a-saved-sign-in), not account removal.
3. For Silo, complete browser approval and any profile PIN.

If a Plex Home check fails, choose **Try Again** or **Sign In Again** when offered. Relink the original Plex account and retry the Home user; its PIN stays unchanged.

After [sync](/profiles-and-sync/), finish setting up **Needs sign-in** servers under **Settings > iCloud Sync**.

## Channels or listings are missing

In [Live TV](/live-tv/)'s **TV Sources**, use **Retry** for errors. For failed or paused IPTV guides, select the source, then **Refresh guide**; [check guide progress](/live-tv-channels/#wait-for-an-iptv-guide).

Check filters, then open **Manage channels > Hidden channels** on Apple TV, or **More > Filters > Manage IPTV channels > Hidden channels** on mobile. Missing listings need not prevent playback; a **Guide only** connection cannot play channels.

For **Live TV storage unavailable**, choose **Retry**. Saved channel/guide storage could not open; this is not a rejected IPTV password.

## A library, title, or picture is wrong

Check your profile, server user, enabled libraries, and filters. A hidden shortcut does not disable its library. For shares, check readability and [scanning](/network-shares/). Use **Details**/**Try Again** for incomplete [library results](/library/#browse-a-library), or **Details**/**Retry** for [Home rows](/home-and-navigation/#choose-home-rows).

For wrong matches or scores, check [Metadata and ratings](/metadata-and-ratings/). Disable [Circadian Mode](/circadian-mode/) before changing HDR settings for a warm/dark picture.

## Playback or downloads fail

Compare another title. On iPhone/iPad, lower [streaming quality](/streaming-quality/) where supported. If **Maximum** works but conversion fails, check server permission and capacity.

Select **No streams found** in title details to recheck without playing, or try another copy.

Check [audio tracks and timing](/audio/), or [subtitle track, style, and timing limits](/subtitles/).

Before deleting copies, check [Offline Mode](/downloads/#browse-only-your-downloads), completion, storage, and network policy. Turn the mode off to reconnect.

## Sync or tracker settings keep changing

Check your profile/account. Use [Tracker Retry](/trackers/) before reconnecting. For [sync errors](/profiles-and-sync/#recover-sync-without-erasing-your-setup), check iCloud status; don't reset a temporary outage.

## Report a problem

For playback, library, or Live TV errors, open **Details** when offered. On mobile, **Share details** exports a report with private identifiers removed; Apple TV displays it onscreen.

Open **Settings > Help & Diagnostics > Report a Problem**; scan its code on Apple TV. See [reporting guidance](/feedback-and-bugs/) for what to include.

Use [Playback Info](/platform-controls/#read-playback-information) for stream and buffer measurements.

In mobile **Recent Activity**, choose **Refresh**, then filter or search. **Copy** saves a summary without message text. Review messages or screenshots for private details before sharing.

Local error details need no [sharing consent](/feedback-and-bugs/#choose-diagnostics-sharing); uploads do. Remove secrets and private playlist URLs before posting.
