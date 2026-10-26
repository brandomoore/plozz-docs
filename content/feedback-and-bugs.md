# Feedback and bug reports

Use Discord for help, GitHub for tracked bugs/features.

## Choose where to post

- **[Plozz on Discord](https://plozz.app/discord):** ask questions, share feedback, describe a possible bug, or discuss an idea before writing a formal report.
- **[Plozz on GitHub](https://github.com/brandomoore/Plozz/issues/new/choose):** sign in and choose **Bug report** for something broken or **Feature request** for an improvement.

[Search existing issues](https://github.com/brandomoore/Plozz/issues) before opening a duplicate.

Mobile **Settings > Help & Diagnostics > Send Feedback** opens email, not a tracked issue.

## Report a bug

Explain actual versus expected behavior. Include:

- Steps to reproduce.
- Plozz version and build, device model, and operating-system version.
- Affected sources, whether several fail, or whether it happens before setup.
- Error message, frequency, and last working build if known.

**Settings > Help & Diagnostics > Report a Problem** provides the link; scan its code on Apple TV.

For logs, follow [Report a problem](/troubleshooting/#report-a-problem). Uploads do not post an issue or Discord message.

## Choose diagnostics sharing

When **Help improve Plozz?** appears, choose **Share Diagnostics** or **Don't Share**. Reporting stays off until you consent, including after an upgrade asks again. Either choice continues setup without changing app features.

Change it in **Settings > Help & Diagnostics > Share Crash Reports**. This is not a per-profile preference and is neither synced nor transferred. Builds without a reporting endpoint cannot upload.

Sharing sends technical crash, freeze, and failure diagnostics through Sentry, including app/device information, screen categories, and performance measurements. Automatic reports exclude logins, server addresses, media titles, and viewing history.

With sharing enabled, use **Send to Developer** on mobile, or **Send Recent Activity to Developer** on Apple TV, to submit filtered activity, connection, library-load, and playback evidence, not the free-form messages displayed in Recent Activity. Playback/source evidence can survive restarts; send soon after reproducing. Your optional message is sent as written: exclude secrets/personal details.

**Submitted** means accepted for delivery, not confirmed receipt. If submission fails, check sharing and retry.

Read the [Privacy Policy](https://plozz.app/privacy/) from the consent screen or Settings; Apple TV shows a code to scan.

## Diagnose Apple TV Home stutter

Enable **Settings > Help & Diagnostics > Home Performance Overlay**, reproduce scrolling stutter, and report FPS, hitches, and thermal state. Turn it off afterward.

## Suggest an improvement

Choose **Feature request** on GitHub. Describe your task, obstacle, desired behavior, device, affected sources, and attempted workarounds. No code proposal is needed.

## Share safely

GitHub issues are public, and Discord community posts are shared with other members. Review screenshots and logs before posting. Remove personal information, passwords, tokens, pairing codes, and private or credential-bearing server and playlist URLs.
