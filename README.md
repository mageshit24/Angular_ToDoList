# ✅ Angular ToDoList

A clean, standalone **Angular** to-do list app - add tasks, mark them done, edit them inline, filter by status, and delete them, all wrapped in a modern glassmorphism UI with light/dark mode. Built with Angular's standalone component architecture, hardened for production, and deployed to Netlify with SSR support.

## 🚀 Live Demo

🔗 **[Live on Netlify](https://angulartodolistminiproject.netlify.app/)**

---

## ✨ Features

- ➕ **Add Task** - quickly add new tasks via a simple input (120-char limit, empty/whitespace rejected)
- ✔️ **Mark Done / Undo** - flag a task complete or reopen it
- ✏️ **Edit Task** - edit a task's name inline (Enter to save, Esc to cancel)
- ❌ **Delete Task** - remove a task from the list instantly
- 🔍 **Filter** - All / Active / Done, with live counts
- 🧹 **Clear Completed** - bulk-remove finished tasks
- 💾 **Persistence** - tasks and theme choice are saved to `localStorage`
- 🌗 **Dark Mode** - toggle button, remembers your choice, respects `prefers-color-scheme` on first visit
- 🎨 **Modern UI** - glassmorphism card, smooth transitions, empty states, respects `prefers-reduced-motion`
- ♿ **Accessibility** - aria-labels on icon buttons, `role="alert"` on errors, `role="tablist"` on filters
- ⚡ **Standalone Components + Signals** - Angular's modern standalone API and `signal`/`computed`/`effect`, no NgModules

---

## 🔒 Security & Hardening

| Area | What's in place |
|---|---|
| **Dependency vulnerabilities** | `npm audit` run and fixed (`npm audit fix`). Remaining findings are inside Angular CLI's own bundled dev-only build tooling (Vite/Vitest), not shipped to production — re-check with `npm audit` after any `@angular/cli` upgrade. |
| **Source-map / code exposure** | Production builds disable `sourceMap`, enable `extractLicenses`, `namedChunks: false`, and full `outputHashing` (`angular.json`, `production` configuration) so no `.map` files or readable chunk names ship. |
| **HTTP security headers** | `public/_headers` sets `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `Strict-Transport-Security` for Netlify. This is the *real* protection layer. |
| **DevTools / right-click deterrent** | `src/app/core/devtools-protection.ts`, toggled by `environment.enableDevToolsProtection` (`off` in dev, `on` in prod via `angular.json`'s `fileReplacements`). Blocks F12 / Ctrl+Shift+I/J/C / Ctrl+U and right-click, and prints a "Stop!" self-XSS console warning. **Read the comment at the top of that file** - this is a UX deterrent only, not a security boundary, and is documented as such in code. |
| **Input handling** | Task data is a typed `Task` interface (no more `any[]`), inputs are trimmed and length-capped, and all rendering goes through Angular's default interpolation (auto-escaped) - no `[innerHTML]` anywhere. |
| **Toolchain pin** | `package.json` `engines` field pins `node >=24.0.0` / `npm >=11.0.0`; `@types/node` bumped to the 24.x line to match. |

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21.2.x (standalone components, signals) |
| Forms | `FormsModule` + `ngModel` (two-way binding) |
| Styling | Custom CSS with CSS variables (light/dark theming) |
| SSR | Angular Universal (`@angular/ssr`, Express) |
| Deployment | Netlify (`@netlify/angular-runtime`) + `public/_headers` |
| Testing | Vitest (`ng test`) |

**Verified toolchain** (matches the versions this update targets):
```
node -v   → v24.18.0  (LTS)
npm -v    → 11.16.0
ng version → Angular CLI 21.2.19
```

---

## 🏗️ Project Structure

```
Angular_ToDoList/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── devtools-protection.ts   # DevTools/right-click deterrent (env-gated)
│   │   ├── todo/
│   │   │   ├── todo.ts                  # Task state & logic (signals, persistence, filters)
│   │   │   ├── todo.html                # Task list UI template
│   │   │   ├── todo.css                 # Modern glassmorphism + dark mode styling
│   │   │   └── todo.spec.ts             # Unit tests
│   │   ├── app.ts                       # Root component
│   │   ├── app.routes.ts                # Routing config
│   │   └── app.config.ts                # App-level providers config
│   ├── environments/
│   │   ├── environment.ts               # Dev config (devtools protection OFF)
│   │   └── environment.prod.ts          # Prod config (devtools protection ON)
│   ├── main.ts
│   └── index.html
├── public/
│   ├── favicon.ico
│   └── _headers                         # Netlify security headers
├── angular.json
└── package.json
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 24.x LTS (tested with v24.18.0)
- npm 11.x (tested with 11.16.0)
- Angular CLI 21.2.x (`npm install -g @angular/cli`)

### 1. Clone the repository
```bash
git clone https://github.com/mageshit24/Angular_ToDoList.git
cd Angular_ToDoList
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
ng serve
```
Open **http://localhost:4200/** - the app reloads automatically as you edit source files. DevTools protection is off in this mode by design.

### 4. Build for production
```bash
ng build
```
Uses the `production` configuration by default (Angular CLI 21.2.19 behavior) - swaps in `environment.prod.ts`, strips source maps, and turns on the DevTools deterrent. Artifacts are output to `dist/Angular_ToDoList/browser`.

### 5. Run unit tests
```bash
ng test
```

### 6. Check for dependency vulnerabilities
```bash
npm audit
```

---

## 📝 Data Persistence

Tasks and the light/dark theme choice are saved to the browser's `localStorage` (per-device, per-browser - not synced across devices, no backend yet). Clearing site data resets the list back to its two starter tasks.

---

## 📸 Screenshots

| Task List | Add / Edit Task |
|---|---|
| <img width="1918" height="1078" alt="Angular ToDoList task list view" src="https://github.com/user-attachments/assets/fc3a7202-b6ec-47c5-8bff-7d778614d68c" />
| <img width="1918" height="1078" alt="Angular ToDoList add and edit task view" src="https://github.com/user-attachments/assets/baa2446a-2eb2-4422-a332-85ad63cfeb4e" />
|

---

## 🔮 Future Enhancements

- 🔐 SSO login + guest mode
- 🗄️ MongoDB Atlas backend for cross-device sync
- 🗂️ Task categories or priority levels
- 🔔 Due-date reminders

---

## 👤 Contact

**Magesh Hariram K**
🔗 [LinkedIn](https://www.linkedin.com/in/magesh-hariram-k-6011132a4)
💻 [GitHub](https://github.com/mageshit24)

---

## 📄 License

This project is open source - feel free to use, modify, and build on it. Consider adding a `LICENSE` file (e.g. MIT) to make the terms explicit.
