# Profiles, kids, and locks

A Plozz profile keeps preferences, libraries, Home layout, and trackers. A **server user** determines server-side access and history. Creating a Plozz profile does not create a Jellyfin user, Plex Home user, or Silo profile.

## Choose who is watching

Use the profile header in **Settings** to switch. Open **Settings > Profiles** to add or manage profiles, including names and avatars. On iPhone/iPad, choose **Edit Profiles** or touch and hold a profile, then **Edit Profile**.

Under each profile's **Libraries**, select included servers, the server user to watch as, and enabled libraries. Server sign-ins are shared on the device; each profile chooses which to use.

**Automatically Sign In** restores the last-used profile's previously authorized session on this device, including verified Profile Lock or Plex PIN access. Finish unlocking before enabling it. Turn it off if you want a PIN prompt on later launches; switching profiles still checks their locks.

## Lock a profile

Open a profile's management settings and choose **Profile Lock**. Enter and confirm a four-digit PIN. An existing lock offers change or removal after authorization.

For a PIN-protected Plex Home user, Plozz can offer to reuse that PIN. This is explicit and verified with Plex; otherwise keep the Plozz and Plex PINs separate. A Plozz lock is not a replacement for server authentication. With iCloud Sync off, a new lock applies only on this device.

## Set up a Kids profile safely

1. Add a Kids profile or enable **Kids Profile** in an existing profile's management settings.
2. Choose a suitably restricted server user and libraries.
3. Create a household **Parental PIN** to protect restricted settings and leaving Kids profiles.
4. If using [Seerr requests](/media-requests/), map the profile to a restricted Seerr user.

Kids profiles disable external Discovery recommendations. They do **not** add an app-wide maturity filter: library content follows the connected server user's restrictions. This matters especially for network shares without server-user restrictions.

Without a Parental PIN, restricted settings and profile switching remain available. The Parental PIN protects those actions; a Profile Lock protects entry into a particular profile. Removing the Parental PIN does not turn Kids profiles off.

## Before deleting or resetting

Deleting a Plozz profile removes its preferences and server selections, not the household's signed-in server accounts.

For a forgotten Profile Lock PIN, use **Forgot PIN?** and prefer recovery from another authorized signed-in device where possible. Signing out and setting up again has broader consequences; do not treat it as the first troubleshooting step.

See [Profiles and sync](/profiles-and-sync/) for what moves between devices.
