# Streaming quality

Streaming-quality limits apply to Plex, Jellyfin, Emby, and Silo movies/episodes on **iPhone and iPad**, not Apple TV, shares, music, or Live TV.

## Save network-specific limits

Open **Settings > Playback > Streaming quality** for this profile. Set **Local network**, **Remote Wi-Fi / Ethernet**, and **Cellular** separately. Defaults are **Maximum** for local/remote connections and **720p · 2 Mbps** for cellular.

Local versus remote depends on the connection to your source, not simply whether the device uses Wi-Fi.

**Maximum** means original quality without reduction. Lower limits can still play originals whose reported resolution/bitrate fit; otherwise Plozz requests conversion. Bitrate includes audio.

Under **Advanced**, choose the transcoding codec or **Force transcoding**, which can request conversion even at Maximum. The quality picker offers custom limits. Conversion needs provider support, permission, and server capacity.

A limit below Maximum or Force transcoding prevents [external-player handoff](/external-players/), even if the original fits.

## Change one video

Reveal playback controls, open **Video > Quality** (under the ellipsis **Playback options** menu in portrait), choose a **Quality limit**, then **Apply**. This changes the current video without overwriting saved network defaults.

Playback briefly reloads around your position. Conversion may alter HDR, audio, or subtitles. **Current stream** reports converted resolution, codecs, HDR, and audio channels where known. **Declared stream bitrate**, when shown, is advertised by the stream, not measured network speed. A limit is not a measurement; **Not available** means the stream supplied no fact.

Silo converts to H.264 at 480p, 720p, 1080p, or 4K, limited by video height. Unsupported choices are unavailable.

## Buffering or unavailable choices

If Maximum buffers, try a lower session limit. If only conversion fails, check server permission and capacity.

Shares have no server converting video; a missing Quality control can be expected.

**Video buffer** in Playback changes temporary read-ahead, not quality or offline downloads. Larger buffers use more storage; actual duration depends on the video and free space. It is unavailable with Apple's native player. Start a new playback session after changing it. This device-wide preference does not transfer or sync.

A filled buffer can bridge brief interruptions, not fix a source that stays too slow. [Live TV buffer](/platform-controls/#live-tv-remote-controls-and-rewind) is separate.

[Download quality](/downloads/) is independent; streaming defaults do not shrink saved copies. See [Plozz formats](https://plozz.app/formats) for codec/container support.
