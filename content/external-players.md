# Use another video player

Open eligible Plex, Jellyfin, or Emby movies and episodes in another installed player. [AirPlay](/platform-controls/#airplay-and-picture-in-picture) and [streaming-service links](/network-shares/#open-links-to-streaming-services) work separately.

## Choose a trusted player

> [!IMPORTANT]
> Handoff shares playable links, including server access tokens when required, with the selected app. Choose only an app you trust.

1. **Install the player** on the device running Plozz.
2. Open **Settings > Playback > Advanced > External player**.
3. Under **Default player**, choose **Infuse** or **VLC**. Apple TV also offers **Native Player**, a separate app. Unavailable apps show "(not installed)".
4. **Start a supported movie or episode** normally. Choose its version first if prompted.

**Plozz** is the default. This choice applies across profiles on this device, not other devices.

## Choose a player just once

Press and hold the detail page's play button on Apple TV, or touch and hold it on iPhone/iPad. Choose **Play in**, then an offered player. This leaves your default unchanged. If another app is your default, **Plozz** can be offered here too. The menu omits the current default and unavailable apps; playback still checks source compatibility.

## What stays in Plozz

Handoff needs direct HTTP/HTTPS video without server conversion or separate audio. Silo, IPTV, shares, disc folders, downloads, music, and live channels stay in Plozz. [Trailers open separately](/trailers-and-previews/).

On iPhone/iPad, a saved streaming-quality limit below **Maximum**, or **Force transcoding**, also keeps playback in Plozz. If the selected app cannot open or preparation fails, Plozz tries its built-in player automatically.

Plozz's controls, subtitle styling, skip markers, and autoplay do not operate there. Directly accessible SRT subtitle files can transfer: up to eight for Native Player/Infuse, one for VLC, none for custom links. Dual subtitles depend on that app.

## Return watch progress

**Native Player** and **Infuse 8.4.7 or later** can receive your resume position and return progress when their player closes. Return to the same authorized Plozz profile and server identity to apply it.

**VLC** and custom players neither receive resume positions nor return progress.

Returned progress follows [watch-history sync rules](/profiles-and-sync/#keep-watch-history-separate). Unfinished videos can update your paused position in Trakt; completed videos can update watched status. Plozz does not track external sessions live.

Invalid, failed, or expired results leave progress unchanged; returns expire after 24 hours. For a save error, restore the original authorized profile and return to retry automatically. Starting another video supersedes the previous handoff.

## Use a custom app link

Open **Custom player** and enter the app's supported URL template with exactly one `{url}`, for example `myplayer://play?url={url}`. Choose **Save and use custom player**.

Plozz inserts the encoded video link. Never include passwords or tokens. Web, file, and Plozz URLs are unsupported. Select **Plozz** to stop handoff.
