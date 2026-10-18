# Watch offline

On iPhone and iPad, download movies and episodes so you can watch without a server connection.

## Save a video

1. Open a movie or episode’s detail page and choose its download button.
2. If prompted, choose **Download Original** or an available smaller copy.
3. Open **Downloads** to follow progress. Wait until the video is complete, not just preparing or downloading.
4. Open the saved movie or episode from Downloads to watch it.

Before travelling, disconnect from the network and play the completed copy from Downloads. Check its audio and subtitles.

Apple TV does not support offline downloads.

## Choose quality and networks

For the active profile, open **Downloads > Download Settings**, or **Settings > Downloads**.

- **Default Quality** controls new downloads independently of streaming quality.
- **Original** saves the existing file. Smaller copies require provider support and server preparation.
- Network shares support **Original only**.
- **Allow Cellular Downloads** and **Pause in Low Data Mode** control when transfers can run.

Cellular and other expensive networks are blocked by default; Low Data Mode pauses downloads.

Reduced Plex, Jellyfin, and Emby copies use your profile's preferred audio language. Plex and Silo reduced copies keep one audio track. **Include All Audio Tracks** cannot override that limit: turn it off or choose Original. Plex reduced copies keep at most one text subtitle; external sidecars remain on the server. Silo downloads require server permission.

**Download Speed > Limit** affects downloads, not playback. Reduced-quality Jellyfin/Emby downloads cannot be capped: choose Original or **Full Speed**. With a cap, background downloads pause by default; **Continue at Full Speed** temporarily removes the cap.

Under **Notifications**, set completion/failure switches and allow system notifications. Batch notices summarize a season or show. Tapping a completion notice opens the title or batch without autoplaying.

## Pause, resume, or remove

Use a download’s trailing menu for **Pause**, **Resume**, or **Remove**. The Downloads screen also offers Pause All and Resume All.

Removing a download deletes its on-device copy, not the original on your server. Check free device storage before large batches; changing Default Quality affects new downloads, not files already saved.

Background progress depends on iOS and the transfer type. If a transfer pauses, reopen Plozz and resume it.

On iOS/iPadOS 26 or later, a Live Activity can show progress when background processing is available. Cancellation or expiry pauses its active downloads without deleting partial files.

If a saved title will not play, confirm that the selected version finished downloading. A Seerr request or a server's preparation progress is not a completed offline copy.
