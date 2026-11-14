# Connect a server

Connect an account to browse libraries and save your progress.

## Add a connection

1. From a non-Kids profile, open **Settings > Sources > Add Source**, or choose a provider during setup.
2. For Jellyfin, Emby, or Silo, choose a server or enter its address, including any custom port/path.
3. Complete the provider’s sign-in:
   - **Jellyfin**: approve Quick Connect on another device, or choose **Sign in with username & password** on Apple TV or **Use Password** on mobile.
   - **Plex**: follow the linking instructions, then select the servers to add. On iPhone/iPad, owned servers start selected; review shared servers, then **Continue**.
   - **Emby**: use your server username and password.
   - **Silo**: use its browser address, compare codes before approving, then choose a Silo profile and enter its PIN if required.
4. Choose libraries for your Plozz profile. Later, use **Settings > Libraries** to select servers, users, and libraries.

> [!NOTE]
> Manual Jellyfin/Emby entries try HTTPS first, then eligible HTTP alternatives before sign-in. Explicit HTTPS addresses and certificate-trust failures never fall back to HTTP.

> [!WARNING]
> Sign-ins are shared by profiles on this device. Turning off a server under **Libraries** affects only the active profile; removing a sign-in under **Sources** affects everyone using it. **Remove Everywhere**, when offered, also removes it from your other iCloud devices.

With iCloud Sync on, supported sign-ins can restore on other devices. [Review which sign-ins to save](/profiles-and-sync/#decide-which-sign-ins-to-save) if Plozz asks permission.

## Keep identities separate

Plex Home users and Silo profiles determine server access and history. A Plozz profile controls app preferences, not server-user creation.

See [server-user selection](/profiles-and-locks/#choose-a-server-user), [device setup](/profiles-and-sync/), or [network folders](/network-shares/).

## Connect Navidrome or Subsonic

This music-only connection is offered in TestFlight and development builds on Apple TV, iPhone, and iPad, not App Store builds.

1. Open **Settings > Sources > Add Source > Navidrome (Subsonic)**, or select it during setup.
2. Enter **Server address**, including any port or subfolder, and **Username**. Prefer HTTPS; HTTP does not protect your connection.
3. Under **Sign in with**, choose **Password** or **API Key**, then enter the matching secret. API keys require server support; the username is still required.
4. Choose **Sign In**, then open [Music](/music/).

This connection supplies music, not movie or TV libraries. Favorites and listening history belong to the server account. If sign-in fails, check the address and authentication method before retrying.

## Restore a saved sign-in

In **Settings > Sources**, select the server and choose **Sign In Again** beside the sign-in. On iPhone/iPad, open its sign-in row first.

Use the original account, server, and server profile. Failed or cancelled sign-in leaves your saved connection unchanged.

## Add local or remote addresses

Select the server in **Settings > Sources**, then **Connection addresses > Add or manage addresses**. Choose the sign-in if asked, enter another address, then **Verify and add address**.

Only add trusted addresses: they use your sign-in. HTTP is unencrypted. Silo requires approval at the new address using the same account and profile.

Addresses belong to this sign-in on this device. Plozz prefers a reachable local address and tries saved alternatives after connection failures. Plex also discovers its own addresses. Navidrome/Subsonic does not offer this address-management flow.

## Confirm access before changing settings

Play from an enabled library to confirm access.

If discovery fails, enter the address manually.

For Tailscale, connect it on the playback device and enter the server's Tailscale IP or MagicDNS address manually; LAN discovery cannot find it.

For missing content, check enabled libraries and user permissions. See [Troubleshooting](/troubleshooting/) for sign-in errors. Ask the owner about server setup; see [Jellyfin networking](https://jellyfin.org/docs/general/post-install/networking/).
