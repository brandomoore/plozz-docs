# Request movies and shows

Request missing movies or shows through your own **Seerr** server, including compatible Overseerr/Jellyseerr installations. Plozz supplies no media.

## Connect Seerr

1. Open **Settings > Seerr** in the profile that will make requests. Kids profiles hide this shortcut; connect during the optional profile-setup step instead.
2. Select a detected server, or enter **Seerr server address**. Check that it is the server you trust; prefer HTTPS.
3. A button naming your existing Jellyfin or Plex account can connect it directly; **Choose existing account** selects among several. Otherwise, choose the offered **Sign in with Plex**, **Sign in with Jellyfin**, **Sign in with Emby**, or **Seerr account**, then complete its prompts.
4. After a password, browser, or API-key sign-in, review the account and choose **Use this account**. Reusing an existing authorized account saves it without that extra confirmation.

On Apple TV, Plex browser sign-in uses a QR code; iPhone/iPad opens the browser and offers **Open Plex sign-in** if needed. Older Seerr servers may need your Jellyfin password instead of password-free sign-in. Some Plex managed users cannot sign in because Seerr requires an email address; use another supported method, not the household owner's identity.

Connections belong to this Plozz profile. Finding a server does not connect it. During setup, **Set up manually** changes the address or method; **Not now** skips Seerr.

> [!IMPORTANT]
> **Use API key** gives administrator access. Use it only with an authorized administrator's key. After saving, open the connection and set **Request as** to a restricted user when appropriate; **Admin** is unrestricted. A normal account sign-in always uses that account's permissions, quotas, approvals, and defaults.

For children, use a restricted account and set a household [Parental PIN](/parental-controls/). Enforced Kids restrictions block administrator requests, including administrator account sessions.

## Choose between accounts

In **Settings > Seerr**, **Add account** saves another account or server for this profile. Open a saved account for **Sign in again**, **Remove connection**, or the API-key-only **Request as** picker.

With one connection, **Ask each time** controls confirmation. With several, set **Default account**; every request still offers a **Request as** chooser. **Use last account** puts the last successfully used account first and uses it for browsing. Failed requests do not silently switch accounts.

Account sign-ins stay on this device: sign in separately elsewhere. Supported API-key connections can [transfer with your setup](/profiles-and-sync/#set-up-another-device); older receiving apps can need manual setup.

## Make a request

Open a title's details from discovery or search and choose **Request** when offered. Review the account and any season selection.

A request is not a device download. Pending approval, requested, downloading, and available states describe Seerr's workflow. Playback still needs an [accessible library copy](/library/).

Requests use that account's Seerr defaults, not a separate 4K choice.

**Requested · Unreleased** means an approved request has a known future release date, not that downloading will start that day. Pending approval and reported download activity have separate states.

## Request missing seasons

With Seerr connected, open a library show's details. Request actions appear when Plozz can match the show to TMDB:

1. **Apple TV:** enter the season row, then open **Request Seasons** or its current-status button. **iPhone/iPad:** tap the download-arrow **Manage Seasons** button.
2. Select a season, or request all missing seasons with the button showing their total.

Use **Refresh Status** or refresh to recheck progress. Failed or declined requests need attention in Seerr; an already-managed season can offer a link there. Mobile downloads save existing episodes, not requested seasons.

## Read release and availability information

For a title outside your libraries, open details and inspect **Release & Availability** when present. Movie release dates and **Streaming**, **Rent**, or **Buy** listings use your device's region and available TMDB data, with JustWatch attribution for watch offers.

Seerr is not required to read this information. A listed service does not make the title playable in Plozz or grant a subscription; missing listings do not prove unavailability.

## A request will not go through

In **Settings > Seerr**, choose **Try again** for a failed check, or open the account and choose **Sign in again** for an expired session. **Edit connection** corrects its sign-in details.

For **Choose the request account again.**, reopen the API-key connection's **Request as** picker and select a user from that server. Resolve permissions, quotas, approvals, and missing defaults with its administrator; do not switch to Admin to bypass restrictions.
