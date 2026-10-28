# Connect a server

## Add a connection

1. Choose your provider during setup, or open **Settings > Servers > Add Server**.
2. For Jellyfin, Emby, or Silo, select a server or enter a hostname, IP, or URL, including custom ports/paths.
3. Complete the provider’s sign-in:
   - **Jellyfin:** approve the Quick Connect code from Jellyfin on another device, or use username/password.
   - **Plex:** follow the linking instructions, then select your server.
   - **Emby:** sign in with your server username and password.
   - **Silo:** use its browser address, compare codes before approving, then choose a Silo profile. Enter its PIN if required.
4. Choose libraries for your Plozz profile. Later, use **Settings > Libraries** to select servers, users, and libraries.

Without connections, Apple TV offers **Sign In to a Server**.

> [!NOTE]
> Manual Jellyfin/Emby entries try HTTPS first, then eligible HTTP alternatives before sign-in. Explicit HTTPS addresses and certificate-trust failures never fall back to HTTP.

> [!WARNING]
> Sign-ins are shared by profiles on this device. Turning off a server under **Libraries** affects only the active profile; removing it under **Servers** signs out its accounts for everyone. **Remove Everywhere**, when offered, also removes it from your other iCloud devices.

## Keep identities separate

Plex Home users and Silo profiles determine server access and history. A Plozz profile controls app preferences, not server-user creation.

See [server-user selection](/profiles-and-locks/#choose-a-server-user), [device setup](/profiles-and-sync/), or [network folders](/network-shares/).

## Restore a saved sign-in

In **Settings > Servers**, select the server and choose **Sign In Again** beside the sign-in. On iPhone/iPad, open its sign-in row first.

Use the original account, server, and server profile. Cancellation/failure preserves the connection. Check reachability before reauthenticating.

## Add local or remote addresses

Select the server in **Settings > Servers**, then **Connection addresses > Add or manage addresses**. Choose the sign-in if asked, enter another address for that server, then **Verify and add address**.

Only add trusted addresses: Plozz uses your sign-in there, and HTTP is unencrypted. Silo requires approval at the new address using the same account and profile.

Addresses belong to this sign-in on this device. Plozz prefers a reachable local address and tries saved alternatives after connection failures. Plex also discovers its own addresses.

## Confirm access before changing settings

Play a video from an enabled library; a server name alone does not confirm access.

If discovery fails, enter the address manually. Remote viewing needs an address reachable from the playback device.

For Tailscale, connect it on the playback device and enter the server's Tailscale IP or MagicDNS address manually; LAN discovery cannot find it.

For missing content, check libraries and user permissions before removing connections. See [Troubleshooting](/troubleshooting/) for sign-in errors. Server networking remains the owner's responsibility; see [Jellyfin networking](https://jellyfin.org/docs/general/post-install/networking/).
