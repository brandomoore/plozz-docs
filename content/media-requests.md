# Request movies and shows

Plozz can send requests to your own **Seerr** server, including compatible Overseerr/Jellyseerr installations. Seerr and its server-side services supply the request workflow; Plozz supplies no media.

## Connect Seerr

1. Open **Settings > Seerr**, or the Seerr step during profile setup.
2. Enter the Seerr server address and its **Admin API key**. Only an authorized administrator should supply this key.
3. Connect, then review **Requests are made as** for each Plozz profile.
4. Choose a Seerr user to apply that user's permissions, quotas, approvals, and quality defaults.

The server connection is shared across Plozz profiles. The acting user is chosen separately for each profile.

**Admin — unrestricted** is not a harmless display choice: an unlinked profile requests as the administrator, without per-user quota or approval restrictions. For Kids profiles, set a household [Parental PIN](/profiles-and-locks/#set-up-a-kids-profile-safely) and link a restricted Seerr user. Plozz blocks unrestricted admin requests only while that PIN enforces Kids restrictions.

## Make a request

Open an eligible movie or show's details from discovery or search and choose **Request** when offered. For shows, use the available season selection, choose the seasons you want, and confirm the request identity.

A request is not an offline download to your device. Pending approval, requested, downloading, and available states describe the server's workflow. Playback still requires an accessible copy in a connected library.

Plozz submits standard requests, not a separate 4K-request choice. The Seerr user's defaults and server configuration determine processing.

## A request will not go through

Check **Settings > Seerr** and test or retry the connection. If the profile says **Relink required**, choose a user from the currently connected Seerr server; a mapping from another server cannot be reused.

Permission, quota, approval, and server-configuration failures must be resolved by the Seerr administrator. Do not switch a restricted user to Admin simply to bypass an error.

For a title already in your libraries, start with [finding media](/library/) rather than requesting another copy.
