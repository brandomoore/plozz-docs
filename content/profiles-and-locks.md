# Profiles, kids, and locks

A Plozz profile keeps preferences, libraries, Home layout, and trackers. A **server user** determines server access and history. Creating a Plozz profile does not create server users.

## Choose who is watching

Use the profile header in **Settings** to switch. Open **Settings > Profiles** to add or manage profiles, including names and avatars. On iPhone/iPad, choose **Edit Profiles** or touch and hold a profile, then **Edit Profile**.

**Automatically Sign In** restores the last-used profile's previously authorized session on this device, including verified Profile Lock or Plex PIN access. Finish unlocking before enabling it. Turn it off if you want a PIN prompt on later launches; switching profiles still checks their locks.

Each Apple TV user can remember a different Plozz profile. Follow [Apple TV users and automatic sign-in](/apple-tv-profiles/) to set this up.

## Choose a server user

1. Open **Settings > Libraries** for the intended Plozz profile and enable the server.
2. On Apple TV, open **Watching as**. On iPhone/iPad, use the user picker or Plex identity row. Select a Jellyfin/Emby sign-in or Plex Home user; complete any Plex PIN check.
3. For a missing sign-in, choose **Add Another User** or **Add Another Plex Account**. Apple TV puts these inside Watching as; mobile shows them in the server's Libraries controls. Sign in, then confirm the identity and libraries.

Added sign-ins are shared by this device's profiles; no server user is created. Disabling libraries hides browsing/discovery, not account-wide Continue Watching or Next Up. Enforce content restrictions on the server.

## Lock a profile

Open a profile's management settings and choose **Profile Lock**. Enter and confirm a four-digit PIN. An existing lock offers change or removal after authorization.

For a PIN-protected Plex Home user, Plozz can offer to reuse that PIN. This is explicit and verified with Plex; otherwise keep the Plozz and Plex PINs separate. A Plozz lock is not a replacement for server authentication. With iCloud Sync off, a new lock applies only on this device.

## Set up a Kids profile safely

Follow [Parental controls](/parental-controls/) for Kids profile setup, the household Parental PIN, source restrictions, playlist approvals, and checks on each device.

## Before deleting or resetting

Deleting a Plozz profile removes its preferences and server selections, not the household's signed-in server accounts.

There is no in-app forgotten-PIN reset. If this profile is already unlocked for editing on another device, remove its **Profile Lock** there; iCloud Sync must be enabled to carry the change here.

See [Profiles and sync](/profiles-and-sync/) for transferable settings.
