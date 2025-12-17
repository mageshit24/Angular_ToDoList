import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  title = 'ToDo Application';
  taskName: string = '';
  tasks: any[] = [
    { name: 'Angular Mini Project', done: false},
    { name: 'Mini Project Demo', done: false}
  ];

  addTask() {
    if(this.taskName.trim() !== '') {
      this.tasks.push({
        name: this.taskName,
        done: false
      });
      this.taskName = '';
    }
  }

  markDone(task: any) {
    task.done = true;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
