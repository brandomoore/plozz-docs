# Connect a server

Connect your own Jellyfin, Plex, Emby, or Silo account.

## Add a connection

1. Choose your provider during first-run setup, or open **Settings > Servers > Add Server**.
2. For Jellyfin, Emby, or Silo, select a discovered server or enter its full address, including any custom port or path.
3. Complete the provider’s sign-in:
   - **Jellyfin:** approve the displayed Quick Connect code from Jellyfin on another device, or choose username-and-password sign-in.
   - **Plex:** follow the linking instructions, then select the server you want.
   - **Emby:** sign in with your server username and password.
   - **Silo:** use the address that opens Silo in a browser, compare the displayed code before approving, then choose a Silo profile. Enter its PIN if required.
4. Choose libraries for your Plozz profile. Later, use **Settings > Libraries** to enable servers, choose who you watch as, and select libraries.

On Apple TV with no connections, choose **Sign In to a Server** instead.

Sign-ins are shared by profiles on this device. Turning off a server under **Libraries** affects only the active profile; removing it under **Servers** signs out its accounts for everyone. **Remove Everywhere**, when offered, also removes it from your other iCloud devices.

## Keep identities separate

Plex Home users and Silo profiles determine server-side access and history. A Plozz profile controls your app setup; creating one does not create a server user.

For another device, use [Profiles and sync](/profiles-and-sync/). For folders without a media server, use [Network shares](/network-shares/).

## Add local or remote addresses

In **Settings > Servers**, select the server, then **Connection addresses > Add or manage addresses**. Choose the sign-in if asked, enter another address for the same server, and choose **Verify and add address**.

Only add trusted addresses: Plozz uses your sign-in there, and HTTP is unencrypted. Silo requires approval at the new address using the same account and profile.

Addresses belong to this sign-in on this device. Plozz prefers a reachable local address and tries saved alternatives after connection failures. Plex also discovers its own addresses.

## Confirm access before changing settings

Open an enabled library and play a video. A server name alone does not confirm sign-in or media access.

If discovery finds nothing, enter the address manually. Test it from the playback device's network; remote viewing needs an externally reachable address.

For Tailscale, connect it on the playback device and enter the server's Tailscale IP or MagicDNS address manually; LAN discovery cannot find it.

For missing content, check library selection and user permissions before removing connections. See [Troubleshooting](/troubleshooting/) for sign-in errors. Server networking remains the owner's responsibility; see the [Jellyfin networking guide](https://jellyfin.org/docs/general/post-install/networking/).
