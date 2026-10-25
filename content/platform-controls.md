# Device and system controls

Controls depend on device and playback path.

## Apple TV

Use the remote to reveal playback controls. **Settings > Playback > Seeking > Skip Intervals** changes left/right jumps.

**Seek without pausing** determines whether a playing video responds to scrubbing. When off, pause first, scrub to the position, then press Play. **Prevent Accidental Exit**, under Screens & Navigation's navigation settings, changes app-exit behavior rather than playback quality.

In the same navigation settings, **Zoom when opening titles** enables cinematic artwork transitions. It defaults off, respects Reduce Motion, and stays local to this profile on this Apple TV.

**Fade on display changes** covers dynamic-range and frame-rate transitions, not TV matching settings. If matching is off on Apple TV, disabling fades can avoid needless delays.

Each Apple TV user can [automatically open their remembered Plozz profile](/apple-tv-profiles/).

## Live TV remote controls and rewind

On Apple TV, a remote's **Guide** button opens enabled Live TV; during full-screen channel playback, it opens the guide over the picture.

For a channel with a usable rewind window, reveal controls and use the timeline to seek within that window. **Go Live** returns to the current broadcast. This is not a recording or a promise to restart any guide program. Scheduled library channels use **Jump to now** instead.

**Settings > Playback > Live TV buffer** defaults to **Automatic**. Choose 10, 20, 30, or 45 seconds to request a cushion behind live for new channel loads. More buffering can reduce interruptions but adds delay and may slow tuning. **Go Live** respects the cushion. It is device-local, independent of Video buffer, and cannot create a rewind window or affect scheduled library playback.

## Launch from Apple TV Top Shelf

1. Put Plozz in the Apple TV Home Screen's top row.
2. From an adult Plozz profile, open **Settings > Everyone > Top Shelf**. **Show Top Shelf** is on by default.
3. Choose **Posters** or **Full Screen**, then set separate **Continue Watching** and **Recently Added** counts: four each by default, adjustable from one to 20.

Posters is the default; selecting one requests playback. With Full Screen, swipe up to expand the shelf. Continue Watching precedes Recently Added; same-source repeats appear once. **Play** requests playback; **More Info** opens title/series details without starting it. Format badges describe source files, not current output.

These preferences are shared by Plozz profiles on this Apple TV and do not sync. Turning Show Top Shelf off clears its media without forgetting your layout or counts.

Top Shelf uses a saved Home snapshot, not live browsing. Short feeds are not padded; counts do not limit Plozz's Continue Watching. Finish any profile/PIN prompt first. If **Unable to Open Title** appears, check the original connection in Plozz.

Artwork follows [Appearance > Artwork](/appearance/); full-screen episode text and ratings respect [spoiler settings](/spoiler-protection/).

## iPhone and iPad

Tap the video to reveal controls. With a hardware keyboard, **Space** plays/pauses and **Left/Right** skip during eligible playback. Shortcuts yield while menus, sheets, or other player interactions are active.

During supported local playback, double-tap the left/right side to skip, hold the picture for a temporary speed boost, or pinch to switch Normal/Crop. Vertical drags near the left edge adjust brightness; near the right edge, volume. VoiceOver disables hold, pinch, side-tap, and level-drag shortcuts.

Turn off **Settings > Playback > Volume and brightness gestures** to disable vertical drags.

On iPhone, **Settings > Playback > Player orientation** offers Auto, Landscape, or Portrait for video and Live TV playback in a full-screen window. iPad follows system rotation. If changing orientation fails, use a full-screen window and retry.

[Zoom modes](/playback/#speed-picture-and-other-navigation) change presentation, not quality. [Background Audio](/audio/#keep-audio-playing-on-iphone-or-ipad) controls listening while locked or outside Plozz.

## AirPlay and Picture in Picture

On iPhone/iPad, use the player's **AirPlay** route picker for an available receiver. **Picture in Picture** appears only when both the device and active engine path support it; software-decoded playback may not expose the required system player layer.

Controls can be restricted while video is playing elsewhere. The locally remuxed wireless AirPlay path does not expose selectable subtitle tracks; native streams can behave differently. Check captions on the receiving screen rather than assuming local subtitles will follow the video.

Live TV permits external presentation only for an authorized, single-channel session. On supported paths it can enter Picture in Picture when you leave Plozz. Multiview disables AirPlay and Picture in Picture.

For travel, use [completed downloads](/downloads/); external presentation does not save video.

## Read playback information

Enable **Settings > Help & Diagnostics > Playback Diagnostics Overlay**, or open **Playback Info** in the player's Info card.

During conversion, video/audio facts describe the current stream; original-file details appear separately. Neither reports your physical speaker layout.

**Network throughput** measures transfer speed, not encoded bitrate. **Buffer** reports media ahead; player/engine buffers can differ. **Seekable** is the seeking range, not a completed download. **Playback cache**, when shown, reports temporary use/budget, not saved videos.

With Plozzigen, **AVPlayer time** and **AVPlayer window** describe its internal system player; the window need not span the full source timeline. Missing values mean no measurement was supplied. Live sessions can also report **Behind live** and **Rewind window**; neither promises a recording.

## Open another player app

For Infuse, VLC, or Apple TV's Native Player app, follow [Use another video player](/external-players/). This sends a video link to another app on this device, not an AirPlay receiver. It is a device-wide choice with source, privacy, and returned-progress limits.
