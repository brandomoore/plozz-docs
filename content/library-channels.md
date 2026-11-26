# Create channels from your library

Turn your movies and shows into a scheduled lineup, then tune in through [Live TV](/live-tv/) instead of choosing a title each time.

Plozz channels use accessible Plex, Jellyfin, Emby, or Silo libraries, not IPTV or network shares. Silo needs compatible original-file playback; disc images, multipart and multi-episode files are excluded. Your files and access permissions stay with their servers.

## Start with automatic channels

Choose the intended profile; a Kids profile needs the household **Parental PIN** when one is set. In **Live TV**, open **TV Sources** on Apple TV or **More > TV Sources** on iPhone/iPad, then **Plozz channels**.

Enable **Auto-create channels from your libraries**. Wait for preparation, then return to the guide. Generated channels are not individually editable. Use **Retry Plozz channels** after an error or **Refresh Plozz channels** to rebuild them.

## Create a custom channel

In the same page, choose **Create custom channel**:

1. Enter **Channel name** and choose an **Icon**.
2. Set **Order**. **Shows in episode order** alternates shows and movies, keeping episodes in sequence. **Seeded shuffle** mixes individual videos; **Movies** excludes episodes. Enable **Movies**, **Episodes**, or both.
3. Select **Source libraries**. Under **Rules**, optionally enter **Include movie or show titles**, **Exclude movie or show titles**, **Genres**, or **Allowed ratings**. Use complete names separated by semicolons, not partial searches. Blank fields allow all accessible matches.

> [!IMPORTANT]
> Allowed ratings matches individual classifications, not a maximum age. **Include unrated titles** starts on; turn it off to exclude missing classifications. For children, use suitable libraries and a [restricted server user](/parental-controls/#choose-suitable-media-sources).

4. Check **Scheduling timezone**, initially this device's timezone. Use a name such as `Europe/London` for preview times. **Schedule seed** accepts zero or a positive whole number. Change it for a different repeatable order, or keep it unchanged when the content stays the same.
5. Choose **Preview schedule**, inspect the programs and start time, then **Save channel**. Titles with missing or invalid durations are excluded.

## Choose whether viewing updates your progress

Below the channel lists, **Update watch history** starts off for this profile on this device. Turn it on to mark a program watched after you view 90% of it. Channels play original files and do not save resume positions.

Eligible completions can reach [connected trackers](/trackers/) and matching copies through [cross-server history](/profiles-and-sync/#keep-watch-history-separate). Leave this off if channel browsing should not change your history.

## Change or remove a channel

Select a custom channel's name to edit it; hold it for **Delete channel**. Deleting removes the channel, not its media.

Changes begin after already-published programs; check the preview's start time. Let the [library catalogue finish syncing](/profiles-and-sync/#sync-live-tv-deliberately) before expecting the same schedule on another device.
