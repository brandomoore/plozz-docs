# Watch offline

Download movies and episodes on iPhone/iPad, not Apple TV.

## Save a video

1. Open a movie or episode’s detail page and choose its download button.
2. If prompted, choose **Download Original** or a smaller copy.
3. Open **Downloads** and wait for completion, not preparing, downloading, or **Finishing**.
4. Open the saved movie or episode from Downloads to watch it.

For a show, open **Manage Seasons**, then choose **Download All Available Episodes**, a season, or an episode. Only available library files can download.

> [!TIP]
> Before travelling, play the completed copy from Downloads without a network. Check audio and subtitles.

## Choose quality and networks

For the active profile, open **Downloads > Download Settings**, or **Settings > Downloads**.

- **Default Quality** controls new downloads independently of streaming quality.
- **Original** saves the existing file. Smaller copies require provider support and server preparation.
- Network shares support **Original only**.
- **Allow Cellular Downloads** and **Pause in Low Data Mode** control when transfers can run.

Cellular and other expensive networks are blocked by default; Low Data Mode pauses downloads.

Reduced Plex, Jellyfin, and Emby copies use your profile's preferred audio language. Plex and Silo reduced copies keep one audio track. **Include All Audio Tracks** cannot override that limit: turn it off or choose Original. Plex reduced copies keep at most one text subtitle; external sidecars remain on the server. Silo downloads require server permission.

**Download Speed > Limit** affects downloads, not playback. Reduced-quality Jellyfin/Emby downloads cannot be capped: choose Original or set **Limit** to **Unlimited**. With a cap, background downloads pause by default; **Continue at Full Speed** temporarily removes the cap.

Under **Notifications**, set completion/failure switches and allow system notifications. Batch notices summarize a season or show. Tapping a completion notice opens the title or batch without autoplaying; unlock the owning profile if asked.

## Pause, resume, or remove

Use a download’s trailing menu for **Pause**, **Resume**, or **Remove**. The Downloads screen also offers Pause All and Resume All.

Removal deletes the on-device copy, not the server original. Check **Storage** in Download Settings for download use and available device space before large batches.

> [!WARNING]
> In Download Settings, **Cancel Active Downloads** deletes unfinished copies but keeps completed downloads. **Delete All Downloads** removes this profile's saved movies and episodes. Pause instead to resume later.

Eligible HTTP transfers can continue in the background; in-process/share transfers need Plozz active unless iOS grants continued execution. Reopen Plozz to resume.

On iOS/iPadOS 26 or later, downloads can request continued processing with a Live Activity; the system can decline. Cancellation or expiry pauses its downloads without deleting partial files. Receiving all bytes still requires offline validation before completion.
