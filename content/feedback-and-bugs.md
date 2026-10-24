# Feedback and bug reports

Use Discord for help/discussion, or GitHub for tracked bugs and feature requests.

## Choose where to post

- **[Plozz on Discord](https://plozz.app/discord):** ask questions, share feedback, describe a possible bug, or discuss an idea before writing a formal report.
- **[Plozz on GitHub](https://github.com/brandomoore/Plozz/issues/new/choose):** sign in and choose **Bug report** for something broken or **Feature request** for an improvement.

[Search existing issues](https://github.com/brandomoore/Plozz/issues) before opening a duplicate.

On iPhone/iPad, **Settings > Help & Diagnostics > Send Feedback** opens an email instead. Use GitHub for a tracked report.

## Report a bug

Explain what happened and what you expected instead. Include:

- Steps to reproduce, if you can reproduce it.
- Plozz version and build, device model, and operating-system version.
- The affected media source, such as Plex, Jellyfin, Silo, IPTV, or a network share. Say if it affects several sources or happens before setup.
- The error message, whether it happens every time, and the last working build if known.

In Plozz, **Settings > Help & Diagnostics > Report a Problem** provides the reporting link. On Apple TV, scan its code with your phone.

For error details or logs, follow [Report a problem](/troubleshooting/#report-a-problem). Diagnostic uploads do not post a GitHub issue or Discord message.

## Choose diagnostics sharing

When **Help improve Plozz?** appears, choose **Share Diagnostics** or **Don't Share**. Reporting stays off until you consent, including after an upgrade asks again. Either choice continues setup without changing app features.

Change it in **Settings > Help & Diagnostics > Share Crash Reports**. This is not a per-profile preference and is neither synced nor transferred. Builds without a reporting endpoint cannot upload.

Sharing sends technical crash, freeze, and failure diagnostics through Sentry, including app/device information and timing or memory measurements. Automatic reports exclude logins, server addresses, media titles, and viewing history.

With sharing enabled, logs require **Send to Developer** on mobile, or **Send Recent Activity to Developer** on Apple TV. This includes bounded, locally retained playback/source diagnostics, which can survive a restart. Send soon after reproducing the problem. Your optional message is included; exclude secrets and personal details.

## Suggest an improvement

Choose **Feature request** on GitHub. Describe what you are trying to do, what gets in the way, and the behavior you would like. Mention your device, affected sources, and any workaround you have tried. You do not need to propose code.

## Share safely

GitHub issues are public, and Discord community posts are shared with other members. Review screenshots and logs before posting. Remove personal information, passwords, tokens, pairing codes, and private or credential-bearing server and playlist URLs.
