# Tracking integrations

Trackers connect to the active **Plozz profile**, not to a particular media server. Select the right profile before opening **Settings > Trackers**.

## Choose a service

| Service | Purpose in Plozz |
| --- | --- |
| Trakt | Video scrobbling, watch history, and watchlist sync |
| Simkl | Video scrobbling, watch history, and watchlist sync |
| AniList | Identified anime progress and anime watchlist sync |
| MyAnimeList | Identified anime progress and anime watchlist sync |
| Last.fm | Eligible music listening on Apple TV |

AniList and MyAnimeList do not treat every television episode as anime. Matching and usable identifiers matter; anime progress is submitted when playback stops at 80% or more.

WeTrakr has implemented video/watchlist integration but is disabled by the production feature flag. Its settings row appears only in a configured build. Do not expect it just because another build or source listing mentions it.

## Connect the correct account

1. Choose **Connect** for the service.
2. Follow the displayed browser, QR, or device-code instructions and authorize your account.
3. For AniList or MyAnimeList on Apple TV, return and enter the code requested by Plozz. Follow the actual service-specific prompt rather than reusing another tracker's code.
4. Confirm the connected account name before watching.

Availability also depends on credentials configured in the app build. **Unavailable** means the tracker is not configured there, not that your media-server password is wrong.

Connected watchlists can affect [Plozz's Watchlist](/library/). Scrobbling sends activity to a third-party account; disconnect a service you no longer want to use.

## Recover a connection

Read the displayed error and use **Retry** first when offered. For Trakt, **Reconnect** replaces this profile's connection across its Plozz devices; it does not affect other profiles. Avoid reconnecting repeatedly while a temporary network error is unresolved.

**Sync across all my servers** is a separate setting: it copies matching watch-state updates between servers. It is not a tracker sign-in or [iCloud configuration sync](/profiles-and-sync/).
