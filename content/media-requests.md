# Request movies and shows

Plozz sends requests to your own **Seerr** server, including compatible Overseerr/Jellyseerr installations. Plozz supplies no media.

## Connect Seerr

1. Open **Settings > Seerr**, or the Seerr step during profile setup.
2. Enter the Seerr server address and its **Admin API key**. Only an authorized administrator should supply this key.
3. Connect, then review **Requests are made as** for each Plozz profile.
4. Choose a Seerr user to apply that user's permissions, quotas, approvals, and quality defaults.

The server connection is shared across Plozz profiles. The acting user is chosen separately for each profile.

**Admin — unrestricted** is not a harmless display choice: an unlinked profile requests as the administrator, without per-user quota or approval restrictions. For Kids profiles, set a household [Parental PIN](/profiles-and-locks/#set-up-a-kids-profile-safely) and link a restricted Seerr user. Plozz blocks unrestricted admin requests only while that PIN enforces Kids restrictions.

## Make a request

Open an eligible movie or show's details from discovery or search and choose **Request** when offered. Review the request identity and season selection.

A request is not an offline download to your device. Pending approval, requested, downloading, and available states describe the server's workflow. Playback requires an [accessible library copy](/library/).

Requests use Seerr defaults, not a separate 4K choice.

**Requested · Unreleased** means an approved request has a known future release date, not that downloading will start that day. Pending approval and reported download activity have separate states.

## Request missing seasons

With Seerr connected, open a TMDB-matched library show's details:

1. **Apple TV:** enter the season row, then open **Request Seasons** or its current-status button. **iPhone/iPad:** tap the download-arrow **Manage Seasons** button.
2. Select a requestable season or **Request All Missing** with its count.

Use **Refresh Status** or refresh to recheck progress; failed or declined requests need attention in Seerr. Mobile downloads save existing episodes, not requested seasons.

## Read release and availability information

For a title outside your libraries, open details and inspect **Release & Availability** when present. Movie release dates and **Streaming**, **Rent**, or **Buy** listings use your device's region and available TMDB data, with JustWatch attribution for watch offers.

Seerr is not required to read this information. A listed service does not make the title playable in Plozz or grant a subscription; missing listings do not prove unavailability.

## A request will not go through

Check **Settings > Seerr** and test or retry the connection. If the profile says **Relink required**, choose a user from the currently connected Seerr server; a mapping from another server cannot be reused.

Permission, quota, approval, and server-configuration failures must be resolved by the Seerr administrator. Do not switch a restricted user to Admin simply to bypass an error.
