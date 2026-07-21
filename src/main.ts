import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { DevtoolsProtectionService } from './app/core/devtools-protection';

bootstrapApplication(App, appConfig)
  .then((appRef) => {
    // Enabled/disabled per build via environment.enableDevToolsProtection.
    // See src/app/core/devtools-protection.ts for what this does and does not protect against.
    appRef.injector.get(DevtoolsProtectionService).init();
  })
  .catch((err) => console.error(err));
