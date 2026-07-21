/**
 * Environment: PRODUCTION
 * ------------------------------------------------------------------
 * Swapped in via the `fileReplacements` entry in angular.json whenever
 * `ng build` runs with the `production` configuration (the default
 * configuration for `ng build` on Angular CLI 21.2.19).
 *
 * `enableDevToolsProtection: true` turns on the best-effort browser
 * DevTools / right-click / view-source deterrent implemented in
 * `DevtoolsProtectionService`. Flip it back to `false` here (or override
 * per-deployment) if you ever need to debug a production build.
 * ------------------------------------------------------------------
 */
export const environment = {
    production: true,
    appVersion: '1.0.0',
    // Deterrent only — never a real security boundary. See devtools-protection.ts.
    enableDevToolsProtection: true,
};
