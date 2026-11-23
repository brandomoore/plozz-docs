# Tracking integrations

Keep a record of what you watch or listen to in a connected service. Select the right **Plozz profile** before opening **Settings > Trackers**; each profile can use different accounts.

## Choose a service

| Service | Purpose in Plozz |
| --- | --- |
| Trakt | Video scrobbling to watch history and watchlist sync |
| Simkl | Video scrobbling to watch history and watchlist sync |
| WeTrakr | Movie/episode scrobbling to watch history and planning-list sync with Watchlist |
| AniList | Identified anime progress and anime watchlist sync |
| MyAnimeList | Identified anime progress and anime watchlist sync |
| Last.fm | Eligible music listening on Apple TV |
| PublicMetaDB | Movie/episode progress and completed watches |

Connecting starts reporting playback to that account, often called scrobbling. Bringing existing history back to network shares is a separate choice below.

Supported [external-player returns](/external-players/#return-watch-progress) can send unfinished progress to Trakt after you return. Marking a title unwatched in Plozz does not delete its Trakt history.

AniList and MyAnimeList do not treat every television episode as anime. Matching and usable identifiers matter; anime progress is submitted when playback stops at 80% or more.

WeTrakr appears only in configured builds. Its planning list syncs with [Watchlist](/watchlist/), not as a source of playable videos.

## Connect the correct account

1. Select the service's connection button: **Connect** on Apple TV, or, for example, **Connect Trakt** on iPhone/iPad.
2. Follow the displayed browser, QR, or device-code instructions and authorize your account.
3. For AniList or MyAnimeList on Apple TV, return and enter the code requested by Plozz. Follow the actual service-specific prompt rather than reusing another tracker's code.
4. Confirm the connected account name before watching.

**Unavailable** on Apple TV or **Unavailable in this build** on mobile means the tracker is not configured, not that your media-server password is wrong.

Disconnect a service when you no longer want to send it activity or use its connected [Watchlist](/watchlist/).

## Recover a connection

Read the displayed error and use **Retry** first when offered. For Trakt or WeTrakr sync errors, open Plozz on your other devices and retry when instructed. Reconnecting either service replaces this profile's connection across its Plozz devices, not other profiles. Avoid repeated reconnects during network errors.

If disconnecting WeTrakr reports that session revocation failed, remove Plozz from your connected apps on WeTrakr too.

## Connect PublicMetaDB

Open **PublicMetaDB**, then choose **Connect PublicMetaDB**.

- On Apple TV, scan the displayed QR code or follow the website and pairing-code instructions on your phone. **Enter API key manually** offers remote entry instead.
- On iPhone/iPad, enter your **API key**, then choose **Connect**.

Keep the key and pairing code private. Wait for **Connected** before watching. Reporting needs a confirmed title match; episodes also need matching numbering.

If a playback report is unconfirmed, check your PublicMetaDB history; Plozz will not resend it.

Use **Retry saved connection** after a connection failure. **Replace API key** changes this profile's key on its synced devices; the old key remains valid at PublicMetaDB. **Disconnect** removes the saved key from those devices without deleting history. Revoke the key at PublicMetaDB if needed.

## Pause reporting without disconnecting

Open a connected service and turn off its switch, such as **Use Trakt**, **Use Last.fm**, or **Use PublicMetaDB**. This pauses reporting for this profile on this device and hides share-history sync controls. Turn it on to resume reporting. This does not erase history already sent.

Connected Watchlist lists still sync. Previously enabled share sync can resume when you turn reporting back on; turn off **2-way sync** first to stop that. **Disconnect** stops using the account.

## Bring tracker history to network shares

Use this to pick up supported history from another player on your network-share titles. It is experimental and needs an enabled video tracker, connected shares, and correctly matched titles. Last.fm does not offer this.

1. Open the connected service under **Settings > Trackers** and enable **2-way sync** under **Watch history**.
2. With several shares, choose them under **Libraries to sync**, then **Start sync**. With one share, enabling starts immediately. Existing history is included.
3. Keep Plozz open while it checks. Read the last-sync result; expand it for each library's results when offered.

Tracker history returns only to the selected media shares in Plozz. This never writes history back to Plex, Emby, Silo, or Jellyfin.

Watched titles and compatible resume positions can return where the tracker supplies them. AniList/MyAnimeList support watched history, not resume positions; aggregate anime episode counts do not identify individual watched episodes.

Plozz keeps conflicting history rather than overwriting it automatically. Missing, ambiguous, or incompatible matches are skipped. Playing titles are skipped too; use **Sync now** after playback ends. An unverified update is not repeatedly sent: check the title's history.

Use **Sync now** after watching elsewhere or an interrupted check. Automatic checks need Plozz in the foreground; on mobile, turn **Offline Mode** off. Respect any displayed retry time.

Open **Libraries** to change selected shares when several are available, or turn off 2-way sync to stop checks. These choices stay on this device. Profile, account, or source changes can require fresh permission; **Remove previous permission** clears an obsolete choice. Stopping does not undo applied history.

**Sync across servers** on the main Trackers page is different: it copies matching updates between your sources. See [watch-history and iCloud differences](/profiles-and-sync/#keep-watch-history-separate).
