# CULT

**Members-only creator network. Los Angeles. Invite only.**

Built with React Native + Expo.

---

## Setup

```bash
cd cult-app
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android), or press `i` for iOS simulator / `a` for Android emulator.

---

## Screens

| Screen | Route | Description |
|---|---|---|
| Splash | `Splash` | Logo, tagline, entry points |
| Onboarding | `Onboarding` | 3-slide intro flow |
| Apply | `Apply` | Application form with role tags |
| Home Feed | `Feed` (tab) | Collab / Events / Meet sections |
| Events | `Events` (tab) | Event list + detail + RSVP |
| Profile | `Profile` (tab) | Member profile, stats, settings |
| The Circle | `Circle` | AI matchmaker flow (intro → questions → reveal → schedule → confirmed) |
| Chat | `Chat` | Unlocks post-meetup confirmation |
| Notifications | `Notifications` | Typed notification feed |

---

## The Circle — Flow

1. **Intro** — The Circle presents the match with a preview card
2. **Questions** — User answers 3 questions (answers shared with match)
3. **Reveal** — Match's answers are shown
4. **Schedule** — 3 proposed meetup times, user selects one
5. **Confirmed** — Chat locked until match confirms

**Strike system:** Ghost a confirmed meetup = 1 strike. 3 strikes = 30-day ban. Cancel with a message = no strike.

---

## Design Tokens

```
Background:  #0e0c0a
Text:        #f2ede6
Accent:      #8b2020
Muted:       #6b6460

Font 1: Libre Baskerville — headlines, logo, body italic
Font 2: Space Mono — labels, UI, body text

No rounded corners. No gradients. No shadows.
```
