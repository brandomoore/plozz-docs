# Tracking integrations

Trackers connect to the active **Plozz profile**, not to a particular media server. Select the right profile before opening **Settings > Trackers**.

## Choose a service

| Service | Purpose in Plozz |
| --- | --- |
| Trakt | Video scrobbling to watch history and watchlist sync |
| Simkl | Video scrobbling to watch history and watchlist sync |
| WeTrakr | Movie/episode scrobbling to watch history and planning-list sync with Watchlist |
| AniList | Identified anime progress and anime watchlist sync |
| MyAnimeList | Identified anime progress and anime watchlist sync |
| Last.fm | Eligible music listening on Apple TV |

Scrobbling sends playback activity to the tracker; it does not import that service's full watch history into your media servers.

Supported [external-player returns](/external-players/#return-watch-progress) can send unfinished progress to Trakt after you return. Marking a title unwatched in Plozz does not delete its Trakt history.

AniList and MyAnimeList do not treat every television episode as anime. Matching and usable identifiers matter; anime progress is submitted when playback stops at 80% or more.

WeTrakr appears only when configured in the app build. Follow its browser or device-code connection instructions. Its planning list is used for [Watchlist](/watchlist/), not as a source of playable videos.

## Connect the correct account

1. Choose **Connect** for the service.
2. Follow the displayed browser, QR, or device-code instructions and authorize your account.
3. For AniList or MyAnimeList on Apple TV, return and enter the code requested by Plozz. Follow the actual service-specific prompt rather than reusing another tracker's code.
4. Confirm the connected account name before watching.

Availability also depends on credentials configured in the app build. **Unavailable** means the tracker is not configured there, not that your media-server password is wrong.

Connected watchlists can affect [Plozz's Watchlist](/watchlist/). Scrobbling sends activity to a third-party account; disconnect a service you no longer want to use.

## Recover a connection

Read the displayed error and use **Retry** first when offered. For Trakt or WeTrakr sync errors, open Plozz on your other devices and retry when instructed. Reconnecting either service replaces this profile's connection across its Plozz devices, not other profiles. Avoid repeated reconnects during network errors.

If disconnecting WeTrakr reports that session revocation failed, remove Plozz from your connected apps on WeTrakr too.

**Sync across all my servers** is a separate setting: it copies matching watch-state updates between servers. It is not a tracker sign-in or [iCloud configuration sync](/profiles-and-sync/).
