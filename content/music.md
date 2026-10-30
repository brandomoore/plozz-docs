# Listen to music

Listen to albums and playlists from your Plex, Jellyfin, or Emby music libraries on **Apple TV**. The iPhone/iPad interface does not offer this Music destination.

## Find your library

1. [Connect the server](/servers/) and select the correct server user.
2. Enable its music library for the active Plozz profile under **Settings > Libraries**.
3. Open **Music** from navigation. If hidden, check **Settings > Screens & Navigation > App navigation > Hide or Reorder Navigation**.
4. Browse albums, artists, genres, or playlists. Choose an album or playlist, then **Play**, **Shuffle**, or a starting track.

If Music is missing, check that a music library is enabled and its server is reachable. Silo and ordinary network-share connections do not supply this Music destination.

## Control a listening session

Playing an album or playlist creates a queue and advances through its tracks. Starting another album or playlist replaces the current queue.

Use previous/next, play/pause, Shuffle, and Repeat. Repeat cycles through Off, the full queue, and one track. The on-screen confirmation distinguishes queue repeat from repeat-one.

Return to browsing while music continues, then select the current-track card to reopen Now Playing. The card scrolls with the page. Under **Screens & Navigation**, Apple TV also offers music-player presentation choices.

Music can continue while the Apple TV screensaver is showing. Open Apple TV Control Center's **Now Playing** card to control the current session; available transport controls follow the queue.

## Lyrics and listening history

The speech-bubble lyrics button controls the synchronized lyrics panel when usable lyrics are found. Plozz checks the music provider and can use an online lyrics fallback. Not every track has synchronized lyrics; a missing panel is not proof that playback failed.

Online lookups use **LRCLIB** and can send track title, artist, and duration, not audio files. Turn lyrics off in Now Playing to stop future LRCLIB lookups. This toggle is shared across profiles on this device. While enabled, it is unavailable for tracks without lyrics; change it on a track with lyrics.

Connect **Last.fm** under **Settings > Trackers** for the active profile. Eligible music plays send Now Playing information and completed scrobbles. Tracks must be longer than 30 seconds; scrobbling requires at least half the track or four minutes, whichever is shorter.

Video trackers do not replace Last.fm for music. See [Tracking integrations](/trackers/) for connection and build requirements.
