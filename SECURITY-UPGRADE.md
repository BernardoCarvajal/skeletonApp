# Security dependency update — 2026-09-07

Use Node.js 22.12 or newer in the 22.x line, or Node.js 24+. Install with `npm ci` so the patched dependency versions in the lockfile are used.

Angular is updated to 21.2.22, the build tools to 21.2.23, and TypeScript to 5.9.3. The application keeps Zone-based change detection. The application builder replaces the old Webpack build dependencies. `qs` is pinned to 6.16.0 because the Karma dependency tree otherwise resolves a vulnerable version.

Validation: `npm ci`, `npm run build`, `npm test -- --watch=false --browsers=ChromeHeadless`, and `npm audit`. The dependency audit includes development dependencies and does not suppress advisories.

## Ionic / Capacitor compatibility

The native Capacitor platform and plugins stay on major version 6. The CLI is updated to 6.2.2, with `tar` overridden to 7.5.22. Its old default import is incompatible with tar 7, so `patch-package` applies the committed one-line import adjustment at installation. Do not skip the root postinstall step when using Capacitor tooling. `npm run test:tooling` verifies real template archive creation and extraction through the patched Capacitor function.

The browser build still writes directly to `www`, as required by the existing Capacitor configuration. Angular 21 requires Chrome/Edge 111+, Firefox 112+, and Safari/iOS 16.4+. The browser target configuration reflects these minimums. Ionic 8's DOM declaration conflict with TypeScript 5.9 is handled by `skipLibCheck`; application type checking remains strict.

ESLint preserves the existing NgModule and constructor-injection architecture instead of enabling the new standalone/inject style preferences. `npm run lint` remains available. Checklist controls now have unique form names, fixing the runtime error exposed by the component tests.

Unit tests isolate native SQLite/geolocation from browser component rendering. Android/iOS device behavior and native release builds have not been tested. Cypress is updated. The existing end-to-end suite requires the separate fixture API at localhost:3000 and has not been executed as part of this update.
