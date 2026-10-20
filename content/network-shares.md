# Network shares

Add a network folder as a library without running a Jellyfin, Plex, Emby, or Silo server.

## Connect a folder

1. Choose **Media Share** during setup. Later, use **Settings > Servers > Add Network Share** on iPhone/iPad, or **Settings > Servers > Add Server > Media Share** on Apple TV.
2. Select a detected device, or choose **Enter an address manually**.
3. Select SMB, NFS, WebDAV, SFTP, or FTP. Enter the address, any required port, and the credentials requested by the form.
4. Connect, then browse to the share, export, or folder containing your media.
5. Give the library a name and choose its **Content**:
   - **Mixed (Automatic):** a common parent containing different kinds of media.
   - **Movies** or **TV Shows:** a dedicated library.
   - **Anime:** an anime-only root; Plozz identifies films and episodes.
   - **Personal Videos:** browse files without movie or TV matching.
6. Confirm your selection with **Use This Folder** when shown, and leave Plozz open while it scans.

If asked to approve a certificate or SSH host key, confirm that it matches your server before continuing.

SFTP uses username-and-password sign-in, not SSH keys. Plain FTP and HTTP WebDAV send credentials unencrypted; prefer an encrypted connection.

For FTPS, enter an `ftps://` address. Plozz uses implicit TLS, not explicit AUTH TLS.

NFS requires **NFSv3** and uses the export's access rules rather than a Plozz username/password. WebDAV can offer bearer-token or username/password sign-in. Grant only the folder access you intend to use.

## Find files and refresh

Recognized titles open their normal details. Use a title’s **Browse Files** action to inspect its original folders and files.

Routine scans can skip unchanged folders. Open **Settings > Servers** and select the share. On Apple TV, choose **Scan now**. On iPhone/iPad, open the share's sign-in row, then choose **Scan Now**. Keep Plozz open while it scans.

Shares do not offer server-based streaming-quality controls; [offline downloads](/downloads/) use Original quality only.

For NFO sidecars and local artwork, see [Metadata and ratings](/metadata-and-ratings/#use-local-metadata-for-network-shares).

## If files or matches are missing

Confirm the selected root contains the files and that the share account can read them. Check **Browse Files** before treating a matching problem as a connection failure.

Choose the content type deliberately: **Personal Videos** avoids movie/TV matching, while an incorrectly classified folder can produce poor catalogue results. A scan updates Plozz's catalogue; it does not rename or reorganize the files on your NAS.

For wrong posters or descriptions after scanning, review [Metadata and ratings](/metadata-and-ratings/). A share has no media-server user enforcing maturity restrictions, so [Kids Profile](/profiles-and-locks/) alone is not a content-rating filter.
