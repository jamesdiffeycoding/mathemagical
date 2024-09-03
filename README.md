# Mathemagical 
Mathemagical is where I deploy my Mathematical projects. At the moment there are three main projects featured on the site.

(1) Calculapp

Calculapp is a tested, decimal-compatible and keyboard friendly calculator with input history and clearing options.


(2) Spiraliser

Spiraliser displays an animated spiral (calculated via trigonometric equations) created using HTML's canvas element.


(3) Create

Create your own trigonometric graph with this easy-to-use animation editor.
When we think of art, nature, or great design, we seldom think of maths. Even so, maths underlies a lot of basic geometric forms. With a little manipulation, simple equations can create visually captivating forms.

## Produced with
- React / Next JS
- Tailwind CSS
- TypeScript
- Decimal JS

## Calculapp technical discussions
TESTING:
- Playwright package enables user simulated end-to-end tests.
- Coverage of all mathematical operations, on-screen buttons, and various unhappy paths (e.g. multi-key presses).

DECISIONS:
- useRefs hooks allow keyboard presses to sync with calculation-related states
- custom useColor hook for more maintainable code
- state-based class names allow colour themes to be generated
- hidden section containing all tailwind colour theme styles ensure compiler loads all colour classes
- Decimal JS avoids JavaScript rounding issues


## Wider learnings and reflections
For wider learnings and reflections on these projects please check out [this blog](https://mathemagical.vercel.app/blog).
