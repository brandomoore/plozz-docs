# Use another video player

Watch compatible library videos in another installed player while keeping Plozz for browsing. [AirPlay](/platform-controls/#airplay-and-picture-in-picture) and [streaming-service links](/network-shares/#open-links-to-streaming-services) work separately.

## Choose a trusted player

> [!IMPORTANT]
> Handoff shares playable links, which can include server access tokens or network-share passwords, with the selected app. Choose only an app you trust.

1. **Install the player** on the device running Plozz.
2. Open **Settings > Playback > Advanced > External player**.
3. Under **Default player**, choose **Infuse** or **VLC**. Apple TV also offers **Native Player**, a separate app. Unavailable apps show "(not installed)".
4. **Start a supported video** normally. Choose its version first if prompted.

**Plozz** is the default. This choice applies across profiles on this device, not other devices.

## Choose a player just once

Press and hold the detail page's play button on Apple TV, or touch and hold it on iPhone/iPad. Choose **Play in**, then an offered player. This leaves your default unchanged. If another app is your default, **Plozz** can be offered here too. The menu omits the current default and unavailable apps; playback still checks source compatibility.

## Check your source

The selected app must support the video and its connection:

| Source | What can open elsewhere |
| --- | --- |
| Plex, Jellyfin, Emby | Compatible original or server-converted streams. On iPhone/iPad, saved streaming-quality limits still apply. |
| Silo | Compatible original or converted streams, if authorization and playback links remain valid for the whole video. |
| IPTV accounts | On-demand movies and episodes whose links need no extra request headers, not live channels. |
| WebDAV | Direct links with compatible sign-in and certificate trust. Some passwords, extra login headers, or certificates trusted only in Plozz prevent a direct link; eligible mobile files can use the share connection below. Custom players cannot receive password-bearing links. |
| Other network shares | VLC can open compatible plain FTP links. On iPhone/iPad with iOS/iPadOS 26 or later, Plozz can also keep supplying files from shares such as SMB, NFS, SFTP, and FTPS to Infuse or VLC, if the system allows background work. This is unavailable on Apple TV and for custom players. |

For share playback supplied by Plozz, keep Plozz running in the background. Returning to Plozz, cancelling the system activity, or losing background permission ends that connection. If it stops, reopen the video or choose Plozz instead.

## What stays in Plozz

Live channels, music, disc folders, downloads, and videos needing a separate audio stream stay in Plozz. [Trailers open separately](/trailers-and-previews/). If the selected app cannot open or preparation fails, Plozz tries its built-in player automatically.

Plozz's controls, subtitle styling, skip markers, and autoplay do not operate in another app. Eligible SRT subtitle files can transfer: up to eight for Native Player/Infuse, one for VLC, none for custom links. Dual subtitles depend on that app.

## Return watch progress

**Native Player** and **Infuse 8.4.7 or later** can receive your resume position and return progress when their player closes. Return to the same authorized Plozz profile and server identity to apply it.

**VLC** and custom players neither receive resume positions nor return progress.

Returned progress follows [watch-history sync rules](/profiles-and-sync/#keep-watch-history-separate). Unfinished videos can update your paused position in Trakt; completed videos can update watched status. Plozz does not track external sessions live.

Invalid, failed, or expired results leave progress unchanged; returns expire after 24 hours. For a save error, restore the original authorized profile and return to retry automatically. Starting another video supersedes the previous handoff.

## Use a custom app link

Open **Custom player** and enter the app's supported URL template with exactly one `{url}`, for example `myplayer://play?url={url}`. Choose **Save and use custom player**.

Plozz inserts the encoded video link. Never include passwords or tokens. Web, file, and Plozz URLs are unsupported. Select **Plozz** to stop handoff.
