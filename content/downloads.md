# Watch offline

Save videos on iPhone/iPad for offline viewing. Apple TV has no offline downloads.

## Save a video

1. Open a movie or episode's details, select the server/version if offered, then choose **Download**.
2. Review the selected files and **Quality** when prompted, then choose **Download**.
3. Open **Downloads** and wait for **Downloaded**, not just a full progress bar.
4. Play it from Downloads.

For shows, open **Manage Seasons**, then choose **Download All Available Episodes**, a season, or an episode. Only available videos download, not [streaming-service links](/network-shares/#open-links-to-streaming-services).

While online, Plozz prefers a usable matching download even if you select another server/version. Changing servers does not force streaming. In Offline Mode, an explicitly selected version needs its own saved copy.

> [!TIP]
> Before travelling, test the completed copy offline, including audio and subtitles.

## Browse only your downloads

Use **Offline Mode** to browse saved videos without connecting to sources, even with a network available.

1. Finish downloading while online, then open **Settings > Downloads > Offline Mode** and turn it on. You can also use the profile picker's ellipsis **More > Offline Mode** menu.
2. Choose the profile that owns the downloads and complete any Profile Lock or Plex PIN prompt.
3. Browse **Home**, your libraries, **Search**, or **Watchlist**, or play directly from **Downloads**.

Only usable, completed copies for the authorized profile and server user appear. Online descriptions or related titles may be unavailable. **Discover** and **Live TV** cannot connect.

> [!IMPORTANT]
> Sign in to the intended Plex Home user online on this device before travelling. If Plozz asks you to sign in online once, turn Offline Mode off, reconnect, and sign in. A changed profile or server identity can require this again.

Offline Mode is device-wide and not synced. It pauses downloads, iCloud updates, and online tracking. Turn it off to reconnect and [retry saved progress updates](/profiles-and-sync/#keep-watch-history-separate).

**No Network Connection** reports lost connectivity; it does not turn Offline Mode on. Dismissing either notice hides the message, not the condition.

## Choose episodes and versions

Use an episode's circle to select it; open its row to change versions.

One recommended version starts selected per episode. Select more to save separate files, using more storage. Movies allow one version. On a saved episode's details, hold the download button for **Choose Versions** to add another copy.

Check **Selected** and free device space under **Available**. **Size** appears for Original when all selected file sizes are known. Smaller quality choices appear only when all listed items support them.

If preparation fails, check the connection, then **Try Again**. **Cancel** starts no download.

## Choose quality and networks

Open **Downloads > Download Settings**, or **Settings > Downloads**, for this profile.

Under **Network**, set **Use Cellular** and **Pause in Low Data Mode**. Cellular connections and personal hotspots are blocked by default; Low Data Mode pauses downloads.

Under **Speed**, **Limit** caps downloads, not playback. Converted Jellyfin and some Emby copies need Original or **Unlimited**. With a cap, **In Background** defaults to pausing; **Continue at Full Speed** temporarily removes the cap.

Under **Quality**, choose **Default**, independently of streaming quality. **Original** keeps the file intact; smaller copies need provider support and preparation. Shares support Original only.

Leave **Ask Each Time** on to review downloads. Turning it off skips confirmation only for one item with one version; batches and multiple-version choices still ask.

New reduced Plex, Emby, and Silo copies retain all reported audio tracks; conversion can change their format. Emby needs extra temporary space. Jellyfin reduced copies may keep only one: choose Original for all embedded tracks. Existing downloads/retries keep their earlier track choices. Plex reduced copies keep at most one embedded text subtitle. Silo needs server download permission.

Supported separate text subtitle files are saved with the video.

Under **Notifications**, choose completion/failure notices and allow system notifications. A completion notice opens its title or batch without autoplaying; unlock the owning profile if asked.

## Update offline subtitles

After a subtitle-saving warning, the video can still be complete.

Reconnect, turn **Offline Mode** off, and open the movie/episode's menu in **Downloads**. Choose **Retry Subtitles**, or **Update Subtitles** to fetch changed subtitle files. Keep Plozz open under the owning profile; download network and speed limits still apply. This does not download the video again.

Unsupported or oversized subtitle files can remain unavailable. Play the copy offline and check **Subtitles** afterward.

## Pause, resume, or remove

Use a movie/episode's menu for **Pause** or **Resume**. **Remove** deletes a movie immediately; **Remove Download** does the same for an episode. On Downloads, a show's menu offers **Pause Show**/**Resume Show**, or **Remove** to delete its saved episodes after confirmation. **Pause All**/**Resume All** controls the queue.

To remove selected episodes, open the downloaded show, choose **Edit**, then select episodes or **Select All**. Choose **Remove** and confirm. **Done** clears selection without deleting anything. Season headers also offer pause/resume and removal. Server originals stay untouched; check **Storage** before large batches.

> [!WARNING]
> In Download Settings, **Cancel Active Downloads** deletes unfinished copies but keeps completed downloads. **Delete All Downloads** removes this profile's saved movies and episodes. Pause instead to resume later.

Network shares and some other downloads usually need Plozz open. Switching profiles pauses transfers; return to resume.

On iOS/iPadOS 26 or later, a Live Activity can help transfers continue. Its **Finishing** status is not completion. The system may pause work; cancelling the activity pauses its downloads and keeps partial files. Resume in Plozz.
