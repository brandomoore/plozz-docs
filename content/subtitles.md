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

Plozzigen can decode embedded second text tracks; native playback needs separately fetchable text. Image subtitles cannot be restyled or used as second tracks; an image-based primary disables dual subtitles.

## Change appearance

Open **Settings > Subtitles** and choose **Customize subtitle style**—under **Subtitle style** on Apple TV.

In Style, **Match Apple TV Subtitle Style** (**Match Device Subtitle Style** on mobile) replaces your custom look after confirmation. Editing a control stops matching. Placement and dual-subtitle settings remain Plozz-specific.

In the player, open **Style** on Apple TV, or **Subtitles > Advanced… > Appearance > Style** on iPhone/iPad. **Position** runs from bottom (0%) to top (100%); negative values can crop text.

**Extra Line Position** makes wrapped lines grow **Above**, around the **Center**, or **Below** that position. Within 0–100%, screen edges keep the block onscreen. This is not the placement of a second-language track.

If file formatting overrides your choices, open **Subtitle file formatting**. Turn off **Use File Positions**, **Use File Colors**, or **Use Bold and Italic** to use your chosen style instead.

**Use a separate style for Live TV** in **Settings > Subtitles** separates channel appearance.

## Set automatic choices

**Settings > Subtitles** controls automatic display, language, downloads, and SDH preferences. Remembered per-series choices, including Off, can override automatic rules.

On iPhone/iPad, **Preferred language code** accepts a code such as `en` for English; leave it blank to follow the device language.

Set movie, TV, and anime rules where offered. Forced tracks cover selected dialogue/signs; SDH includes sound descriptions. **Prefer SDH** allows regular fallback; **Only SDH** leaves automatic subtitles off when unavailable and excludes non-SDH search/download results. Neither creates tracks.

Disable **Remember subtitles per series** in **Settings > Subtitles** on Apple TV, or **Settings > Playback**, under **Tracks**, on iPhone/iPad to stop reusing choices.

For mistimed text, use the **Subtitle Sync** clock button on Apple TV or **Subtitles > Advanced… > Subtitle Delay** on iPhone/iPad. Timing controls appear only when Plozz can shift the track; some player-rendered embedded tracks cannot shift.

## Missing, wrong, or drifting subtitles

Check the version, language, and remembered series choice. For search failures, check the server's subtitle-service configuration.

A steady offset may be correctable with delay. Increasing drift can mean a different release or cut; try a matching track instead of increasing the offset.

Check separate [AirPlay](/platform-controls/#airplay-and-picture-in-picture) and [external-player subtitle limits](/external-players/#what-stays-in-plozz).
