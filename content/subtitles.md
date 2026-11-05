# Subtitles

Choose captions while watching, then save your language and appearance preferences.

## Choose a track

1. Reveal controls and open **Subtitles**; in mobile portrait, open the ellipsis **Playback options** menu first.
2. Select a listed track, or **Off**.
3. To find another track, choose **Download subtitles…** on Apple TV or **Search & Download…** on iPhone/iPad, when offered. Select a result to download and use it.

Search requires server subtitle services; shares use existing subtitles. A **File match** badge means the server matched the subtitle to this video file, not just its title or language. Try a marked result when another release's captions drift.

## Show two languages

Dual subtitles show two text tracks together, useful when watching with someone who prefers another language. They are available for movies and episodes, not Live TV.

Select your primary text track first. On Apple TV, open **Style > Dual Subtitles**, or **Dual Subtitles** directly if shown. On iPhone/iPad, open **Subtitles > Advanced… > Second Track**. Choose another text track; **Off** there removes only the second track.

AetherEngine can decode embedded second text tracks; Apple's native player needs text it can fetch separately. Image subtitles keep their font and colors and cannot be second tracks; an image-based primary disables dual subtitles.

## Change appearance

Open **Settings > Subtitles** and choose **Customize subtitle style**—under **Subtitle style** on Apple TV.

In Style, **Match Apple TV Subtitle Style** (**Match Device Subtitle Style** on mobile) replaces your custom look after confirmation. New profiles start by matching the device style. Other style edits stop matching, except the control-avoidance switch explained below. Placement and dual-subtitle settings remain Plozz-specific.

In the player, open **Style** on Apple TV, or **Subtitles > Advanced… > Appearance > Style** on iPhone/iPad. Adjust font, size, colors, and outline for text captions. With image subtitles, the mobile link is **Position** instead of Style: you can move captions, not restyle their text.

**Use a separate style for Live TV** in **Settings > Subtitles** separates channel appearance.

## Keep captions near the picture

In Style, **Position** chooses **Bottom of screen** or **Bottom of video**. Screen placement can use the black space below a wide movie; video placement keeps dialogue near the picture, following detected black bars where supported. Without detection, it follows the video frame.

Then adjust **Vertical offset** upward from that bottom edge. For text, 0%-100% stays within the screen; negative values can crop it. **Extra Line Position** makes wrapped lines grow **Above**, around the **Center**, or **Below** the chosen position, not a second-language track.

For image subtitles, Bottom of video can move lower dialogue without resizing it or moving fixed signs/artwork. Its Vertical offset appears only in this mode.

**Auto-Move Away from Controls** defaults on in the same editor. Plozz-rendered captions move up only as needed to avoid visible player controls, then return when those controls disappear. Turn it off to keep your chosen position, even if controls overlap it. This switch does not stop matching the device subtitle style.

If file formatting overrides your choices, open **Subtitle file formatting**. Turn off **Use File Positions**, **Use File Colors**, or **Use Bold and Italic** to use your chosen style instead.

## Set automatic choices

**Settings > Subtitles** controls automatic display, language, downloads, and SDH preferences. Remembered per-series choices, including Off, can override automatic rules.

On iPhone/iPad, **Preferred language code** accepts a code such as `en` for English; leave it blank to follow the device language.

Set movie, TV, and anime rules where offered. Forced tracks cover selected dialogue/signs; SDH includes sound descriptions. **Prefer SDH** allows regular fallback; **Only SDH** leaves automatic subtitles off when unavailable and excludes non-SDH search/download results. Neither creates tracks.

To stop reusing series choices, on Apple TV open **Settings > Subtitles > Remember subtitles per series** and turn off **Remember per series**. On iPhone/iPad, open **Settings > Playback**, then turn off **Remember subtitles per series** under **Tracks**.

For mistimed text, use the **Subtitle Sync** clock button on Apple TV or **Subtitles > Advanced… > Subtitle Delay** on iPhone/iPad. Timing controls appear only when Plozz can shift the track; some player-rendered embedded tracks cannot shift.

## Missing, wrong, or drifting subtitles

Check the version, language, and remembered series choice. For search failures, check the server's subtitle-service configuration.

A steady offset may be correctable with delay. Increasing drift can mean a different release or cut; try a matching track instead of increasing the offset.

Check separate [AirPlay](/platform-controls/#airplay-and-picture-in-picture) and [external-player subtitle limits](/external-players/#what-stays-in-plozz).
