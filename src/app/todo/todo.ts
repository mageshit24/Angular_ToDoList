import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Strongly typed task shape — replaces the original `any[]` so the
 * template and component can't silently pass around unexpected data.
 */
export interface Task {
  id: string;
  name: string;
  done: boolean;
  editing: boolean;
  createdAt: number;
}

type TaskFilter = 'all' | 'active' | 'done';

const STORAGE_KEY = 'angular-todo-list:tasks:v1';
const MAX_TASK_LENGTH = 120;

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly title = 'My Tasks';
  readonly maxTaskLength = MAX_TASK_LENGTH;

  taskName = '';
  errorMessage = '';
  /** Draft text for whichever single task is currently in edit mode. */
  editDraft = '';

  readonly tasks = signal<Task[]>(this.loadTasks());
  readonly filter = signal<TaskFilter>('all');
  readonly darkMode = signal(this.loadThemePreference());

  readonly remainingCount = computed(() => this.tasks().filter((t) => !t.done).length);
  readonly doneCount = computed(() => this.tasks().filter((t) => t.done).length);

  readonly filteredTasks = computed(() => {
    const tasks = this.tasks();
    switch (this.filter()) {
      case 'active':
        return tasks.filter((t) => !t.done);
      case 'done':
        return tasks.filter((t) => t.done);
      default:
        return tasks;
    }
  });

  constructor() {
    // Persist tasks and theme automatically whenever they change.
    effect(() => {
      this.persistTasks(this.tasks());
    });
    effect(() => {
      this.persistThemePreference(this.darkMode());
    });
  }

  addTask(): void {
    const name = this.sanitizeInput(this.taskName);

    if (!name) {
      this.errorMessage = 'Please enter a task before adding it.';
      return;
    }
    if (name.length > MAX_TASK_LENGTH) {
      this.errorMessage = `Tasks can be at most ${MAX_TASK_LENGTH} characters.`;
      return;
    }

    this.errorMessage = '';
    this.tasks.update((tasks) => [
      ...tasks,
      { id: this.generateId(), name, done: false, editing: false, createdAt: Date.now() },
    ]);
    this.taskName = '';
  }

  toggleDone(task: Task): void {
    this.tasks.update((tasks) => tasks.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)));
  }

  deleteTask(task: Task): void {
    this.tasks.update((tasks) => tasks.filter((t) => t.id !== task.id));
  }

  editTask(task: Task): void {
    this.editDraft = task.name;
    this.tasks.update((tasks) => tasks.map((t) => ({ ...t, editing: t.id === task.id })));
  }

  saveTask(task: Task): void {
    const name = this.sanitizeInput(this.editDraft);
    if (!name) {
      // Don't allow saving an empty task — just cancel the edit instead.
      this.cancelEdit(task);
      return;
    }
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, name: name.slice(0, MAX_TASK_LENGTH), editing: false } : t)),
    );
  }

  cancelEdit(task: Task): void {
    this.tasks.update((tasks) => tasks.map((t) => (t.id === task.id ? { ...t, editing: false } : t)));
  }

  clearCompleted(): void {
    this.tasks.update((tasks) => tasks.filter((t) => !t.done));
  }

  setFilter(filter: TaskFilter): void {
    this.filter.set(filter);
  }

  toggleTheme(): void {
    this.darkMode.update((v) => !v);
  }

  trackByTaskId(_index: number, task: Task): string {
    return task.id;
  }

  /** Trims whitespace; Angular's template interpolation already escapes HTML, this just normalizes input. */
  private sanitizeInput(value: string): string {
    return (value ?? '').trim();
  }

  private generateId(): string {
    if (this.isBrowser && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  private loadTasks(): Task[] {
    if (!this.isBrowser) {
      return [
        { id: 'seed-1', name: 'Angular Mini Project', done: false, editing: false, createdAt: Date.now() },
        { id: 'seed-2', name: 'Mini Project Demo', done: false, editing: false, createdAt: Date.now() },
      ];
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [
          { id: this.generateId(), name: 'Angular Mini Project', done: false, editing: false, createdAt: Date.now() },
          { id: this.generateId(), name: 'Mini Project Demo', done: false, editing: false, createdAt: Date.now() },
        ];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // Corrupt or inaccessible storage (e.g. private browsing) — fall back to an empty list.
      return [];
    }
  }

  private persistTasks(tasks: Task[]): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Storage full or unavailable — silently skip persistence rather than crash the UI.
    }
  }

  private loadThemePreference(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    try {
      const stored = localStorage.getItem('angular-todo-list:theme');
      if (stored) {
        return stored === 'dark';
      }
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  }

  private persistThemePreference(isDark: boolean): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      localStorage.setItem('angular-todo-list:theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }
}
