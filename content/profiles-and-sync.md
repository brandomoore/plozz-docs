# Profiles and sync

Plozz profiles separate app preferences. iCloud Sync, nearby device setup, and watch-history updates solve different problems.

## Use the right profile

Use the profile header at the top of **Settings** to switch profiles before changing libraries or preferences. Open **Settings > Profiles** to manage them.

For server users, Kids profiles, locks, and automatic sign-in, see [Profiles, kids, and locks](/profiles-and-locks/).

## Sync settings

1. Use the same iCloud account on each device, then open **Settings > iCloud Sync** and enable sync.
2. Use **Sync Now** to request an update.
3. Review servers marked **Needs sign-in** on that page and complete their setup.

iCloud Sync carries profiles, preferences, server details, watchlist state, supported Live TV configuration, and tracker sign-ins. It does not transfer downloaded videos or universally authorize media servers.

With sync and iCloud Keychain available, iPhone/iPad can automatically adopt supported Jellyfin, Plex, Emby, share, and Seerr credentials. Apple TV does not use this iCloud Keychain path; use nearby setup or sign in there. **Silo requires approval on each device**, regardless of sync.

Downloads, automatic sign-in, and [Video buffer](/streaming-quality/) remain device-local.

## Sync Live TV deliberately

Live TV follows iCloud Sync for the same Plozz profile: source addresses, channel settings, guide mappings, and library schedules can sync. Playlist/guide addresses and supported imported source copies use encrypted iCloud storage. A library-channel recipe needs its catalogue snapshot to reproduce the schedule.

The **Playlist file** option in IPTV account sign-in is different: those account-imported M3U files stay on the importing device. Use a playlist URL or import again elsewhere.

Kids-profile [playlist-source approvals](/live-tv/#approve-playlist-sources-for-kids) remain local and must be granted on each device. If iCloud Sync shows **Set up IPTV source**, enter its address or update the older sending app; a source descriptor alone is not a usable connection.

## Set up another device

Keep both devices on the same local network and allow Plozz Local Network access. On the receiver, choose **Set up from another device** during setup. On an already configured iPhone/iPad, find it in **Settings > iCloud Sync**, under **This Device**.

On the configured device, open **Settings > iCloud Sync**. On Apple TV, also choose **Set Up Another Device**.

Select the nearby receiver or enter its code. An iPhone/iPad can scan its QR code with Camera permission; use the code instead if unavailable. Alternatively, scan the configured Apple TV's QR code with a new iPhone/iPad.

When verification codes are shown, approve only a match. Same-iCloud-account pairing can verify the device without this comparison. Setup transfers only supported sign-ins; check **Needs sign-in** afterward.

## Keep watch history separate

Your server stores history for its selected user. **Sync across all my servers** under Trackers, also exposed in mobile Playback as **Sync watch state across servers**, copies watched-state and resume updates to matching accessible copies on other servers. It defaults to on; Apple TV enables the control with multiple servers. Turn it off for independent server histories. [Tracker scrobbling](/trackers/) sends activity to external services instead; it is not iCloud configuration sync.

## Recover sync without erasing your setup

Check the iCloud account and **Needs sign-in** entries first. Use **Sync Now** before destructive actions.

On iPhone/iPad, **Reload From iCloud** retries loading cloud data. **Reset Sync** replaces iCloud data with this device's copy; choose the device with the setup you intend to keep.

**Erase Sync Data** removes synced profiles, settings, servers, watchlist, Live TV sources, and tracker sign-ins from iCloud, and clears the listed local setup while leaving sync off. Turn off sync on other devices first to prevent re-upload. On iPhone/iPad it also removes Plozz's iCloud Keychain server logins; Apple TV's erase screen warns that this additional step requires iPhone/iPad. Read the confirmation rather than using erase as a connection repair.
