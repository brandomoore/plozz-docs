# Streaming quality

Lower quality to save data or reduce buffering. Limits apply to Plex, Jellyfin, Emby, and Silo movies/episodes on **iPhone and iPad**, not Apple TV, shares, music, or Live TV.

## Save network-specific limits

Open **Settings > Playback > Streaming quality** for this profile. Set **Local network**, **Remote Wi-Fi / Ethernet**, and **Cellular** separately. Defaults are **Maximum** for local/remote connections and **720p · 2 Mbps** for cellular.

Local versus remote describes your source connection, not Wi-Fi use.

**Maximum** asks for no quality reduction, but the server may still convert for compatibility. Lower limits allow the original only when its reported resolution and total bitrate fit. Missing information can require conversion.

Under **Advanced**, choose a transcoding codec or **Force transcoding**, even at Maximum. **Prefer HEVC (H.265)** can fall back to H.264 at the same limit. Conversion needs server support, permission, and capacity.

**Custom…** takes a maximum resolution and a total bitrate in whole-number Kbps. For **Invalid custom quality**, choose a preset or correct the limit.

Compatible [external players](/external-players/#check-your-source) can receive server-converted streams too. Your limit still applies; incompatible handoffs return to Plozz.

## Change one video

Reveal controls. Open the ellipsis **Playback options** menu in portrait or **Playback settings** in landscape, then **Quality**. Choose a preset to apply it immediately.

For custom limits, codec choices, or Force transcoding, choose **Advanced…**, make your changes, then **Apply**. Neither path overwrites saved network defaults.

Playback reloads around your position. Conversion can alter HDR, audio, or subtitles; **Playing in SDR** identifies an SDR conversion. **Current stream** shows known active-stream facts, not the original file. **Declared stream bitrate** is advertised, not measured speed. **Not available** means no fact was supplied.

Silo conversion uses H.264 with mono/stereo AAC audio, at 480p/720p/1080p/4K limits based on video height. It cannot convert to HEVC; unsupported choices are unavailable.

## Buffering or unavailable choices

If Maximum buffers, try a lower session limit. For conversion failures, check server permission and capacity.

If **Force transcoding** is on and playback fails, turn it off under **Streaming quality > Advanced** and retry. If offered, open the error screen's **Details** to distinguish conversion failure from a connection problem.

Shares have no server conversion or Quality control.

## Adjust the video buffer

On all platforms, **Settings > Playback > Video buffer** controls how much video Plozz loads ahead, using temporary storage. Video size and free space limit it. It is shared across this device's profiles but does not sync, transfer, or affect Apple's native player. Reopen the video afterward.

A filled buffer can bridge brief interruptions, not fix a source that stays too slow. [Live TV buffer](/platform-controls/#live-tv-remote-controls-and-rewind) is separate.

Streaming limits don't shrink saved copies; [downloads](/downloads/) and [video upscaling](/video-picture/#enhance-lower-resolution-video) have separate settings. Check [supported formats](https://plozz.app/formats).
