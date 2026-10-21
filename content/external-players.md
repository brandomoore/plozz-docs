# Use another video player

Plozz can open eligible Plex, Jellyfin, or Emby movies and episodes in another installed app. This is different from AirPlay and from Plozz's built-in playback engines.

## Choose a trusted player

> [!IMPORTANT]
> Handoff shares playable links, including server access tokens when required, with the selected app. Choose only an app you trust.

1. **Install the player** on the device running Plozz.
2. Open **Settings > Playback > Advanced > External player**.
3. Under **Default player**, choose **Infuse** or **VLC**. Apple TV also offers **Native Player**, a separate app, not Apple's playback engine inside Plozz. Unavailable apps are marked **not installed**.
4. **Start a supported movie or episode** normally. Choose its version first if prompted.

**Plozz** is the default. The choice applies to all Plozz profiles on this device, not your other devices. Returned progress still belongs to the viewer who started playback.

## What stays in Plozz

Handoff requires directly accessible HTTP/HTTPS video without server conversion or a separate audio stream. Silo, IPTV, network shares, offline copies, music, trailers, and live channels stay in Plozz.

On iPhone/iPad, a saved streaming-quality limit below **Maximum**, or **Force transcoding**, also keeps playback in Plozz. If the selected app cannot open or preparation fails, Plozz tries its built-in player automatically.

Plozz's controls, subtitle styling, skip markers, and autoplay do not operate in another app. Eligible, directly accessible SRT sidecars can transfer: up to eight for Native Player/Infuse, one for VLC, none for custom links. Dual-subtitle behavior depends on the other app.

## Return watch progress

**Native Player** and **Infuse 8.4.7 or later** can receive your resume position and return progress when their player closes. Return to the same authorized Plozz profile and server identity to apply it.

**VLC** and custom players do not receive resume positions or return watch progress. Returning to Plozz alone cannot recover their position.

Accepted returns follow [watch-history sync rules](/profiles-and-sync/#keep-watch-history-separate). Unfinished returns can send paused progress to connected Trakt; completed watches use normal history reporting. Plozz does not track the external session live.

Invalid, failed, or expired results leave saved progress unchanged; callbacks expire after 24 hours. If Plozz reports it could not save returned progress, restore the original authorized profile and return to Plozz; it retries automatically. Starting another video supersedes the previous handoff.

## Use a custom app link

Open **Custom player** and enter the app's supported URL template with exactly one `{url}`, for example `myplayer://play?url={url}`. Choose **Save and use custom player**.

Plozz inserts the encoded video link. Do not put passwords or access tokens in the template. Web, file, and Plozz URLs are not supported. To stop handoff, select **Plozz** under Default player.
