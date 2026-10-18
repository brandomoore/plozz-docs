# Troubleshooting

Check the affected source or connection before reporting a persistent problem.

## Cannot connect or sign in

1. Check that the server is reachable from this device’s network and that its saved address is correct.
2. For custom ports or reverse-proxy paths, enter the full server address.
3. If Jellyfin Quick Connect is unavailable, choose username-and-password sign-in.
4. For Silo, use its browser address and complete device approval and any profile PIN.

After [syncing another device](/profiles-and-sync/), check **Settings > iCloud Sync** for **Needs sign-in** servers. A synced server entry is not proof that this device is signed in.

## Channels or listings are missing

Open Live TV’s **Sources**, inspect the affected source’s error, and choose **Retry**. Refresh channels or sources after your provider changes a playlist.

Missing guide listings do not necessarily prevent channel playback. A connection added as **guide only** cannot play its channels.

## Playback or downloads fail

Check [Playback and audio](/playback/) for quality and audio options, or [Watch offline](/downloads/) for paused transfers and network restrictions.

## Report a problem

Open **Settings > Help & Diagnostics**. Choose **Report a Problem** on iPhone/iPad; on Apple TV, scan the displayed code or follow its GitHub link. You can also ask in the [Plozz community](https://plozz.app/discord).

Include your app version/build from Settings, device and OS, provider, exact error, and steps to reproduce.

If available, enable **Share Crash Reports** before sending diagnostics. Never post passwords, pairing codes, or private playlist URLs.
