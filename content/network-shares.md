# Network shares

Add a network folder as a library without running a Jellyfin, Plex, Emby, or Silo server.

## Connect a folder

1. Choose **Media Share** during setup. Later, use **Settings > Servers > Add Network Share** on iPhone/iPad, or **Settings > Servers > Add Server > Media Share** on Apple TV.
2. Select a detected device, or choose **Enter an address manually**.
3. Select SMB, NFS, WebDAV, SFTP, or FTP. Enter the address, any required port, and the credentials requested by the form.
4. Connect, then select the share, export, or folder containing your media.
5. Give the library a name and choose its **Content**:
   - **Mixed (Automatic):** a common parent containing different kinds of media.
   - **Movies** or **TV Shows:** a dedicated library.
   - **Anime:** an anime-only root; Plozz identifies films and episodes.
   - **Personal Videos:** browse files without movie or TV matching.
6. Confirm your selection and let Plozz scan while the app stays open.

If asked to approve a certificate or SSH host key, confirm that it matches your server before continuing.

## Find files and refresh

Recognized titles open their normal details. Use a title’s **Browse Files** action to inspect its original folders and files.

Routine scans can skip unchanged folders. On Apple TV, open **Settings > Servers**, select the share, and choose **Scan now** to request a fresh scan.

Shares do not offer server-based streaming-quality controls; [offline downloads](/downloads/) use Original quality only.
