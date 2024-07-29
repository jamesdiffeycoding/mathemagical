# CalculApp

It's a homemade keyboard friendly calculator with input history.

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
- state-based class names allow colour themes to be generated
- hidden section containing all tailwind colour theme styles ensure compiler loads all colour classes
- Decimal JS avoids JavaScript rounding issues

## Bug list to sort and produce tests for
- pressing an operation after division --> Infinity, or after multiplication --> 0 as I suspect variable is treated as 0.

[Calculapp Deployment](https://math-calculapp.vercel.app/)

