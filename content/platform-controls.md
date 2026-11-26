# Device and system controls

Control playback and watch on another screen.

## Apple TV

Change left/right jumps with **Skip backward** and **Skip forward** under **Settings > Playback > Seeking**.

**Seek without pausing** determines whether a playing video responds to scrubbing. When off, pause first, scrub, then press Play.

In **Settings > Screens & Navigation > App navigation**, **Prevent Accidental Exit** stops a short Back press from leaving Plozz while a navigation shortcut is focused. Hold Back or use the remote's Home button to leave. Details, menus, and player controls keep their own Back actions.

Under **Settings > Playback > Video**, **Fade when switching frame rates** briefly hides the picture during transitions. If frame-rate matching is off in Apple TV Settings, disabling this switch can avoid needless fades.

Set up [automatic profile sign-in](/apple-tv-profiles/), or check [when returning to browsing asks you to choose again](/apple-tv-profiles/#when-you-return-to-browsing).

## Live TV remote controls and rewind

On Apple TV, a remote's **Guide** button opens enabled Live TV; during full-screen channel playback, it opens the guide over the picture.

For a channel with a usable rewind window, reveal controls and use the timeline to seek within that window. **Jump to live** returns to the current broadcast. This is not a recording or a promise to restart any guide program. Scheduled library channels use **Jump to now** instead.

**Settings > Playback > Live TV buffer** defaults to **Automatic**. Choose 10, 20, 30, or 45 seconds to request a cushion behind live for new channel loads. More buffering can reduce interruptions but adds delay and may slow tuning. **Jump to live** respects the cushion. It is device-local, independent of Video buffer, and cannot create a rewind window or affect scheduled library playback.

## Launch from Apple TV Top Shelf

1. Put Plozz in the Apple TV Home Screen's top row. Under each Apple TV user, open Plozz, select their profile, and let **Home** load.
2. From a non-Kids Plozz profile, open **Settings > Manage Plozz > Top Shelf**. **Show Top Shelf** is on by default.
3. Choose **Posters** (the default) or **Full Screen**, then set separate **Continue Watching** and **Recently Added** counts: four each by default, adjustable from one to 20.

Select a poster to start watching. With Full Screen, swipe up to expand. Continue Watching precedes Recently Added without same-source repeats. Use the first button to watch or the second for details. Format badges describe the file, not your TV's output.

These settings are shared by this Apple TV user's Plozz profiles, without sync. Turning off Show Top Shelf clears the shelf but keeps your layout and counts.

The shelf needs that user's saved Home titles. Counts don't limit Continue Watching inside Plozz or guarantee enough titles. Complete any profile/PIN prompt. For **Unable to Open Title**, check the original connection.

Artwork follows [Appearance > Artwork](/artwork/); full-screen episode text and ratings respect [spoiler settings](/spoiler-protection/).

## iPhone and iPad

Tap the video to reveal controls. With a keyboard, use the space bar to play/pause and left/right arrows to skip. Shortcuts yield while menus, sheets, or player interactions are active.

During supported local playback, double-tap the left/right side to skip or hold the picture for a temporary speed boost. Pinching adjusts [framing](/video-picture/#choose-how-the-picture-fits) in **Auto-crop black bars**, or switches **Normal**/**Crop** in other modes. Vertical drags near the left edge adjust brightness; near the right edge, volume. VoiceOver disables hold, pinch, side-tap, and level-drag shortcuts.

Turn off **Settings > Playback > Volume and brightness gestures** to disable vertical drags.

On iPhone, **Settings > Playback > Player orientation** controls full-screen video and Live TV. **Follow device orientation** respects the system rotation lock. **Portrait** stays upright. **Landscape auto** stays sideways, using device motion to choose the direction even with rotation lock on. **Landscape left**/**Landscape right** fixes the phone's top to that side. iPad follows system rotation. If rotation fails, use a full-screen window; if motion sensing is unavailable, choose a fixed landscape option.

[Background Audio](/audio/#keep-audio-playing-on-iphone-or-ipad) controls listening while locked or outside Plozz.

## AirPlay and Picture in Picture

On iPhone/iPad, use the player's **AirPlay** picker for a receiver. **Picture in Picture** needs device and playback support; some software-decoded videos cannot use it.

Leaving Plozz can start a Picture in Picture window. Returning to Plozz brings it back into the player. A window you start without leaving Plozz stays separate.

Controls can be restricted while playing elsewhere. Locally remuxed wireless AirPlay has no selectable subtitles; native streams can differ. Check captions on the receiving screen.

Live TV needs an authorized, single-channel session; Multiview disables AirPlay and Picture in Picture.

For offline viewing, use [downloads](/downloads/).

## Read playback information

Enable **Settings > Help & Diagnostics > Playback Diagnostics Overlay**, or open **Playback Info** in the player's **Info** card.

During conversion, video/audio facts describe the current stream; original-file details appear separately. Neither reports your physical speaker layout.

**Network throughput** measures transfer speed, not encoded bitrate. **Buffer** reports media ahead; player/engine buffers can differ. **Seekable** is the seeking range, not a completed download. **Playback cache**, when shown, reports temporary use/budget, not saved videos.

With AetherEngine, **AVPlayer time** and **AVPlayer window** describe the system player it uses; that window need not cover the whole video. Missing values mean no measurement. Live **Behind live** and **Rewind window** values do not promise a recording.

## Open another player app

Use [another video player](/external-players/) for defaults, one-time choices, and privacy/progress limits. This sends a link, not AirPlay.
