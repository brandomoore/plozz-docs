# Streaming quality

On **iPhone and iPad**, quality limits apply to Plex, Jellyfin, Emby, and Silo movies and episodes. These controls do not apply to Apple TV, network shares, music, or Live TV.

## Save network-specific limits

For the active profile, open **Settings > Playback > Streaming quality** and choose separate defaults for:

- **Local network**
- **Remote Wi-Fi / Ethernet**
- **Cellular**

Defaults are Original for local/remote connections and **720p · 2 Mbps** for cellular.

Local versus remote depends on the connection to your source, not simply whether the device uses Wi-Fi.

Choose **Original** to avoid requesting a reduced-quality server conversion. A lower quality asks the server to fit a resolution/bitrate limit. Limits include audio, not just the video track.

Under **Advanced**, choose the transcoding codec or **Force transcoding**. Force transcoding can request conversion even at Original quality. Custom limits are available in the quality picker. Conversion depends on the provider, permissions, and server capacity.

## Change one video

Reveal the player's options and open **Quality**. This changes the current video without overwriting your saved network defaults.

Quality changes can restart the stream around your current position. Server conversion may alter HDR, audio formats, or subtitle handling. If preserving a particular format matters, compare Original and inspect the resulting playback rather than relying only on a resolution label.

Silo currently converts to H.264 at 480p, 720p, 1080p, or 4K, with resolution limits based on video height. Unsupported conversion choices are unavailable.

## Buffering or unavailable choices

If Original buffers, try a lower current-session limit on an eligible server. If the lower setting fails while Original plays, investigate conversion permission or server capacity rather than assuming the file is damaged.

Network shares have no media server performing these conversions. A hidden Quality control can therefore be expected for that source or platform.

**Video buffer**, also in Playback settings, changes device read-ahead, not stream quality. Larger buffers use more storage and are unavailable with Apple's native player. This device-wide preference is not transferred or synced with profiles.

[Download quality](/downloads/) is independent: changing streaming defaults does not shrink an existing offline copy. For detailed codec/container information, use the [Plozz format reference](https://plozz.app/formats), not a generic player-engine compatibility list.
