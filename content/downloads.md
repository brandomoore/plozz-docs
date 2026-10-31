# Watch offline

Save videos on iPhone/iPad for offline viewing. Apple TV has no offline downloads.

## Save a video

1. Open a movie or episode's details, select the server/version if offered, then choose **Download**.
2. If prompted, choose **Download Original** or a smaller copy.
3. Open **Downloads** and wait until your copy is ready to play.
4. Play it from Downloads.

For shows, open **Manage Seasons**, then choose **Download All Available Episodes**, a season, or an episode. Only available files can download.

Plozz prefers a usable matching download even if you select another server/version. Check the saved edition; changing servers does not force streaming.

> [!TIP]
> Before travelling, test the completed copy offline, including audio and subtitles.

## Choose quality and networks

Open **Downloads > Download Settings**, or **Settings > Downloads**, for this profile.

Start with **Allow Cellular Downloads** and **Pause in Low Data Mode**. Cellular connections and personal hotspots are blocked by default; Low Data Mode pauses downloads.

Next, **Download Speed > Limit** caps downloads, not playback. Reduced-quality Jellyfin/Emby downloads cannot be capped: choose Original or set **Limit** to **Unlimited**. With a cap, background downloads pause by default; **Continue at Full Speed** temporarily removes the cap.

Then choose **Default Quality**, independently of streaming quality. **Original** saves the existing file; smaller copies require provider support and preparation. Network shares support **Original only**.

Reduced Plex, Jellyfin, and Emby copies use your preferred audio language. Plex and Silo reduced copies keep one audio track. **Include All Audio Tracks** cannot override that limit: turn it off or choose Original. Plex reduced copies keep at most one text subtitle; external sidecars remain on the server. Silo downloads require server permission.

Under **Notifications**, set completion/failure switches and allow system notifications. Notices can summarize a batch. Tapping a completion notice opens the title or batch without autoplaying; unlock the owning profile if asked.

## Pause, resume, or remove

Use a movie/episode's menu for **Pause**, **Resume**, or **Remove**. A show's menu offers **Pause Show**/**Resume Show**; **Remove** deletes its downloaded episodes. Use **Pause All**/**Resume All** for the whole queue.

Removal keeps server originals. Check **Storage** in Download Settings before large batches.

> [!WARNING]
> In Download Settings, **Cancel Active Downloads** deletes unfinished copies but keeps completed downloads. **Delete All Downloads** removes this profile's saved movies and episodes. Pause instead to resume later.

Some downloads continue after you leave Plozz. Share downloads and other app-managed transfers usually need it open. Switching profiles pauses transfers; return to resume.

On iOS/iPadOS 26 or later, a Live Activity can help transfers continue. Its **Finishing** status is not completion. The system may pause work; cancelling the activity pauses its downloads and keeps partial files. Resume in Plozz.
