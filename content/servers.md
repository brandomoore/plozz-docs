# Connect a server

Connect your own Jellyfin, Plex, Emby, or Silo account to browse and play its libraries in Plozz.

## Add a connection

1. Choose your provider during first-run setup, or open **Settings > Servers > Add Server**.
2. For Jellyfin, Emby, or Silo, select a discovered server or enter its full address, including any custom port or path.
3. Complete the provider’s sign-in:
   - **Jellyfin:** approve the displayed Quick Connect code from Jellyfin on another device, or choose username-and-password sign-in.
   - **Plex:** follow the linking instructions, then select the server you want.
   - **Emby:** sign in with your server username and password.
   - **Silo:** use the address that opens Silo in a browser, approve the device, then choose a Silo profile. Enter its PIN if required.
4. Choose libraries for your Plozz profile. Later, use **Settings > Libraries** to enable servers, choose who you watch as, and select libraries.

On Apple TV with no connections, choose **Sign In to a Server** instead.

Add more connections without signing out.

Sign-ins are shared by profiles on this device. Turning off a server under **Libraries** affects only the active profile; removing it under **Servers** signs out its accounts for everyone on this device. **Remove Everywhere**, when offered, also removes it from your other iCloud devices.

## Keep identities separate

Plex Home users and Silo profiles determine server-side access and history. A Plozz profile controls your app setup; creating one does not create a server user.

For another device, use [Profiles and sync](/profiles-and-sync/). For folders without a media server, use [Network shares](/network-shares/).

## Confirm access before changing settings

Open an enabled library and play a short video. Seeing the server's name alone does not confirm that this device is signed in or that the selected user can access its media.

If discovery finds nothing, enter the address manually; discovery is not proof of remote reachability. Test the address from the same network as the playback device. A remote connection still needs a server address reachable from outside your home.

For missing content, first check library selection and server-user permissions rather than removing the connection. For recurring sign-in errors, use [Troubleshooting](/troubleshooting/). Server networking and reverse-proxy administration remain the server owner's responsibility; the [Jellyfin networking guide](https://jellyfin.org/docs/general/post-install/networking/) explains that server-side setup.
