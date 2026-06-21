# ✅ Angular ToDoList

A clean, standalone **Angular** to-do list app — add tasks, mark them done, edit them inline, or delete them, all wrapped in a polished gradient-card UI. Built with Angular's latest standalone component architecture and deployed to Netlify with SSR support.

## 🚀 Live Demo

🔗 **[Live on Netlify](https://angulartodolistminiproject.netlify.app/)**

---

## ✨ Features

- ➕ **Add Task** — quickly add new tasks via a simple input
- ✔️ **Mark Done** — flag a task complete, with status shown in green/red
- ✏️ **Edit Task** — edit a task's name inline, then save
- ❌ **Delete Task** — remove a task from the list instantly
- 🎨 **Polished UI** — gradient background, card layout, color-coded status
- ⚡ **Standalone Components** — built with Angular's modern standalone API (no NgModules)

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (standalone components) |
| Forms | `FormsModule` + `ngModel` (two-way binding) |
| Styling | Custom CSS (gradient card UI) |
| SSR | Angular Universal (`@angular/ssr`, Express) |
| Deployment | Netlify (`@netlify/angular-runtime`) |
| Testing | Vitest |

---

## 🏗️ Project Structure

```
Angular_ToDoList/
├── src/
│   ├── app/
│   │   ├── todo/
│   │   │   ├── todo.ts          # Task state & logic (add, edit, done, delete)
│   │   │   ├── todo.html        # Task list UI template
│   │   │   └── todo.css         # Gradient card styling
│   │   ├── app.ts                # Root component
│   │   ├── app.routes.ts         # Routing config
│   │   └── app.config.ts         # App-level providers config
│   ├── main.ts
│   └── index.html
├── public/
│   └── favicon.ico
├── angular.json
└── package.json
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)

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
Open **http://localhost:4200/** — the app reloads automatically as you edit source files.

### 4. Build for production
```bash
ng build
```
Build artifacts are output to the `dist/` directory.

### 5. Run unit tests
```bash
ng test
```

---

## 📝 Note on Data Persistence

Tasks currently live in the component's in-memory `tasks` array — there's no backend or local storage yet, so the list resets on every page refresh. See **Future Enhancements** below for ideas on persisting data.

---

## 📸 Screenshots

| Task List | Add / Edit Task |
|---|---|
| <img width="1918" height="1078" alt="Angular ToDoList task list view" src="https://github.com/user-attachments/assets/34ab01e4-bd08-4d35-9bcf-0564829b4296" /> | <img width="1918" height="1078" alt="Angular ToDoList add and edit task view" src="https://github.com/user-attachments/assets/21ef95be-00e8-4d6f-a5ea-687fa011f52a" /> |

---

## 🔮 Future Enhancements

- 💾 Persist tasks via `localStorage` or a backend API
- 🔍 Filter tasks by status (All / Done / Not Done)
- 🗂️ Task categories or priority levels
- 🔔 Due-date reminders
- 🌗 Dark mode toggle

---

## 👤 Contact

**Magesh Hariram K**
🔗 [LinkedIn](https://www.linkedin.com/in/magesh-hariram-k-6011132a4)
💻 [GitHub](https://github.com/mageshit24)

---

## 📄 License

This project is open source — feel free to use, modify, and build on it. Consider adding a `LICENSE` file (e.g. MIT) to make the terms explicit.
