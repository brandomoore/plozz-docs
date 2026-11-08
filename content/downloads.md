# Watch offline

Save videos on iPhone/iPad for offline viewing. Apple TV has no offline downloads.

## Save a video

1. Open a movie or episode's details, select the server/version if offered, then choose **Download**.
2. Review the selected files and **Quality** when prompted, then choose **Download**.
3. Open **Downloads** and wait for **Downloaded**, not just a full progress bar.
4. Play it from Downloads.

For shows, open **Manage Seasons**, then choose **Download All Available Episodes**, a season, or an episode. Only available video files can download, not [streaming-service links](/network-shares/#open-links-to-streaming-services).

While online, Plozz prefers a usable matching download even if you select another server/version. Changing servers does not force streaming. In Offline Mode, an explicitly selected version needs its own saved copy.

> [!TIP]
> Before travelling, test the completed copy offline, including audio and subtitles.

## Browse only your downloads

Use **Offline Mode** to browse saved videos without connecting to your sources, even when this device still has a network connection.

1. Finish downloading while online, then open **Settings > Downloads > Offline Mode** and turn it on. You can also use the profile picker's ellipsis **More > Offline Mode** menu.
2. Choose the profile that owns the downloads and complete any Profile Lock or Plex PIN prompt.
3. Browse **Home**, your libraries, **Search**, or **Watchlist**, or play directly from **Downloads**.

Only completed, usable copies for the authorized profile and server user appear. Missing online descriptions or related titles may remain unavailable. **Discover** and **Live TV** cannot connect.

> [!IMPORTANT]
> Sign in to the intended Plex Home user online on this device before travelling. If Plozz asks you to sign in online once, turn Offline Mode off, reconnect, and sign in. A changed profile or server identity can require this again.

Offline Mode is shared by profiles on this device and is not synced. It pauses downloads, iCloud updates, and online tracking. Turn it off to reconnect; saved progress can then [retry its updates](/profiles-and-sync/#keep-watch-history-separate).

**No Network Connection** reports lost connectivity; it does not turn Offline Mode on. Dismissing either notice hides the message, not the condition.

## Choose episodes and versions

For a show or season, review the episode list before confirming. Use an episode's selection circle to include or exclude it; open its row to change the selected versions.

Plozz initially selects one recommended version per episode. You can select more than one: each downloads a separate file and uses more storage. A movie allows only one version. On a saved episode's details, hold the download button for **Choose Versions** to add another copy.

Check **Selected** and free device space under **Available**. **Size** appears for Original when all selected file sizes are known. Smaller quality choices appear only when all listed items support them.

If preparation fails, check the source connection, then choose **Try Again**. **Cancel** returns without starting a download.

## Choose quality and networks

Open **Downloads > Download Settings**, or **Settings > Downloads**, for this profile.

Under **Network**, set **Use Cellular** and **Pause in Low Data Mode**. Cellular connections and personal hotspots are blocked by default; Low Data Mode pauses downloads.

Under **Speed**, **Limit** caps downloads, not playback. Reduced-quality Jellyfin/Emby copies cannot be capped: choose Original or **Unlimited**. With a cap, **In Background** defaults to pausing; **Continue at Full Speed** temporarily removes the cap.

Under **Quality**, choose **Default**, independently of streaming quality. **Original** keeps the file intact; smaller copies need provider support and preparation. Shares support Original only.

Leave **Ask Each Time** on to review downloads. Turning it off skips confirmation only for one item with one version; batches and multiple-version choices still ask.

Reduced copies use your preferred audio language; Plex and Silo keep one audio track. Choose Original for all embedded tracks. Plex reduced copies keep at most one embedded text subtitle. Silo needs server download permission.

Supported separate text subtitle files are saved with the video. Check captions offline before relying on them.

Under **Notifications**, choose completion/failure notices and allow system notifications. A completion notice opens its title or batch without autoplaying; unlock the owning profile if asked.

## Update offline subtitles

If a download warns that some subtitles could not be saved, the video can still be complete.

Reconnect, turn **Offline Mode** off, and open the movie/episode's menu in **Downloads**. Choose **Retry Subtitles**, or **Update Subtitles** to fetch changed subtitle files. Keep Plozz open under the owning profile; download network and speed limits still apply. This does not download the video again.

Unsupported or oversized subtitle files can remain unavailable. Play the copy offline and check **Subtitles** afterward.

## Pause, resume, or remove

Use a movie/episode's menu for **Pause**, **Resume**, or **Remove**. A show's menu offers **Pause Show**/**Resume Show**; **Remove** deletes its downloaded episodes. Use **Pause All**/**Resume All** for the whole queue.

Removal keeps server originals. Check **Storage** in Download Settings before large batches.

> [!WARNING]
> In Download Settings, **Cancel Active Downloads** deletes unfinished copies but keeps completed downloads. **Delete All Downloads** removes this profile's saved movies and episodes. Pause instead to resume later.

Some downloads continue after you leave Plozz. Share downloads and other app-managed transfers usually need it open. Switching profiles pauses transfers; return to resume.

On iOS/iPadOS 26 or later, a Live Activity can help transfers continue. Its **Finishing** status is not completion. The system may pause work; cancelling the activity pauses its downloads and keeps partial files. Resume in Plozz.
