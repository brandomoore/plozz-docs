# Profiles and sync

Plozz profiles separate app preferences. iCloud Sync, nearby device setup, and watch-history updates solve different problems.

## Use the right profile

Use the profile header at the top of **Settings** to switch profiles before changing libraries or preferences. Open **Settings > Profiles** to manage them.

For server users, Kids profiles, locks, and automatic sign-in, see [Profiles, kids, and locks](/profiles-and-locks/).

## Sync settings

1. Use the same iCloud account on each device, then open **Settings > iCloud Sync** and enable sync.
2. Use **Sync Now** to request an update.
3. Review servers marked **Needs sign-in** on that page and complete their setup.

iCloud Sync carries profiles, preferences, server details, watchlist state, supported Live TV configuration, and tracker sign-ins. It does not transfer media files or replace each device's media-server authentication. Use device setup below or sign in on each device.

Downloads, imported M3U files, automatic sign-in, and [Video buffer](/streaming-quality/) remain device-local. A library-channel recipe alone does not transfer its complete schedule without the associated catalogue snapshot.

## Set up another device

Keep both devices on the same Wi-Fi. On the receiving device, choose **Set up from another device** during setup. On an already configured iPhone/iPad, find it in **Settings > iCloud Sync**, under **This Device**.

On the configured device, open **Settings > iCloud Sync**. On Apple TV, also choose **Set Up Another Device**.

Select the nearby receiver or enter its code. An iPhone/iPad can also scan the receiver’s QR code. Alternatively, scan the configured Apple TV’s displayed QR code with a new iPhone/iPad.

Compare verification codes and approve only a match. Setup can transfer supported sign-ins; **Silo always requires independent device approval**.

## Keep watch history separate

Your server stores history for its selected user. **Sync across all my servers** under Trackers, also exposed in mobile Playback as **Sync watch state across servers**, separately copies updates to matching titles on other servers. This defaults to on. Disable it if you want each server's history kept independent.

## Recover sync without erasing your setup

Check the iCloud account and **Needs sign-in** entries first. Use **Sync Now** before destructive actions.

On iPhone/iPad, **Reload From iCloud** retries loading cloud data. **Reset Sync** replaces iCloud data with this device's copy; choose the device with the setup you intend to keep.

**Erase Sync Data** removes synced profiles, settings, servers, watchlist, Live TV sources, and tracker sign-ins from iCloud, and clears the listed local setup while leaving sync off. Turn off sync on other devices first to prevent re-upload. On iPhone/iPad it also removes Plozz's iCloud Keychain server logins; Apple TV's erase screen warns that this additional step requires iPhone/iPad. Read the confirmation rather than using erase as a connection repair.
