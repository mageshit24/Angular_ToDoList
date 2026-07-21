import { Injectable, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

/**
 * DevtoolsProtectionService
 * ------------------------------------------------------------------
 * A best-effort DETERRENT that discourages casual right-click
 * "Inspect", View Source, and DevTools keyboard shortcuts, and prints
 * a "Stop!" self-XSS warning banner to the console.
 *
 * IMPORTANT — read before relying on this:
 *   This is NOT a real security boundary. Any user can still open
 *   DevTools via the browser menu, a bookmarklet, or by disabling
 *   JavaScript-based blocking entirely. Never rely on this to protect
 *   secrets, API keys, or business logic — anything shipped to the
 *   browser is always visible to a motivated user. Real protection
 *   comes from the server: keep secrets out of the client bundle,
 *   authorize every request on the backend, and use the security
 *   headers configured in `public/_headers`.
 *
 * Toggle: environment.enableDevToolsProtection
 *   - environment.ts       -> false (dev builds stay debuggable)
 *   - environment.prod.ts  -> true  (swapped in by `ng build`, which
 *                             uses the `production` configuration by
 *                             default on Angular CLI 21.2.19)
 * ------------------------------------------------------------------
 */
@Injectable({ providedIn: 'root' })
export class DevtoolsProtectionService implements OnDestroy {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly isBrowser = isPlatformBrowser(this.platformId);

    private contextMenuHandler = (event: MouseEvent) => event.preventDefault();
    private keydownHandler = (event: KeyboardEvent) => this.blockDevToolsShortcuts(event);

    /** Call once, at app bootstrap. No-op on the server or when the flag is off. */
    init(): void {
        if (!this.isBrowser || !environment.enableDevToolsProtection) {
            return;
        }

        document.addEventListener('contextmenu', this.contextMenuHandler);
        document.addEventListener('keydown', this.keydownHandler);
        this.printSelfXssWarning();
    }

    ngOnDestroy(): void {
        if (!this.isBrowser) {
            return;
        }
        document.removeEventListener('contextmenu', this.contextMenuHandler);
        document.removeEventListener('keydown', this.keydownHandler);
    }

    private blockDevToolsShortcuts(event: KeyboardEvent): void {
        const key = event.key;
        const blockF12 = key === 'F12';
        const blockInspect = event.ctrlKey && event.shiftKey && (key === 'I' || key === 'i' || key === 'J' || key === 'j' || key === 'C' || key === 'c');
        const blockViewSource = event.ctrlKey && (key === 'U' || key === 'u');

        if (blockF12 || blockInspect || blockViewSource) {
            event.preventDefault();
        }
    }

    /**
     * Classic "Stop!" banner. Real-world purpose: it discourages users from
     * pasting attacker-supplied JavaScript into the console (self-XSS scams),
     * which is a genuine, common attack vector — unlike the shortcut blocking
     * above, this part has real protective value.
     */
    private printSelfXssWarning(): void {
        // eslint-disable-next-line no-console
        console.log('%cStop!', 'color: #f44336; font-size: 48px; font-weight: bold;');
        // eslint-disable-next-line no-console
        console.log(
            '%cThis is a browser feature intended for developers. If someone told you to copy/paste something here, it is a scam that could give them access to your account or data.',
            'color: #333; font-size: 16px;',
        );
    }
}
