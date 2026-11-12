# Listen to music

Play albums and playlists from Plex, Jellyfin, Emby, or a supported Navidrome/Subsonic connection, then keep listening while you browse.

> [!NOTE]
> Music is available on Apple TV. Mobile Music and Navidrome/Subsonic connections on either platform require a TestFlight or development build. Turn **Offline Mode** off before using mobile Music.

## Find your library

1. [Connect the server](/servers/) or [sign in to Navidrome/Subsonic](/servers/#connect-navidrome-or-subsonic).
2. For Plex, Jellyfin, or Emby, select the correct server user and enable its music library under **Settings > Libraries**.
3. Open **Music** from navigation; on compact mobile layouts, check **More**. If hidden, open **Settings > Screens & Navigation > App navigation > Hide or Reorder Navigation**, hold **Music**, and choose **Show**.
4. Choose **Playlists**, **Albums**, **Artists**, or **Genres**. Open an album or playlist, then choose **Play**, **Shuffle**, or a starting track.

For a music-only Navidrome/Subsonic setup, Plozz can open Music directly; empty video destinations may be absent. Silo and ordinary shares do not supply Music. Check your build and connection if it is missing; use **Try Again** for a failed catalogue load.

Music streams from your server; there is no music-download workflow. FLAC files can play directly when the server allows it, but the file's format does not guarantee unchanged audio output through headphones or AirPlay.

## Control a listening session

Playing an album or playlist opens the full player and replaces your queue. A track in **Recently Played** can start a single-track queue.

Use previous/next and play/pause. On Apple TV, focus the timeline and slide on the remote's touch surface; lift your finger to seek. On iPhone/iPad, drag the timeline. Shuffle changes the order; Repeat cycles through off, the whole queue, and one track.

On Apple TV, Back first hides visible controls; press it again to browse. Select the current-track card in a Music page header to reopen the player. That card scrolls with the page.

On iPhone/iPad, pull the player downward to return to browsing; tap the compact player near the bottom to reopen it. The output icon in the full player's bottom row opens the system picker for headphones or AirPlay speakers.

For a failed song, reconnect to its server and choose **Retry**.

Music can continue through the Apple TV screensaver or while mobile Plozz is in the background or the device is locked, independently of video's **Background Audio** setting. System **Now Playing** controls follow the current queue.

## Arrange the mobile queue

Open **Queue** in the full player. Tap an earlier or upcoming song to play it, or drag an upcoming song's handle to reorder. VoiceOver offers **Move Up** and **Move Down**.

On iPhone, **Shuffle** and **Repeat** sit above the queue; a large iPad layout places them beside the transport controls. Scroll upward to see **History**.

**Clear** beside **Queue** removes upcoming tracks without stopping the current song. **Clear** beside **History** removes this session's earlier entries, not your server's listening history or Last.fm records.

The ellipsis **More actions** menu offers **Go to Album** and **Go to Artist** when the track supplies those details. **Clear Up Next** removes upcoming songs; **Stop Playing** ends the session and removes the compact player.

## Rate or favorite a song on mobile

For Plex, tap the star to rate in half-star steps up to five stars; **Clear** removes it. For Jellyfin, Emby, and Navidrome/Subsonic, the heart's **Like** or **Unlike** changes its server favorite.

Changes affect the selected server account. If saving fails, Plozz shows an error and restores the previous value; reconnect before retrying.

## Lyrics and listening history

Use the speech-bubble button on Apple TV or **Lyrics** on mobile for words that follow the song. On mobile, tap a timed line to seek there. If the controls fade while reading, tap to bring them back. A missing lyric panel or **No lyrics for this song** does not mean playback failed.

Plozz checks your server and can use **LRCLIB**, sending track title, artist, album, and duration, not audio files. Lyrics start enabled. On Apple TV, turn lyrics off to stop future LRCLIB lookups for all profiles on this device; if the button is dimmed, first switch to a song with lyrics. Closing the mobile panel only hides it; it does not disable lookups.

For Apple TV listening, connect **Last.fm** under **Settings > Trackers**. Now Playing information can be sent when a song starts or resumes. To count in your listening history, a track must be longer than 30 seconds and reach halfway or four minutes, whichever is shorter; Plozz submits the scrobble when that track stops. Mobile Music does not send Last.fm scrobbles.

Navidrome/Subsonic also receives listening activity directly. It counts a play when a track longer than 30 seconds stops after at least half the song or four minutes of actual listening, whichever is shorter. This is separate from connecting [Last.fm](/trackers/).

## Change the player's look

On Apple TV, open **Settings > Screens & Navigation > Music player**; on supported mobile builds, use **Settings > Appearance > Music player**.

Choose **Match App Theme**, **Artwork**, **Black**, **Dark**, or **Light**. Match App Theme follows the app's colors and **Gradient Backgrounds** preference; Artwork always uses cover colors. These profile choices change the full player, not mobile album pages or the compact player's appearance.

Apple TV also offers **Show album, quality & lyrics source** for extra track information.
