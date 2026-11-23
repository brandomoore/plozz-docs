# Subtitles

Choose captions while watching, then save your language and appearance preferences.

## Choose a track

1. Reveal controls and open **Subtitles**; in mobile portrait, open the ellipsis **Playback options** menu first.
2. Select a listed track, or **Off**.
3. To find another track, choose **Download subtitles…** on Apple TV or **Search & Download…** on iPhone/iPad, when offered. Select a result to download and use it.

Original track names help distinguish versions in the same language. An **auto** label means Plozz inferred the language from the text, not that it translated the captions.

Search requires server subtitle services; shares use existing subtitles. **File match** means the server matched this video file, not just its title or language. Try a marked result when captions drift.

On iPhone/iPad, [update offline subtitles](/downloads/#update-offline-subtitles) while connected, then test the saved copy offline.

## Show two languages

Show two text tracks when watching with someone who prefers another language. Dual subtitles support movies and episodes, not Live TV.

Select your primary text track first. On Apple TV, open **Style > Dual Subtitles**, or **Dual Subtitles** directly if shown. On iPhone/iPad, open **Subtitles > Advanced… > Second Track**. Choose another text track; **Off** there removes only the second track.

AetherEngine can decode embedded second text tracks; Apple's native player needs text it can fetch separately. Image subtitles keep their font and colors and cannot be second tracks; an image-based primary disables dual subtitles.

## Change appearance

Open **Settings > Subtitles** and choose **Customize subtitle style**—under **Subtitle style** on Apple TV. Adjust font, size, colors, and outline for text captions.

**Match Apple TV Subtitle Style** (**Match Device Subtitle Style** on mobile) replaces your custom look after confirmation. New profiles start by matching. Appearance edits stop matching; control avoidance and the ASS/SSA override below do not. Placement and dual subtitles remain Plozz-specific.

In the player, open **Style** on Apple TV, or **Subtitles > Advanced… > Appearance > Style** on iPhone/iPad. Image subtitles offer placement, not text styling; the mobile link becomes **Position**.

**Use a separate style for Live TV** in **Settings > Subtitles** separates channel appearance.

In the Settings editor on Apple TV, select **Preview**, labeled **Full screen**, to inspect captions at viewing size. Focus Preview and move down for sample options. On mobile, use **Preview options**. **Preview file formatting** adds a sample sign, not your video.

## Keep captions near the picture

In Style, **Position** chooses **Bottom of screen** or **Bottom of video**. Screen placement can use the black space below a wide movie; video placement keeps dialogue near the picture, following detected black bars where supported. Without detection, it follows the video frame.

Adjust **Vertical offset** upward from that edge. For text, 0%-100% stays within the screen; negative values can crop it. **Extra Line Position** makes wrapped lines grow **Above**, around the **Center**, or **Below**, not a second-language track.

For image subtitles, Bottom of video can move lower dialogue without resizing it or moving fixed signs/artwork. Its Vertical offset appears only in this mode.

**Auto-Move Away from Controls** defaults on. Captions drawn by Plozz move up to avoid visible controls, then return when controls disappear. Turn it off to keep your position even when controls overlap it.

## Use your style instead of file formatting

In the style editor, open **Subtitle file formatting**. Turn off **Use File Positions**, **Use File Colors**, or **Use Bold and Italic** to use your choices instead.

For hard-to-read ASS/SSA captions, enable **Override ASS/SSA styling** in the Settings editor. When Plozz draws them, it uses your style instead of the file's styled signs and karaoke effects. This starts off and is absent from the in-player editor and separate Live TV style.

Turn it off to restore the file's styling. **Reset to App Default** restores Plozz's appearance but leaves this override unchanged.

## Set automatic choices

**Settings > Subtitles** controls automatic display, language, downloads, and SDH preferences. Remembered series choices, including Off, can override these rules.

On iPhone/iPad, **Preferred language code** accepts a code such as `en` for English; leave it blank to follow the device language.

Enable **Set separately for movies, TV shows & anime** to give each its own rule; otherwise **Show subtitles** applies to everything.

Forced tracks cover selected dialogue/signs; SDH includes sound descriptions. **Prefer SDH** allows regular fallback. **Only SDH** leaves automatic subtitles off when unavailable and excludes non-SDH search/download results.

To stop reusing series choices, turn off **Remember subtitles per series** in **Settings > Subtitles**. On iPhone/iPad, it is under **Behavior**.

For mistimed text, use the **Subtitle Sync** clock button on Apple TV or **Subtitles > Advanced… > Subtitle Delay** on mobile. Increase delay for early captions; decrease it for late ones. On Apple TV, **Reset** returns to zero. Some embedded tracks cannot shift and have no timing control.

## Missing, wrong, or drifting subtitles

Check the version, language, and remembered series choice. For unavailable or incomplete searches, check account permissions and server subtitle providers; incomplete results do not mean no matches.

Search again after results expire. If a download cannot be confirmed, check the track list before retrying; it may already be added.

Use delay for a steady offset. Increasing drift suggests a different release or cut; try a matching track instead.

Check separate [AirPlay](/platform-controls/#airplay-and-picture-in-picture) and [external-player subtitle limits](/external-players/#what-stays-in-plozz).
