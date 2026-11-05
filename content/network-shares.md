# Network shares

Add a network folder as a library without running a Jellyfin, Plex, Emby, or Silo server.

## Connect a folder

1. Choose **Media Share** during setup. Later, use a non-Kids profile and open **Settings > Sources > Add Source > Media Share**.
2. Select a detected device, or choose **Enter an address manually**.
3. Select SMB, NFS, WebDAV, SFTP, or FTP. Enter the address, any required port, and the credentials requested by the form.
4. Connect, then browse to the share, export, or folder containing your media.
5. Give the library a name and choose its **Content**:
   - **Mixed (Automatic)**: a common parent containing different kinds of media.
   - **Movies** or **TV Shows**: a dedicated library.
   - **Anime**: an anime-only root; Plozz identifies films and episodes.
   - **Personal Videos**: browse files without movie or TV matching.
6. Confirm your selection with **Use This Folder** when shown, and leave Plozz open while it scans.

If asked to approve a certificate or SSH host key, confirm that it matches your server before continuing.

SFTP uses username-and-password sign-in, not SSH keys. Plain FTP and HTTP WebDAV send credentials unencrypted; prefer an encrypted connection.

For FTPS, enter an `ftps://` address. Plozz uses implicit TLS, not explicit AUTH TLS.

NFS requires **NFSv3** and uses the export's access rules rather than a Plozz username/password. WebDAV can offer bearer-token or username/password sign-in. Grant only the folder access you intend to use.

## Find files and refresh

Recognized titles open their normal details. Use a title’s **Browse Files** action to inspect its original folders and files.

Routine scans can skip unchanged folders. Open **Settings > Sources** and select the share. On Apple TV, choose **Scan now**. On iPhone/iPad, open the share's sign-in row, then choose **Scan Now**. Keep Plozz open while it scans.

Shares do not offer server-based streaming-quality controls; [offline downloads](/downloads/) use Original quality only.

For NFO sidecars and local artwork, see [Metadata and ratings](/metadata-and-ratings/#use-local-metadata-for-network-shares).

## Keep your place

Plozz saves share progress and watched status for this profile on this device. They survive reopening the app, but iCloud Sync does not copy this history to another device.

For each share, Plozz keeps at most 2,000 recent history entries per profile, sometimes fewer to fit its storage limit. As you watch more titles, older resume positions and watched marks can be removed.

**Remove from Continue Watching** hides a share title without losing your place. Playing it again can return it to the row. With [cross-server history](/profiles-and-sync/#keep-watch-history-separate) enabled, the action can also affect matching copies.

## Open links to streaming services

Keep shortcuts to streaming-service titles alongside your own videos using `.strmlnk` files. These small text files open the destination outside Plozz instead of playing video in Plozz.

1. In your shared folder, create a UTF-8 text file named for the movie or episode, ending in `.strmlnk`.
2. Put one direct HTTPS title link inside, with no other text. Supported destinations are Apple TV, Prime Video, YouTube, Movies Anywhere, and Fandango at Home. Service homepages, YouTube Shorts, and shortened links other than `youtu.be` are not accepted. The file must be no larger than 8 KiB.
3. Rescan the share and open the title. If other copies are available, open the ellipsis **More actions** menu. Choose the share under **Server**, then the link under **Source**, where offered.
4. Choose the button naming the destination service, or **Open Link** if the destination has not loaded yet.

Apple TV needs a compatible destination app. On iPhone/iPad, the link may open an app or browser. The destination's sign-in, purchase/subscription, regional availability, and parental restrictions still apply.

These links cannot be downloaded, and opening one does not return watch progress to Plozz. This is separate from the [external video-player setting](/external-players/).

For **Couldn't Open Link**, check the file's contents and destination app, then try again.

## If files or matches are missing

Check the selected root and read permissions through **Browse Files** before treating poor matching as a connection failure.

**Personal Videos** avoids movie/TV matching. Scanning updates Plozz's catalogue, not filenames or NAS organization.

For wrong posters/descriptions, see [Metadata and ratings](/metadata-and-ratings/). Shares have no server maturity filtering; [Kids Profile](/parental-controls/) alone is insufficient.

## WebDAV lists files but will not play

Playback needs valid HTTP byte ranges and a strong ETag or valid Last-Modified header; successful folder browsing does not establish this. Ask the administrator to check the WebDAV server/proxy. After replacing a file, rescan and reopen it rather than repeatedly retrying the old playback.
