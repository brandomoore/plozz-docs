# Apple TV users and automatic sign-in

Each Apple TV system user can return to their own last-used Plozz profile when opening the app. You do not need to give the Apple TV user and Plozz profile matching names.

An Apple TV user is the person selected in tvOS. A Plozz profile holds app preferences and library selections; its linked server user controls server access and history.

```plozz-diagram
apple-tv-profiles
```

## Set up each Apple TV user

1. **Choose the Apple TV user.** Select the person's user in Apple TV Control Center.
2. **Choose their Plozz profile.** Open Plozz and select the profile they should use. Complete any Profile Lock or Plex PIN check.
3. **Enable automatic sign-in.** Open **Settings > Profiles** and enable **Automatically Sign In**.
4. **Repeat for each person.** Switch to their Apple TV user before setting up their Plozz profile.

Automatic sign-in is off by default. Once enabled, opening Plozz as that Apple TV user restores their last successfully authorized Plozz profile. Choosing another Plozz profile changes the remembered selection for that Apple TV user; this is not a permanent one-to-one name mapping.

## What stays shared

The household's server sign-ins and Plozz profile roster remain shared. The remembered profile, automatic-sign-in preference, and trusted startup session are local to the current Apple TV user. They are not an iCloud setting copied to every device.

This does not create server accounts, change server permissions, or assign a different Plex or Jellyfin user automatically. Configure the desired server identity and libraries within each [Plozz profile](/profiles-and-locks/).

## Keep authorization deliberate

> [!IMPORTANT]
> Automatic sign-in can restore previously verified Profile Lock and Plex PIN access without asking again at startup. Enable it only if people who can use that Apple TV user should have that access.

Manual profile switches still check authorization. If the saved profile, lock, server binding, or credentials change, Plozz may require selection or authentication again instead of trusting the old session.

To stop automatic restoration, turn off **Automatically Sign In** while using that Apple TV user. Other Apple TV users keep their own choice.
