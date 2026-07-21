import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Todo } from './todo';

describe('Todo', () => {
  let component: Todo;
  let fixture: ComponentFixture<Todo>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Todo]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Todo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a trimmed, non-empty task', () => {
    component.taskName = '  Write tests  ';
    component.addTask();
    expect(component.tasks().at(-1)?.name).toBe('Write tests');
    expect(component.taskName).toBe('');
  });

  it('should reject an empty task', () => {
    const before = component.tasks().length;
    component.taskName = '   ';
    component.addTask();
    expect(component.tasks().length).toBe(before);
    expect(component.errorMessage).toBeTruthy();
  });

  it('should toggle done state without mutating other tasks', () => {
    component.taskName = 'Toggle me';
    component.addTask();
    const task = component.tasks().at(-1)!;
    component.toggleDone(task);
    expect(component.tasks().find((t) => t.id === task.id)?.done).toBe(true);
  });

  it('should filter tasks by status', () => {
    component.taskName = 'Filtered task';
    component.addTask();
    const task = component.tasks().at(-1)!;
    component.toggleDone(task);
    component.setFilter('active');
    expect(component.filteredTasks().some((t) => t.id === task.id)).toBe(false);
    component.setFilter('done');
    expect(component.filteredTasks().some((t) => t.id === task.id)).toBe(true);
  });

  it('should delete a task by id', () => {
    component.taskName = 'Delete me';
    component.addTask();
    const task = component.tasks().at(-1)!;
    component.deleteTask(task);
    expect(component.tasks().some((t) => t.id === task.id)).toBe(false);
  });
});
