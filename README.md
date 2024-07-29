# CalculApp

A keyboard-friendly calculator with input history.

## Notable features
- Logs your input history
- Colour themes

## Produced with
- React / Next JS
- Tailwind CSS
- TypeScript
- Decimal JS

## Tested with
- Playwright package enables user simulated end-to-end tests.
- Coverage of all mathematical operations, on-screen buttons, and various unhappy paths (e.g. multi-key presses).

## Technical decisions
- useRefs hooks allow keyboard presses to sync with calculation-related states
- custom useColor hook for more maintainable code
- state-based class names allow colour themes to be generated
- hidden section containing all tailwind colour theme styles ensure compiler loads all colour classes
- Decimal JS avoids JavaScript rounding issues

## Bug list to sort and produce tests for
- none currently, let me know if you spot one - @diffeyj@outlook.com


[Calculapp Deployment](https://math-calculapp.vercel.app/)

![CalculappShot1](https://github.com/user-attachments/assets/f61a3d7f-ea7f-4a15-9844-737b28f0ad88)
