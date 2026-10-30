# Subtitles

Choose captions while watching, then save your language and appearance preferences.

## Choose a track

1. Reveal controls and open **Subtitles**; in mobile portrait, open the ellipsis **Playback options** menu first.
2. Select a listed track, or **Off**.
3. For two movie/episode tracks, select primary text, then **Style > Dual Subtitles** on Apple TV, or **Dual Subtitles** directly if shown. On iPhone/iPad, use **Advanced… > Second Track**; its **Off** removes the second track.
4. Where supported, choose **Download subtitles…** on Apple TV or **Search & Download…** on iPhone/iPad, then select a result.

Search requires server subtitle services; shares use existing subtitles.

Plozzigen can decode embedded second text tracks; native playback needs separately fetchable text. Image subtitles cannot be restyled or second tracks; an image-based primary disables dual subtitles.

## Change appearance

Open **Settings > Subtitles** and choose **Customize subtitle style**—under **Subtitle style** on Apple TV.

In Style, **Match Apple TV Subtitle Style** (**Match Device Subtitle Style** on mobile) replaces your custom look after confirmation. Editing a control stops matching. Placement and dual-subtitle settings remain Plozz-specific.

For position, 0% is bottom, 100% top; negative values can crop text. In the player, choose **Style** on Apple TV, or **Subtitles > Advanced… > Appearance > Style** on iPhone/iPad.

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
