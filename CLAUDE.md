# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

`@eliaslazcano/utils` is a small, dependency-free JavaScript utility library published to NPM. It provides common string/number/array/file helpers, with a strong focus on Brazilian data formats (CPF, CNPJ, CEP, phone numbers).

All source code and JSDoc comments are written in Portuguese (variable names, function names, and doc comments alike). Follow this convention for any new code added to `src/`.

## Commands

- `npm run build` — compiles `src/` to both `dist/cjs` and `dist/esm` (runs `build:cjs` then `build:esm`).
- `npm run build:cjs` — TypeScript compile using `tsconfig.cjs.json` (CommonJS output).
- `npm run build:esm` — TypeScript compile using `tsconfig.esm.json` (ESNext output).
- `npm version patch` — bumps the package version (requires `npm login` first).
- `npm publish` — publishes the built package to NPM.

There is no test suite (`npm test` is a stub that exits with an error) and no linter configured.

## Architecture

- The entire library is a single file: `src/index.js`. It contains only named function exports — there is no default export and no classes/state.
- The project is plain JavaScript (`allowJs: true`), not TypeScript, but TypeScript is used purely as a build tool: it compiles `src/index.js` and generates `.d.ts` declaration files from the JSDoc comments (`declaration: true`, `declarationMap: true`). This means **every exported function's JSDoc block must be accurate and complete**, since it is the sole source of the published type definitions.
- Dual module output: `tsconfig.json` holds shared compiler options; `tsconfig.cjs.json` and `tsconfig.esm.json` each extend it to produce CommonJS (`dist/cjs`) and ESM (`dist/esm`) builds respectively. `package.json` `exports` maps `require` to the CJS build and `import`/`types` to the ESM build.
- `dist/` is build output and should never be hand-edited — only regenerated via `npm run build`.
- Functions are self-contained (no cross-imports between them within `index.js` beyond a few helpers like `extrairNumeros` being reused by CPF/CNPJ/CEP formatters). When adding a new utility, add it as a new named export in `src/index.js` with a JSDoc block matching the existing style (`@param`, `@returns`/`@return`).
