# Subtitles

Select tracks in the player; save defaults in Settings.

## Choose a track

1. Reveal the playback controls and open **Subtitles**.
2. Select a listed track, or **Off**.
3. For two tracks with a movie or episode, select a primary text track, then another under **Style > Dual Subtitles** on Apple TV, or **Dual Subtitles** if shown directly. On iPhone/iPad, use **Second Track**. Choose its **Off** option to remove only the second track.
4. Where supported, choose **Download subtitles…** on Apple TV or **Search for Subtitles** on iPhone/iPad, then select a result.

Search requires server subtitle services; shares use existing subtitles.

Plozzigen can decode embedded second text tracks; Apple's native playback path needs a separately fetchable text track. Image subtitles cannot be second tracks or restyled, and an image-based primary disables dual subtitles.

## Change appearance

Open **Settings > Subtitles** and choose **Customize subtitle style**—under **Subtitle style** on Apple TV.

In Style, **Match Apple TV Subtitle Style** (**Match Device Subtitle Style** on mobile) replaces your custom look after confirmation. Editing a control stops matching. Placement and dual-subtitle settings remain Plozz-specific.

For position, 0% is the bottom, 100% the top; negative values can crop text. In the player, choose **Style** on Apple TV, or **Appearance > Style** on iPhone/iPad.

**Use a separate style for Live TV** in **Settings > Subtitles** separates channel appearance.

## Set automatic choices

**Settings > Subtitles** controls automatic display, language, downloads, and SDH preferences. Remembered per-series choices, including Off, can override automatic rules.

On iPhone/iPad, **Preferred language code** accepts a code such as `en` for English; leave it blank to follow the device language.

Set movie, TV, and anime rules where offered. Forced tracks cover selected dialogue/signs; SDH includes sound descriptions. **Prefer SDH** allows regular fallback; **Only SDH** leaves automatic subtitles off if unavailable and excludes non-SDH search/download results. Neither creates missing tracks.

To stop reusing a series' choice, turn off **Remember subtitles per series** in **Settings > Subtitles** on Apple TV, or under **Tracks** in **Settings > Playback** on iPhone/iPad.

For mistimed text, use the **Subtitle Sync** clock button on Apple TV or **Playback Sync > Subtitle Delay** in iPhone/iPad playback options. Timing controls appear only when Plozz can shift the selected track; some player-rendered embedded tracks do not allow it.

## Missing, wrong, or drifting subtitles

Check the selected video version, subtitle language, and remembered series choice first. For an online search failure, check the server's subtitle-service configuration rather than changing Plozz's appearance.

A steady timing offset may be correctable with delay. Increasing drift can mean the subtitle belongs to another release or cut; try another matching track instead of repeatedly increasing the offset.

Check separate [AirPlay](/platform-controls/#airplay-and-picture-in-picture) and [external-player subtitle limits](/external-players/#what-stays-in-plozz).
