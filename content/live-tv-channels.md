# Organize channels and fix listings

Organize [Live TV](/live-tv/) channels and fix their listings.

## Browse categories on iPhone and iPad

Choose a category or **All channels** to open its guide. On a narrow layout, use the **Category** menu to switch groups, or the **Categories** back button to return to the directory. Wider layouts keep categories in a sidebar.

In the directory or a sidebar layout, the **Source** menu selects an enabled source or **All**. From the directory, **More > Guide** opens the guide for all channels. Use **More > Filters** to narrow results.

Choose **Category**, **Language**, and **Country**, then optionally enable **Favorites only** or **Channels with a guide**. Under **Sort**, choose **Channel number** or **Name**. These filters narrow the displayed list; they do not restore hidden channels. **Reset filters** clears browse filters and the source selection, but keeps sorting and channel visibility.

## Wait for an IPTV guide

Your IPTV guide loads while you browse. Dismissing its progress notice does not cancel it; percentages describe individual stages. Keep Plozz open.

**Guide ready** means current listings were found, not that every channel has them. For **Guide update failed** or **Guide update paused**, open **TV Sources**, select the IPTV account's source, then **Refresh guide**. For **No guide configured**, add a guide address using **Edit connection** under **Settings > Sources**.

## Find hidden channels

Press and hold a channel for **Add to Favorites**, **Remove from Favorites**, or **Hide channel**.

On Apple TV, open **Manage channels** in Live TV's sidebar. On iPhone/iPad, open **More > Filters > Manage IPTV channels**, then:

- In **Categories**, **Show** overrides regional filtering; **Hide** hides that group; **Automatic** follows your regional choices.
- In **Countries and languages**, enable **Filter IPTV by country or language** and select the tags you want. A country OR language match is enough. Tags come from the playlist; Plozz does not guess from names.
- In **Hidden channels**, use **Show channel** to make an individual exception. **Reset category and region visibility** keeps individually hidden channels and scan exclusions.

Regional filtering can hide untagged channels. Check **Favorites only**, **Channels with a guide**, and the selected source too. Unavailable favorites stay saved.

## Arrange and save a Multiview

Use [Multiview](/live-tv/#watch-several-channels) to follow several channels without switching between them. Reveal its controls; on iPhone/iPad, choose **Edit layout** if needed.

Open **Layout** and choose the arrangement:

- **Side by side** shows two pictures together; in mobile portrait it is **Top and bottom**. With more pictures, this choice becomes **Grid**.
- **Main picture** gives one picture more space, with the others alongside.
- **Corner** overlays smaller pictures. Choose **Position** and **Size** to keep them away from something important.

Only one picture supplies sound. Focus it on Apple TV, or select it under **Audio** on mobile. To give a channel the main picture, hold its picture on Apple TV and choose **Make main video**. On mobile, select its Audio entry, then **More > Make main** while editing.

To change a channel, hold its picture on Apple TV and choose **Replace channel** or **Remove**. On mobile, select its **Audio** entry, then choose **More > Replace** or **More > Remove** while editing. Replacement opens the guide to choose another channel; removal leaves the other pictures playing. At least one picture must remain.

Once channels load, choose **More > Favorite** to save the channels and layout for your profile. Reopen them from the guide's **Multiviews**; on narrow mobile layouts, check **More**. Hold a saved entry for **Remove from Favorites**. Saving reserves no streams or tuners, and missing channels may prevent reopening.

If favorites cannot be loaded or saved, open **Multiviews** and choose **Retry** before relying on your changes.

Multiview does not support AirPlay or Picture in Picture. Closing it leaves saved favorites available.

## Correct a channel's guide

Guide correction, file editing, identity repair and scans below are for standalone playlists, not IPTV accounts. Accounts use **Refresh guide** and **Edit connection** instead.

1. Under a standalone playlist in **TV Sources**, open **Guide options > Correct guide mapping** when offered.
2. Select the channel, its guide source, and the correct station. Check the regional feed.

Corrections survive guide refreshes. **Use automatic matching** removes your override.

Under **Guide options**, **Keep previous days** and **Look ahead** set how many days to keep. They cannot create missing listings; earlier listings are not recordings.

## Edit imported playlist details

In **TV Sources**, select the imported playlist, then **Playlist and guides**. Edit **Name (optional)** or guide addresses, then **Save source**. The imported file stays unchanged.

## Restore a saved channel identity

If **Review channel identities** appears in Guide options, inspect the candidate before choosing **Restore saved identity**. Confirm only the same station and regional feed: this carries over favorites, hiding, and guide corrections. Otherwise, leave it separate.

## Check unavailable links

In **TV Sources**, select a playlist, open **Check channel availability**, then **Scan channels**. This tests reachability, not playback-format support.

Open **Scan results**. Unavailable channels are hidden; uncertain results need another check. **Cancel scan** stops remaining checks.

Use **Restore channel** or **Restore hidden channels** to undo scan exclusions. Other hiding rules still apply. If saving results fails, use **Retry saving** before assuming your choices will persist.
