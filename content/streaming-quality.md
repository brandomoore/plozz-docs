# Streaming quality

On **iPhone and iPad**, quality limits apply to Plex, Jellyfin, Emby, and Silo movies and episodes. These controls do not apply to Apple TV, network shares, music, or Live TV.

## Save network-specific limits

For the active profile, open **Settings > Playback > Streaming quality** and choose separate defaults for:

- **Local network**
- **Remote Wi-Fi / Ethernet**
- **Cellular**

Defaults are **Maximum** for local/remote connections and **720p · 2 Mbps** for cellular.

Local versus remote depends on the connection to your source, not simply whether the device uses Wi-Fi.

Choose **Maximum** for original quality without a reduction limit. Lower limits can still play the original when reported resolution and bitrate fit; otherwise Plozz requests conversion. Bitrate limits include audio, not just video.

Under **Advanced**, choose the transcoding codec or **Force transcoding**. Force transcoding can request conversion even at Maximum. Custom limits are available in the quality picker. Conversion depends on the provider, permissions, and server capacity.

Using an [external player](/external-players/)? A mobile limit below Maximum, or Force transcoding, keeps playback in Plozz even if the original fits.

## Change one video

Reveal the player's options, open **Quality**, choose a **Quality limit**, then **Apply**. This changes the current video without overwriting saved network defaults.

Quality changes briefly reload playback around your current position. Conversion may alter HDR, audio, or subtitles. During conversion, **Current stream** shows the resulting resolution, codecs, HDR, and audio channels where known. A selected limit is not a measurement; **Not available** means the current stream has not supplied that fact.

Silo currently converts to H.264 at 480p, 720p, 1080p, or 4K, with resolution limits based on video height. Unsupported conversion choices are unavailable.

## Buffering or unavailable choices

If Maximum buffers, try a lower current-session limit on an eligible server. If the lower setting fails while Maximum plays, investigate conversion permission or server capacity rather than assuming the file is damaged.

Network shares have no media server performing these conversions. A hidden Quality control can therefore be expected for that source or platform.

**Video buffer**, also in Playback settings, changes device read-ahead, not stream quality. Larger buffers use more storage and are unavailable with Apple's native player. This device-wide preference is not transferred or synced with profiles.

[Download quality](/downloads/) is independent: changing streaming defaults does not shrink an existing offline copy. For detailed codec/container information, use the [Plozz format reference](https://plozz.app/formats), not a generic player-engine compatibility list.
