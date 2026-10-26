# Profiles, kids, and locks

A Plozz profile keeps preferences, libraries, Home layout, and trackers. A **server user** determines server access and history. Creating a Plozz profile does not create server users.

## Choose who is watching

Use the profile header in **Settings** to switch. **Settings > Profiles** manages names, avatars, and additions. On iPhone/iPad, choose **Edit Profiles** or touch and hold a profile, then **Edit Profile**.

**Automatically Sign In** restores the last authorized session, including verified Profile Lock or Plex PIN access. Finish unlocking before enabling it; turn it off for startup PIN prompts. Switching profiles still checks locks.

Each [Apple TV user](/apple-tv-profiles/) can remember a different Plozz profile.

## Add Plex Home profiles during setup

When **Add your Plex Home profiles?** appears, choose **Add all profiles** to create or reuse linked Plozz profiles, or **Just me** to select only your Plex user.

After importing, choose who's watching and finish their setup. Other newly created profiles finish setup when first opened. Importing does not unlock anyone: the selected user still completes required authorization/Plex PIN checks.

For children, configure [Kids Profile and Parental PIN](/parental-controls/) separately.

## Choose a server user

1. Open **Settings > Libraries** for the intended Plozz profile and enable the server.
2. On Apple TV, open **Watching as**. On iPhone/iPad, use the user picker or Plex identity row. Select a Jellyfin/Emby sign-in or Plex Home user; complete any Plex PIN check.
3. For a missing sign-in, choose **Add Another User** or **Add Another Plex Account**: inside Watching as on Apple TV, or the server's mobile Libraries controls. Sign in and confirm the identity and libraries.

Sign-ins are shared by this device's profiles. Disabled libraries hide browsing/discovery, not account-wide Continue Watching or Next Up. Enforce restrictions on the server.

## Lock a profile

In profile management, choose **Profile Lock** and confirm a four-digit PIN. Existing locks allow authorized change/removal.

Plozz can offer explicit, Plex-verified PIN reuse for protected Home users; otherwise the PINs remain separate. Profile locks do not replace server authentication. With iCloud Sync off, new locks apply only here.

## Set up a Kids profile safely

Follow [Parental controls](/parental-controls/) for Kids profile setup, the household Parental PIN, source restrictions, playlist approvals, and checks on each device.

## Before deleting or resetting

Deleting a profile removes its preferences and server selections, not shared server sign-ins.

There is no in-app forgotten-PIN reset. If this profile is already unlocked for editing on another device, remove its **Profile Lock** there; iCloud Sync must be enabled to carry the change here.

See [Profiles and sync](/profiles-and-sync/) for transferable settings.
