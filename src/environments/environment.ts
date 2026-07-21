/**
 * Environment: DEVELOPMENT
 * ------------------------------------------------------------------
 * Loaded automatically for `ng serve` / `ng build --configuration development`.
 * Toolchain this project targets:
 *   Node.js        : v24.18.0 (LTS "Krypton")
 *   npm            : 11.16.0
 *   Angular CLI    : 21.2.19
 *
 * `production` and `enableDevToolsProtection` are read by
 * `DevtoolsProtectionService` (src/app/core/devtools-protection.ts) to decide
 * whether to lock down the browser DevTools / right-click menu.
 * Keep this OFF in development so you can still debug the app.
 * ------------------------------------------------------------------
 */
export const environment = {
    production: false,
    appVersion: '1.0.0',
    // Deterrent only — never a real security boundary. See devtools-protection.ts.
    enableDevToolsProtection: false,
};
