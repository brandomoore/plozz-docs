# Player controls

Resume titles, choose editions, and skip intros while watching.

## Reach the controls

On Apple TV, press up from the timeline for **Playback**, **Audio**, and **Subtitles**; press down for information and navigation. On iPhone/iPad, tap the video. In portrait, open the ellipsis **Playback options** menu; landscape shows separate controls.

See [touch and keyboard controls](/platform-controls/) or [Blu-ray menus](/disc-playback/).

## Seek on Apple TV

With playback options closed, click the remote's left/right edge to jump by your skip interval. Swipe to scrub; **Seek without pausing** determines whether to pause first.

Hold a left/right click to start scanning, which continues after release. Click the same direction to speed up, or the opposite to slow down and eventually reverse.

Press the center button to use the selected position, or play/pause to use it and resume. Press Back to cancel. Wait for loading before seeking.

## Choose audio or a version

Open **Audio** for tracks or **Version** for files/editions.

Changing versions keeps your server account and position, though different cuts may not line up.

The first multi-version video asks your preference. Change **Settings > Playback > Version selection**:

- **Ask every time**: choose before multi-version videos, including autoplay.
- **Choose automatically**: use a remembered or device-recommended version without the picker.
- **Use first from server**: follow the selected server's version order, ignoring remembered preferences unless you explicitly choose a version.

**How automatic selection works** explains choices based on files and device compatibility, not current connection speed.

**Remember series version choices** (Apple TV: **Remember per series**) reuses your version type for later episodes in automatic mode, or preselects it when asked. Turn it off to stop reusing it. Automatic mode chooses an alternative if that type is missing.

## Resume or start over

Enable **Settings > Playback > Ask to resume or start over** to choose before resuming. **Resume** shows time remaining; **Start Over** shows full runtime, when known.

**Rewind on resume** (mobile: **Resume rewind**) defaults to five seconds, adjustable from zero to 60.

## Autoplay and skipping

Under **Settings > Playback**, next-episode and next-playlist-item autoplay default on. **Show Up Next card** controls the preview independently of autoplay. Its lead time is used when credits markers are unavailable.

Enable **Skip intros, credits & more**, then open **Customize**. Choose **Default behavior**: **Show skip button**, **Skip instantly**, or **Skip after** (1-30 seconds). Select movies, TV shows, or anime under **Enable for**.

Open an intro, credits, recap, preview, or commercial marker's settings to change its behavior by content category, including **Off**. **Use default** restores the shared behavior. Enable disabled categories on the previous page first. Skip actions need timings. Timeline gaps can mark skip boundaries, not chapters; very short segments may have no gap.

With skipping enabled, **Use community markers** (default on) checks IntroDB/TheIntroDB if intros or credits are missing. Lookups send IMDb/TMDB/TVDB identifiers and applicable episode numbers, ordering, name, and runtime, not video files. Disable it to stop community lookups, not server markers. Coverage and matching vary.

## Jump to a chapter

Open **Chapters** below the timeline; mobile tabs scroll horizontally. Choose a chapter; paused playback stays paused.

Chapters can come from Plex, Jellyfin, Emby, or supported files, including shares and downloads. Some videos lack chapters or images; intro and credits markers are separate.

## Switch to another Continue Watching title

Open **Continue Watching** below the timeline to resume another title. On Apple TV, press down; on iPhone/iPad, scroll the tabs if needed.

Select a card. Plozz saves your current position and resumes that title from its own place, using its own source. Version choices and access checks still apply.

It uses Home's loaded titles, excluding this video and other episodes of its show from that source. It hides when none remain.

Use **Episodes** or **Playlist** to choose another entry.

Under **Settings > Playback > Player tabs**, choose which of **Chapters**, **Cast**, **Episodes**, **Playlist**, and **Continue Watching** to show. They still need matching content; **Info** remains available.

## Identify a song in a movie or show

Open **Info** while a song plays, then select a recognized card for **Open song**. [Song identification](/identify-songs/) covers enabling **Settings > Playback > Audio > Identify songs**, choosing a service, and privacy.

## Speed, picture, and other navigation

Use **Playback > Playback Speed** on Apple TV or **Playback Speed** on mobile to change supported videos' speed. Mobile portrait places it under **Playback options**. Choose 1x for normal speed.

Open **Playback > Zoom Mode** on Apple TV, or **Video** on mobile, for picture choices:

- **Normal (Default)** keeps the whole picture.
- **Auto-crop black bars**, when offered, enlarges the detected picture without stretching it. Some bars may remain to preserve the picture's proportions. If detection is unavailable, it uses the normal fit.
- **Crop** fills the screen by cutting off edges; **Stretch** fills it by changing proportions.
- **Custom** lets you set 50%-200% zoom.

Zoom lasts this session and does not change streaming quality. Detection works during supported local playback, not AirPlay or Picture in Picture. Return to **Normal (Default)** if the crop is unhelpful.

## Explore the cast

In **Cast**, select a person to read their biography and credits without leaving the video. Choose **See more** for their full page, or select a credit to open that title's details. Opening either page ends playback. A listed credit is not necessarily in your library.

See [Streaming quality](/streaming-quality/), [Audio](/audio/), [Subtitles](/subtitles/), [AirPlay/Picture in Picture](/platform-controls/#airplay-and-picture-in-picture), or [external players](/external-players/).
