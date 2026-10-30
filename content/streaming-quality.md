# Streaming quality

Streaming-quality limits apply to Plex, Jellyfin, Emby, and Silo movies/episodes on **iPhone and iPad**, not Apple TV, shares, music, or Live TV.

## Save network-specific limits

Open **Settings > Playback > Streaming quality** for this profile. Set **Local network**, **Remote Wi-Fi / Ethernet**, and **Cellular** separately. Defaults are **Maximum** for local/remote connections and **720p · 2 Mbps** for cellular.

Local versus remote depends on the connection to your source, not simply whether the device uses Wi-Fi.

**Maximum** removes Plozz's reduction limit, not server compatibility requirements. The server may still convert. Lower limits permit originals only when reported dimensions/bitrate fit; unknown facts can require conversion. Bitrate includes audio.

Under **Advanced**, choose a transcoding codec or **Force transcoding**, even at Maximum. **Prefer HEVC (H.265)** can fall back to H.264 at the same limit. Conversion needs server support, permission, and capacity.

**Custom…** takes a maximum resolution and whole-number total Kbps. For **Invalid custom quality**, choose a preset or enter a valid limit; it does not mean Maximum.

A limit below Maximum or Force transcoding prevents [external-player handoff](/external-players/), even if the original fits.

## Change one video

Reveal playback controls, open **Video > Quality** (under the ellipsis **Playback options** menu in portrait), choose a **Quality limit**, then **Apply**. This changes the current video without overwriting saved network defaults.

Playback reloads around your position. Conversion can alter HDR, audio, or subtitles; **Playing in SDR** identifies an SDR conversion. **Current stream** shows known active-stream facts, not the original file. **Declared stream bitrate** is advertised, not measured speed. **Not available** means no fact was supplied.

Silo converts to H.264 at 480p/720p/1080p/4K, limited by video height; unsupported choices are unavailable.

## Buffering or unavailable choices

If Maximum buffers, try a lower session limit. If only conversion fails, check server permission and capacity.

If **Force transcoding** is on and playback fails, turn it off under **Streaming quality > Advanced** and retry. If offered, open the error screen's **Details** to distinguish conversion failure from a connection problem.

Shares have no server converting video; a missing Quality control can be expected.

## Adjust the video buffer

On all three platforms, **Settings > Playback > Video buffer** changes temporary read-ahead, not quality/downloads. Larger buffers use more storage; duration depends on video and free space. Unavailable with Apple's native player, this device-wide preference neither transfers nor syncs. Start new playback after changes.

A filled buffer can bridge brief interruptions, not fix a source that stays too slow. [Live TV buffer](/platform-controls/#live-tv-remote-controls-and-rewind) is separate.

[Download quality](/downloads/) is independent; streaming defaults do not shrink saved copies. See [Plozz formats](https://plozz.app/formats) for codec/container support.
